db.users.insert({
    name: 'admin', 
    email: 'admin@gmail.com', 
    password: 'password', 
    is_active: true, 
    role_id: 1
}); 

db.offices.insert({
    name: 'Soviet Street 35', 
    address: 'Soviet Street, 35', 
    time_open: '08:30',
    time_close: '20:00', 
    is_active: true, 
    latitude: 45.342000, 
    longtitude: 47.244350
}); 

db.feedbacks.insert({
    username:'arthur', 
    email: 'arthurhuynh@gmail.com', 
    content: 'Testing message', 
    created_at: Date.now
}); 

db.information.insert({
    phone_number: '+79377096252', 
    company_info: 'Kassir.ru', 
    hall_schema: 'http://link_to_hall_schema', 
    hall_text: 'Hall text', 
    seo_text: 'Seo text', 
    default_purchase_code: 'volgocirk.ru', 
    facebook_url: 'http://facebook.com', 
    instagram_url: 'http://instagram.com', 
    vk_url: 'http://vk.com', 
    twitter_url: 'http://twitter.com/tuyenhm93'
}); 
