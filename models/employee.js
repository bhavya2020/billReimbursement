const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    managerID:{
        type:mongoose.Schema.Types.ObjectId,
    },
    empCode:String,
    name: String,
    address:String,
    email:String,
    contactNo:String,
    username:String,
    password:String
});

module.exports = mongoose.model("employee", employeeSchema);