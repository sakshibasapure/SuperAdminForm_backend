// Load required packages
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

var CompanyRouter = require('./controllers/companyRouter')
var AssetRouter = require('./controllers/assetRouter')
var AssettypeRouter = require('./controllers/assettypeRouter')
var JoinRouter = require('./controllers/join')
var RegisterRouter=require('./controllers/registerRouter')


var Companies = require('./modules/company');
var Assets = require('./modules/companyasset')
var Assettypes = require('./modules/assettype')
var Registers=require('./modules/register')



// Connect to superadminform MongoDB
mongoose.connect('mongodb://localhost:27017/SuperAdminForm', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
})

var connection = mongoose.connection

// Create our Express application
const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());

// Create our Express router
var router = express.Router();

app.use('/company', CompanyRouter);
app.use('/companyasset', AssetRouter);
app.use('/assettype', AssettypeRouter);
app.use('/register',RegisterRouter);
app.use('/join', JoinRouter);

app.use('/',router);

app.listen(PORT, function(){
  console.log("Server running on localhost "+ PORT)
});


module.exports = app;
