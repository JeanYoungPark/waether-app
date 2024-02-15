import { useEffect, useState } from "react";
import Search from "../search";

export default function Weather() {
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [weather, setWeather] = useState(null)
    
    async function fetchWeatherDate(param){
        setLoading(true)
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)
            const data = await res.json()

            if(data) {
                setWeather(data)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    function handleSubmit(){
        fetchWeatherDate(search)
    }

    function getCurrentData(){
        return new Date().toLocaleDateString('en-us',{
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        })
    }

    useEffect(() => {
        fetchWeatherDate('korea')
    }, [])

    return (
        <div>
            <Search search={search} setSearch={setSearch} handleSubmit={handleSubmit}/>
            {
                loading ? <div className='loading'>Loading...</div> : (
                    <div>
                        <div className='city-name'>
                            <h2>{weather?.name}, <span>{weather?.sys?.country}</span></h2>
                        </div>
                        <div className='date'>
                            <span>{getCurrentData()}</span>
                        </div>
                        <div className='temp'>{weather?.main?.temp}</div>
                        <p className='description'>{weather && weather.weather && weather.weather[0] ? weather.weather[0].description : ''}</p>
                        <div className='weather-info'>
                            <div className='column'>
                                <div>
                                    <p className='wind'>{weather?.wind?.speed}</p>
                                    <p>Wind Speed</p>
                                </div>
                            </div>
                            <div className='column'>
                                <div>
                                    <p className='humidity'>{weather?.main?.humidity}</p>
                                    <p>Humidity</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
