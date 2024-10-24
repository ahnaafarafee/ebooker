import { z } from "zod";

export const formSchema = z.object({
  prompt: z
    .string({ message: "Prompt must be string" })
    .min(3, { message: "Prompt must be at least 3 characters" }),
});
