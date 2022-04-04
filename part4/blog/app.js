const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI)
 .then(() => {
     logger.info('connected to MongoDB')
 })
 .catch((error) => {
     logger.error('error connection to MongoDB:', error.message)
 })

app.use(cors())
app.use(express.json())
app.use('/api/blogs',blogsRouter)
app.use('/api/users',usersRouter)
app.use(middleware.errorHandler)


module.exports = app
