import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TextField from './components/TextField';
import Countries from './components/Countries'

const App =() => {
  const [countries, setCountries] = useState([])
  const [searchName, setSearchName] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [capitalCity, setCapitalCity] = useState('')
  const [currentWeather, setWeather] = useState([])


  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capitalCity}&appid=${apiKey}&units=metric`)
      .then(response => {

        setWeather(response.data)
      })
  }, [apiKey,capitalCity])




  const handleChange = (event) => {
    setSearchName(event.target.value)
  }

  const showCountry = (event) => {
    event.preventDefault()
    setSearchName(event.target.value)
  }

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value)
  }

  const handleCountryChange = (capitalCity) => {
    setCapitalCity(capitalCity)
  }


  return (
    <div>
      <p>
        <TextField text='Enter api key ' value={apiKey} handleChange={handleApiKeyChange}/>
      </p>
      <TextField text='find countries' inputValue={searchName} handleChange={handleChange}/>

      <div>
        <Countries countries={countries} searchName={searchName} showCountry={showCountry} handleCountryChange={handleCountryChange} currentWeather={currentWeather}/>
      </div>

    </div>    
  )
}

export default App;
