require('dotenv').config()

const express = require("express")
const bodyParser = require('body-parser')
const router = express.Router()
const sm = require('./Config/session_manager')
const session = require('express-session')
const path = require('path')
const exphbs = require('express-handlebars')

//Security module
const compression = require('compression')

let app = express()

const HomeRoutes = require('./Routes/Home.Routes')(router, sm)
// Invoke middlewaref
app.use(express.static(path.join(__dirname, '/Public')))
app.use(express.urlencoded())
app.use(express.json())
app.set('trust proxy', 1) // trust first proxy


app.use(session({
    secret: 'BeatScale2021',
    resave: true,
    saveUninitialized: true
  }))
  
  bodyParser({
      json: {limit: '50mb', extended: true},
      urlencoded: {limit: '50mb', extended: true}
  })
  
  //Add Compression Middleware
  app.use(compression())
  
  app.set("views",path.join(__dirname,'Templates'))
  app.engine('handlebars',exphbs({
      defaultLayout:'main',
      layoutsDir: __dirname + '/Templates/layouts/',
      partialsDir: __dirname + '/Templates/partials/'
  }))
  
  app.set('view engine','handlebars')

//Add Compression Middleware
app.use(compression())

app.use('/api/services/', MainRoutes)
app.use('/', UIRoutes)


Handlebars.registerHelper('ifeq', function (a, b, options) {
    if (a == b) { return options.fn(this); }
    return options.inverse(this);
});

Handlebars.registerHelper('grt_than', function (a, b, options) {
    if (a.length > b) { return options.fn(this); }
    return options.inverse(this);
});

Handlebars.registerHelper('each_upto', function(ary, max, options) {
    if(!ary || ary.length == 0)
        return options.inverse(this);

    var result = [ ];
    for(var i = 0; i < max && i < ary.length; ++i)
        result.push(options.fn(ary[i]));
    return result.join('');
});

Handlebars.registerHelper('ifnoteq', function (a, b, options) {
    if (a != b) { return options.fn(this); }
    return options.inverse(this);
});


app.set('port',(process.env.PORT || 5000))

app.listen(app.get('port'),()=>{
    console.log(`Utility Service Gateway running on port : ${app.get('port')}...`)
})

