import { z } from "zod";

export const spotSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  location: z.string().min(3, { message: "Please tell us where this is" }),
  wifiSpeed: z.coerce.number().min(1, { message: "Speed must be at least 1" }),
  
  // Revised Smart Image URL
  imageUrl: z
    .string()
    .trim()
    .toLowerCase() // Optional: keeps your DB clean
    .transform((val) => {
      // If the field is empty, return an empty string immediately
      if (!val) return "";
      // If it's missing http/https, add it
      if (!val.startsWith("http://") && !val.startsWith("https://")) {
        return `https://${val}`;
      }
      return val;
    })
    // We use a custom refinement instead of .url() to allow empty strings without error
    .refine((val) => {
      if (val === "") return true; // Allow empty
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    }, { message: "That is not a valid link" })
});