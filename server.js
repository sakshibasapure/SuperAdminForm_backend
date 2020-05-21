// Load required packages
require('./config/config');
require('./config/passportConfig');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const _user = require('./modules/user');

var url = 'mongodb://localhost:27017/SuperAdminForm'



const bcrypt = require('bcryptjs');
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
const _ = require('lodash');
var CompanyRouter = require('./controllers/companyRouter')
var AssetRouter = require('./controllers/assetRouter')
var AssettypeRouter = require('./controllers/assettypeRouter')
var JoinRouter = require('./controllers/join')
var ParameterRouter = require('./controllers/paramRouter')
var RegisterRouter = require('./controllers/registerRouter')
var UserRouter = require('./controllers/userRouter')
const jwtHelper = require('./config/jwtHelper');


var Companies = require('./modules/company');
var Assets = require('./modules/companyasset')
var Assettypes = require('./modules/assettype')
var Registers = require('./modules/register')
var Users = require('./modules/user');

// Connect to the beerlocker MongoDB
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
app.use(passport.initialize());



// Create our Express router
var router = express.Router();


//check if entered value in 'Email-ID' parameter is valid
const isEmail = (email) => {
  if (typeof email !== 'string') {
    return false;
  }
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailRegex.test(email);
};


// ----------------------------------------------------------------------  

//error handler
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
      var valErrors = [];
      Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
      res.status(422).send(valErrors)
  }
});


app.use('/company', CompanyRouter);
app.use('/companyasset', AssetRouter);
app.use('/assettype', AssettypeRouter);
app.use('/parameter',ParameterRouter);
app.use('/register', RegisterRouter)
app.use('/join', JoinRouter);
app.use('/user',UserRouter);

app.use('/',router);






// --------------------------------------------------------------------------------------------------------------------------------------------------------------

// // In headers enter key as Authorization and for value enter the keyword "Bearer" followed by a space and the token generated in /authenticate
app.get('/user/userProfile', jwtHelper.verifyJwtToken ,(req,res,next) =>
{
   _user.findOne({_id: req._id},
        (err,user) =>
        {
            if(!user)
            {
                return res.status(400).json({status:false,  message: "User Record Not Found"});
            }
            else
            {
                return res.status(200).json({status: true, user: _.pick(user, ['fullname','email'])});
            }
        })
})



//mongodb database ->SuperAdminForm and   collection -> users
var DATABASE_NAME = "SuperAdminForm";
var collection;

//gives details about a specific user from the database
app.get('/user/:id',(req, res) => {
  mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
      if(error) {
          throw error;
      }
      //database name -> User
      database = client.db(DATABASE_NAME);
      //name of collection -> Details
      collection = database.collection("users");
      const ObjectId = require("mongodb").ObjectID;
      collection.findOne({ "_id": new ObjectId(req.params.id) }, (error, result) => {
          if(error) {
              return res.status(500).send(error);
          }
          res.send(result);
      });
})})



// ----------------------------------------------------------------------------------------------------------------------------------------------------

app.listen(PORT, function(){
  console.log("Server running on localhost "+ PORT)
});


module.exports = app;