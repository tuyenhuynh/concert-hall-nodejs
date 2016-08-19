var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy; 

var FacebookStrategy = require('passport-facebook').Strategy; 

var facebookConfig = {
    clientID:'1162938010411809' , 
    clientSecret: '470cdb14c488ce3314aa1224bf2e77f1', 
    callbackURL: 'http://locahost:3000/facebook/callback'
};

var localRegisterInit = function(req, email, password, callback) {
    User.findOne({"email": email}, function(err, user) {
        if(err) {
            return callback(err); 
        }
        if(user) {
            return callback(null, false); 
        }
        var user = new User(); 
        user.name = req.params.email; 
        user.email = email; 
        user.password = user.hashPassword(password); 
        
        user.save(function(err) {
            if(err) {
                throw err; 
            }
            return callback(null, user); 
        }); 
    }); 
}; 

var localLoginInit = function(req, email, password, callback) {
    User.findOne({'email': email}, function(err, user) {
        if(err) {
            return callback(err); 
        }
        if(!user || user.validatePassword(password)) {
            return callback(err); 
        }
        
        return callback(null, user); 
    }); 
    
}; 

var localOptions = {
    usernameField: 'email', 
    passReqToCallback: true
};

var facebookInit = function(token, refreshToken, profile, callback) {
    User.findOne({'facebook.id': profile.id}, function(err, user) {
         if(err) {
             return callback(err); 
         }
    }); 
    
    if(user) {
        return callback(null, user); 
    }
    
    var user = new User(); 
    user.facebook.id = profile.id; 
    user.facebook.token = token; 
    user.facebook.email = profiles.emails[0].value;
    
    user.save(function(err) {
        if(err) {
            throw err; 
        }
        
        return callback(null, user); 
    });   
};

passport.use('local-register', new LocalStrategy(localOptions, localRegisterInit));
passport.use('local-login', new LocalStrategy(localOptions, localLoginInit));
passport.use(new FacebookStrategy(facebookConfig, facebookInit)); 

passport.serializeUser(function(user, callback) {
    callback(null, user.id); 
}); 

passport.deserializeUser(function(id, callback){
    User.findById(id, function(err, user) {
        callback(err, user); 
    }); 
});

module.exports =  {
   localRegister: passport.authenticate('local-register', {
       successRedirect:"/", 
       failureRedirect:"/register"
   }), 
    localLogin: passport.authenticate('local-login', {
        successRedirect:"/", 
        failureRedirect:"/login"
    }), 
    facebookLogin: passport.authenticate('facebook', {scope:'email'}), 

    facebookCallback: passport.authenticate('facebook', {
        successRedirect:"/profile", 
        failureRedirect:"/  "
    })
}; 
