// Load required packages
var mongoose = require('mongoose')

// Define our AssetType schema
var AssetTypeSchema = new mongoose.Schema({
   
    assettypename:{
        type: String,
        unique: true,
        required: true
    }, 
    description:{
        type: String,
        required: true
    },
    assettypes:{
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('AssetType', AssetTypeSchema)