var express = require('express');
var bodyParser = require('body-parser');
var mongoose =  require('mongoose');

var assettypeRouter = express.Router();

var Assettypes = require('../modules/assettype')
assettypeRouter.use(bodyParser.json())

//Creating endpoint for /companies
assettypeRouter.route('/')
.get((req,res) => {
    Assettypes.find({})
    .then((assettypes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(assettypes);
    })
    .catch((err) => {
        res.send(err)
    });
})
.post((req, res) => {
    Assettypes.create(req.body)
    .then((assettype) => {
        console.log('Asset Registered', assettype);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(assettype);
    })
    .catch((err) => {
        res.statusCode = 500;
        resjson({ message : "Asset type not Registered"})
    });
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /assets');
})
.delete((req, res) => {
    Assettypes.remove({})
    .then((resp) => {
        res.json({ message: 'Asset types details deleted' });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => {
        res.statusCode = 500;
        resjson({ message : "Asset types not deleted"})
    });
});

//creating endpoint for /companies/companyId
assettypeRouter.route('/:assettypeId')
.get((req,res) => {
    Assettypes.findById(req.params.assettypeId)
    .then((assettype) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(assettype);
    })
    .catch((err) => {
        res.send({ message: 'Cannot find the asset type'})
    })
})
.post((req, res) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /asset type/'+ req.params.assettypeId);
})
.put((req, res) => {
    Assettypes.findByIdAndUpdate(req.params.assettypeId, {
        $set: req.body
    }, {new: true})
    .then((assettype) => {
        console.log('Edited asset type', assettype)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(assettype);
    })
    .catch((err) => {
        res.send({message: 'Cannot edit asset type'})
    });
})
.delete((req, res) => {
    Assettypes.findByIdAndRemove(req.params.assettypeId)
    .then((resp) => {
        res.json({ message: 'Asset type details deleted' });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => {
        res.send({message: 'Asset type details not deleted'})
    });
});


module.exports = assettypeRouter