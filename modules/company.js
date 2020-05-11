// Load required packages
var mongoose = require('mongoose')
//require('mongoose-type-email');

// Define our Company schema
var CompanySchema = new mongoose.Schema({
   
    companyname:{
        type: String,
        unique: true,
        required: true
    }, 
    email:{
        //type: mongoose.SchemaTypes.Email, 
        type: String,
        required: true
    },
    address:{
        type: String
    }
});


module.exports = mongoose.model('Company',CompanySchema)