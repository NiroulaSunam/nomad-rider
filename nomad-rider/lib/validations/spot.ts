import { z } from "zod";

export const spotSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  location: z.string().min(3, { message: "Please tell us where this is" }),
  wifiSpeed: z.coerce.number().min(1, { message: "Speed must be at least 1" }),
  imageUrl: z.string().min(1, {message: "Please upload an image" })
});