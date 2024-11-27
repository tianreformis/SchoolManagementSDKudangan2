"use client"

import Image from "next/image";

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


  return <>
    <button className={`${size} flex items-center justify-center rounded-full ${bgcolor}`}>
      <Image
        src={`/${type}.png`}
        alt=""
        width={16}
        height={16}
      />
    </button>
  </>
}



export default FormModal;