var mongoose = require('mongoose');
var bcrypt = require('bcrypt'); 
var Schema = mongoose.Schema; 
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    name: String, 
    email: String, 
    password: String, 
    remember_token: String, 
    is_active: {
        type: Boolean, 
        default: true
    }, 
    role_id:{
        type: Number, 
        default: 1
    }, 
    facebook: {
        id: String, 
        token: String, 
        email: String
    }
}); 

User.methods.hashPassword = function(password) {
     return bcrypt.hashSync(password, bcrypt.genSaltSync()); 
}; 

User.methods.validatePassword = function(password) {
    return bcrypte.compareSync(password, this.password);
}; 

module.exports = mongoose.model('User', User); 