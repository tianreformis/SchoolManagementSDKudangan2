"use client"

import { Calendar, View, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from 'react';
import { adjustScheduleToCurrentWeek } from '@/lib/utils';

const localizer = momentLocalizer(moment)

const BigCalendar = ({
  data
}: {
  data: {
    title: string,
    start: Date,
    end: Date,
  }[];
}) => {

  const [view, setView] = useState<View>(Views.WORK_WEEK);
  const handleOnChange = (selectedView: View) => {
    setView(selectedView);
  }

  

  return (
    <Calendar
      localizer={localizer}
      events={data}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      style={{ height: 500 }}
      onView={handleOnChange}
      min={new Date(2025, 1, 0, 8, 0, 0)}
      max={new Date(2025, 1, 0, 17, 0, 0)}
    />
  )
}

export default BigCalendar;