var mongoose = require('mongoose');
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
    }
}); 

module.exports = mongoose.model('User', User); 