"use client"
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
  data: any;
  id: number;
}) => {
  return (
    <div>FormModal</div>
  )
}

export default FormModal