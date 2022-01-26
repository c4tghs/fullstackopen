import React, { useEffect, useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Title from './components/Title'
import Filter from './components/Filter'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])


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
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      
    }
  }

  const removeEntry = person => {
    if(window.confirm(`Remove ${person.name}?`)){
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(element => element.id !== person.id));
        })
    }
    else{
      alert(`Delete of ${person.name} was cancelled`)
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
        <Persons persons={persons} searchName={searchName} remoteEntry={removeEntry}/>
      </div>
      
    </div>
  )
}

export default App