var express = require("express");
var mongoose  = require('mongoose'); 
var bodyParser = require('body-parser'); 

var adminRouter  = require('./routers/admin'); 
var adminUsersRouter  = require('./routers/admin_users');
var adminOfficesRouter = require('./routers/admin_offices'); 
var adminFeedbacksRouter = require('./routers/admin_feedbacks'); 
var adminConcertsRouter = require('./routers/admin_concerts'); 

var app  = express(); 
var port = process.env.PORT || 3000; 

var mongoUrl = 	'mongodb://localhost:27017/concert-hall'; 
var secret_key = '12345-67890-67890-12345'; 

mongoose.connect(mongoUrl);

var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('Connected to mongo server.'); 
}); 

app.use(express.static('public'));
app.set('views', './views' );
app.set('view engine', 'jade'); 
app.use(bodyParser.urlencoded({extended:true})); 


app.use('/admin/users', adminUsersRouter);
app.use('/admin/offices', adminOfficesRouter);
app.use('/admin/feedbacks', adminFeedbacksRouter); 
app.use("/admin", adminRouter); 

app.get('/', function(req, res) {
    res.render('app/index.jade', {title:"Central Concert Hall"});  
});

app.get('/index', function(req, res){
    res.redirect('/'); 
}); 

app.post('/ajax-get-concert-by-date', function(req, res) {
    
});

app.get('/contact', function(req, res) {
    res.render('app/contact.jade', {title: "Contact"}); 
}); 

app.get('/hall', function(req, res) {
    res.render('app/hall.jade', {title: "Hall"}); 
}); 

app.get('/afisha', function(req, res) {
    res.render('app/posters.jade', {title: "Posters"}); 
}); 

app.get('/afisha/:concert_name/:datetime', function(req, res) {
    res.render('app/concert.jade', {title: "Concert"}); 
}); 

app.get('/biletnye_kassy', function(req, res) {
    res.render('app/offices.jade', {title: "Offices"}); 
}); 

app.post('ajax_post_feedback', function(req, res) {
    
}); 

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


app.listen(port, function(err) {
    console.log('Server is running on port %d ', port); 
}); 