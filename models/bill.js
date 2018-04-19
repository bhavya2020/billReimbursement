const mongoose = require("mongoose");

const billSchema = mongoose.Schema({
  empId:{
    type:mongoose.Schema.Types.ObjectId
  },
  status:Number,
  amount:Number,
  type:String,
  billNo:String
});

module.exports = mongoose.model("bill", billSchema);
