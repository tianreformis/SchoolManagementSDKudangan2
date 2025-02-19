"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
import { examSchema, ExamSchema, subjectSchema, SubjectSchema } from "@/lib/formValidationSchemas";
import { createExam, createSubject, updateExam, updateSubject } from "@/lib/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ExamForm = ({
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
  } = useForm<ExamSchema>({
    resolver: zodResolver(examSchema),
  });

  // AFTER REACT 19 IT'LL BE USEACTIONSTATE

  const [state, formAction] = useFormState(
    type === "create" ? createExam : updateExam,
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
      toast(`Exam has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { lessons } = relatedData;

  return <form className="flex flex-col gap-8" onSubmit={onSubmit}>
    <h1 className="text-xl font-semibold">{type === "create" ? "Buat Mata Tugas" : "Edit Tugas"}</h1>
    <span className="text-sm text-black font-bold ">Informasi Penting</span>
    <div className="flex jusify-between flex-wrap gap-4">
      <InputField
        type="text"
        name="name"
        label="Judul Tugas"
        register={register}
        defaultValue={data?.title}
        error={errors?.title}
      />
      <InputField
        name="startTime"
        label="Tanggal Mulai"
        register={register}
        defaultValue={data?.startTime}
        error={errors?.startTime}
        type="datetime-local"
      />
      <InputField
        name="endTime"
        label="Tanggal Selesai"
        register={register}
        defaultValue={data?.endTime}
        error={errors?.endTime}
        type="datetime-local"
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
        <label className="text-xs text-gray-500">Mapel</label>
        <select
          multiple
          className="ring-[1.5px] ring-gray-400 font-medium p-2 rounded-md text-sm w-full"
          {...register("lessonId")}
          defaultValue={data?.teachers}
        >
          {lessons.map((lesson: { id: number; name: string; }) =>
          (
            <option value={lesson.id} key={lesson.id}>
              {lesson.name}
            </option>
          )
          )}
          {errors.lessonId?.message &&
            <p className="text-xs text-red-400">
              {errors.lessonId.message.toString()}
            </p>}
        </select>
      </div>

    </div>
    {state.erorr && (
      <span className="text-xs text-red-500">Ada yang salah </span>
    )}
    <button className="bg-blue-400 rounded-md py-2 text-white hover:bg-blue-300">
      {type === "create" ? "Create" : "Update"}
    </button>

  </form>
}

export default ExamForm;
