import Announcements from "@/components/Announcements"
import AttendanceChart from "@/components/AttendanceChart"
import CountChart from "@/components/CountChart"
import EventCalendar from "@/components/EventCalendar"
import FinanceChart from "@/components/FinanceChart"
import UserCard from "@/components/UserCard"

const Admin = () => {
  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row'>
      {/* Left */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* UserCard */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="Student" />
          <UserCard type="Teacher" />
          <UserCard type="Parent" />
          <UserCard type="Staff" />
        </div>
        <div>
          {/* MiddleChart */}
          <div className="flex gap-4 flex-col lg:flex-row">
            {/* CountChart */}
            <div className="w-full lg:w-1/3 h-[450px]">
              <CountChart />
            </div>
            {/* AttendanceChart */}
            <div className="w-full lg:w-2/3 h-[450px]">
              <AttendanceChart />
            </div>

          </div >
          {/* BottomChart */}
          <div className="w-full h-[500px] my-4">
            <FinanceChart />

          </div>
        </div>
      </div>

      {/* right */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>

    </div>

  )
}

export default Admin