import prisma from "@/lib/prisma"

const StudentAttendanceCard = async ({ id }: { id: string }) => {
  const attandance = await prisma.attendance.findMany({
    where: {
      studentId: id,
      date: {
        gte: new Date(new Date().getFullYear(), 0, 1),
      }

    }
  })

  const totalDays = attendance.length;
  return (
    <div className="">
      <h1 className="text-xl font-semibold">90%</h1>
      <span className="text-sm text-gray-400">Attendence</span>
    </div>
  )
}

export default StudentAttendanceCard