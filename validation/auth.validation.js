import { z } from "zod";

 export const registerSchema = z.object({
  username: z
    .string({
      error: "Username is required",
    })
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters")
    .trim(),

  email: z
    .string({
      error: "Email is required",
    })
    .email("Invalid email address")
    .trim(),

  phone: z
    .string({
      error: "Phone number is required",
    })
    .trim()
    .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),

  password: z
    .string({
      error: "Password is required",
    })
    .trim()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must not exceed 50 characters"),
});


//login
export  const loginSchema = z.object({
    email: z
      .string({
        error: "Email is required",
      })
      .email("Invalid email address")
      .trim(),
    password: z
      .string({
        error: "Password is required",
      })
      .trim()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must not exceed 50 characters"),
  });

  //update uer
  export const updateUserSchema = z.object({
    username: z
    .string({
      error: "Username is required",
    })
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters")
    .trim(),

  email: z
    .string({
      error: "Email is required",
    })
    .email("Invalid email address")
    .trim(),

  phone: z
    .string({
      error: "Phone number is required",
    })
    .trim()
    .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  })
 