import FormModal from "@/components/FormModal"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { role, teachersData } from "@/lib/data"
import prisma from "@/lib/prisma"
import { ITEM_PER_PAGE } from "@/lib/setttings"
import { Class, Subject, Teacher } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"


type TeacherList = Teacher & { subjects: Subject[] } & { classes: Class[] }



const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden md:table-cell",
  },

  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Classes",
    accessor: "classes",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },

]

const renderRow = (item: TeacherList) => (
  <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
    <td className="flex items-center gap-4">
      <Image src={item.img || "/avatar.png"}
        alt=""
        width={36}
        height={36}
        className="md:hidden xl:block w-10 h-10 rounded-full object-cover" />
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-xs text-gray-500">{item?.email}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.name}</td>
    <td className="hidden md:table-cell">{item.subjects.map((subject) => subject.name).join(",")}</td>
    <td className="hidden md:table-cell">{item.classes.map((classItem) => classItem.name).join(",")}</td>
    <td className="hidden md:table-cell">{item.phone}</td>
    <td className="hidden md:table-cell">{item.address}</td>
    <td>
      <div className="flex items-center gap-2">
        <Link href={`/list/teachers/${item.id}`} >
          <button className="h-7 w-7 flex items-center justify-center rounded-full bg-lamaSky">
            <Image src="/update.png" alt="" width={16} height={16} className="w-5 h-5" />
          </button>
        </Link>
        {role === "admin" && (
          <FormModal table="teacher" type="delete" id={item.id} />
        )}
      </div>
    </td>
  </tr >
);
const TeachersListsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {

  const { page, ...qeuryParams } = searchParams;
  const p = page ? parseInt(page) : 1;


  const [data, count] = await prisma.$transaction([
    prisma.teacher.findMany({
      include: {
        subjects: true,
        classes: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.teacher.count(),
  ])



  const coutn = await prisma.teacher.count();


  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Teacher List</h1>
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
              <FormModal table="teacher" type="create" />
            )}


          </div>
        </div>
      </div>

      {/* List */}
      <Table 
        columns={columns}
        renderRow={renderRow}
        data={data}
      />
      {/* Pagination */}
      <Pagination page={p} count={count} />

    </div>
  )
}

export default TeachersListsPage