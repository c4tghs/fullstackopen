//require('dotenv').config
if(process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv')
    dotenv.config({ path:'.env' })
  }
  
const  PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
    MONGODB_URI, PORT
}