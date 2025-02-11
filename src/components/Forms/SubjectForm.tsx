"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
import { subjectSchema, SubjectSchema } from "@/lib/formValidationSchema";
import { createSubject, updateSubject } from "@/lib/action";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SubjectForms = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update"
  data?: any,
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectSchema>({
    resolver: zodResolver(subjectSchema),
  })

  // After React 19 it ill be UseActionState
  const [state, formAction] = useFormState(
    type === "create" ? createSubject : updateSubject,
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
    {state.erorr && <span className="text-xs text-red-500">Ada yang salah </span>}
    <button className="bg-blue-400 rounded-md py-2 text-white hover:bg-blue-300">
      {type === "create" ? "Create" : "Update"}
    </button>

  </form>
}

export default SubjectForms;
