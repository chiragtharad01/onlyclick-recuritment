

// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../AuthContext";
// import React, { useState, useEffect, useDebugValue } from "react";
// import axios from "axios";

// const API_KEY = "d5980f078b74dc4408daead7a70de664"; // Replace with your API Key
// const BASE_URL = "https://api.openweathermap.org/data/2.5";

// export default function Dashboard() {
//     const { user, logout } = useAuth();
//     const navigate = useNavigate();
//     const [city, setCity] = useState("");
//     const [weather, setWeather] = useState(null);
//     const [forecast, setForecast] = useState([]);
//     const [forecastIndex, setForecastIndex] = useState(0);
//     const [isDarkMode, setIsDarkMode] = useState(false);
//     const [isMetric, setIsMetric] = useState(true); // State for metric/imperial toggle
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);
//     const fetchWeather = async () => {
//         try {
//             setLoading(true);
//             setError("");

//             const weatherResponse = await axios.get(`${BASE_URL}/weather`, {
//                 params: { q: city, appid: API_KEY, units: "metric" },
//             });
//             setWeather(weatherResponse.data);

//             const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
//                 params: { q: city, appid: API_KEY, units: "metric" },
//             });

//             const dailyForecast = forecastResponse.data.list.filter((_, index) => index % 8 === 0);
//             setForecast(dailyForecast);
//         } catch {
//             setWeather(null);
//             setForecast([]);
//             setError("City not found. Please enter a valid city.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSearch = (e) => {
//         e.preventDefault();
//         if (city.trim()) fetchWeather();
//         else setError("Please enter a city name.");
//     };

//     const handleLogout = () => {
//         logout();
//         navigate("/");
//     };

//     const toggleMode = () => setIsDarkMode(!isDarkMode);

//     const toggleUnits = () => setIsMetric(!isMetric);

//     useEffect(() => {
//         if (isDarkMode) document.body.classList.add("dark");
//         else document.body.classList.remove("dark");
//     }, [isDarkMode]);

//     // Function to determine background based on weather condition
//     const getBackgroundClass = () => {
//         if (!weather) return "bg-gradient-to-r from-blue-400 to-indigo-600"; // default background

//         const mainWeather = weather.weather[0].main.toLowerCase();

//         // Dynamically set the background based on weather conditions
//         switch (mainWeather) {
//             case "clear":
//                 return "bg-gradient-to-r from-yellow-400 to-orange-500"; // Sunny
//             case "rain":
//                 return "bg-gradient-to-r from-gray-600 to-blue-700"; // Rainy
//             case "snow":
//                 return "bg-gradient-to-r from-white to-blue-500"; // Snowy
//             case "clouds":
//                 return "bg-gradient-to-r from-gray-400 to-gray-600"; // Cloudy
//             case "thunderstorm":
//                 return "bg-gradient-to-r from-purple-700 to-indigo-900"; // Thunderstorm
//             default:
//                 return "bg-gradient-to-r from-blue-400 to-indigo-600"; // Default background
//         }
//     };

//     const convertTemperature = (temp) => isMetric ? temp : (temp * 9/5) + 32;
//     const convertWindSpeed = (speed) => isMetric ? speed : speed * 3.6;

//     return (
//         <div className={`min-h-screen flex flex-col items-center justify-center ${getBackgroundClass()} p-6`}>
            
//             {/* Header */}
//             <div className="flex justify-between w-full max-w-md mb-6">
//                 <h1 className={`text-${isDarkMode ? 'white' : 'black'} text-3xl font-bold`}>Weather Dashboard</h1>
//                 <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
//                     Logout
//                 </button>
//             </div>

//             {/* Mode and Unit Toggle */}
//             <div className="flex gap-4 mb-6">
//                 <button onClick={toggleMode} className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700">
//                     {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
//                 </button>
//                 <button onClick={toggleUnits} className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700">
//                     {isMetric ? 'Switch to Imperial' : 'Switch to Metric'}
//                 </button>
//             </div>

//             {/* Search Bar */}
//             <form onSubmit={handleSearch} className="w-full max-w-md flex bg-white rounded-lg overflow-hidden shadow-md mb-6">
//                 <input type="text" placeholder="Enter city..." className="flex-1 p-3 outline-none border-none text-gray-700" value={city} onChange={(e) => setCity(e.target.value)} />
//                 <button type="submit" className="bg-gray-800 text-white px-5 py-3 hover:bg-gray-700">
//                     Search
//                 </button>
//             </form>

