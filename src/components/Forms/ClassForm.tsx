"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
import { ClassSchema, classSchema, subjectSchema, SubjectSchema } from "@/lib/formValidationSchema";
import { createClass, createSubject, updateClass, updateSubject } from "@/lib/action";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ClassForm = ({
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
  } = useForm<ClassSchema>({
    resolver: zodResolver(classSchema),
  })

  // After React 19 it ill be UseActionState
  const [state, formAction] = useFormState(
    type === "create" ? createClass : updateClass,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    formAction(data);
  });

  const router = useRouter();
  useEffect(() => {
    if (state.success) {
      toast.success(`Mapel selesai di ${type === "create" ? "Buat" : "Edit"}`);
      setOpen(false);
      router.refresh();
    }


  }, [state, type, setOpen, router]);

  const { teachers, grades } = relatedData

  return <form className="flex flex-col gap-8" onSubmit={onSubmit}>
    <h1 className="text-xl font-semibold">{type === "create" ? "Buat Kelas Baru" : "Edit Kelas"}</h1>
    <span className="text-sm text-black font-bold ">Informasi Penting</span>
    <div className="flex jusify-between flex-wrap gap-4">
      <InputField
        name="name"
        label="Nama Kelas"
        register={register}
        defaultValue={data?.name}
        error={errors?.name}
      />
      <InputField
        type="text"
        name="capacity"
        label="Class Name"
        register={register}
        defaultValue={data?.capacity}
        error={errors?.capacity}
      />
      {data && (
        <InputField
          name="id"
          label="Id"
          register={register}
          defaultValue={data?.id}
          error={errors?.id}
          hidden
        />
      )}
      <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label className="text-xs text-gray-500">Wali Kelas</label>
        <select
          className="ring-[1.5px] ring-gray-400 font-medium p-2 rounded-md text-sm w-full"
          {...register("supervisorId")}
          defaultValue={data?.teachers}
        >
          {teachers.map((teacher: { id: string; name: string; surname: string }) =>
          (
            <option value={teacher.id} key={teacher.id}>
              {teacher.name + " " + teacher.surname}
            </option>
          )
          )}

          {errors.supervisorId?.message &&
            <p className="text-xs text-red-400">
              {errors.supervisorId.message.toString()}
            </p>}
        </select>
      </div>
      <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label className="text-xs text-gray-500">Tingkatan</label>
        <select
          className="ring-[1.5px] ring-gray-400 font-medium p-2 rounded-md text-sm w-full"
          {...register("supervisorId")}
          defaultValue={data?.gradeId}
        >
          {grades.map(
            (grade: { id: number; level: number }) =>
            (
              <option value={grade.id} key={grade.id}>
                {grade.level}
              </option>
            )
          )}

          {errors.supervisorId?.message &&
            <p className="text-xs text-red-400">
              {errors.supervisorId.message.toString()}
            </p>}
        </select>
      </div>

    </div>
    {state.erorr && <span className="text-xs text-red-500">Ada yang salah </span>}
    <button className="bg-blue-400 rounded-md py-2 text-white hover:bg-blue-300">
      {type === "create" ? "Create" : "Update"}
    </button>

  </form>
}

export default ClassForm;
