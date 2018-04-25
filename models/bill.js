const mongoose = require("mongoose");

const billSchema = mongoose.Schema({
  empId:{
    type:mongoose.Schema.Types.ObjectId
  },
  status:Number,
  amount:Number,
  type:String,
  billNo:String,
  HouseRentDuration:Number,
  typeOfTreatment:String,
  NameOfDoctor:String,
  NameOfHospital:String,
  NumberOfChildren: Number,
  AgeOfChildren:Number,
  TravelDuration:Number,
  Destination:String,
  LastLTCDate: String,
  ModeOfTransport: String,
  MiscellaneousType:String
});

module.exports = mongoose.model("bill", billSchema);
