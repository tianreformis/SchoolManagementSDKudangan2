"use client"

import Image from "next/image";
import { useState } from "react";
import TeacherForms from "./Forms/TeacherForms";
import StudentForms from "./Forms/StudentForms";

const forms : {
  [key:string] : (type:"create"|"update", data?:any) => JSX.Element;
} = {
  teacher: (type,data )=> <TeacherForms type={type} data={data}/>,
  student: (type,data )=> <StudentForms type={type} data={data}/>,
}

const FormModal = ({ table, type, data, id }: {
  table:
  | "teacher"
  | "student"
  | "parent"
  | "subject"
  | "class"
  | "lesson"
  | "exam"
  | "assignment"
  | "result"
  | "attendance"
  | "event"
  | "announcement";
  type: "update" | "delete" | "create";
  data?: any; //data akan fetch dari database

  id?: number;
}) => {
  const size = type === "create" ? "h-8 w-8" : "h-7 w-7";
  const bgcolor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
        ? "bg-lamaSky"
        : "bg-lamaPurple";

  const [open, setOpen] = useState(false);

  const Form = () => {
    return type === "delete" && id ? (
      <form action="" className="p-4 flex flex-col gap-4">

        <span className="text-center font-medium">All data will be lost. Are you sure to delete this {table}?</span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">Delete...</button>

      </form>
    ) : type ==="create" || type==="update" ? (
      forms[table](type, data)
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