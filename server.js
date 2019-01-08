const express = require('express');
var spa = require('express-spa');
const http = require('http');
const cors = require('cors')
require('dotenv').config()
const port         = process.env.PORT || 8000
const environment  = process.env.NODE_ENV || 'dev'
const helmet       = require('helmet')
const morgan       = require('morgan')
const passport     = require('passport')
const bluebird     = require('bluebird')
const mongoose     = require('mongoose')
const bodyParser   = require('body-parser')
const cookieParser = require('cookie-parser')
const session      = require('express-session')
const configDB     = require('./config/database')
const routes       = require('./routes')
require('./config/passport')(passport);
mongoose.Promise = bluebird
mongoose.connect(configDB.mongo.url)

const app = express()
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: 'somesecretmoresecretthanallsecrets' }))
app.use(passport.initialize())
app.use(passport.session())
const hourMs = 1000*60*60;
app.use('/cdn', express.static(__dirname + '/public/uploads'));
app.use('/assets', express.static(__dirname + '/www/assets'));
app.use('/_admin/assets', express.static(__dirname + '/admin-files/www/assets'));
app.use('/_admin/build', express.static(__dirname + '/admin-files/www/build'));
app.use('/build', express.static(__dirname + '/www/build'));
// app.use(express.static(__dirname + '/www'))

app.use('/', routes)


app.use(spa(__dirname + '/www/index.html'))

http.createServer(app).listen(process.env.PORT);
