"use client";

import { Spot } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { deleteSpot } from "@/app/actions/delete-spot";

interface SpotcardProps {
  spot: Spot;
  showDelete?: boolean;
}

export function Spotcard({ spot, showDelete = false }: SpotcardProps) {
   
  // If spot.imageUrl is null, Next.js Image will handle the error.
  const displayImage = spot.imageUrl || "";

  return (
    <Link href={`/spots/${spot.id}`} className="block">
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl hover:border-blue-500 transition-all"> 
        
        {/* IMAGE */}
        <div className="relative h-48 w-full bg-slate-800 rounded-xl overflow-hidden mb-4">
          {displayImage ? (
            <Image 
              src={displayImage} 
              alt={spot.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">
              No Image
            </div>
          )}
        </div>
        
        {/* TEXT */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white">{spot.name}</h3>
          <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
            {spot.wifiSpeed} Mbps
          </span>
        </div>
        
        <p className="text-slate-400 text-sm">
          📍 {spot.location}
        </p>

        {/* Delete Button */}
        {showDelete && (
          <button 
            onClick={async (e) => {
              e.stopPropagation();
              e.preventDefault();
              if(confirm("Are you sure?")) {
                try{
                  await deleteSpot(spot.id);
                  alert("Spot deleted Successfuly");
                }
                catch (error) {
                  alert("Something went wrong. Please try again. ");
                  console.error(error);
                }
              }
            }}
            className="mt-4 w-full py-2 text-red-500 bg-red=500/10 hover:bg-red-500 hover:text-red-900 text-sm font-bold rounded-xl transition"
          >
            Delete Spot
          </button>
        )}
      </div>
    </Link>
  );
}