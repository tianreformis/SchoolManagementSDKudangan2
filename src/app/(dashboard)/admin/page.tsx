import UserCard from "@/components/UserCard"

const Admin = () => {
  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row'>
      {/* Left */}
      <div className="w-full lg:w-2/3">
        {/* UserCard */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="Student" />
          <UserCard type="Teacher" />
          <UserCard type="Parent" />
          <UserCard type="Staff" />
        </div>

      </div>

      {/* right */}
      <div className="w-full lg:w-1/3">

        r</div>

    </div>

  )
}

export default Admin