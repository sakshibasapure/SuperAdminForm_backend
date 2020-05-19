var express = require('express');
var bodyParser = require('body-parser');
var mongoose =  require('mongoose');

var companyRouter = express.Router();


var Companies = require('../modules/company')
//var Assets = require('../modules/companyasset')
companyRouter.use(bodyParser.json())

//Creating endpoint for /companies
companyRouter.route('/')
.get((req,res) => {
    Companies.find({})
    .then((companies) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(companies);
    })
    .catch((err) => {
        res.send(err)
    });
})
.post((req, res) => {
    Companies.create(req.body)
    .then((company) => {
        console.log('Company Registered', company);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(company);
    })
    .catch((err) => {
        res.statusCode = 500;
        resjson({ message : "Company not Registered"})
    });
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /comanpanies');
})
.delete((req, res) => {
    Companies.remove({})
    .then((resp) => {
        res.json({ message: 'Companies details deleted' });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => {
        res.statusCode = 500;
        res.json({ message : "Companies not deleted"})
    });
});

//creating endpoint for /companies/companyId
companyRouter.route('/:companyId')
.get((req,res) => {
    Companies.findById(req.params.companyId)
    .then((company) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(company);
    })
    .catch((err) => {
        res.send({ message: 'Cannot find the company'})
    })
})
.post((req, res) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /company/'+ req.params.companyId);
})
.put((req, res) => {
    Companies.findByIdAndUpdate(req.params.companyId, {
        $set: req.body
    }, {new: true})
    .then((company) => {
        console.log('Edited company', company)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(company);
    })
    .catch((err) => {
        res.send({message: 'Cannot edit company'})
    });
})
.delete((req, res) => {
    Companies.findByIdAndRemove(req.params.companyId)
    .then((resp) => {
        res.json({ message: 'Company details deleted'});
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
        //Assets.remove({})
        
    })
    .catch((err) => {
        res.send({message: 'Company details not deleted'})
    });
    
});



module.exports = companyRouter