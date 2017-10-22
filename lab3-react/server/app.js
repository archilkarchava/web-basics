var express = require('express');
var path = require('path');
var router = express.Router();
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var dbConfig = require('./db');
mongoose.connect(dbConfig.url, { useMongoClient: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;

var routes = require('./routes/dashboard');
var users = require('./routes/users');

var User = require('./models/user');

// Init app
var app = express();

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
});

// Express Session
app.use(session({
    secret: 'My secret',
    saveUninitialized: true,
    resave: true
}));

// Configuring Passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
   
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };  
    }
}));

app.use('/', routes);
app.use('/users', users);

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(bodyParser.json());

app.post("/api/register", function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var phone = req.body.phone;

    var errors = req.validationErrors();

    if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
            username: username,
            password: password,
			email:email,
			phone: phone,
			
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});


	}

    res.status(200).send({
        message: 'Успех!'
    });
    console.log("Post Received: %s %s %s %s", username, password, email, phone);
});

passport.use(
    new LocalStrategy(
        function(username, password, done) {
            User.getUserByUsername(username, function(err, user){
                if(err) throw err;
                if(!user){
                    return done(null, false, {message: 'Unknown User'});
                }

                User.comparePassword(password, user.password, function(err, isMatch){
                    if(err) throw err;
                    if(isMatch){
                        return done(null, user);
                    } else {
                        return done(null, false, {message: 'Invalid password'});
                    }
                });
            });
        }
    )
);
  
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});
  
router.post('/login',
    passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
    function(req, res) {
    res.redirect('/');
    }
);
  
router.get('/logout', function(req, res){
    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/users/login');
});

// Set Port
app.set('port', (process.env.PORT || 3001));

app.listen(app.get('port'), function(){
    console.log('Server started on port '+app.get('port'));
})