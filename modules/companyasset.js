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
    companyName: {
        type: String,
        required: true
    },
    companyId: {
        type: String
    },
    assettypename: {
        type: String,
        required: true
    }

});

var Assets = mongoose.model('CompanyAsset', CompanyAssetSchema)
module.exports = Assets


