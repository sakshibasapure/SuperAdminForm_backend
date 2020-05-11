// Load required packages
var Company = require('../modules/company')

// Create endpoint /company for POSTS
exports.postCompany = function(req,res){
    var CompanyData = req.body;

    // Create a new instance of the Company model
    var comp = new Company(CompanyData)
    comp.save(function(err){
        if(err){
            res.status(500).json({ message : "Company not Registered"})
        }
        else{
            res.json({ message : "Company Registered"})
            console.log(CompanyData)
        }
    })
        
}

// Create endpoint /company for GET
exports.getCompany = function(req,res){
    // Use the Company model to find all companies
    Company.find(function(err, companies) {
        if (err)
          res.send(err);
    
        res.json(companies);
    })
}
