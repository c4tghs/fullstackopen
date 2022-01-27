import React from "react";
import Country from "./Country";

const Countries  = ({countries, searchName,showCountry, handleCountryChange, currentWeather}) => {

    const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchName.toLowerCase())
    )

    if(filteredCountries.length === countries.length) {
        return(
            <div></div>
        )
    }
    else if(filteredCountries.length ===  1){
        handleCountryChange(filteredCountries[0].capital[0])
        return(
            <div>
                <Country country={filteredCountries[0]} currentWeather={currentWeather}/>
            </div>
        )
    }
    else if(filteredCountries.length <= 10){
        return(
            filteredCountries.map(country => 
                <div key={country.name.common}>
                    <span>{country.name.common}</span>
                    <button value={country.name.common} onClick={showCountry}>show</button>
                </div>
            )
        )
    }
    else if(filteredCountries.length >10){
        return(
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
}

export default Countries