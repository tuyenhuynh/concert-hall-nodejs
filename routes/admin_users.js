var express = require('express'); 
var router = express.Router(); 
var User = require('../models/user');

module.exports = router; 

router.get('/', function(req, res){
    User.find({}).exec(function(err, users) {
        res.render('../views/admin/users/index.jade', {title: "Users Management", users}); 
    }); 
});

router.route('/add')
.get(function(req, res){
    res.render('../views/admin/users/create.jade', {title: 'Add new user'});
})
.post(function(req, res) {
    var body = req.body; 
    console.log(body); 
    var user = new User({name: body.name, 
              email: body.email, 
              password: body.password, 
              is_active: body.is_active==1?true:false, 
              role_id: body.role_id});
    user.save(function(err, result){
        if(err) {
            console.log("Error: " + JSON.stringify(err)); 
        }else {
            res.redirect(req.baseUrl + '/');
        }
    });  
});  

router.route('/:id/edit')
.get(function(req, res) {
        var id = req.params.id;
        User.find({_id: id}).exec(function(err, users) {
            if(err) {
                res.send('Error'); 
            }else {
                var user = users[0]
                res.render('../views/admin/users/edit.jade', {title: 'Edit user', user}); 
            } 
        });   
})
.post(function(req, res) {
    var body = req.body; 
    var id = req.params.id; 
    console.log(body);
    User.findOneAndUpdate(
        {_id: id}, 
        
        {name: body.name, email: body.email, password: body.password, role_id: body.role_id, is_active:body.is_active==1?true:false}, 
        {new: true}, 
        function(err, result){
            if(err) {
                console.log("Error " + JSON.stringify(err)); 
            }
            else {
                console.log("Result "  + JSON.stringify(result));   
            } 
        }); 
}); 

var setActive = function(id, isActive){
    User.findOneAndUpdate({_id: id}, {is_active: isActive}, {new: true}, function(err, result) {
        if(err) {
            console.log("Error: " + JSON.stringify(err)); 
        }else  {
            console.log('Updated record: ' + JSON.stringify(result)); 
        }
    }); 
};

router.get('/:id/activate', function(req, res) {
    var id = req.params.id; 
    setActive(id, true); 
}); 

router.get('/:id/deactivate', function(req, res) {
    var id = req.params.id; 
    setActive(id, false); 
}); 
