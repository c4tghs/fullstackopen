import React from "react";
import Country from "./Country";

const Countries  = ({countries, searchName}) => {

    const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchName.toLowerCase())
    )

    if(filteredCountries.length === countries.length) {
        return(
            <div></div>
        )
    }
    else if(filteredCountries.length ===  1){
        return(
            <Country country={filteredCountries[0]}/>
        )
    }
    else if(filteredCountries.length <= 10){
        return(
            filteredCountries.map(country => 
                <div key={country.name.common}>
                    <span>{country.name.common}</span>
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