var express = require('express'); 
var router = express.Router(); 
var Office = require('../models/office');

module.exports = router; 

router.get('/', function(req, res) {
    Office.find({}).exec(function(err, offices) {
        if(err) {
            console.log("Error: " + JSON.stringify(err)); 
        }else {
            res.render('../views/admin/offices/index.jade', {title: 'Offices', offices}); 
        }
    }); 
}); 

router.post('/:id',function(req, res) {
    var id = req.params.id; 
    Office.findOneAndRemove({_id: id}, function(err, result) {
        if(err) {
            console.log(err); 
        }else {
            console.log('Remove record with id ' + id); 
        }
    }); 
}); 

router.route('/add')
.get(function(req, res){
    res.render('../views/admin/offices/create.jade', {title: 'Add new user'});
})
.post(function(req, res) {
    var body = req.body; 
    var office = new Office(
        { name: body.name, 
         address: body.address, 
         time_open: body.time_open, 
         time_close: body.time_close, 
         latitude: body.latitude, 
         longitude: body.longtitude});
    
    office.save(function(err, result) {
        if(err) {
            console.log(err); 
        }else  {
            console.log(result); 
        }
        res.redirect(req.baseUrl); 
    }); 
}); 

router.route('/:id/edit')
.get(function(req, res) {
    var id = req.params.id;
    Office.find({_id: id})
    .exec(function(err, offices){
        if(err) {
            res.send('Error: ' + JSON.stringify(err));     
        }else {
            var office = offices[0]; 
            res.render('../views/admin/offices/edit.jade', {title: 'Edit office', office});   
        }                                      
    }); 
})
.post(function(req, res) {
    var id = req.params.id; 
    var body = req.body; 
    console.log(body); 
    Office.findOneAndUpdate(
        {_id:id}, 
        { new: true}, 
        {   name: body.name, 
            address: body.address, 
            time_open: body.time_open, 
            time_close: body.time_close, 
            latitude: body.lattitude, 
            longtitude: body.longtitude
        }, 
        function(err, office) {
            if(err) {
                console.log('Record not foud, ' +id); 
            }else {
                console.log(office); 
            }
            res.redirect(req.baseUrl + "/");         
        });
    }); 

router.post('/:id', function(req, res) {
    User.findOneAndRemove({_id: req.params.id}, function(err, result) {
        if(err) {
            console.log('Record not found, ' + req.params.id);             
        }else {
            consolel.log('Record deleted '  + req.params.id);
        }
        res.redirect(req.baseUrl + '/'); 
    }); 
}); 
