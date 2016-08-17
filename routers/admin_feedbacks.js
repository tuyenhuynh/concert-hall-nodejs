var express = require('express'); 
var router = express.Router(); 
var Feedback = require('../models/feedback');

module.exports = router; 

router.get('/', function(req, res) {
    Feedback.find({}).exec(function(err, feedbacks) {
        if(err) {
            res.send(err); 
        }else {
            res.render('../views/admin/feedbacks/index.jade', {title: 'User Feedback', feedbacks}); 
        }
    }); 
}); 

router.route('/:id')
.get(function(req, res) {
    var id = req.params.id; 
    Feedback.find({_id: id}).exec(function(err, feedbacks) {
        if(err) {
            console.log('Feed back not found ', id);  
            res.redirect(req.baseUrl + '/'); 
        }else {
            var feedback = feedbacks[0]; 
            res.render('../views/admin/feedbacks/show.jade', {title: 'Feedback', feedback}); 
        }
    });   
}).post(function(req, res) {
    //remove feedback
    var id = req.params.id; 
    Feedback.findOneAndRemove({_id: id}, function(err, result) {
        if(err) {
            console.log(err); 
        }else {
            console.log("Removed record with id "  + id); 
        }
        res.redirect(req.baseUrl + "/");         
    }); 
}); 