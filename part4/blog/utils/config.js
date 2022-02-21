//require('dotenv').config
if(process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv')
    dotenv.config({ path:'.env' })
  }
  

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

module.exports = {
    MONGODB_URI, PORT
}