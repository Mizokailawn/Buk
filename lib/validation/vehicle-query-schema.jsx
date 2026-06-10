import { z } from "zod";

export const vehicleQuerySchema = z.object({
  cursor: z.coerce
    .number()
    .int()
    .min(0)
    .default(0),

  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(24)
    .default(12),
});