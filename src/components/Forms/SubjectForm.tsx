"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import InputField from "../InputField";
import Image from "next/image";
import { subjectSchema, SubjectSchema } from "@/lib/formValidationSchema";
import { createSubject } from "@/lib/action";




const SubjectForms = ({
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
  } = useForm<SubjectSchema>({
    resolver: zodResolver(subjectSchema),
  })

  const onSubmit = handleSubmit(data => {
    createSubject(data);
  });
  return <form className="flex flex-col gap-8" onSubmit={onSubmit}>
    <h1 className="text-xl font-semibold">{type === "create" ? "Buat Mata Pelajaran Baru" : "Edit Mata Pelajaran"}</h1>
    <span className="text-sm text-black font-bold ">Informasi Penting</span>
    <div className="flex jusify-between flex-wrap gap-4">
      <InputField
        type="text"
        name="name"
        label="Nama Mata Pelajaran"
        register={register}
        defaultValue={data?.name}
        error={errors?.name}
      />
    </div>

    <button className="bg-blue-400 rounded-md py-2 text-white hover:bg-blue-300">
      {type === "create" ? "Create" : "Update"}
    </button>

  </form>
}

export default SubjectForms;