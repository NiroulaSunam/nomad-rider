import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function SpotDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrapping the ID from the URL 
  const { id } = await params;

  // Fetching ONLY this specific spot from the Database
  const spot = await db.spot.findUnique({
    where: { id: id },
  });

  // If the ID doesn't exist, show the 404 page
  if (!spot) {
    notFound();
  }

  // fallback logic to get back to the image if there are no working image link 
  const fallbackImage = "https://images.unsplash.com/photo-1497366216548-37526070297c";

  // check if its a real Unsplash URL
  const isTrusted = spot.imageUrl?.includes("images.unsplash.com");
  const finalImage = isTrusted && spot.imageUrl ? spot.imageUrl : fallbackImage;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/find-spots" 
          className="text-slate-400 hover:text-blue-500 mb-8 inline-block transition"
        >
          ← Back to all spots
        </Link>

        {/* Hero Section for the Spot */}
        <div className="relative w-full h-75 md:h-112.5 rounded-3xl overflow-hidden border border-slate-800 mb-8">
          <div>
            <Image 
              src={finalImage} 
              alt={spot.name}
              fill // Tells it to fill the blue container above
              className="rounded-3xl w-full aspect-video object-cover border border-slate-800 shadow-2xl"
              priority // makes the image the main priority so it starts downlading the very instant the user clicks the link
            />
          </div>

            {/* Text Content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4">{spot.name}</h1>
            <p className="text-xl text-slate-400 mb-6 flex items-center gap-2">
              <span className="text-blue-500">📍</span> {spot.location}
            </p>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-400 font-medium">Verified Wi-Fi</span>
                <span className="text-green-400 font-bold text-2xl">{spot.wifiSpeed} Mbps</span>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold transition">
                I&apos;m here! Update Speed
              </button>
            </div>
          </div>
        </div>

        {/* Room for Additional content later */}
        <div className="mt-12 border-t border-slate-900 pt-8">
          <h2 className="text-2xl font-semibold mb-4">About this Spot</h2>
          <p className="text-slate-400 leading-relaxed">
            This location has been verified by the Nomad Rider network. Perfect for remote work with power access and a bike-friendly atmosphere.
            (More detailed descriptions coming soon!)
          </p>
        </div>
      </div>
    </main>
  );
}