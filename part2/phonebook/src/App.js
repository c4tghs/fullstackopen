import React, { useEffect, useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Title from './components/Title'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNoticationType] = useState(null);

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
    .catch(error => {
      showMessage("Could not retrieve data",false)
    })
  }, [])


  const handleChange = (func) => (event) => {
    func(event.target.value)
  }

  const showMessage =(message, notificationType=true) => {
    setNotification(message);
    setNoticationType(notificationType)

    setTimeout(() => {
      setNotification(null);
      setNoticationType(null);
    }, 3000);
  }
  
  const addPerson = (event) => {
    event.preventDefault()

    const personObject ={
      name:newName,
      number: newNumber
    }

    if (persons.find(person => person.name === newName)){  
        let person = persons.find(element => element.name === newName);
        let updatedPerson = Object.assign(person,personObject)
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          personService
            .update(person.id, personObject)
            .then(() => {
              setPersons(persons.map(element => (element.name === newName ? updatedPerson:element)))
              setNewName('')
              setNewNumber('')
              showMessage(`${updatedPerson.name}'s phone number has been updated`) 
            })

        }
    }
    else{
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          showMessage(`Added ${personObject.name}`)          
        })
      
    }
  }

  const removeEntry = person => {
    if(window.confirm(`Remove ${person.name}?`)){
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(element => element.id !== person.id));
          showMessage(`${person.name} has been removed from the phone book`)
        })
        .catch(error => {
          showMessage(`Information of ${person.name} has already been removed from server`,false)
        })
    }
  }

  return (
    <div>
      
      <Title text="Phonebook"/>
      <Notification message={notification} success={notificationType}/>
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