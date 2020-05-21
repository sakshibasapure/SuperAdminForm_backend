var express = require('express');
var bodyParser = require('body-parser');
var mongoose =  require('mongoose');

var paramRouter = express.Router();
const ObjectId = require("mongodb").ObjectID;


var ParReg = require('../modules/parameter')
paramRouter.use(bodyParser.json())

//Creating endpoint for /companies
paramRouter.route('/')
.get((req,res) => {
    ParReg.find({})
    .then((param) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(param);
    })
    .catch((err) => {
        res.send(err)
    });
})
.post((req, res) => {
    ParReg.create(req.body)
    .then((param) => {
        console.log('Asset Registered', param);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(param);
    })
    .catch((err) => {
        res.statusCode = 500;
        resjson({ message : "Asset not Registered"})
    });
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /param');
})
.delete((req, res) => {
    ParReg.remove({})
    .then((resp) => {
        res.json({ message: 'Assets details deleted' });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => {
        res.statusCode = 500;
        resjson({ message : "Assets not deleted"})
    });
});

//creating endpoint for /companies/companyId
paramRouter.route('/:id')
.get((req,res) => {
    var _id =  new ObjectId(req.params.id);
    ParReg.findById(_id)
    .then((param) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(param);
    })
    .catch((err) => {
        res.send({ message: 'Cannot find the param'})
    })
})
.post((req, res) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /param/'+ _id);
})
.put((req, res) => {
    var _id =  new ObjectId(req.params.id);
    ParReg.findByIdAndUpdate(_id, {
        $set: req.body
    }, {new: true})
    .then((param) => {
        console.log('Edited param', param)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(param);
    })
    .catch((err) => {
        res.send({message: 'Cannot edit param'})
    });
})
.delete((req, res) => {
    var _id =  new ObjectId(req.params.id);
    ParReg.findByIdAndRemove(_id)
    .then((resp) => {
        res.json({ message: 'Asset details deleted' });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => {
        res.send({message: 'Asset details not deleted'})
    });
});


module.exports = paramRouter