const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

//Server Routes handlers
const routesAuth = require('./routes/auth')
const routesPrivate = require('./routes/private')

const routesApi = require('./routes/api')

const app = express()

app.use(express.static( path.join(__dirname,'../client') ))

app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );

app.use('/auth', routesAuth );
app.use('/private', routesPrivate );

app.use('/api', routesApi );

module.exports = app
