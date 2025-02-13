import { z } from "zod";


// Function to check if a password has been pwned using the Have I Been Pwned AP
export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(3, { message: "Subject name is required" }),
  teachers: z.array(z.string())
});

export type SubjectSchema = z.infer<typeof subjectSchema>;

export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Nama Kelas dibutuhkan" }),
  capacity: z.coerce.number().min(1, { message: "Kapasitas dibutuhkan" }),
  gradeId: z.coerce.number().min(1, { message: "Tingkatan Kelas dibutuhkan" }),
  supervisorId: z.coerce.string().optional(),
});

export type ClassSchema = z.infer<typeof classSchema>;

//adding password not required
export const teacherschema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username atleast 3 characters" })
    .max(20, { message: "Username max 20 characters" }),
  password: z
    .string()
    .min(8, { message: "Kata Sandi setidaknya 8 karakter" }).optional()
    .or(z.literal("")),
  email: z
    .string()
    .email({ message: "Invalid Email Address" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(3, { message: "First Name must be 3 characters" }),
  surname: z.string().min(3, { message: "Last Name must be 3 characters" }),
  phone: z.string().optional(),
  address: z.string(),
  bloodType: z.string().min(1, { message: "Blood Type is Required" }),
  birthday: z.coerce.date({ message: "Birthday is Required" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is Required" }),
  img: z.string().optional(),
  subjects : z.array(z.string(  
  )).optional(),//will store obj ids
});

export type TeacherSchema = z.infer<typeof teacherschema>;