"use client";

import { useState } from "react";
import { Spotcard } from "@/components/Spotcard";
import { Spot } from "@prisma/client";

// Adding a default empty array [] to initialSpots prevents the "undefined" crash
export default function SearchResults({ initialSpots = [] }: { initialSpots: Spot[] }) {
  const [query, setQuery] = useState("");

  // Safety check: if for some reason initialSpots is null, treat it as empty
  const spotsToFilter = initialSpots || [];

  const filtered = spotsToFilter.filter(spot => 
    spot.name.toLowerCase().includes(query.toLowerCase()) ||
    spot.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      {/* SEARCH INPUT */}
      <div className="relative max-w-md">
        <input 
          type="text"
          placeholder="Search by name or city..."
          className="w-full p-4 pl-12 rounded-xl bg-slate-900 border border-slate-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="absolute left-4 top-4.5 opacity-40">🔍</span>
      </div>

      {/* RESULTS GRID */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(spot => (
            <Spotcard key={spot.id} spot={spot} />
          ))}
        </div>
      ) : (
        <div className="bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl p-12 text-center">
          <p className="text-slate-500 italic">
            {query ? `No spots found matching "${query}"` : "No spots available yet. Be the first to add one!"}
          </p>
        </div>
      )}
    </div>
  );
}