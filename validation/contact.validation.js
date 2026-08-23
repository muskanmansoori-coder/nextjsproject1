import { z } from "zod";

export const contactsSchema = z.object({
  username: z
    .string({ error: "Username is required" })
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters")
    .trim(),

  email: z
    .string({ error: "Email is required" })
    .email("Invalid email address")
    .trim(),

  message: z
    .string({ error: "Message is required" })
    .min(3, "Message must be at least 3 characters")
    .max(500, "Message must not exceed 500 characters")
    .trim(),
});