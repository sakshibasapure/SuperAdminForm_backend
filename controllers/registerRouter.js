var express = require('express');
var bodyParser = require('body-parser');
var mongoose =  require('mongoose');

var registerRouter = express.Router();

var Registers = require('../modules/register')
registerRouter.use(bodyParser.json())

//Creating endpoint for /companies
registerRouter.route('/')
.get((req,res) => {
    Registers.find({})
    .then((registers) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(registers);
    })
    .catch((err) => {
        res.send(err)
    });
})
.post((req, res) => {
    Registers.create(req.body)
    .then((register) => {
        console.log('Register Registered', register);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(register);
    })
    .catch((err) => {
        res.statusCode = 500;
        res.json({ message : "Register not Registered"})
    });
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /registers');
})
.delete((req, res) => {
    Registers.remove({})
    .then((resp) => {
        res.json({ message: 'Registers details deleted' });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => {
        res.statusCode = 500;
        res.json({ message : "Registers not deleted"})
    });
});

//creating endpoint for /companies/companyId
registerRouter.route('/:regid')
.get((req,res) => {
    Registers.findById(req.params.regId)
    .then((register) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(register);
    })
    .catch((err) => {
        res.send({ message: 'Cannot find register'})
    })
})
.post((req, res) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /register/'+ req.params.regId);
})
.put((req, res) => {
    Registers.findByIdAndUpdate(req.params.regId, {
        $set: req.body
    }, {new: true})
    .then((register) => {
        console.log('Edited register', register)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(register);
    })
    .catch((err) => {
        res.send({message: 'Cannot edit register'})
    });
})
.delete((req, res) => {
    Registers.findByIdAndRemove(req.params.regId)
    .then((resp) => {
        res.json({ message: 'Register details deleted' });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => {
        res.send({message: 'Register details not deleted'})
    });
    
});


module.exports = registerRouter