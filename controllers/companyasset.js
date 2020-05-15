// Load required packages
var CompanyAsset = require('../modules/companyasset')


// Create endpoint /companyasset for POSTS
exports.postCompanyAsset = function(req,res){

    // Create a new instance of the CompanyAsset model
    var CompanyAssetData = req.body;

    var companyasset = new CompanyAsset(CompanyAssetData)
    // Save the assettype and check for errors
    companyasset.save(function(err){
        if(err){
            res.status(500).json({ message : "Company Asset not Registered"})
        }
        else{
            
            res.status(200).json({ message : "Company Asset Registered"})
            console.log(CompanyAssetData)
        }
    })
}


// Create endpoint /companyasset for GET
exports.getCompanyAsset = function(req,res){
    // Use the CompanyAsset model to find all assets
    CompanyAsset.find(function(err, companyassets) {
        if (err)
          res.send(err);
    
        res.json(companyassets);
    })
}

