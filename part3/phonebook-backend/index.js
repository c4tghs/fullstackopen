require('dotenv').config
console.log(require("dotenv").config())
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(cors())
app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :req[content-length] - :response-time ms :body'));

const Person = require('./models/persons')

app.get('/api/persons', (request, response,next) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id',(request,response,next) => {
    Person.findById(request.params.id)
        .then(person => {
            if(person){
                response.json(person)
            }
            else{
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id',(request,response,next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request,response) => {
    const body = request.body
    if(!body.name || !body.number){
        return response.status(400).json({
            error:'content missing'
        })
    }
    else{
        const person = new Person({
            name:body.name,
            number:body.number
        })
        person.save().then(savedPerson => {
            response.json(savedPerson)
        })
    }
})
app.put('/api/persons/:id',(request,response,next) => {
    const body = request.body
    const person = {
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(request.params.id, person, {new:true})
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))

})

app.get('/info',(request,response) => {
    const currentDate = new Date(Date.now())
    Person.find({}).then(persons => {
        let res = `<p>Phonebook has info for ${persons.length} people</p> <p>${currentDate.toUTCString()}</p>`
        response.send(res)
    })
    .catch(error => next(error))
    
})


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler  = (error,request, response, next) => {
    if(error.name === 'CastError') {
        return response.status(400).send({error:'malformatted id'})
    }
}

app.use(errorHandler)
const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})