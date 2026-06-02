import { z } from "zod";

export const vehicleSchema = z.object({
  brand: z
    .string()
    .trim()
    .min(2, "Brand must be at least 2 characters")
    .max(20, "Brand must be at most 20 characters")
    .transform((v) => v.toLowerCase()),

  model: z
    .string()
    .trim()
    .min(2, "Model must be at least 2 characters")
    .max(20, "Model must be at most 20 characters"),

  category: z.string().trim().min(1, "Please select category"),

  registration: z.string().trim().min(1, "Required"),

  fuel: z.string().trim().min(1, "Required"),

  transmission: z.string().trim().min(1, "Required"),

  price: z.coerce
    .number()
    .int("Price must be a whole number")
    .positive("Price must be greater than 0"),

  city: z.string().trim().min(2, "Required"),

  description: z
    .string()
    .trim()
    .max(1000, "Description too long")
    .optional()
    .transform((value) => value || ""),

  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),

  whatsapp: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "WhatsApp number must be 10 digits"),

  seller: z
    .string()
    .trim()
    .min(2, "Seller name must be at least 2 characters")
    .max(18, "Seller name must be at most 18 characters"),
});

export const uploadedImageSchema = z.object({
  url: z.string().url(),
  path: z.string().min(1),
  order: z.number().int().nonnegative(),
});

export const publishVehicleSchema = z.object({
  vehicle: vehicleSchema,
  images: z
    .array(uploadedImageSchema)
    .min(1, "Upload at least one photo")
    .max(5, "Maximum 5 photos allowed"),
});
