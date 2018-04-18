//Import Passport
const passport = require("passport");
//Import LocalStrategy module
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');
const models = require('./models/mongo');

//Serialize user
passport.serializeUser(function (userKey, done) {
    done(null, userKey);
});

//De-Serialize User
passport.deserializeUser(function (userKey, done) {
    switch (userKey.type) {

        case 'company':
            models.company.findOne({
                _id: userKey.userId
            }).then((company) => {
                done(null, company);
            }).catch((Err) => {
                console.log(Err);
            }); break;
        case 'manager':
            models.manager.findOne({
                _id: userKey.userId
            }).then((manager) => {
                done(null, manager);
            }).catch((Err) => {
                console.log(Err);
            }); break;
        case 'employee':
            models.employee.findOne({
                _id: userKey.userId
            }).then((employee) => {
                done(null, employee);
            }).catch((Err) => {
                console.log(Err);
            }); break;
        default: console.log("default");
    }
});

//User "localstrategy" at "local"
passport.use('local-company',new LocalStrategy( function (username, password, done) {
    models.company.findOne({username:username})
        .then((company)=>{
        if(!company) console.log(" company does not exists");
        else {
            bcrypt.compare(password,company.password).then((res)=>{
                if(res){
                    let userKey={
                        type:'company',
                        userId:company._id
                    };
                    return done(null,userKey);

                }else
                {
                    console.log("password incorrect");
                }
            })
        }
        })
}));
passport.use('local-manager',new LocalStrategy( function (username, password, done) {
    models.manager.findOne({username:username})
        .then((manager)=>{
            if(!manager) console.log(" manager does not exists");
            else {
                bcrypt.compare(password,manager.password).then((res)=>{
                    if(res){
                        let userKey={
                            type:'manager',
                            userId:manager._id
                        };
                        return done(null,userKey);

                    }else
                    {
                        console.log("password incorrect");
                    }
                })
            }
        })
}));
passport.use('local-employee',new LocalStrategy( function (username, password, done) {
    models.employee.findOne({username:username})
        .then((employee)=>{
            if(!employee) console.log(" employee does not exists");
            else {
                bcrypt.compare(password,employee.password).then((res)=>{
                    if(res){
                        let userKey={
                            type:'employee',
                            userId:employee._id
                        };
                        return done(null,userKey);

                    }else
                    {
                        console.log("password incorrect");
                    }
                })
            }
        })
}));

//Expose passport to be used in server.js
module.exports = passport;