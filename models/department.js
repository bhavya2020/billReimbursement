const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema({
    companyID:{
        type:mongoose.Schema.Types.ObjectId,
    },
    name:String,
    managerID:{
        type:mongoose.Schema.Types.ObjectId,
    }
});

module.exports = mongoose.model("department", departmentSchema);