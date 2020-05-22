var mongoose = require('mongoose')
//require('mongoose-type-email');

// Define our Company schema
var RegisterSchema = new mongoose.Schema({
   
    regadress:{
        type: Number,
        unique: true,
        required: true
    }, 
    regdescr:{
        
        type: String,
        required: true
    },
    regfreq:{
        type: String,
        required:true
    },
    assettypeID: {
        type: String,
        required: true
    },
    Assettypename: {
        type: String,
        required: true
    },
    paramID: {
        type: String,
        required: true
    },
    paramname: {
        type: String
    }
});

module.exports = mongoose.model('Register',RegisterSchema)