"use client"
const Announcements = () => {
  return (
    <div className="bg-white rounded-md p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements        </h1>
        <span>View All</span>

      </div>
      <div className="flex flex-col gap-4 mt-4">

        <div className="bg-lamaSky rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit amet.</h2>
            <span className="text-xs text-gray-400 bg-white px-1 py-1 rounded-md">12:00 PM</span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo esse aperiam consequuntur.
          </p>
        </div>

        <div className="bg-lamaYellow rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit amet.</h2>
            <span className="text-xs text-gray-400 bg-white px-1 py-1 rounded-md">12:00 PM</span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo esse aperiam consequuntur.
          </p>
        </div>

        <div className="bg-lamaPurple rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit amet.</h2>
            <span className="text-xs text-gray-400 bg-white px-1 py-1 rounded-md">12:00 PM</span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo esse aperiam consequuntur.
          </p>
        </div>

      </div>
    </div>
  )
}

export default Announcements