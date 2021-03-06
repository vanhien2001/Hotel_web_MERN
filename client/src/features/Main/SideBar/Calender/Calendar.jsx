import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { useStore } from "../../Content";
import './Calendar.scss'

const Calendar = ({ setShow, data, bookings }) => {

    const { bookingForm, setbookingForm } = useStore();

    const handleDateClick = (e) => {
        const dateChoose = new Date(e.dateStr);
        if(data === 'arrive'){
            if(Math.ceil((dateChoose.getTime() - (new Date()).getTime()) / (1000 * 3600 * 24)) >= 0 && Math.ceil((dateChoose.getTime() - (bookingForm.depart.getTime())) / (1000 * 3600 * 24)) < 0){
                setbookingForm({ ...bookingForm, [data]: new Date(e.dateStr) })
                setShow(false)
            }
        }
        if(data === 'depart'){
            if(Math.ceil((dateChoose.getTime() - (bookingForm.arrive.getTime()) / (1000 * 3600 * 24)) > 0)){
                setbookingForm({ ...bookingForm, [data]: new Date(e.dateStr) })
                setShow(false)
            }
        }
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
