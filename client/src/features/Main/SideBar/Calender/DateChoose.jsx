import React, { useState } from 'react'
import Calendar from './Calendar';
import { useStore } from "../../Content";
import styles from "../Sidebar.module.scss";

const DateChoose = ({ bookings }) => {
    const { bookingForm, setbookingForm, numberDay } = useStore();

    const [calendarArrive, setCalenderArrive] = useState(false)
    const [calendarDepart, setCalenderDepart] = useState(false)
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    return (
        <>
            <div className={styles.sidebarInfor}>
                <div className='grid'>
                    <div className='row no-gutters'>
                        <div className='col l-6 c-6'>
                            <div className={styles.inforContainer}>
                                <div className={styles.title}>CHECK-IN</div>
                                <div className={styles.inforItem}>
                                    <div className={styles.day}>{bookingForm && bookingForm.arrive ? bookingForm.arrive.getDate() : 1}</div>
                                    <div className={styles.monthContainer}>
                                        <div className={styles.month}>{month[bookingForm && bookingForm.arrive ? bookingForm.arrive.getMonth() : 0]}</div>
                                        <i className='fas fa-angle-down' onClick={(e) => { setCalenderArrive(!calendarArrive); setCalenderDepart(false) }}></i>
                                    </div>
                                    {calendarArrive ? <Calendar bookings={bookings} setShow={setCalenderArrive} data='arrive' /> : ''}
                                </div>
                            </div>
                        </div>
                        <div className='col l-6 c-6'>
                            <div className={styles.inforContainer}>
                                <div className={styles.title}>CHECK-OUT</div>
                                <div className={styles.inforItem}>
                                    <div className={styles.day}>{bookingForm && bookingForm.depart ? bookingForm.depart.getDate() : 1}</div>
                                    <div className={styles.monthContainer}>
                                        <div className={styles.month}>{month[bookingForm && bookingForm.depart ? bookingForm.depart.getMonth() : 0]}</div>
                                        <i className='fas fa-angle-down' onClick={(e) => { setCalenderArrive(false); setCalenderDepart(!calendarDepart) }}></i>
                                        {calendarDepart ? <Calendar bookings={bookings} setShow={setCalenderDepart} data='depart' /> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col l-6 c-6'>
                            <div className={styles.inforContainer}>
                                <div className={styles.title}>GUESTS</div>
                                <div className={styles.inforItem}>
                                    <div className={styles.day}>{bookingForm ? bookingForm.guests : 1}</div>
                                    <div className={styles.monthContainer}>
                                        <i
                                            onClick={() =>
                                                setbookingForm({
                                                    ...bookingForm,
                                                    guests: bookingForm.guests + 1
                                                })
                                            }
                                            className='fas fa-angle-up'
                                        ></i>
                                        <i
                                            onClick={() =>
                                                setbookingForm({
                                                    ...bookingForm,
                                                    guests: bookingForm.guests > 1
                                                        ? bookingForm.guests - 1
                                                        : bookingForm.guests
                                                })
                                            }
                                            className='fas fa-angle-down'
                                        ></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col l-6 c-6'>
                            <div className={styles.inforContainer}>
                                <div className={styles.title}>NIGHTS</div>
                                <div className={styles.inforItem}>
                                    <div className={styles.day}>{numberDay}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DateChoose
