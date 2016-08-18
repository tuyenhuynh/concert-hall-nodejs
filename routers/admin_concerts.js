var express = require('express'); 
var router = express.Router(); 
var Concert = require('../models/concert');

module.exports = router;

router.get('/', function(req, res) {
    Concert.find({}).exec(function(err, feedbacks) {
        if(err) {
            res.send(err); 
        }else {
            res.render('../views/admin/concerts/index.jade', {title: 'Concerts', feedbacks}); 
        }
    }); 
}); 

router.route('/:id')
.get(function(req, res) {
    var id = req.params.id; 
    Concert.find({_id: id}).exec(function(err, feedbacks) {
        if(err) {
            console.log('Concert not found ', id);  
            res.redirect(req.baseUrl + '/'); 
        }else {
            var feedback = feedbacks[0]; 
            res.render('../views/admin/concerts/show.jade', {title: 'Concert', concert}); 
        }
    });   
}).post(function(req, res) {
    //remove feedback
    var id = req.params.id; 
    Concert.findOneAndRemove({_id: id}, function(err, result) {
        if(err) {
            console.log(err); 
        }else {
            console.log("Removed record with id "  + id); 
        }
        res.redirect(req.baseUrl + "/");         
    }); 
}); 

router.route('/add')
.get(function(req, res){
    res.render('../views/admin/concerts/create.jade', {title: 'Add new concert'});
})
.post(function(req, res) {
    var body = req.body; 
    var audio_path = ''; 
    var photo_path = ''; 
    var concert = new Concert({ 
         name: body.name, 
         description: body.description, 
         date_time: body.time_open, 
         audio_path: audio_path, 
         photo_path: photo_path, 
         purchase_code: body.purchase_code, 
         is_active: body.is_active==1?true:false, 
         lime_age: body.lim_age});
    
    
    concert.save(function(err, result) {
        if(err) {
            console.log(err); 
        }else  {
            console.log(result); 
        }
        res.redirect(req.baseUrl +'/'); 
    }); 
}); 

router.route('/:id/edit')
.get(function(req, res) {
    var id = req.params.id;
    Concert.find({_id: id})
    .exec(function(err, offices){
        if(err) {
            res.send('Error: ' + JSON.stringify(err));     
        }else {
            var concert = concerts[0]; 
            res.render('../views/admin/concerts/edit.jade', {title: 'Edit concert', concert});   
        }                                      
    }); 
})
.post(function(req, res) {
    var id = req.params.id; 
    var body = req.body;
    var audio_path="";
    var photo_path=""; 
    Concert.findOneAndUpdate(
        {_id:id},{ new: true}, 
        {   
             name: body.name, 
             description: body.description, 
             date_time: body.time_open, 
             audio_path: audio_path, 
             photo_path: photo_path, 
             purchase_code: body.purchase_code, 
             is_active: body.is_active==1?true:false, 
             lime_age: body.lim_age});
        }, 
        function(err, concert) {
            if(err) {
                console.log('Record not foud, ' +id); 
            }else {
                console.log(office); 
            }
            res.redirect(req.baseUrl + "/");         
        });
    }); 

