const route = require('express').Router();
const models = require("../models/mongo");
const CryptoJS = require('crypto-js');
const bcrypt= require('bcryptjs');
const nodemailer = require('nodemailer');

route.get('/allemployees',(req,res)=>{
    models.employee.findAll({

    }).then((employees)=>{
        res.send(employees);
    }).catch((err)=>{
        console.log(err);
    })
});

async function  mailToEmployeeCredentials(email,username,password, managerId) {
    await function (managerId) {
        return models.manager.findOne({
            _id:managerId
        })
    }(managerId);

    await function(manager, email, username, password) {
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
            subject: 'Account Creation',
            text: 'You are receiving this because '+ manager.name+' has created your account.\n\n' +
            'Your username is: '+username+'\n'+'Your password is: '+password
        };
        smtpTransport.sendMail(mailOptions, function (err) {
            if (err) {
                reject();
            } else {

                resolve();
            }

        })
    }
}

route.post('/add',(req,res)=>{
    models.employee.findOne({
        empCode:req.body.empCode
    }).then((employeeExisting)=>{
        if(employeeExisting) {
            res.send("Employee already in system");
        }
        else{
            models.employee.create({
                managerID:req.user,
                empCode:req.body.empCode,
                name:req.body.name,
                email:req.body.email
            }).then((employee)=>{
                let username=employee.name+employee.empCode;
                employee.username=username;
                let password = (CryptoJS.AES.encrypt(employee.empCode, 'secret key 123')).toString().substring(0,8);
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                        employee.password = hash;
                        employee.save();
                        mailToEmployeeCredentials(employee.email,username,password,employee.managerID)
                        res.send('done');
                    })
                })

            }).catch((err)=>{
                console.log(err);
            })
        }
    }).catch((err)=>{
        console.log(err);
    })

});

route.get('/deleteEmp/:id',(req,res)=>{
    models.employee.remove({
        _id:req.params.id
    }).then(()=>{
        res.send("deleted");
    }).catch((err)=>{
        console.log(err);
    })
});

route.post('/billpolicy/:type',(req,res)=>{
    if(req.params.type!=="other") {
        models.manager.findOne({
            _id: req.user
        }).then((manager) => {
            models.billPolicy.findOneAndUpdate({
                    departmentId: manager.departmentId
                },
                {
                    $push: {
                        bills: {
                            billType: req.params.type,
                            percentageReimbursed: req.body.percentageReimbursed
                        }
                    }
                }).then(()=>{
                res.send("Successfully added bill");
            }).catch((err)=>{
                console.log(err);
            })
        }).catch((err)=>{
            console.log(err);
        })
    }
    else{
        models.manager.findOne({
            _id: req.user
        }).then((manager) => {
            models.billPolicy.findOneAndUpdate({
                    departmentId: manager.departmentId
                },
                {
                    $push: {
                        bills: {
                            billType: req.body.billType,
                            percentageReimbursed: req.body.percentageReimbursed
                        }
                    }
                }).then(()=>{
                res.send("Successfully added bill");
            }).catch((err)=>{
                console.log(err);
            })
        }).catch((err)=>{
            console.log(err);
        })
    }
});

route.post('/removebillpolicy/:type',(req,res)=>{
    if(req.params.type!=="other") {
        models.manager.findOne({
            _id: req.user
        }).then((manager) => {
            models.billPolicy.findOneAndUpdate({
                    departmentId: manager.departmentId
                },
                {
                    $pull: {
                        bills: {
                            billType: req.params.type
                        }
                    }
                }).then(()=>{
                res.send("Successfully deleted bill");
            }).catch((err)=>{
                console.log(err);
            })
        }).catch((err)=>{
            console.log(err);
        })
    }
    else{
        models.manager.findOne({
            _id: req.user
        }).then((manager) => {
            models.billPolicy.findOneAndUpdate({
                    departmentId: manager.departmentId
                },
                {
                    $pull: {
                        bills: {
                            billType: req.body.billType
                        }
                    }
                }).then(()=>{
                res.send("Successfully deleted bill");
            }).catch((err)=>{
                console.log(err);
            })
        }).catch((err)=>{
            console.log(err);
        })
    }
});


module.exports = route;