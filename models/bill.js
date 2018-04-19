const mongoose = require("mongoose");

const billSchema = mongoose.Schema({
  empId:{
    type:mongoose.Schema.Types.ObjectId
  },
  status:Number,
  amount:Number,
  type:String
});

module.exports = mongoose.model("bill", billSchema);
