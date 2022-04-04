const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      minlength: 3
    },
    name: {
      type: String,
      required: true,
      minlength: 3
    },
    passwordHash: String
})

userschema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userschema)

module.exports = User