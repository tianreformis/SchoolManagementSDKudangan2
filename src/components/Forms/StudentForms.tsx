"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import InputField from "../InputField";
import Image from "next/image";
import { studentSchema, StudentSchema } from "@/lib/formValidationSchemas";
import { Dispatch, SetStateAction } from "react";




const StudentForms = ({
 type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentSchema>({
    resolver: zodResolver(studentSchema),
  })

  const onSubmit = handleSubmit(data => {
    console.log(data);
  });
  return <form className="flex flex-col gap-8" onSubmit={onSubmit}>
    <h1 className="text-xl font-semibold">Create a new Student</h1>
    <span className="text-sm text-black font-bold ">Authenticantion Information</span>
    <div className="flex jusify-between flex-wrap gap-4">
      <InputField
        type="text"
        name="username"
        label="Username"
        register={register}
        defaultValue={data?.username}
        error={errors?.username}
      />
      <InputField
        type="email"
        name="email"
        label="Email"
        register={register}
        defaultValue={data?.email}
        error={errors?.email}
      />
      <InputField
        type="password"
        name="password"
        label="Password"
        register={register}
        defaultValue={data?.password}
        error={errors?.password}
      />
    </div>

    <span className="text-sm text-black font-bold ">Personal Information</span>
    <div className="flex jusify-between flex-wrap gap-4">
      <InputField
        type="text"
        name="firstName"
        label="First Name"
        register={register}
        defaultValue={data?.firstName}
        error={errors?.firstName}
      />
      <InputField
        type="text"
        name="lastName"
        label="Last Name"
        register={register}
        defaultValue={data?.lastName}
        error={errors?.lastName}
      />
      <InputField
        type="text"
        name="phone"
        label="Phone"
        register={register}
        defaultValue={data?.phone}
        error={errors?.phone}
      />

      <InputField
        type="text"
        name="address"
        label="Address"
        register={register}
        defaultValue={data?.address}
        error={errors?.address}
      />
      <InputField
        type="text"
        name="bloodType"
        label="Blood Type"
        register={register}
        defaultValue={data?.bloodType}
        error={errors?.bloodType}
      />
      <InputField
        type="date"
        name="birthDay"
        label="Birth Day"
        register={register}
        defaultValue={data?.birthday}
        error={errors?.birthday}
      />
    

    <div className="flex flex-col gap-2 w-full md:w-1/4">
      <label className="text-xs text-gray-500">Sex</label>
      <select
        className="ring-[1.5px] ring-gray-400 font-medium p-2 rounded-md text-sm w-full"
        {...register("sex")}
        defaultValue={data?.sex}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        {errors.sex?.message &&
          <p className="text-xs text-red-400">
            {errors.sex.message.toString()}
          </p>}
      </select>
    </div>

      <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
        <label className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer" htmlFor="img">
          <Image
            src="/upload.png"
            alt=""
            width={32}
            height={32}
          />
          <span>Upload a photo</span>
        </label>
        <input type="file"
          id="img"
          className="hidden"
          {...register("img")}
        />
        {errors.img?.message &&
          <p className="text-xs text-red-400">
            {errors.img.message.toString()}
          </p>}
      </div>
      </div>
    





    <button className="bg-blue-400 rounded-md py-2 text-white hover:bg-blue-300">
      {type === "create" ? "Create" : "Update"}
    </button>

  </form>
}

export default StudentForms;