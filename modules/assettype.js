// Load required packages
var mongoose = require('mongoose')

// Define our AssetType schema
var AssetTypeSchema = new mongoose.Schema({
    Assetname:{
        type: String,
        unique: true,
        required: true
    }, 
    Description:{
        type: String,
        required: true
    },
    type:{
        type: Number
        //required: true
    }
});

module.exports = mongoose.model('AssetType', AssetTypeSchema)