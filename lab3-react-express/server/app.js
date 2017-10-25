require('dotenv').config({
    path: `${__dirname}/.env`
})
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect(process.env.DB_HOST, { useMongoClient: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;

var rootRoutes = require('./routes/index');
var userRoutes = require('./routes/user');

// Init app
var app = express();

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
});

app.use(cookieParser());

// Express Session
app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: true
}));

app.use(flash());

// Configuring Passport
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/', rootRoutes);
app.use('/user', userRoutes)

// Set Port
app.set('port', (process.env.PORT || 3001));

app.listen(app.get('port'), function () {
    console.log('Server started on port ' + app.get('port'));
})