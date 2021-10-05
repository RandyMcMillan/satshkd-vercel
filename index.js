/**
 * Module dependencies.
 * source origin: https://github.com/expressjs/express/tree/master/examples/static-files
 */

var express = require("express");
var logger = require('morgan');
var path = require('path');
var app = express();
const port = 3000;

//const product = require("./api/product");
//app.use("/api/product", product);

const handlebars = require('express-handlebars');
const zhcnjson = require('./locales/zh-cn.json');
const zhhkjson = require('./locales/zh-hk.json');
const enjson = require('./locales/en.json');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views')

app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'main',
    extname: 'hbs',
}));

//Serves static files (we need it to import a css file)
app.use(express.static('public'))

// log requests
app.use(logger('dev'));

// express on its own has no notion
// of a "file". The express.static()
// middleware checks for a file matching
// the `req.path` within the directory
// that you pass it. In this case "GET /js/app.js"
// will look for "./public/js/app.js".

app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'views')));
//app.use(express.static(path.join(__dirname, 'views/layouts')));


// if you wanted to "prefix" you may use
// the mounting feature of Connect, for example
// "GET /static/js/app.js" instead of "GET /js/app.js".
// The mount-path "/static" is simply removed before
// passing control to the express.static() middleware,
// thus it serves the file correctly by ignoring "/static"
app.use('/static', express.static(path.join(__dirname, 'public')));

// if for some reason you want to serve files from
// several directories, you can use express.static()
// multiple times! Here we're passing "./public/css",
// this will allow "GET /style.css" instead of "GET /css/style.css":
app.use(express.static(path.join(__dirname, 'public', 'css')));
//app.use(express.json({ extended: false }));


app.get('/', function(req, res) {
    //res.render('test', enjson)
    //    res.render('test', { layout: 'main' });
    res.redirect('/en');
});

app.get('/en', function(req, res) {
    res.render('sats', enjson)
        //    res.render('test', enjson)
});

app.get('/zh-cn', function(req, res) {
    res.render('sats', zhcnjson)
});

app.get('/zh-hk', function(req, res) {
    res.render('sats', zhhkjson)
});

app.get('/test', (req, res) => {
    const path = '/en';
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});


//Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`));