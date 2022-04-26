const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
    else if (error.name === 'JsonWebTokenError'){
      return response.status(401).json({error:'invalid token'})
    }
    next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token =  authorization.substring(7)  
  }
  next()

}

const userExtractor = (request, response, next) => {
  const decodedToken = jwt.verify(request.token,process.env.SECRET)
  if(decodedToken.id){
    request.user = decodedToken.id
  }
  else{
    return response.status(401).json({error: 'token missing or invalid'})
  }
  
  next()  
}
  
module.exports = {
    errorHandler,
    tokenExtractor,
    userExtractor
}