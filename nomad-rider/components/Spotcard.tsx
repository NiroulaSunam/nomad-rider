"use client";

import { Spot } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

interface SpotcardProps {
  spot: Spot;
}

export function Spotcard({ spot }: SpotcardProps) {
  const fallbackImage = "https://images.unsplash.com/photo-1497366216548-37526070297c";

  //Define who we trust (e.g., Unsplash)
  const isTrustedSource = (url: string | null) => {
    if (!url) return false;
    // Only allow Unsplash images for now
    return url.includes("images.unsplash.com");
  };

  // Decide the source BEFORE passing it to the <Image /> component
  // If it's not from Unsplash, we use fallback immediately to prevent the crash
  const initialImage = isTrustedSource(spot.imageUrl) 
    ? spot.imageUrl! 
    : fallbackImage;

  const [imgSrc, setImgSrc] = useState(initialImage);

  return (
    <Link href={`/spots/${spot.id}`} className="group">
      <div className ="group cursor-pointer bg-slate-900 border border-slate-800 p-4 rounded-2xl hover:border-blue-500 transition-all duration-300"> 
        <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
          <Image 
            src={imgSrc} 
            alt={spot.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            // This handles cases where even Unsplash links are dead/broken
            onError={() => setImgSrc(fallbackImage)}
          />
        </div>
        
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-white">{spot.name}</h3>
            <span className="flex items-center bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-semibold border border-green-100">
              {spot.wifiSpeed} Mbps
            </span>
          </div>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            <span className="opacity-70">📍</span> {spot.location}
          </p>
        </div>
      </div>
    </Link>
  );
}