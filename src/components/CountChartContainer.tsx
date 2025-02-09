import Image from "next/image"
import CountChart from "./CountChart"
import prisma from "@/lib/prisma"

const CountChartContainer = async () => {

  const data = await prisma.student.groupBy({
    by: ["sex"],
    _count: true,
  })

  const boys = data.find((d) => d.sex === "MALE")?._count || 0
  const girls = data.find((d) => d.sex === "FEMALE")?._count || 0


  return (
    <div className='bg-white rounded-xl h-full w-full py-4 px-2'>
      <div className='flex justify-between items-center'>
        <h1 className='text-lg font-semibold'>Murid</h1>
        <Image src="/moreDark.png" width={20} height={20} alt="" />
      </div>
      <CountChart
        boys={boys}
        girls={girls}
      />
      <div className='flex justify-center gap-16'>
        <div className='flex flex-col gap-1'>
          <div className='w-5 h-5 bg-lamaSky rounded-full'></div>
          <h1 className='font-bold'>{boys}</h1>
          <h2 className='text-xs text-gray-400'>Laki - Laki ({Math.round((boys / (boys + girls) * 100))}%)</h2>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='w-5 h-5 bg-lamaYellow rounded-full'></div>
          <h1 className='font-bold'>{girls}</h1>
          <h2 className='text-xs text-gray-400'>Perempuan ({Math.round((girls / (boys + girls) * 100))}%)</h2>
        </div>
      </div>
    </div>
  )
}

export default CountChartContainer
