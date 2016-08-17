var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var Concert  = new Schema({
    name: String, 
    description: String, 
    date_time: Date, 
    audio_path: String, 
    photo_path: String, 
    purchase_code: String, 
    is_active: {
        type: Boolean,
        default: true
    }, 
    lim_age: Number
}); 

module.exports = mongoose.model('Concert', Concert); 


