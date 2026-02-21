"use client";

import { Spot } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface SpotcardProps {
  spot: Spot;
}

export function Spotcard({ spot }: SpotcardProps) {
   
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
      </div>
    </Link>
  );
}