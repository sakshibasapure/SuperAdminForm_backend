// Load required packages
var mongoose = require('mongoose')

// Define our AssetType schema
var paramSchema = new mongoose.Schema({
    paramname :{
        type: String,
        required: true
    }, 
    Description:{
        type: String,
    },
});

module.exports = mongoose.model('Parameter', paramSchema)