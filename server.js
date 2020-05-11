// Load required packages
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

var AssetTypeController = require('./controllers/assettype')
var CompanyController = require('./controllers/company')
var CompanyAssetController = require('./controllers/companyasset')

// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/SuperAdminForm', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
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

// Create endpoint handlers for /assettype
router.route('/assettype')
  .post(AssetTypeController.postAssetType)
  .get(AssetTypeController.getAssetType)


// Create endpoint handlers for /company
router.route('/company')
  .post(CompanyController.postCompany)
  .get(CompanyController.getCompany)


// Create endpoint handlers for /companyasset
router.route('/companyasset')
  .post(CompanyAssetController.postCompanyAsset)
  .get(CompanyAssetController.getCompanyAsset)


app.use('/',router);

app.listen(PORT, function(){
  console.log("Server running on localhost "+ PORT)
});
