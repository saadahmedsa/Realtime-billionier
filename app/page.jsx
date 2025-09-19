"use client";
import React, { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const dat = await fetch("https://forbes400.onrender.com/api/forbes400/");
      const response = await dat.json();
      setData(response);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-center text-4xl md:text-5xl font-extrabold py-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg">
        🌍 World’s Top Billionaires
      </h1>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-gray-100 min-h-screen">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col items-center p-6"
            >
              {/* Profile Image */}
              <div className="w-24 h-24 relative rounded-full overflow-hidden shadow-md mb-4 border-4 border-indigo-500">
                <img
                  src={item.squareImage || "/fallback.png"}
                  alt={item.personName}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Name */}
              <h2 className="text-lg font-bold text-gray-800 text-center">
                {item.personName}
              </h2>

              {/* Button */}
              <button
                onClick={() => setSelected(item)}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors text-sm font-medium shadow-md"
              >
                View Profile
              </button>
            </div>
          ))
        ) : (
          <h1 className="text-center text-xl font-semibold text-gray-600">
            Loading...
          </h1>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className={`bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative transform transition-all duration-300 scale-95 opacity-0 animate-modalIn`}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✖
            </button>

            {/* Image */}
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-indigo-500 shadow-md">
              <img
                src={selected.squareImage || "/fallback.png"}
                alt={selected.personName}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Info */}
            <h2 className="text-2xl font-bold text-center mt-4 text-gray-800">
              {selected.personName}
            </h2>
            <p className="text-center text-gray-500 italic">{selected.source}</p>

            <div className="mt-4 space-y-2 text-center">
              <p className="text-sm text-gray-700">
                📍 {selected.city}, {selected.countryOfCitizenship}
              </p>
              <p className="text-lg font-semibold text-green-600">
                💰 ${(selected.finalWorth / 1000).toFixed(2)}B
              </p>
              <p className="text-sm text-gray-600">Rank: #{selected.rank}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
