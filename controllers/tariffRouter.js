const express = require('express');
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');

const tariffRouter = express.Router();

const Tariffs = require('../modules/tariff')
tariffRouter.use(bodyParser.json())

//Creating endpoint for /companies
tariffRouter.route('/')
.get((req,res) => {
    Tariffs.find({})
    .then((tariffs) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(tariffs);
    })
    .catch((err) => {
        res.send(err)
        
    });
})
.post((req, res) => {
    Tariffs.create(req.body)
    .then((tariff) => {
        console.log('Tariff Registered', tariff);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(tariff);
    })
    .catch((err) => {
        res.statusCode = 500;
        res.json({ message : "Tariff scheme not Registered"})
    });
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /tariff');
})
.delete((req, res) => {
    Tariffs.remove({})
    .then((resp) => {
        res.json({ message: 'Tariff schemes details deleted' });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => {
        res.statusCode = 500;
        res.json({ message : "Tariff schemes not deleted"})
    });
});

//creating endpoint for /companies/companyId
tariffRouter.route('/:tariffid')
.get((req,res) => {
    Tariffs.findById(req.params.tariffid)
    .then((tariff) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(tariff);
    })
    .catch((err) => {
        res.send({ message: 'Cannot find tariff scheme'})
    })
})
.post((req, res) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /tariff/'+ req.params.tariffid);
})
.put((req, res) => {
    Tariffs.findByIdAndUpdate(req.params.tariffid, {
        $set: req.body
    }, {new: true})
    .then((tariff) => {
        console.log('Edited company', tariff)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(tariff);
    })
    .catch((err) => {
        res.send({message: 'Cannot edit tariff scheme'})
    });
})
.delete((req, res) => {
    Tariffs.findByIdAndRemove(req.params.tariffid)
    .then((resp) => {
        res.json({ message: 'Tariff scheme details deleted' });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => {
        res.send({message: 'Tariff Scheme details not deleted'})
    });
    
});


module.exports = tariffRouter
