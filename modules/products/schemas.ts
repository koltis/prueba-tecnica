import { z } from "zod";

export const productoSchema = z.object({
  titulo: z.string().min(4).max(255),
  estado: z.enum(["stock", "no stock"]),
  descripcion: z.string().min(6).max(500),
});
export type productoSchema = z.infer<typeof productoSchema>;
