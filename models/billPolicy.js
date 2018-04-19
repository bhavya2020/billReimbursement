const mongoose = require("mongoose");

const billPolicySchema = mongoose.Schema({
    departmentID:{
        type:mongoose.Schema.Types.ObjectId
    },
    bills:[{
        billType: String,
        percentageReimbursed: Number
    }]

});

module.exports = mongoose.model("billPolicy", billPolicySchema);