//             {/* Error and Loading States */}
//             {error && <p className="text-red-500 mt-4">{error}</p>}
//             {/* {loading && <p className="text-white mt-4">Fetching weather...</p>} */}
//             {loading && (
//     <div className="flex justify-center items-center mt-4">
//         <div className="w-8 h-8 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
//     </div>
// )}

//             {/* Current Weather */}
//             {weather && (
//                 <div className={`mt-6 p-6 rounded-lg shadow-lg w-full max-w-md text-center ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
//                     <h2 className="text-xl font-semibold">{weather.name}, {weather.sys.country}</h2>
//                     <p>{weather.weather[0].description}</p>
//                     <p className="text-4xl font-bold text-indigo-600 mt-2">
//                         {Math.round(convertTemperature(weather.main.temp))}°{isMetric ? "C" : "F"}
//                     </p>
//                     <div className="flex justify-between mt-4">
//                         <p>Humidity: {weather.main.humidity}%</p>
//                         <p>Wind: {convertWindSpeed(weather.wind.speed).toFixed(1)} {isMetric ? "m/s" : "km/h"}</p>
//                     </div>
//                 </div>
//             )}

//             {/* 5-Day Forecast */}
//             {forecast.length > 0 && (
//                 <div className={`mt-6 p-6 rounded-lg shadow-lg w-full max-w-md text-center ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
//                     <h3 className="text-3xl font-bold mb-6">5-Day Forecast</h3>
//                     <div className="flex justify-center items-center mb-6">
//                         <button onClick={() => setForecastIndex(forecastIndex - 1)} disabled={forecastIndex === 0} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50">
//                             ←
//                         </button>

//                         <div className="flex flex-col items-center p-6 rounded-lg w-60">
//                             <p className="text-lg font-semibold">{new Date(forecast[forecastIndex].dt_txt).toLocaleDateString()}</p>
//                             <img src={`https://openweathermap.org/img/wn/${forecast[forecastIndex].weather[0].icon}.png`} alt="weather icon" className="w-24 h-24" />
//                             <p className="text-3xl font-bold">
//                                 {Math.round(convertTemperature(forecast[forecastIndex].main.temp))}°{isMetric ? "C" : "F"}
//                             </p>
//                         </div>

//                         <button onClick={() => setForecastIndex(forecastIndex + 1)} disabled={forecastIndex === forecast.length - 1} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50">
//                             →
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }



