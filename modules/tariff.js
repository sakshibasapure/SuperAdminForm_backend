const mongoose = require('mongoose')
//require('mongoose-type-email');

// Define our Company schema
const TariffSchema = new mongoose.Schema({
    tariffid:{
        type: Number,
        unique: true,
        required: true
    },
    tariffslab:{
        type: String,
        required: true
    }, 
    tariffixedc:{
        type: Number,
        required: true
    },
    tariffunitc:{
        type: Number,
        required:true
    }
});

module.exports = mongoose.model('Tariff',TariffSchema)