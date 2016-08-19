var express = require('express');
var Information = require('../models/information'); 
var Office = require('../models/office'); 
var Feedback = require('../models/feedback'); 
var User = require('../models/user'); 
var router = express.Router();
var basicAuth = require('../auth/basic');

module.exports  = router; 

router.use(basicAuth.isAuthenticated); 

router.get('/', function(req, res) {
    Information.find({}).exec(function(err, information){
        if(err) {
            res.send('Error'); 
        }else{
            //res.send(information); 
            information = information[0];
            Office.find({}).exec(function(err, offices){
                if(err) {
                    res.send('Error');
                }else { 
                    res.render('admin/index.jade', {title: "Admin Panel", information, offices});   
                }
            });
        }
    }); 
}); 

router.post('/update_about', function(req, res){
    
}); 

router.post('/update_phone_number', function(req, res) {
    //ajax update phone number
});

router.post('/update_default_purchase_code', function(req, res) {
    //ajax update default purchase code
}); 

router.post('/update_company_info', function(req, res) {
    //
}); 

router.post('/update_hall_schema', function(req, res){
    
}); 

router.post('/update_hall_text', function(req, res) {
    
}); 

router.post('/update_ceo_text', function(req, res) {
    //
}); 

router.post('/update_social_network_link', function(req, res) {
    
}); 
