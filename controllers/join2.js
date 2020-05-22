var express = require('express');
var bodyParser = require('body-parser');
var mongoose =  require('mongoose');

var Companies = require('../modules/company');
var Assets = require('../modules/companyasset')
var Assettypes = require('../modules/assettype');
var Registers = require('../modules/register')
var Tariffs=require('../modules/tariff')

var join2Router = express.Router();

join2Router.use(bodyParser.json())

join2Router.route('/')
.get((req,res) => {
    Registers.aggregate([
        [{
          $lookup:
            {
              from: "assettypes",
              localField: "Assettypename",
              foreignField: "Assettypename",
              as: "AssetTypeDetails"
            }
        }
        ]
     ]).exec((err, results) => {
        if (err) throw err;

        console.log(results)
        res.send(results);

     })
})

join2Router.route('/:Assettypename')
.get(function(req, res){
  var name = req.params.Assettypename;

  var query = [{
                $lookup:
                  {
                    from: "assettypes",
                    localField: "Assettypename",
                    foreignField: "Assettypename",
                    as: "AssetTypeDetails"
                  }
                },
                {    
                  $unwind:"$AssetTypeDetails" 
                },
                { 
                  $match : { 'Assettypename' : name } 
                },
                {
                  $project: {
                    regadress: 1,
                    regdescr:  1,
                    regfreq: 1,
                    assettypeID: 1,
                    Assettypename: 1,
                    paramname: 1
                  }
                }
              ]
  Registers.aggregate(query).exec((err, results) => {
    if (err) throw err;

    console.log(results)
    res.send(results);
 })
})



module.exports = join2Router
