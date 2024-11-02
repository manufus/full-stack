import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState(null);

  const api_key = import.meta.env.VITE_WEATHER_KEY;

  useEffect(() => {
    if (countries) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then((response) => {
          setCountries(response.data);
        })
        .catch((error) => {
          window.alert("Something went wrong ajaja");
        });
    } else {
    }
  }, [search]);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const country = filteredCountries[0];

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]},${country.tld[0]}&APPID=${api_key}&units=metric`
        )
        .then((response) => {
          setWeatherInfo(response.data);
        })
        .catch((error) => {
          window.alert(error);
        });
    } else {
      setWeatherInfo(null);
    }
  }, [filteredCountries, api_key]);

  const showCountry = (countryName) => {
    setSearch(countryName);
  };

  let listOfCountries;

  if (search === "") {
    listOfCountries = null;
  } else if (filteredCountries.length > 10) {
    listOfCountries = <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
    listOfCountries = filteredCountries.map((country) => (
      <div key={country.name.common}>
        <p>
          {country.name.common}{" "}
          <button onClick={() => showCountry(country.name.common)}>show</button>
        </p>
      </div>
    ));
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0];

    const propertiesArray = Object.values(country.languages);
    listOfCountries = (
      <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h3>languages</h3>
        <ul>
          {propertiesArray.map((idioma) => (
            <li key={idioma}>{idioma}</li>
          ))}
        </ul>
        <img src={country.flags.png} />
        <h3>Weather in {country.capital}</h3>
        {weatherInfo ? (
          <div>
            <p>temperature {weatherInfo.main.temp} ºC</p>
            {
              <img
                src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
              />
            }
            <p>wind {weatherInfo.wind.speed} m/s</p>
          </div>
        ) : (
          <div>
            <p>Loading weather data...</p>
          </div>
        )}
      </div>
    );
  } else {
    listOfCountries = <p>No matches</p>;
  }
  return (
    <div>
      <form>
        find countries:
        <input onChange={handleChange} value={search} />
      </form>
      <div>{listOfCountries}</div>
    </div>
  );
}

export default App;
