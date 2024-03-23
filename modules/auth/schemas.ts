import { z } from "zod";

export const userSchema = z.object({
  nombre: z.string().min(2).max(255),
  contraseña: z.string().min(4).max(500),
});
export type userSchema = z.infer<typeof userSchema>;
