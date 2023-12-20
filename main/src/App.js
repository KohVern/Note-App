import React, {useState} from 'react'
import axios from 'axios'

function App() {
  const [data,setData] = useState({});
  const [location,setLocation] = useState('')

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=8b2b33c0ace4726701afff329e3bbf6e`;

      axios.get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });
      setLocation('')
    }
  };
  return (
    <div className='app'>
      <div className='search'>
        <input value={location} onChange={event => setLocation(event.target.value)} onKeyDown={searchLocation} placeholder='Enter Location' type='text'/>
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{((data.main.temp - 32) * 5/9).toFixed()}°C</h1> : null}
          </div>
          <div className='location'>
            {data.main ? 
              <div>
                <p>Min temp: {((data.main.temp_min - 32) * 5/9).toFixed()}°C</p>
                <p>Max temp: {((data.main.temp_max - 32) * 5/9).toFixed()}°C</p>
              </div> 
              : null
            }
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>

        {data.name != undefined && 
        <div className='bottom'>
          <div className='feels'>{data.main ? <p className='bold'>{((data.main.feels_like - 32) * 5/9).toFixed()}°C</p> : null} <p>Feels Like</p></div>
          <div className='humidity'>{data.main ? <p className='bold'>{data.main.humidity}%</p> : null} <p>Humidity</p></div>
          <div className='wind'>{data.wind ? <p className='bold'>{data.wind.speed} KMPH</p> : null} <p>Wind Speed</p></div>          
        </div>
        }
      </div>
    </div>
  );
}

export default App;
