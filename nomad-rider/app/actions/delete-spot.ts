"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSpot(spotId:string) {
    const { userId } = await auth();

    if (!userId) throw new Error("Unauthorized");

    // Ensure User A cannot delete User B's spot by guessing the ID
    await db.spot.delete({
        where: {
            id: spotId,
            userId: userId,
        },
    });
    
    // clear 'cache' so the spot disappears from the list immediately
    revalidatePath("/my-spots");
    revalidatePath("/");
}