// "use client"
import Image from 'next/image';
import React from 'react'


const App = async () => {
  const dat = await fetch("https://forbes400.onrender.com/api/forbes400/")
  const response = await dat.json()
  // console.log(response);
  
  
  return (
    <>
     <h1 className="text-center text-4xl font-bold p-3 bg-black text-white">
      List Of Billioinier
     </h1>
     <div className=" bg-slate-400">
      {response ? response.map((item ,index) =>{
        const Worth = parseFloat(item.finalWorth);
        const Billions = (Worth / 1_000).toFixed(2); 
        return <div key={index} className="flex justify-between rounded font-semibold gap-10 flex-wrap m-2 p-2 items-center bg-slate-200">
             <img src={item.squareImage} alt={"image"} width={100} height={100} />
             <h1 className="text-2xl">Rank: {item.rank}</h1>
             <h1 className="text-2xl">Name: {item.personName}</h1>
             <h1 className="text-2xl">Company: {item.source}</h1>
             <h1 className="text-2xl">City: {item.city}</h1>
             <h1 className="text-2xl">Country: {item.countryOfCitizenship}</h1>
             <h1 className="text-2xl">Worth: ${Billions}B</h1>

        </div>
          

 
        
      }): <h1>Loading</h1>}

     </div>
      
    </>
  )
}

export default App