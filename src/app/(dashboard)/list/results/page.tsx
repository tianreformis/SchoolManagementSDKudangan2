import FormModal from "@/components/FormModal"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { assignmentsData, examsData, lessonsData, resultsData, role } from "@/lib/data"
import { headers } from "next/headers"
import Image from "next/image"
import Link from "next/link"

type Result = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  student:string
  type:"exam" | "assignment"
  date:string;
  score:number;
}

const columns = [
  {
    header: "Mata Pelajaran",
    accessor: "subject",
  },
  {
    header: "Murid",
    accessor: "student",
  },
  {
    header: "Nilai",
    accessor: "score",
  },
  {
    header: "Guru",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Kelas",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Tanggal",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Aksi",
    accessor: "action",
  },

]
const ResultListsPage = () => {

  const renderRow = (item: Result) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="flex items-center gap-4 p-4">      {item.subject}</td>
      <td className="">{item.student}</td>
      <td className="">{item.score}</td>
      <td className="hidden md:table-cell hover:underline">{item.teacher}</td> 
      <td className="hidden md:table-cell hover:underline">{item.class}</td>   
      <td className="hidden md:table-cell hover:underline">{item.date}</td> 
      <td>
        <div className="flex items-center gap-2">
          
          {role === "admin" && (
             <>
             <FormModal table="result" type="update" data={item} />
             <FormModal table="result" type="delete" id={item.id} />
           </>
          )}


        </div>
      </td>


    </tr >
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Result</h1>
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
              <FormModal table="result" type="create" />
            )}



          </div>
        </div>
      </div>

      {/* List */}
      <Table
        columns={columns}
        renderRow={renderRow}
        data={resultsData}
      />
      {/* Pagination */}
      <Pagination />

    </div>
  )
}

export default ResultListsPage;