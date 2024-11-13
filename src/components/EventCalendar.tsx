"use client"

import Image from "next/image";
import { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// Temporary
const events = [
  {
    id: 1,
    title: 'Event 1',
    time: "12:00 PM - 1:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adip. Cum sociis natoque penat"
  },
  {
    id: 2,
    title: 'Event 3',
    time: "12:00 PM - 1:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adip. Cum sociis natoque penat"
  },
  {
    id: 3,
    title: 'Event 3',
    time: "12:00 PM - 1:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adip. Cum sociis natoque penat"
  },

]

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="bg-white p-4 rounded-md">
      <Calendar onChange={onChange} value={value} />

      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold my-4">Events</h1>
        <Image src="/moreDark.png" alt="" width={24} height={24} />
      </div>

      <div className="flex flex-col gap-4">
        {events.map(event => (
          <div className="p-5 rounded-md border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple " key={event.id}>
            <div className="flex items-center justify-between">
              <h1 className="text-gray-600 font-semibold">{event.title}</h1>
              <span className="text-gray-300 text-xs">{event.time}</span>
            </div>
            <p className="mt-2 text-gray-400">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventCalendar