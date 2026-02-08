import { db } from "@/lib/db";
import SearchResults from "./SearchResults";

export default async function FindSpotsPage() {
  // Ensure the DB call doesn't return null
  const allSpots = await db.spot.findMany({
    orderBy: { createdAt: 'desc' }
  }) || []; 

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Find <span className="text-blue-500">Spots</span></h1>
          <p className="text-slate-400">Discover the best places to work and ride.</p>
        </header>
        
        <SearchResults initialSpots={allSpots} />
      </div>
    </main>
  );
}