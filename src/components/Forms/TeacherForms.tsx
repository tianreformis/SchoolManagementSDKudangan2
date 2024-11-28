"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username atleast 3 characters" })
    .max(20, { message: "Username max 20 characters" }),
  email: z.string().email({ message: "Invalid Email Address" }),
  password: z.string().min(8, { message: "Password must be 8 characters" }),
  firstName: z.string().min(3, { message: "First Name must be 3 characters" }),
  lastName: z.string().min(3, { message: "Last Name must be 3 characters" }),
  phone: z.string().min(10, { message: "Phone is Required" }),
  address: z.string().min(1, { message: "Address is Required" }),
  birthday: z.date({ message: "Birthday is Required" }),
  sex: z.enum(["Male", "Female"], { message: "Sex is Required" }),
  img: z.instanceof(File, { message: "Image is Required" }),


})

const TeacherForms = ({
  type,
  data
}: {
  type: "create" | "update"
  data?: any
}) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })
  return <form></form>
}

export default TeacherForms