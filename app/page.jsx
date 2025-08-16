// "use client"
import Image from "next/image";
import React from "react";

const App = async () => {
  const dat = await fetch("https://forbes400.onrender.com/api/forbes400/");
  const response = await dat.json();

  return (
    <>
      <h1 className="text-center text-4xl md:text-5xl font-extrabold py-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg">
        🌍 World’s Top Billionaires
      </h1>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 min-h-screen">
        {response ? (
          response.map((item, index) => {
            const Worth = parseFloat(item.finalWorth);
            const Billions = (Worth / 1_000).toFixed(2);

            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col items-center p-6"
              >
                {/* Profile Image */}
                <div className="w-24 h-24 relative rounded-full overflow-hidden shadow-md mb-4 border-4 border-indigo-500">
                  <img
                    src={item.squareImage || "/fallback.png"}
                    alt={item.personName}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <h2 className="text-xl font-bold text-gray-800">
                  {item.rank}. {item.personName}
                </h2>
                <p className="text-gray-500 italic">{item.source}</p>

                <div className="mt-3 space-y-1 text-center">
                  <p className="text-sm text-gray-700">
                    📍 {item.city}, {item.countryOfCitizenship}
                  </p>
                  <p className="text-lg font-semibold text-green-600">
                    💰 ${Billions}B
                  </p>
                </div>

                {/* Button */}
                <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors text-sm font-medium shadow-md">
                  View Profile
                </button>
              </div>
            );
          })
        ) : (
          <h1 className="text-center text-xl font-semibold text-gray-600">
            Loading...
          </h1>
        )}
      </div>
    </>
  );
};

export default App;
