import Announcements from "@/components/Announcements"
import Performance from "@/components/Performance"
import Image from "next/image"
import Link from "next/link"
import BigCalendarContainer from "@/components/BigCalendarContainer"
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"
import { Class, Student, Teacher } from "@prisma/client"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import StudentAttendanceCard from "@/components/StudentAttendanceCard"
import FormContainer from "@/components/FormContainer"


const SingleStudentPage = async ({ params: { id } }: { params: { id: string } }) => {


  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const student:
    | (Student & {
      class: (Class & { _count: { lessons: number } })
    })
    | null = await prisma.student.findUnique({
      where: { id },
      include: {
        class: { include: { _count: { select: { lessons: true } } } },
      },
    });

  if (!student) {
    return notFound();
  }

  const { userId } = await auth();

  return (
    <div className="flex-1 flex flex-col gap-4 xl:flex-row">
      {/* Left */}
      <div className="w-full xl:w-2/3">
        {/* Top */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* UserInfoCard */}
          <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src={student.img || '/avatar.png'}
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold">{student.name + " " + student.surname}</h1>
              {role ==="admin" && (
                <FormContainer table="student" type="update" data={student} />
              )}
              </div>
              <p className="text-sm text-gray-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>{student.bloodType || '-'}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>
                    {student.birthday ? new Intl.DateTimeFormat("en-GB").format(student.birthday) : '-'}
                  </span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>{student.email || '-'}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>{student.phone || "-"} </span>
                </div>
              </div>

            </div>
          </div>
          {/* SmallCard */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* Card */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              {/* Attendace Card */}
              <Suspense
                fallback="Loading..."
              >
                <StudentAttendanceCard
                  id={student.id}
                />
              </Suspense>

            </div>
            {/* Card */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleBranch.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">{student.class.name.charAt(0)}</h1>
                <span className="text-sm text-gray-400">Grade</span>
              </div>
            </div>
            {/* Card */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleLesson.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">{student.class._count.lessons}</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            {/* Card */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleClass.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">{student.class.name}</h1>
                <span className="text-sm text-gray-400">Class</span>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1> Student Schedule</h1>
          <BigCalendarContainer type="classId" id={student.class.id} />
        </div>
      </div>
      {/* Right */}
      <div className="w-full xl:w-1/3 flex-col gap-4">
        <div className="bg-white p-4 rounded-md ">
          <h1 className="text-xl font-semibold"></h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link href={`/list/lessons?classId=${student.id}`} className="p-3 rounded-md bg-lamaSkyLight">Student Lessons</Link>
            <Link href={`/list/teachers?classId=${student.id}`} className="p-3 rounded-md bg-lamaPurpleLight">Student Teachers</Link>
            <Link href={`/list/exams?classId=${student.id}`} className="p-3 rounded-md bg-pink-50">Student Exam</Link>
            <Link href={`/list/assignments?classId=${student.id}`} className="p-3 rounded-md bg-lamaSkyLight">Student Assignment</Link>
            <Link href={`/list/results?studentId=${student.id}`} className="p-3 rounded-md bg-lamaYellowLight">Student Results</Link>
          </div>
        </div>
        <Performance />
        <Announcements />

      </div>
    </div>
  )
}

export default SingleStudentPage