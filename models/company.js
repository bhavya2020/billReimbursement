const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
    name: String,
    ceo:String,
    address:String,
    email:String,
    contactNo:String,
    gstNo:String,
    registrationNo:String,
    username:String,
    password:String
});

module.exports = mongoose.model("company", companySchema);