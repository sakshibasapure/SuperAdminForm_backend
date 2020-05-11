// Load required packages
var mongoose = require('mongoose')

// Define our AssetType schema
var CompanyAssetSchema = new mongoose.Schema({
   
    assetname:{
        type: String,
        unique: true,
        required: true
    }, 
    description:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('CompanyAsset', CompanyAssetSchema)

