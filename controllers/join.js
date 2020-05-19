var express = require('express');
var bodyParser = require('body-parser');
var mongoose =  require('mongoose');

//var Companies = require('../modules/company');
var Assets = require('../modules/companyasset')
//var Assettypes = require('../modules/assettype');

var joinRouter = express.Router();

joinRouter.use(bodyParser.json())

joinRouter.route('/')
.get((req,res) => {
    Assets.aggregate([
        [{
          $lookup:
            {
              from: "assettypes",
              localField: "assettypename",
              foreignField: "Assettypename",
              as: "AssetTypeDetails"
            }
        },
        {    
           $unwind:"$AssetTypeDetails" 
        },
        {
            $lookup:
              {
                from: "companies",
                localField: "companyName",
                foreignField: "companyname",
                as: "CompanyDetails"
              }
          },
          {    
             $unwind:"$CompanyDetails" 
          }
        ]
     ]).exec((err, results) => {
        if (err) throw err;

        console.log(results)
        res.send(results);

     })
})


joinRouter.route('/:companyName')
.get(function(req, res){
  var name = req.params.companyName;

  var query = [{
                $lookup:
                  {
                    from: "companies",
                    localField: "companyName",
                    foreignField: "companyname",
                    as: "CompanyDetails"
                  }
                },
                {    
                  $unwind:"$CompanyDetails" 
                },
                { 
                  $match : { 'companyName' : name } 
                },
                {
                  $project: {
                    assetname: 1,
                    assetdesc: 1,
                    assettypename: 1
                  }
                }
              ]
  Assets.aggregate(query).exec((err, results) => {
    if (err) throw err;

    console.log(results)
    res.send(results);
 })
})


module.exports = joinRouter


