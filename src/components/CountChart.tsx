"use client"
import Image from 'next/image';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Total',
    count: 106,
    fill: 'white',
  },
  {
    name: 'Girls',
    count: 53,
    fill: '#FAE27C',
  },
  {
    name: 'Boys',
    count: 53,
    fill: '#C3EBFA',
  },

];
const CountChart = () => {
  return (
    <div className='bg-white rounded-xl h-full w-full py-4 px-2'>
      {/* Title */}
      <div className='flex justify-between items-center'>
        <h1>Students</h1>
        <Image src="/moreDark.png" width={20} height={20} alt="" />
      </div>
      {/* Chart */}
      <div className=' relative w-full h-full'>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
            <RadialBar
              background
              dataKey="count"
            />

          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale.png"
          alt=''
          width={50}
          height={50}
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        />
      </div>

      {/* Bottom */}
      <div className='flex justify-center gap-16'>
        <div className='flex flex-col gap-1'>
          <div className='w-5 h-5 bg-lamaSky rounded-full'></div>
          <h1 className='font-bold'>1,123</h1>
          <h2 className='text-xs text-gray-400'>Boys</h2>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='w-5 h-5 bg-lamaYellow rounded-full'></div>
          <h1 className='font-bold'>1,123</h1>
          <h2 className='text-xs text-gray-400'>Girls</h2>
        </div>
      </div>
    </div>
  )
}

export default CountChart;