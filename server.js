
//import dependencies module
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var parseurl = require('parseurl');
var path = require('path');

const app = express();

//configure HTTP pipeline

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//session middleware
var sessionOptions = {
    secret: 'secret',
    resave: true,   
    saveUninitialized: false
};
app.use(session(sessionOptions));

//configure intercepror for all session management
app.use(function (req, res, next) {
    if (!req.session.views) {
        req.session.views = {};
        req.session.views.shoppingCart = [];
    }
    var pathname = parseurl(req).pathname;
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;
    next();
});

//configure static file server
var staticFolder = express.static(path.join(__dirname, 'public'));
app.use(staticFolder);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8000);
console.log('Server is running at http://localhost:8000');

