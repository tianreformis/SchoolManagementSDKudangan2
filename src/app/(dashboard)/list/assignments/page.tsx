import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { assignmentsData, examsData, lessonsData, role } from "@/lib/data"
import { headers } from "next/headers"
import Image from "next/image"
import Link from "next/link"

type Assignment = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  dueDate : string;
}

const columns = [
  {
    header: "Mata Pelajaran",
    accessor: "subject",
  },
  {
    header: "Kelas",
    accessor: "class",
  },
  {
    header: "Guru",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Tenggat Waktu",
    accessor: "dueDate",
    className: "hidden md:table-cell",
  },
  {
    header: "Aksi",
    accessor: "action",
  },

]
const AssignmentListsPage = () => {

  const renderRow = (item: Assignment) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="flex items-center gap-4 p-4">      {item.subject}</td>
      <td>{item.class}</td>
      <td className="hidden md:table-cell hover:underline">{item.teacher}</td> 
      
      <td className="hidden md:table-cell hover:underline">{item.dueDate}</td> 
      <td>
        <div className="flex items-center gap-2">
          <Link href={`list/teachers/${item.id}`} >
            <button className="h-7 w-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/edit.png" alt="" width={16} height={16} className="w-5 h-5" />
            </button>
          </Link>
          {role === "admin" && (
            <button className="h-7 w-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/delete.png" alt="" width={16} height={16} className="w-5 h-5" />
            </button>
          )}


        </div>
      </td>


    </tr >
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Assignment</h1>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                <Image src="/plus.png" alt="" width={14} height={14} />
              </button>
            )}



          </div>
        </div>
      </div>

      {/* List */}
      <Table
        columns={columns}
        renderRow={renderRow}
        data={assignmentsData}
      />
      {/* Pagination */}
      <Pagination />

    </div>
  )
}

export default AssignmentListsPage;