'use strict'
// load dependencies

const express = require('express')

// create the express app
const app = express()

const carsRouter = require('./routes/cars.js')

// configure express middleware
app.use(express.json())
app.use('/api/cars', carsRouter)

// start listening for HTTP requests
const port = process.env.port || 3030
app.listen(port, () => console.log(`Server listening on port ${port} ...`))
