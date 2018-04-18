const mongoose = require("mongoose");

const managerSchema = mongoose.Schema({
    companyID:{
        type:mongoose.Schema.Types.ObjectId
    },
    mngCode:String,
    name: String,
    address:String,
    email:String,
    contactNo:String,
    username:String,
    password:String,
    departmentID:{
        type:mongoose.Schema.Types.ObjectId
    }
});

module.exports = mongoose.model("manager", managerSchema);