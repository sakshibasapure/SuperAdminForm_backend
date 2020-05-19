// Load required packages
var mongoose = require('mongoose')
//require('mongoose-type-email');
//var Assets = require('./modules/companyasset')

// Define our Company schema
var CompanySchema = new mongoose.Schema({
   
    companyname:{
        type: String,
        //unique: true,
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


var Companies = mongoose.model('Company',CompanySchema)
module.exports = Companies;