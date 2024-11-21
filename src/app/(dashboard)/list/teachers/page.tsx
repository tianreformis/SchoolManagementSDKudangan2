import TableSearch from "@/components/TableSearch"
import Image from "next/image"

const TeachersListsPage = () => {
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Teacher List</h1>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <TableSearch />
          <div>
            <button>
              <Image src="/filter.png" alt="" width={20} height={20} />
            </button>

          </div>
        </div>
      </div>
      
      {/* List */}
      <div></div>
      {/* Pagination */}
      <div></div>
      </div>
  )
}

export default TeachersListsPage