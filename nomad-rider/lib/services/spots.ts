// lib/services/spots.ts
import prisma from "@/lib/db";

export async function getAllSpots() {
  try {
    return await prisma.spot.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Failed to fetch spots:", error);
    throw new Error("Database fetch failed");
  }
}

export async function getSpotById(id: string) {
  return await prisma.spot.findUnique({
    where: { id },
  });
}