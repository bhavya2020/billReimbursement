const route = require('express').Router();
const CryptoJS = require("crypto-js");
const bcrypt = require('bcryptjs');
const models = require('../models/mongo');
const nodemailer = require('nodemailer');
const CONFIG = require('../configs');

route.get('/myBills', (req, res) => {
  models.bill.find({
    empId: req.user
  }).then((bills) => {
    res.send(bills);
  }).catch((Err) => {
    console.log(Err);
  })
});
route.get('/billDetails/:billID',(req,res)=>{
  models.bill.findOne({
    _id:req.params.billID
  }).then((bill)=>{
    res.send(bill)
  }).catch((err)=>{
    console.log(err);
  })
});
route.get('/removeBill/:billID',(req,res)=>{
  models.bill.remove({
    _id:req.params.billID
  }).then(()=>{
    res.send("deleted")
  }).catch((err)=>{
    console.log(err);
  })
});
async function commonBillDetails(req) {
  return models.bill.create({
    empId: req.user,
    billNo: req.body.billNo,
    status: 0,
    amount: req.body.amount,
    type: req.body.type
  })
}

route.post('/submit/healthBill', (req, res) => {
  commonBillDetails(req)
    .then((bill) => {
      bill.typeOfTreatment = req.body.typeOfTreatment;
      bill.NameOfDoctor = req.body.NameOfDoctor;
      bill.NameOfHospital = req.body.NameOfHospital;
      return bill.save();
    })
    .then(()=>{
    res.send("added");
    }).catch((err) => {
    console.log(err);
  })
});
route.post('/submit/healthBill', (req, res) => {
  commonBillDetails(req)
    .then((bill) => {
      bill.typeOfTreatment = req.body.typeOfTreatment;
      bill.NameOfDoctor = req.body.NameOfDoctor;
      bill.NameOfHospital = req.body.NameOfHospital;
      return bill.save();
    })
    .then(()=>{
      res.send("added");
    }).catch((err) => {
    console.log(err);
  })
});
route.post('/submit/travelBill', (req, res) => {
  commonBillDetails(req)
    .then((bill) => {
      bill.TravelDuration = req.body.TravelDuration;
      bill.Destination = req.body.Destination;
      bill.LastLTCDate = req.body.LastLTCDate;
      bill.ModeOfTransport=req.ModeOfTransport;
      return bill.save();
    })
    .then(()=>{
      res.send("added");
    }).catch((err) => {
    console.log(err);
  })
});
route.post('/submit/educationBill', (req, res) => {
  commonBillDetails(req)
    .then((bill) => {
      bill.NumberOfChildren = req.body.NumberOfChildren;
      bill.AgeOfChildren = req.body.AgeOfChildren;
      return bill.save();
    })
    .then(()=>{
      res.send("added");
    }).catch((err) => {
    console.log(err);
  })
});
route.post('/submit/houseRentBill', (req, res) => {
  commonBillDetails(req)
    .then((bill) => {
      bill.HouseRentDuration = req.body.HouseRentDuration;
      return bill.save();
    })
    .then(()=>{
      res.send("added");
    }).catch((err) => {
    console.log(err);
  })
});
route.post('/submit/otherBill', (req, res) => {
  commonBillDetails(req)
    .then((bill) => {
      bill.MiscellaneousType = req.body.MiscellaneousType;
      return bill.save();
    })
    .then(()=>{
      res.send("added");
    }).catch((err) => {
    console.log(err);
  })
});

module.exports = route;
