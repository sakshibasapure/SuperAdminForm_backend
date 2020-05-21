require('../config/config');
require('../config/passportConfig');


const jwtHelper = require('../config/jwtHelper');
var express = require('express');
var bodyParser = require('body-parser');

const mongoose = require('mongoose');
const passport = require('passport');

//db schema _user --> find in '../modules/user.js'
const _ = require('lodash');


var userRouter = express.Router();
const ObjectId = require("mongodb").ObjectID;

var _user = require('../modules/user')
userRouter.use(bodyParser.json())

//Creating endpoint for /users
userRouter.route('/')
.get((req,res) => {
    _user.find({})
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    })
    .catch((err) => {
        res.send(err)
    });
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /user');
})
.delete((req, res) => {
    _user.remove({})
    .then((resp) => {
        res.json({ message: 'User details deleted' });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => {
        res.statusCode = 500;
        resjson({ message : "Users not deleted"})
    });
});


// ----------------------------------------------------------------------------------------------------------------------------------------------------------


//creating endpoint for /user/userid
userRouter.route('/:id')

.delete((req, res) => {
    var _id =  req.params.id;
    _user.findByIdAndRemove(_id)
    .then((resp) => {
        res.json({ message: 'User details deleted' });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => {
        res.send({message: 'User details not deleted'})
    });
});


userRouter.route('/register')
.post((req, res, next) => {
    // var _id =  new ObjectId(req.params.id);
    var user = new _user();
    user.fullname = req.body.fullname;
    user.email = req.body.email;
    user.password = req.body.password;
 
    user.save((err, doc) => {
        if (!err)
        {
            res.send("You are now registered and can log in!  \n\n" +doc );
        }
        else {
            if (err.code == 11000)
                    res.status(422).send(['Duplicate email adrress found.']);
                else
                    return next(err);
            //error handling
        }
        
    });
});




//login validation of existing user.
// on entering correct registered email id and password a token will be generated.
// browse to /userProfile
userRouter.route('/authenticate')
.post((req,res,next) =>
{
    
    passport.authenticate('local',(err, user, info)=>
    {
        if(err) return res.status(400).json(err);

        else if(user) return res.status(200).json({"token": user.generateJwt()});

        else return res.status(404).json(info);

    })(req,res);
});

//logout user
userRouter.route('/logout')
.post((req,res) =>
{
    res.redirect('http://localhost:3000/')
}
);


module.exports = userRouter