import React from "react";

const Country =({country, currentWeather}) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>

            <h2>languages</h2>
            <ul>
                {
                    Object.values(country.languages).map(item => {
                        return(
                            <li key={item}>{item}</li>
                        )
                    })  
                }
                
            </ul>
            <p>
                <img src={country.flags.png} alt={`Flag of ${country.name.common}`} height="60" width="60"/>
            </p>

            <h2>Weather </h2>
            <p>
                <b>temperature: {currentWeather.main.temp}</b>
            </p>
            <img src={currentWeather.weather[0].icon} alt="weather icon"/>
            <p>
                <b>wind: </b>{currentWeather.wind.speed} km degree {currentWeather.wind.deg}
            </p>
          
           
        </div>
    )
}

export default Country