import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "d5980f078b74dc4408daead7a70de664"; // Replace with your API Key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [forecastIndex, setForecastIndex] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMetric, setIsMetric] = useState(true); // State for metric/imperial toggle
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Redirect to login page if no user is logged in
    useEffect(() => {
        if (!user) {
            navigate("/"); // Redirect to login page if user is not authenticated
        }
    }, [user, navigate]);

    const fetchWeather = async () => {
        try {
            setLoading(true);
            setError("");

            const weatherResponse = await axios.get(`${BASE_URL}/weather`, {
                params: { q: city, appid: API_KEY, units: "metric" },
            });
            setWeather(weatherResponse.data);

            const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
                params: { q: city, appid: API_KEY, units: "metric" },
            });

            const dailyForecast = forecastResponse.data.list.filter((_, index) => index % 8 === 0);
            setForecast(dailyForecast);
        } catch {
            setWeather(null);
            setForecast([]);
            setError("City not found. Please enter a valid city.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (city.trim()) fetchWeather();
        else setError("Please enter a city name.");
    };

    const handleLogout = async () => {
        try {
            // await axios.post("/api/logout");  // Axios call to the logout API (if applicable)

            // Clear tokens and localStorage after logging out
            localStorage.removeItem("token");
            logout(); // Call logout function from AuthContext
            navigate("/"); // Redirect to login page
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const toggleMode = () => setIsDarkMode(!isDarkMode);

    const toggleUnits = () => setIsMetric(!isMetric);

    useEffect(() => {
        if (isDarkMode) document.body.classList.add("dark");
        else document.body.classList.remove("dark");
    }, [isDarkMode]);

    // Function to determine background based on weather condition
    const getBackgroundClass = () => {
        if (!weather) return "bg-gradient-to-r from-blue-400 to-indigo-600"; // default background

        const mainWeather = weather.weather[0].main.toLowerCase();

        // Dynamically set the background based on weather conditions
        switch (mainWeather) {
            case "clear":
                return "bg-gradient-to-r from-yellow-400 to-orange-500"; // Sunny
            case "rain":
                return "bg-gradient-to-r from-gray-600 to-blue-700"; // Rainy
            case "snow":
                return "bg-gradient-to-r from-white to-blue-500"; // Snowy
            case "clouds":
                return "bg-gradient-to-r from-gray-400 to-gray-600"; // Cloudy
            case "thunderstorm":
                return "bg-gradient-to-r from-purple-700 to-indigo-900"; // Thunderstorm
            default:
                return "bg-gradient-to-r from-blue-400 to-indigo-600"; // Default background
        }
    };

    const convertTemperature = (temp) => isMetric ? temp : (temp * 9/5) + 32;
    const convertWindSpeed = (speed) => isMetric ? speed : speed * 3.6;

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center ${getBackgroundClass()} p-6`}>
            
            {/* Header */}
            <div className="flex justify-between w-full max-w-md mb-6">
                <h1 className={`text-${isDarkMode ? 'white' : 'black'} text-3xl font-bold`}>Weather Dashboard</h1>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Logout
                </button>
            </div>

            {/* Mode and Unit Toggle */}
            <div className="flex gap-4 mb-6">
                <button onClick={toggleMode} className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700">
                    {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                </button>
                <button onClick={toggleUnits} className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700">
                    {isMetric ? 'Switch to Imperial' : 'Switch to Metric'}
                </button>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="w-full max-w-md flex bg-white rounded-lg overflow-hidden shadow-md mb-6">
                <input type="text" placeholder="Enter city..." className="flex-1 p-3 outline-none border-none text-gray-700" value={city} onChange={(e) => setCity(e.target.value)} />
                <button type="submit" className="bg-gray-800 text-white px-5 py-3 hover:bg-gray-700">
                    Search
                </button>
            </form>

            {/* Error and Loading States */}
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {loading && (
                <div className="flex justify-center items-center mt-4">
                    <div className="w-8 h-8 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
                </div>
            )}

            {/* Current Weather */}
            {weather && (
                <div className={`mt-6 p-6 rounded-lg shadow-lg w-full max-w-md text-center ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                    <h2 className="text-xl font-semibold">{weather.name}, {weather.sys.country}</h2>
                    <p>{weather.weather[0].description}</p>
                    <p className="text-4xl font-bold text-indigo-600 mt-2">
                        {Math.round(convertTemperature(weather.main.temp))}°{isMetric ? "C" : "F"}
                    </p>
                    <div className="flex justify-between mt-4">
                        <p>Humidity: {weather.main.humidity}%</p>
                        <p>Wind: {convertWindSpeed(weather.wind.speed).toFixed(1)} {isMetric ? "m/s" : "km/h"}</p>
                    </div>
                </div>
            )}

            {/* 5-Day Forecast */}
            {forecast.length > 0 && (
                <div className={`mt-6 p-6 rounded-lg shadow-lg w-full max-w-md text-center ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                    <h3 className="text-3xl font-bold mb-6">5-Day Forecast</h3>
                    <div className="flex justify-center items-center mb-6">
                        <button onClick={() => setForecastIndex(forecastIndex - 1)} disabled={forecastIndex === 0} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50">
                            ←
                        </button>

                        <div className="flex flex-col items-center p-6 rounded-lg w-60">
                            <p className="text-lg font-semibold">{new Date(forecast[forecastIndex].dt_txt).toLocaleDateString()}</p>
                            <img src={`https://openweathermap.org/img/wn/${forecast[forecastIndex].weather[0].icon}.png`} alt="weather icon" className="w-24 h-24" />
                            <p className="text-3xl font-bold">
                                {Math.round(convertTemperature(forecast[forecastIndex].main.temp))}°{isMetric ? "C" : "F"}
                            </p>
                        </div>

                        <button onClick={() => setForecastIndex(forecastIndex + 1)} disabled={forecastIndex === forecast.length - 1} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50">
                            →
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}


