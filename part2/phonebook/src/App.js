import React, { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Title from './components/Title'
import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const handleChange = (func) => (event) => {
    func(event.target.value)
  }
  
  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName)){    
      alert(`${newName} is already in phonebook`)
    }
    else{
      const newPerson ={
        name:newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }

    
  }

  return (
    <div>
      
      <Title text="Phonebook"/>
      <Filter searchName={searchName} handleChange={handleChange} setSearchName={setSearchName} />
      <Title text="add a new"/>

      <PersonForm addPerson={addPerson} handleChange={handleChange} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
      <Title text="Numbers"/>
      
      <div>
        <Persons persons={persons} searchName={searchName} />
      </div>
      
    </div>
  )
}

export default App