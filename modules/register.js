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
        //type: mongoose.SchemaTypes.Email, 
        type: String,
        unique: true,
        required: true
    },
    regfreq:{
        type: Number,
        required:true
        
    }
});

module.exports = mongoose.model('Register',RegisterSchema)