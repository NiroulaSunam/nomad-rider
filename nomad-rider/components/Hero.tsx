"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import the router

export default function Hero() {
  const [query, setQuery] = useState(""); // State to hold search text
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return; //Dont search if empty
    // send user to /find-spots with the query in the URL
    router.push(`/find-spots?q=${encodeURIComponent(query)}`);
  };

  return (
    <section className="min-h-[70vh] bg-slate-950 text-white flex flex-col justify-center p-8">
      {/*(min-h) Making it available for mobile as well as laptop */}
      {/* Max-w and mx-auto keep content centered and readable */}
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Find your next <span className="text-blue-500">&quot;Office&quot;</span> on two wheels.
        </h1>

        {/*Paragraph */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
          The first platform designed for the technical needs of motorcycle roads. Verified internet speeds and power access for your roadside office. 
        </p>

        {/* Search Section */}
        <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
  
             {/* The Bar: Input + Button */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
                <input 
                type="text" 
                value={query} //Binds the value to the query for search
                onChange={(e) => setQuery(e.target.value)} // Updates the state
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Search on Enter key 
                placeholder="Search by city, route..." 
                className="grow px-6 py-4 bg-slate-900 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button 
                onClick={handleSearch} //Click to Search
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition">
                Search
                </button>
            </div>

            
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-slate-500">
                <span className="font-semibold text-slate-400">Popular:</span>
                <button className="hover:text-blue-400 transition underline decoration-slate-700">Coastal Route</button>
                <button className="hover:text-blue-400 transition underline decoration-slate-700">Mountain Pass</button>
                <button className="hover:text-blue-400 transition underline decoration-slate-700">Starlink Zones</button>
            </div>
  
        </div>
       

      </div>
    </section>
  );
}