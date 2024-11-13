"use client";

import Image from "next/image"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    income: 2000,
    expense: 2400,
  },
  {
    name: 'Feb',
    income: 3000,
    expense: 2400,
  },
  {
    name: 'Mar',
    income: 4000,
    expense: 2400,
  },
  {
    name: 'Apr',
    income: 6000,
    expense: 2400,
  },
  {
    name: 'Mei',
    income: 2000,
    expense: 2400,
  },
  {
    name: 'Jun',
    income: 2000,
    expense: 2400,
  },
  {
    name: 'Jul',
    income: 2000,
    expense: 2400,
  },
  {
    name: 'Ags',
    income: 2000,
    expense: 2400,
  },
  {
    name: 'Sept',
    income: 2000,
    expense: 3400,
  },
  {
    name: 'Okt',
    income: 2000,
    expense: 1400,
  },
  {
    name: 'Nov',
    income: 2000,
    expense: 400,
  },
  {
    name: 'Des',
    income: 2000,
    expense: 2400,
  },

];


const FinanceChart = () => {
  return (
    <div className='bg-white rounded-xl h-full w-full py-4 px-2'>
      {/* Title */}
      <div className='flex justify-between items-center'>
        <h1 className='text-lg font-semibold'>Finance</h1>
        <Image src="/moreDark.png" width={20} height={20} alt="" />
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
          <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
          <Tooltip />
          <Legend
            align='center'
            verticalAlign='top'
            wrapperStyle={{
              paddingTop: '20px',
              paddingBottom: '40px',
            }}
          />
          <Line 
          type="monotone"
           dataKey="income" 
           stroke="#C3EBFA" 
           strokeWidth={5}
            />
          <Line 
          type="monotone" 
          dataKey="expense" 
          stroke="#CDCEFF"
          strokeWidth={5}
          />
        </LineChart>
      </ResponsiveContainer>


    </div>
  )
}

export default FinanceChart