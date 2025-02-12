"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { teacherschema, TeacherSchema } from "@/lib/formValidationSchemas";
import { useFormState } from "react-dom";
import { createTeacher, updateTeacher } from "@/lib/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from 'next-cloudinary';




const TeacherForms = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update",
  data?: any,
  setOpen: Dispatch<SetStateAction<boolean>>
  relatedData?: any,
}) => {


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeacherSchema>({
    resolver: zodResolver(teacherschema),
  })

  const [img, setImg] = useState<any>();

  const [state, formAction] = useFormState(
    type === "create" ? createTeacher : updateTeacher,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    formAction({...data, img: img?.secure_url});
  });

  const router = useRouter();
  useEffect(() => {
    if (state.success) {
      toast.success(`Guru selesai di ${type === "create" ? "Tambahkan" : "Edit"}`);
      setOpen(false);
      router.refresh();
    }


  }, [state, type, setOpen, router]);

  const { subjects } = relatedData;

  return <form className="flex flex-col gap-8" onSubmit={onSubmit}>
    <h1 className="text-xl font-semibold">{type === "create" ? "Tambah Guru" : "Edit Guru"}</h1>
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
        name="name"
        label="First Name"
        register={register}
        defaultValue={data?.name}
        error={errors?.name}
      />
      <InputField
        type="text"
        name="surname"
        label="Last Name"
        register={register}
        defaultValue={data?.surname}
        error={errors?.surname}
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
        name="birthday"
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
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          {errors.sex?.message &&
            <p className="text-xs text-red-400">
              {errors.sex.message.toString()}
            </p>}
        </select>
      </div>

      <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label className="text-xs text-gray-500">Subjects</label>
        <select
          multiple
          className="ring-[1.5px] ring-gray-400 font-medium p-2 rounded-md text-sm w-full"
          {...register("subjects")}
          defaultValue={data?.subjects}
        >
          {subjects.map((subject: { id: number, name: string }) => (
            <option value={subject.id} key={subject.id}>
              {subject.name}
            </option>
          ))}

        </select>
        {errors.subjects?.message &&
          <p className="text-xs text-red-400">
            {errors.subjects.message.toString()}
          </p>}

      </div>

      {/* <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
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
      </div> */}
      <CldUploadWidget
        uploadPreset="school"
        onSuccess={(result, { widget }) => {
          setImg(result.info)
          widget.close()
        }}
      >
        {({ open }) => {
          return (
            <div className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer" onClick={() => open()}>
              <Image src="/upload.png" alt="" width={28} height={28} />
              <span>Upload a photo</span>
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
    {state.erorr && (
      <span className="text-xs text-red-500">Ada yang salah </span>
    )}
    <button className="bg-blue-400 rounded-md py-2 text-white hover:bg-blue-300">
      {type === "create" ? "Create" : "Update"}
    </button>

  </form>
}

export default TeacherForms;