import React,{useState} from 'react'
import axios from "axios";

const Weather = () => {
    const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const api = {
    key: "fa46fffb405345d335991ed0de1d6b57",

    base: "https://api.openweathermap.org/data/2.5/",
  };
  const url = `${api.base}weather?q=${location}&units=metric&APPID=${api.key}`;
  const searchLocation = (e) => {
    if (e.key === "Enter") {
      axios.get(url).then((res) => {
        setData(res.data);
      });
      setLocation("");
    }
  };
  return (
    <>
    <div className="search">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter location..."
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{Math.round(data.main.temp)} &#176;c</h1> : null}
          </div>
          <div className="discription">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name !== undefined && (
          <>
            <div className="max-min">
              <div className="max">
                {data.main ? <p>{Math.round(data.main.temp_max)}°c</p> : null}
                <p>temp max</p>
              </div>
              <div className="min">
                {data.main ? <p>{Math.round(data.main.temp_min)}°c</p> : null}
                <p>temp min</p>
              </div>
            </div>
            <div className="bottom">
              <div className="feels">
                {data.main ? (
                  <p className="bold">{data.main.feels_like} °c</p>
                ) : null}
                <p>feels like</p>
              </div>
              <div className="humidity">
                {data.main ? (
                  <p className="bold">{data.main.humidity}%</p>
                ) : null}
                <p>humidity</p>
              </div>
              <div className="wind">
                {data.wind ? (
                  <p className="bold">{data.wind.speed}MPH</p>
                ) : null}
                <p>speed wind</p>
              </div>
            </div>
          </>
        )}
      </div>
    
    </>
  )
}

export default Weather