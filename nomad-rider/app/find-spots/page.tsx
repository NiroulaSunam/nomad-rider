// app/find-spots/page.tsx
import { db } from "@/lib/db";
import SearchResults from "./SearchResults";
import Link from "next/link";

export default async function FindSpotsPage({
  searchParams,
}: {
  searchParams:Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const initialQuery = params.q || "";

  const allSpots = await db.spot.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Explore Spots</h1>
        
        {/* WE USE IT HERE: This connects the URL to the search results */}
        <SearchResults initialSpots={allSpots} defaultQuery={initialQuery} />
      </div>
    </main>
  );

  if (allSpots.length === 0) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h2 className="text-2xl font-bold text-white mb-2">No spots found yet</h2>
      <p className="text-slate-400 mb-6">Be the first to add a secret nomad location!</p>
      <Link href="/add-spot" className="bg-blue-600 px-6 py-3 rounded-xl font-bold">
        Add First Spot
      </Link>
    </div>
  );
}
}