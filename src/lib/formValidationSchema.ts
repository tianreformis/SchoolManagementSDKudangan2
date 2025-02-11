import { z } from "zod";

export const subjectSchema = z.object({
  name: z.string().min(3, { message: "Subject name is required" }),
});

export type SubjectSchema = z.infer<typeof subjectSchema>;