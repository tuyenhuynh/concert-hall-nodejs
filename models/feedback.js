var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
var passportLocalMongoose = require('passport-local-mongoose');

var Feedback = new Schema({
    username: String,
    email: String, 
    content: String,
    created_at: Date
    
}); 

module.exports = mongoose.model('Feedback', Feedback); 