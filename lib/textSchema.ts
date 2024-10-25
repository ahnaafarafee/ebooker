import { z } from "zod";

export const textSchema = z.object({
  text: z
    .string({ message: "Text must be string" })
    .min(100, { message: "text must be at least 100 characters" }),
});
