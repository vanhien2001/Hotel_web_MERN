import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { useStore } from "../../Content";
import './Calendar.scss'

const Calendar = ({ setShow, data, bookings }) => {

    const { bookingForm, setbookingForm } = useStore();

    const handleDateClick = (e) => {
        setbookingForm({ ...bookingForm, [data]: new Date(e.dateStr) })
        setShow(false)
    }

    return (
        <>
            <div className='calendar_container'>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    contentHeight='auto'
                    dateClick={(e) => handleDateClick(e)}
                    events={
                        bookings ? bookings.map(booking => {
                            const start = new Date(booking.arrive)
                            const end = new Date(booking.depart)
                            return {
                                title: 'Has booked',
                                start: start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + (start.getDate() > 10 ? start.getDate() : "0" + start.getDate()),
                                end: end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + (end.getDate() > 10 ? end.getDate() : "0" + end.getDate()),
                                className: 'event'
                            }
                        }) : ''
                    }
                />
            </div>
        </>
    )
}

export default Calendar
