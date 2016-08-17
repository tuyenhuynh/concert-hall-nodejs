var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var Information = new Schema({
    phone_number: String, 
    company_info: String, 
    hall_schema: String, 
    hall_text: String, 
    seo_text: String, 
    default_purchase_code: String, 
    facebook_url: String, 
    instagram_url: String, 
    vk_url: String, 
    twitter_url: String
}); 

module.exports = mongoose.model('Information', Information); 