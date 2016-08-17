var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var Office = new Schema({
    name: String, 
    address: String, 
    time_open: String, 
    time_close: String, 
    is_active: {
        type: Boolean, 
        default: true        
    }, 
    latitude: Number, 
    longitude: Number
}); 

module.exports = mongoose.model('Office', Office); 