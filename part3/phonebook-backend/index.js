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
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id',(request,response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        response.json(person)
    }
    else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id',(request,response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request,response) => {
    const body = request.body
    if(!body.name || !body.number){
        return response.status(400).json({
            error:'content missing'
        })
    }
    /*else if(persons.find(person => person.name === body.name)){
        return response.status(409).json({
            error:'name must be unique'
        })
    }*/
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

app.get('/info',(request,response) => {
    const currentDate = new Date(Date.now())
    let res = `<p>Phonebook has info for ${persons.length} people</p> <p>${currentDate.toUTCString()}</p>`
    response.send(res)
})


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})