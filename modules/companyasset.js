// Load required packages
var mongoose = require('mongoose')

// Define our AssetType schema
var CompanyAssetSchema = new mongoose.Schema({
   
    assetname:{
        type: String,
        required: true
    }, 
    assetdesc:{
        type: String,
        required: true
    },
    companyname: {
        type: String,
        required: true
    },
    companyID: {
        type: String
    },
    assettypename: {
        type: String,
        required: true
    },
    tariffclass: {
        type: String
    }

});

var Assets = mongoose.model('CompanyAsset', CompanyAssetSchema)
module.exports = Assets



