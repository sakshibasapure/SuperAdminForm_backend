var express = require('express');
var bodyParser = require('body-parser');
var mongoose =  require('mongoose');

var Companies = require('../modules/company');
var Assets = require('../modules/companyasset')
var Assettypes = require('../modules/assettype');
var Registers = require('../modules/register')
var Tariffs=require('../modules/tariff')

var join3Router = express.Router();

join3Router.use(bodyParser.json())

join3Router.route('/')
.get((req,res) => {
    Registers.aggregate([
        [{
          $lookup:
            {
              from: "parameters",
              localField: "paramname",
              foreignField: "paramname",
              as: "ParameterDetails"
            }
        },
        {    
           $unwind:"$ParameterDetails" 
        },
        {
            $project: {
              regadress: 1,
              paramname : 1, 
              regdescr: 1
            }
        }
        ]
     ]).exec((err, results) => {
        if (err) throw err;

        console.log(results)
        res.send(results);

     })
})


join3Router.route('/:regdescr')
.get(function(req, res){
  var name = req.params.regdescr;

  var query = [{
                $lookup:
                  {
                    from: "parameters",
                    localField: "paramname",
                    foreignField: "paramname",
                    as: "ParameterDetails"
                  }
                },
                {    
                  $unwind:"$ParameterDetails" 
                },
                { 
                  $match : { 'regdescr' : name } 
                },
                {
                  $project: {
                    regadress: 1,
                    paramname : 1, 
                    regdescr: 1,
                }
                }
              ]
  Registers.aggregate(query).exec((err, results) => {
    if (err) throw err;

    console.log(results)
    res.send(results);
 })
})


module.exports = join3Router
