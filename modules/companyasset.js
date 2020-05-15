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
    companyID: {
        type: String,
        required: true
    },
    UnitRate: {
        type: Number,
        required: true
    },
    KVaRate: {
        type: Number,
        required: true
    },
    KwRate: {
        type: Number,
        required: true
    },
    assettypename: {
        type: String,
        required: true
    }

});


module.exports = mongoose.model('CompanyAsset', CompanyAssetSchema)

