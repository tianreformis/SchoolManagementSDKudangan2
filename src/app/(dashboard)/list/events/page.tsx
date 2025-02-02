import FormModal from "@/components/FormModal"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { assignmentsData, eventsData, examsData, lessonsData, resultsData, role } from "@/lib/data"
import prisma from "@/lib/prisma"
import { ITEM_PER_PAGE } from "@/lib/setttings"
import { Class, Event, Prisma } from "@prisma/client"
import { headers } from "next/headers"
import Image from "next/image"
import Link from "next/link"

type EventList = Event & { class: Class }

const columns = [
  {
    header: "Title",
    accessor: "subject",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Start Time",
    accessor: "startTime",
    className: "hidden md:table-cell",
  },
  {
    header: "End Time",
    accessor: "endTime",
    className: "hidden md:table-cell",
  },
  {
    header: "Aksi",
    accessor: "action",
  },
];

const renderRow = (item: EventList) => (
  <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
    <td className="flex items-center gap-4 p-4">      {item.title}</td>
    <td className="">{item.class.name}</td>
    <td className="hidden md:table-cell hover:underline">
      {new Intl.DateTimeFormat("en-US").format(item.startTime)}
    </td>
    <td className="hidden md:table-cell hover:underline">
      {item.startTime.toLocaleTimeString("en-US",{
        hour:"2-digit",
        minute : "2-digit",
        hour12 : false,
      })}
    </td>
    <td className="hidden md:table-cell hover:underline">
    {item.endTime.toLocaleTimeString("en-US",{
        hour:"2-digit",
        minute : "2-digit",
        hour12 : false,
      })}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="event" type="update" data={item} />
            <FormModal table="event" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr >
);

const EventListsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {

  const { page, ...qeuryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  //URL PARAMS CONDITIONS 
  const query: Prisma.EventWhereInput = {};

  if (qeuryParams) {
    for (const [key, value] of Object.entries(qeuryParams)) {
      if (value !== undefined) {
        switch (key) {          
          case "search":
            query.title = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.event.findMany({
      where: query,

      include: {

        class: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.event.count({ where: query }),
  ])
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
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
              <FormModal table="event" type="create" />
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
      <Pagination
        page={p}
        count={count}
      />

    </div>
  )
}

export default EventListsPage;