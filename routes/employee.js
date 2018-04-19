const route = require('express').Router();
const CryptoJS = require("crypto-js");
const bcrypt = require('bcryptjs');
const models = require('../models/mongo');
const nodemailer = require('nodemailer');
const CONFIG = require('../configs');

route.get('/myBills',(req,res)=>{
  models.bill.find({
    empId:req.user
  }).then((bills)=>{
    res.send(bills);
  }).catch((Err)=>{
    console.log(Err);
  })
});
