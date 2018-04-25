const route = require('express').Router();
const models = require("../models/mongo");
const CryptoJS = require('crypto-js');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const CONFIG = require('../configs');

route.get('/',(req,res)=>{
  res.send("Logged-in");
});

route.get('/allEmployees', (req, res) => {
  models.employee.find({}).then((employees) => {
    res.send(employees);
  }).catch((err) => {
    console.log(err);
  })
});
route.get('/employees', (req, res) => {
  models.employee.find({
    managerID:req.user
  }).then((employees) => {
    res.send(employees);
  }).catch((err) => {
    console.log(err);
  })
});
async function mailToEmployeeCredentials(email, username, password, managerId) {

  let manager = await function (managerId) {
    return models.manager.findOne({
      _id: managerId
    })
  }(managerId);

  await function (manager, email, username, password) {
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
      text: 'You are receiving this because ' + manager.name + ' has created your account.\n\n' +
      'Your username is: ' + username + '\n' + 'Your password is: ' + password
    };
    smtpTransport.sendMail(mailOptions, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("mail sent");
      }
    })
  }(manager, email, username, password);
}

async function mailToEmployeeBillAppDenReim(status, email, managerId, bill) {
  let manager = await function (managerId) {
    return models.manager.findOne({
      _id: managerId
    })
  }(managerId);

  await function (status, manager, email) {
    let smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: CONFIG.SERVER.MAIL,
        pass: CONFIG.SERVER.PASS
      }
    });
    let mailOptions;
    if (status === 2) {
       mailOptions = {
        to: email,
        from: CONFIG.SERVER.MAIL,
        subject: 'Bill accepted',
        text: 'You are receiving this because ' + manager.name + ' has aproved your bill: ' + bill.billNo
      };
    }
    if (status === -1) {
       mailOptions = {
        to: email,
        from: CONFIG.SERVER.MAIL,
        subject: 'Bill rejected',
        text: 'You are receiving this because ' + manager.name + ' has rejected your bill: ' + bill.billNo
      };
    }
    if (status === 3) {
       mailOptions = {
        to: email,
        from: CONFIG.SERVER.MAIL,
        subject: 'Bill reimbursed',
        text: 'You are receiving this because ' + manager.name + ' has reimbursed your bill: ' + bill.billNo
      };
    }
    smtpTransport.sendMail(mailOptions, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("mail sent");
      }

    })
  }(status,manager,email);
}

route.post('/employee/add', (req, res) => {
  models.employee.findOne({
    empCode: req.body.empCode
  }).then((employeeExisting) => {
    if (employeeExisting) {
      res.send("Employee already in system");
    }
    else {
      models.employee.create({
        managerID: req.user,
        empCode: req.body.empCode,
        name: req.body.name,
        email: req.body.email
      }).then((employee) => {
        let username = employee.name + employee.empCode;
        employee.username = username;
        let cipherText=CryptoJS.AES.encrypt(employee.empCode, 'secret key 123');
        let password = cipherText.toString().substring(cipherText.toString().length-8);
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            employee.password = hash;
            employee.save();
            mailToEmployeeCredentials(employee.email, username, password, employee.managerID)
            res.send('done');
          })
        })

      }).catch((err) => {
        console.log(err);
      })
    }
  }).catch((err) => {
    console.log(err);
  })

});

route.get('/deleteEmp/:id', (req, res) => {
  models.employee.remove({
    _id: req.params.id
  }).then(() => {
    res.send("deleted");
  }).catch((err) => {
    console.log(err);
  })
});

