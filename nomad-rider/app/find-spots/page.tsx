// app/find-spots/page.tsx
import { db } from "@/lib/db";
import SearchResults from "./SearchResults";

export default async function FindSpotsPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const allSpots = await db.spot.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const initialQuery = searchParams.q || ""; // This was "unused"

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Explore Spots</h1>
        
        {/* WE USE IT HERE: This connects the URL to the search results */}
        <SearchResults initialSpots={allSpots} defaultQuery={initialQuery} />
      </div>
    </main>
  );
}