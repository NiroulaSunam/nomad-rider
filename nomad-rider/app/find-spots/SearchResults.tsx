"use client";

import { useState } from "react";
import { Spotcard } from "@/components/Spotcard"; // Now we will use this
import type { Spot } from "@prisma/client";
import { Input } from "@/components/ui/input" 

export default function SearchResults({ 
  initialSpots = [], 
  defaultQuery = "" 
}: { 
  initialSpots: Spot[], 
  defaultQuery?: string 
}) {
  const [query, setQuery] = useState(defaultQuery);

  // This is the variable TypeScript said was "unused"
  const filtered = initialSpots.filter(spot => 
    spot.name.toLowerCase().includes(query.toLowerCase()) ||
    spot.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <Input 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search spots..."
        className="w-full max-w-md mb-8 p-4 rounded-xl bg-slate-900 border border-slate-800 text-white outline-none focus:border-blue-500"
      />

      {/* WE USE 'filtered' AND 'Spotcard' HERE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((spot) => (
          <Spotcard key={spot.id} spot={spot} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-slate-500 mt-4">No spots found matching your search.</p>
      )}
    </div>
  );
}