route.post('/billpolicy/:type', (req, res) => {

    models.manager.findOne({
      _id: req.user
    }).then((manager) => {
      models.billPolicy.findOne({
        departmentID: manager.departmentID,
      }).then((billPolicy) => {
        console.log(billPolicy);
        if (billPolicy) {
          let flag=false;
          for(let bill of billPolicy.bills)
          {
            if(bill.billType===req.params.type)
            {
              flag=true;
              break;
            }
          }
          if(flag) res.send("already entered policy");
          else {
            billPolicy.bills.push({
              billType: req.params.type,
              percentageReimbursed: req.body.percentageReimbursed
            });
            billPolicy.save();
            res.send("done");
          }
        }
        else {
          models.billPolicy.create({
            departmentID: manager.departmentID,
          })
            .then((billPolicy) => {
              billPolicy.bills.push({
                billType: req.params.type,
                percentageReimbursed: req.body.percentageReimbursed
              });
              billPolicy.save();
              res.send("done");
            })
            .catch((Err) => {
            console.log(Err);
          })
        }
      }).catch((err)=>{
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })

});
route.get('/billPolicy',(req,res)=>{
  models.manager.findOne({
    _id:req.user
  }).then((manager)=>{
    return models.billPolicy.findOne({
      departmentID:manager.departmentID
    }).then((billPolicies)=>{
      res.send(billPolicies.bills);
    }).catch((err)=>{
      console.log(err);
    })
  })
});
route.get('/removebillpolicy/:type', (req, res) => {
    models.manager.findOne({
      _id: req.user
    }).then((manager) => {
      models.billPolicy.findOneAndUpdate({
          departmentID: manager.departmentID
        },
        {
          $pull: {
            bills: {
              billType: req.params.type
            }
          }
        }).then(() => {
        res.send("Successfully deleted bill");
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })

});
route.get('/employee/:id',(req,res)=>{
  models.employee.findOne({
    _id:req.params.id
  }).then((employee)=>{
    res.send(employee);
  }).catch((err)=>{
    console.log(err);
  })
});
route.get('/employeebill/:id', (req, res) => {
  models.bill.find({
    empId: req.params.id
  }).then((bills) => {
    res.send(bills);
  }).catch((err) => {
    console.log(err);
  })
});

route.get('/bill/:id', (req, res) => {
  models.bill.findOne({
    _id: req.params.id
  }).then((bill) => {
    if(bill.status=0){
      bill.status = 1;
      bill.save();
    }
    res.send(bill);
  }).catch((err) => {
    console.log(err);
  })
});

route.get('/bill/approve/:id', (req, res) => {
  models.bill.findOne({
    _id: req.params.id
  }).then((bill) => {
    models.employee.findOne({
      _id: bill.empId
    }).then((employee) => {
      bill.status = 2;
      mailToEmployeeBillAppDenReim(2, employee.email, employee.managerID, bill);
      bill.save();
      res.send(bill);
    }).catch((err) => {
      console.log(err);
    })

  }).catch((err) => {
    console.log(err);
  })
});

route.get('/bill/deny/:id', (req, res) => {
  models.bill.findOne({
    _id: req.params.id
  }).then((bill) => {
    models.employee.findOne({
      _id: bill.empId
    }).then((employee) => {
      bill.status = -1;
      mailToEmployeeBillAppDenReim(-1, employee.email, employee.managerID, bill);
      bill.save();
      res.send(bill);
    }).catch((err) => {
      console.log(err);
    })

  }).catch((err) => {
    console.log(err);
  })
});

route.post('/resetPassword',(req,res)=>{
  models.manager.findOne({
    _id:req.user,
  }).then((manager)=> {
    bcrypt.compare(req.body.oldPass, manager.password)
      .then((result) => {
        if (!result) res.send("old pass incorrect");
        else {
          bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(req.body.newPass ,salt, function (err, hash) {
              manager.password = hash;
              manager.save();
              res.send('done');
            })
          })
        }
      }).catch((Err) => {
      console.log(Err);
    })
  }).catch((err)=>{
    console.log(err);
  })
});

route.get('/bill/reimbursed/:id', (req, res) => {
  models.bill.findOne({
    _id: req.params.id
  }).then((bill) => {
    models.employee.findOne({
      _id: bill.empId
    }).then((employee) => {
      bill.status = 3;
      mailToEmployeeBillAppDenReim(3, employee.email, employee.managerID, bill);
      bill.save();
      res.send(bill);
    }).catch((err) => {
      console.log(err);
    })

  }).catch((err) => {
    console.log(err);
  })
});

route.get("/getDetails", (req,res)=>{
  console.log(req.user);
  models.manager.findOne({
    _id: req.user
  })
    .then((details)=>{
      res.send(details);
      console.log(details);
    })
    .catch((err) => {
      console.log(err);
    })
});


module.exports = route;
