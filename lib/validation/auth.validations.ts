import { z } from 'zod';

// This file centralizes all authentication-related validation schemas using Zod

export const signUpSchema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters long.'),
    email: z.string().email('Invalid email address.'),
    password: z.string().min(8, 'Password must be at least 8 characters long.'),
    confirmPassword: z.string(),
    birthDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid birth date format.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'], // Path to field to attach the error to
  });

export const loginSchema = z.object({
  email: z.string().email('Invalid email address.'),
  password: z.string().min(1, 'Password is required.'), // min(1) to check for non-empty
});
