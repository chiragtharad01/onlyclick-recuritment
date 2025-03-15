import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 text-white p-4">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-6">Weather Dashboard</h1>

      {/* Search Bar */}
      <div className="flex space-x-2 mb-6">
        <input
          type="text"
          className="p-2 text-black rounded-lg w-72 outline-none"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-200">
          Search
        </button>
      </div>

      {/* Weather Info Section (Empty for now) */}
      <div className="w-full max-w-lg bg-white text-black p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold">City Name</h2>
        <p className="text-lg">Temperature: --°C</p>
        <p className="text-lg">Weather: --</p>
      </div>
    </div>
  );
}
