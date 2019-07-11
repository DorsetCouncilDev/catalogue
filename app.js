const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
const nunjucks = require('nunjucks');
var session = require('express-session');
// const sassMiddleware = require("node-sass-middleware");
var bodyParser     =        require("body-parser");


var app = express();
app.use(session({secret: "Shh, its a secret!"}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')))

app.use(cookieParser());


// Page template configuration
var PATH_TO_TEMPLATES = './pages';
nunjucks.configure( PATH_TO_TEMPLATES, {
    autoescape: true,
    express: app
});
app.set('view engine', 'html');
var router = require("./routes/routes");
 app.use("/catalogue",router);


 

// app.get('/', (req, res) => res.render('index.html',{}))

/*
app.use(sassMiddleware({
    src: path.join(__dirname, 'public/scss'),
    dest: path.join(__dirname, 'public/css'),
    debug: true,
    sourceMap: true,
    indentedSyntax : false,
    outputStyle: 'compressed'
  })); 
*/

// Declare assets location


const port=process.env.PORT || 3000
app.listen(port, () => {
    // a console.log() which triggers Nodemon's "stdout" event 
    console.log(`Express server listening on port 3000`);
  });

  
  module.exports = app;