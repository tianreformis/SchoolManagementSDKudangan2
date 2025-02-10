import Announcements from "@/components/Announcements"
import AttendanceChartContainer from "@/components/AttendanceChartContainer"
import CountChartContainer from "@/components/CountChartContainer"
import EventCalendar from "@/components/EventCalendar"
import EventCalendarContainer from "@/components/EventCalendarContainer"
import FinanceChart from "@/components/FinanceChart"
import UserCard from "@/components/UserCard"

const Admin = ({ searchParams }: { searchParams: { [key: string]: string | undefined }}) => {
  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row'>
      {/* Left */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* UserCard */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="admin" />
          <UserCard type="teacher" />
          <UserCard type="student" />
          <UserCard type="parent" />

        </div>
        <div>
          {/* MiddleChart */}
          <div className="flex gap-4 flex-col lg:flex-row">
            {/* CountChart */}
            <div className="w-full lg:w-1/3 h-[450px]">
              <CountChartContainer />
            </div>
            {/* AttendanceChart */}
            <div className="w-full lg:w-2/3 h-[450px]">
              <AttendanceChartContainer />
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
        <EventCalendarContainer searchParams={searchParams} />
        <Announcements />
      </div>

    </div>

  )
}

export default Admin