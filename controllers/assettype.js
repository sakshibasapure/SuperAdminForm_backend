// Load required packages
var AssetType = require('../modules/assettype')


// Create endpoint /assettype for POSTS
exports.postAssetType = function(req,res){

    // Create a new instance of the AssetType model
    var AssetTypeData = req.body;

    var assettype = new AssetType(AssetTypeData)
    // Save the assettype and check for errors
    assettype.save(function(err){
        if(err){
            res.status(500).json({ message : "Asset Type not Registered"})
        }
        else{
            res.json({ message : "Asset Type Registered"})
            console.log(AssetTypeData)
        }
    })
}


// Create endpoint /assettype for GET
exports.getAssetType = function(req,res){
    // Use the AssetType model to find all assettypes
    AssetType.find(function(err, assettypes) {
        if (err)
          res.send(err);
    
        res.json(assettypes);
    })
}