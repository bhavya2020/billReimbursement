const route = require('express').Router();
const CryptoJS = require("crypto-js");
const bcrypt = require('bcryptjs');
const models = require('../models/mongo');
const nodemailer = require('nodemailer');
const CONFIG = require('../configs');

async function mailToManagerAboutCredentials(email, username, password, companyID, departmentID) {

    let company = await function (companyID) {
        return models.company.findOne({
            _id: companyID
        })
    }(companyID);

    let department = await function (departmentID) {
        return models.department.findOne({
            _id: departmentID
        })
    }(departmentID);


    await function (company, department, email, username, password) {
        let smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: CONFIG.SERVER.MAIL,
                pass: CONFIG.SERVER.PASS
            }
        });
        let mailOptions = {
            to: email,
            from: CONFIG.SERVER.MAIL,
            subject: 'account creation',
            text: 'You are receiving this because ' + company.name + ' has selected you to be the manager of department ' + department.name + ' Your account details are:\n\n' +
            'username : ' + username + '\n' +
            'password: ' + password + '.'
        };
        smtpTransport.sendMail(mailOptions, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('mail sent');
            }
        });
    }(company, department, email, username, password);
}


route.get('/remove/manager/:managerID', (req, res) => {
    models.manager.remove({
        _id: req.params.managerID
    }).then(() => {
        return models.department.findOne({
            managerID: req.params.managerID
        })
    }).then((dept) => {
        dept.managerID = undefined;
        dept.save();
        res.send("removed");
    }).catch((Err) => {
        console.log(Err);
    })
});
route.get('/remove/department/:deptID',(req,res)=>{
    models.department.remove({
        _id:req.params.deptID
    }).then(()=>{
        return models.manager.remove({
            departmentID:req.params.deptID
        })
    }).then(()=>{
        res.send("removed");
    }).catch((err)=>{
        console.log(err);
    })
});
route.get('/managers', (req, res) => {
    models.manager.find({
        companyID: req.user
    }).then((managers) => {
        res.send(managers);
    }).catch((err) => {
        console.log(err);
    })
});
route.get('/departments', (req, res) => {
    models.department.find({
        companyID: req.user
    }).then((departments) => {
        console.log(departments);
        res.send(departments)
    }).catch((Err) => {
        console.log(Err);
    })
});
route.post('/add/department', (req, res) => {
    models.department.create({
        companyID: req.user,
        name: req.body.name,
    }).then((department) => {
        console.log(department);
        res.send('created');
    }).catch((err) => {
        console.log(err);
    })
});
route.post('/add/manager/:departmentID', (req, res) => {


    models.manager.findOne({
        mngCode: req.body.mngCode
    }).then((manager) => {
        if (manager) res.send("duplicate");
        else {
            models.department.findOne({
                _id: req.params.departmentID
            }).then((department) => {
                models.manager.create({
                    companyID: req.user,
                    mngCode: req.body.mngCode,
                    name: req.body.name,
                    email: req.body.email,
                    departmentID: req.params.departmentID
                }).then((manager) => {
                    department.managerID = manager._id;
                    department.save();
                    let username = manager.name + manager.mngCode;
                    manager.username = username;
                    let ciphertext = CryptoJS.AES.encrypt(manager.mngCode, 'secret key 123');
                    let password = ciphertext.toString().substring(ciphertext.length()-8);
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(password, salt, function (err, hash) {
                            manager.password = hash;
                            manager.save();
                            mailToManagerAboutCredentials(manager.email, username, password, req.user, manager.departmentID);
                            res.send("added");
                        })
                    })

                }).catch((Err) => {
                    console.log(Err);
                })
            }).catch((err) => {
                console.log(err);
            });

        }
    }).catch((err) => {
        console.log(err);
    })

});
module.exports = route;
