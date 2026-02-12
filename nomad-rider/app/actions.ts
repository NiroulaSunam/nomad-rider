"use server"

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export async function createSpot(data: { 
  name: string; 
  location: string; 
  wifiSpeed: number; 
  imageUrl?: string 
}) {
  try {
    // get userid from clerk. 
    const { userId } = await auth();

    // security check: if not logged in, userid will be null
    if (!userId) {
      return {success: false, error: "Authentication required."};
    }

    const newSpot = await prisma.spot.create({
      data: {
        name: data.name,
        location: data.location,
        wifiSpeed: data.wifiSpeed,
        imageUrl: data.imageUrl || "https://images.unsplash.com/photo-1497366216548-37526070297c",
      },
    });

    revalidatePath("/");
    return { success: true, spot: newSpot };
  } catch (error) {
    console.error("DATABASE_ERROR:", error);
    return { success: false, error: "Failed to save to database." };
  }
}