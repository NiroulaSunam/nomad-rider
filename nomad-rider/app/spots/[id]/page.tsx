import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import NextImage from "next/image"; // Renamed to avoid Lucide conflict
import { Button } from "@/components/ui/button";
import { ChevronLeft, Wifi } from "lucide-react";

export default async function SpotDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const spot = await db.spot.findUnique({ where: { id: id } });

  if (!spot) notFound();

  // We use the DB URL, or a placeholder if the DB is empty.
  const finalImage = spot.imageUrl || "/placeholder-spot.jpg";

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/find-spots"> 
          <Button variant="ghost" className="mb-4 text-slate-400 hover:text-white">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to all spots
          </Button>
        </Link>

        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="relative w-full aspect-video lg:aspect-square rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            <NextImage 
              src={finalImage} 
              alt={spot.name}
              fill
              className="object-cover"
              priority 
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4">{spot.name}</h1>
            <p className="text-xl text-slate-400 mb-6 flex items-center gap-2">
              <span className="text-blue-500">📍</span> {spot.location}
            </p>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-400 font-medium">Verified Wi-Fi</span>
                <span className="text-green-400 font-bold text-2xl flex items-center gap-2">
                   <Wifi className="h-6 w-6" /> {spot.wifiSpeed} Mbps
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}