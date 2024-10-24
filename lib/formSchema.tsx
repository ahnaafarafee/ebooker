import { z } from "zod";

export const formSchema = z.object({
  title: z
    .string({ message: "Title must be string" })
    .min(3, { message: "Title must be at least 3 characters" })
    .max(100, {
      message: "Title must be at most 100 characters",
    }),
  wordCount: z.string(),
  age: z.string(),
  theme: z
    .string()
    .min(3, { message: "Theme must be at least 3 characters" })
    .max(30, { message: "Theme must be at most 30 characters" }),
  prompt: z
    .string({ message: "Prompt must be string" })
    .min(3, { message: "Prompt must be at least 3 characters" }),
});
