import Hero from '@/components/Hero'; 
import Navbar from '@/components/Navbar';
import { Spotcard } from '@/components/Spotcard';
import { getAllSpots } from '@/lib/services/spots'; // Import the service of spots

export default async function Home() {
  // Fetch the data from the 'Librarian'
  const spots = await getAllSpots();

  return (
    <div>
      <Navbar />
      <Hero /> 
      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">Recent Spots</h2>
        
        {/* Loop through the spots and create a card for each one */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {spots.map((spot) => (
            <Spotcard key={spot.id} spot={spot} />
          ))}
        </div>
      </section>
      </div>
  );
}
