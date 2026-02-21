import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Spotcard } from "@/components/Spotcard";

export default async function MySpotsSpage() {
    // Get userId from Clerk
    const { userId } = await auth();

    // If no user is logged in, send them to login
    if (!userId) {
        redirect('/sign-in');
    }

    // Get only the spots that belongs to this user 
    const mySpots = await db.spot.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return (
        <main className="max-w-7xl mx-auto px-6 py-10">
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold text-white"> My Spots </h1>
                <p className="text-slate-400 mt-2">
                    You have shared {mySpots.length} locations with the community.
                </p>
            </div>

            {mySpots.length == 0 ? (
                // Empty slate if nothing is added
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center">
                    <h2 className="text-xl font-semibold text-white"> No spots found </h2>
                    <p className= "text-slate-400 mb-6">You haven&apos;t shared any spots yet. </p>
                    <a
                        href="/add-spot"
                        className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition"
                    >
                        Add your first spot
                    </a>
                </div>
            ): (
                // Reusing existing Spotcard
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mySpots.map((spot)=> (
                        <Spotcard key={spot.id} spot={spot} showDelete={true} />
                    ))}
                </div>
            )}
        </main>
    );
}