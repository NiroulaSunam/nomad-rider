import { db } from '@/lib/db';
import Hero from '@/components/Hero'; 
import { Spotcard } from '@/components/Spotcard';


export default async function Home() {
  // Fetch the data from the 'Librarian'
  // to fetch all spots: const spots = await getAllSpots(); (import getAllSpots)
  const recentSpots = await db.spot.findMany({
    orderBy: {
      createdAt: 'desc', // Get the newest spots first
    },
    take: 3, 
  });

  return (
    <div>
      <Hero /> 
      <section className="max-w-7xl mx-auto px-6 py-2">
        <h2 className="text-2xl font-bold mb-6 text-white">Recent Spots</h2>
        
        {/* Loop through the spots and create a card for each one */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentSpots.map((spot) => (
            <Spotcard key={spot.id} spot={spot} />
          ))}
        </div>
      </section>
      </div>
  );
}
