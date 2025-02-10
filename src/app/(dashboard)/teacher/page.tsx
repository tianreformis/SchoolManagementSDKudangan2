
import Announcements from "@/components/Announcements"
import React from "react"
import BigCalendarContainer from "@/components/BigCalendarContainer"
import { auth } from "@clerk/nextjs/server"

const TeacherPage
 =  async() => {
  const {userId} = await auth();
   return (
    <div className='flex-1 p-4 flex gap-4 flex-col xl:flex-row'>
      {/* left */}
      <div className="w-full x:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="font-semibold text-xl">Schedule</h1>
          <BigCalendarContainer  type="teacherId" id={userId!}/>
        </div>
      </div>

      {/* right */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        
        <Announcements />
      </div>
    </div>
  )
}

export default TeacherPage
