var express = require('express');
var bodyParser = require('body-parser');
var mongoose =  require('mongoose');

var assetRouter = express.Router();

var Assets = require('../modules/companyasset')
assetRouter.use(bodyParser.json())

//Creating endpoint for /companies
assetRouter.route('/')
.get((req,res) => {
    Assets.find({})
    .then((assets) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(assets);
    })
    .catch((err) => {
        res.send(err)
    });
})
.post((req, res) => {
    Assets.create(req.body)
    .then((asset) => {
        console.log('Asset Registered', asset);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(asset);
    })
    .catch((err) => {
        res.statusCode = 500;
        resjson({ message : "Asset not Registered"})
    });
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /assets');
})
.delete((req, res) => {
    Assets.remove({})
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
assetRouter.route('/:assetId')
.get((req,res) => {
    Assets.findById(req.params.assetId)
    .then((asset) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(asset);
    })
    .catch((err) => {
        res.send({ message: 'Cannot find the asset'})
    })
})
.post((req, res) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /asset/'+ req.params.assetId);
})
.put((req, res) => {
    Assets.findByIdAndUpdate(req.params.assetId, {
        $set: req.body
    }, {new: true})
    .then((asset) => {
        console.log('Edited asset', asset)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(asset);
    })
    .catch((err) => {
        res.send({message: 'Cannot edit asset'})
    });
})
.delete((req, res) => {
    Assets.findByIdAndRemove(req.params.assetId)
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


module.exports = assetRouter