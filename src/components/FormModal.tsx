"use client"

import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useFormState } from "react-dom";
import { deleteClass, deleteExam, deleteParent, deleteStudent, deleteSubject, deleteTeacher } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FormContainerProps } from "./FormContainer";

const deleteActionMap = {
  subject: deleteSubject,
  assignment: deleteSubject,
  attendance: deleteSubject,
  class: deleteClass,
  event: deleteSubject,
  exam: deleteExam,
  lesson: deleteSubject,
  result: deleteSubject,
  student: deleteStudent,
  parent: deleteParent,
  teacher: deleteTeacher,
  announcement: deleteSubject,
}

const TeacherForm = dynamic(() => import("./Forms/TeacherForm"), {
  loading: () => <h1>loading...</h1>,
});
const StudentForm = dynamic(() => import("./Forms/StudentForms"), {
  loading: () => <h1>loading...</h1>,
});
const SubjectForm = dynamic(() => import("./Forms/SubjectForm"), {
  loading: () => <h1>loading...</h1>,
});
const ClassForm = dynamic(() => import("./Forms/ClassForm"), {
  loading: () => <h1>loading...</h1>,
});
const ExamForm = dynamic(() => import("./Forms/ExamForm"), {
  loading: () => <h1>loading...</h1>,
});
const ParentForm = dynamic(() => import("./Forms/ParentForm"), {
  loading: () => <h1>loading...</h1>,
});
const AnnouncementForm = dynamic(() => import("./Forms/AnnouncementForm"));
const AssginmentForm = dynamic(() => import("./Forms/AssignmentForm"));
const AttendaceForm = dynamic(() => import("./Forms/AtterndanceForm"));
const EventForm = dynamic(() => import("./Forms/EventForm"));
const LessonForm = dynamic(() => import("./Forms/LessonForm"));
const ResultForm = dynamic(() => import("./Forms/ResultForm"));



const forms: {
  [key: string]: (
    setOpen: Dispatch<SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any,
    relatedData?: any,

  ) => JSX.Element;
} = {


  announcement: (setOpen, type, data) => <AnnouncementForm type={type} data={data} />,
  assignment: (setOpen, type, data) => <AssginmentForm type={type} data={data} />,
  attendace: (setOpen, type, data) => <AttendaceForm type={type} data={data} />,

  event: (setOpen, type, data) => <EventForm type={type} data={data} />,

  lesson: (setOpen, type, data) => <LessonForm type={type} data={data} />,
  // result: (setOpen, type, data) => <ResultForm type={type} data={data} relatedData={relatedData} />,

  student: (setOpen, type, data, relatedData) =>
    <StudentForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />,
  subject: (setOpen, type, data, relatedData) => (
    <SubjectForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  class: (setOpen, type, data, relatedData) =>
    <ClassForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />,
  teacher: (setOpen, type, data, relatedData) =>
    <TeacherForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />,
  exam: (setOpen, type, data, relatedData) =>
    <ExamForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />,
  parent: (setOpen, type, data, relatedData) =>
    <ParentForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />,

  //...more form components for other tables...
}

const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData,
}:
  FormContainerProps & { relatedData?: any }
) => {
  const size = type === "create" ? "h-8 w-8" : "h-7 w-7";
  const bgcolor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
        ? "bg-lamaSky"
        : "bg-lamaPurple";

  const [open, setOpen] = useState(false);

  const Form = () => {
    const [state, formAction] = useFormState(deleteActionMap[table], {
      success: false,
      error: false,
    });

    const router = useRouter();

    useEffect(() => {
      if (state.success) {
        toast(`${table === "subject" ? "Mata pelajaran" : table} sudah dihapus!`);
        setOpen(false);
        router.refresh();
      }
      else if (state.error) {
        toast.error("Gagal menghapus data");
        setOpen(false);
        router.refresh();
      }

    }, [state, router]);

    return type === "delete" && id ? (
      <form action={formAction} className="p-4 flex flex-col gap-4">
        <input type="text | number" name="id" value={id} hidden />
        <span className="text-center font-medium">
          Apakah ingin menghapus {table === "subject" ? "Mata Pelajaran" : table}?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">Hapus...</button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](setOpen, type, data, relatedData)
    ) : (
      "Forms not found"
    )
  }

  return <>
    <button className={`${size} flex items-center justify-center rounded-full ${bgcolor}`}
      onClick={() => setOpen(true)}
    >
      <Image
        src={`/${type}.png`}
        alt=""
        width={16}
        height={16}
      />
    </button>
    {open && (
      <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50] 2xl:w-[40%]">
          <Form />
          <div className="absolute right-4 top-4 cursor-pointer rounded-full p-2 hover:bg-red-200" onClick={() => setOpen(false)}>
            <Image
              src="/close.png"
              alt=""
              width={14}
              height={14}
            />
          </div>

        </div>
      </div>
    )}
  </>
}

export default FormModal;