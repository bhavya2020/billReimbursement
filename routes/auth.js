const models = require('./../models/mongo');
const bcrypt = require('bcryptjs');
const Passport = require("../passport");
module.exports = function (app) {

    app.post('/signup', (req, res) => {

        models.company.findOne({
            username: req.body.username
        }).then((company) => {
            if (company)
                res.send("already registered");
            else {
                models.company.create({
                    name: req.body.name,
                    ceo: req.body.ceo,
                    address: req.body.address,
                    email: req.body.email,
                    contactNo: req.body.contactNom,
                    gstNo: req.body.gstNo,
                    registrationNo: req.body.registrationNo,
                    username: req.body.username
                }).then((company) => {
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(req.body.password, salt, function (err, hash) {
                            company.password = hash;
                            company.save();
                            res.send('done');
                        })
                    })
                }).catch((err) => {
                    console.log(err);
                })

            }
        }).catch((err) => {
            console.log(err);
        });


    });

    app.get('/login',(req,res)=>{
      console.log("login");
        if (req.userKey)
        {
            switch (req.userKey.type)
            {
                case 'company':res.redirect('/company');break;
                case 'manager':res.redirect('/manager');break;
                case 'employee':res.redirect('/employee');break;
                default: console.log("default");
            }
        }
        else
            res.send("unable to login");
    });
    app.post('/login/company', Passport.authenticate('local-company', {
        successRedirect:'/loggedin',
        failureRedirect:'/login'
        }));
    app.post('/login/manager', Passport.authenticate('local-manager', {
        successRedirect:'/loggedin',
        failureRedirect:'/login'
    }));
    app.post('/login/employee', Passport.authenticate('local-employee', {
        successRedirect:'/loggedin',
        failureRedirect:'/login'
    }));

    app.get('/loggedin',(req,res)=>{
      res.send("Logged-in")
    });

    app.get("/logout", (req, res) => {

        req.logout();
        res.redirect('/');
    });
};
