import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TextField from './components/TextField';
import Countries from './components/Countries'

const App =() => {
  const [countries, setCountries] = useState([])
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  const handleChange = (event) => {
    setSearchName(event.target.value)
  }

  const showCountry = (event) => {
    event.preventDefault()
    setSearchName(event.target.value)
  }


  return (
    <div>
      <TextField text='find countries' inputValue={searchName} handleChange={handleChange}/>

      <div>
        <Countries countries={countries} searchName={searchName} showCountry={showCountry}/>
      </div>

    </div>    
  )
}

export default App;
