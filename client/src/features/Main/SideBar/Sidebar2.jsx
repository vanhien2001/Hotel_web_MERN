import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { roomSelector } from '../../../store/reducer/roomSlice';
import { useStore } from "../Content";
import styles from "./Sidebar.module.scss";

const Sidebar2 = () => {
    const { bookingForm, numberDay } = useStore();
    const { room } = useSelector(roomSelector)

    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    if (room) {
        return (
            <>
                <div className={styles.sidebar + " " + styles.sidebar2}>
                    <span className={styles.roomName}>{room.name}</span>
                    <img src={"http://192.168.1.128:5000" + room.images[0]} alt='img' />
                    <div className={styles.title}>YOUR RESERVATION</div>
                    <div className={styles.sidebarInfor}>
                        <div className='grid'>
                            <div className='row no-gutters'>
                                <div className='col l-6 c-6'>
                                    <div className={styles.inforContainer}>
                                        <div className={styles.title}>CHECK-IN</div>
                                        <div className={styles.day}>{bookingForm ? bookingForm.arrive.getDate() : 1}</div>
                                        <div className={styles.month}>{month[bookingForm.arrive.getMonth()] + ', ' + bookingForm.arrive.getFullYear()}</div>
                                        <div className={styles.date}>{day[bookingForm.arrive.getDay()]}</div>
                                    </div>
                                </div>
                                <div className='col l-6 c-6'>
                                    <div className={styles.inforContainer}>
                                        <div className={styles.title}>CHECK-OUT</div>
                                        <div className={styles.day}>{bookingForm ? bookingForm.depart.getDate() : 1}</div>
                                        <div className={styles.month}>{month[bookingForm.depart.getMonth()] + ', ' + bookingForm.depart.getFullYear()}</div>
                                        <div className={styles.date}>{day[bookingForm.depart.getDay()]}</div>
                                    </div>
                                </div>
                                <div className='col l-6 c-6'>
                                    <div className={styles.inforContainer}>
                                        <div className={styles.amount}>{bookingForm.guests}</div>
                                        <div className={styles.amountTitle}>GUESTS</div>
                                    </div>
                                </div>
                                <div className='col l-6 c-6'>
                                    <div className={styles.inforContainer}>
                                        <div className={styles.amount}>{numberDay}</div>
                                        <div className={styles.amountTitle}>NIGHTS</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.total}>
                        {bookingForm.totalPrice} <span>$ / TOTAL</span>
                    </div>
                </div>
                <div className={styles.note}>
                    <div>
                        <span>NOT INCL :</span> 3 $ CITY TAX ( person * night )
                    </div>
                    <div>
                        <span>INCLUDED :</span> 22 % VAT ALREADY APPLIED
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className={styles.emtyRoom}>
                    <div >Please select a room to make a reservation</div>
                    <Link to='/room'><button>RETURN TO SEARCH PAGE</button></Link>
                </div>
            </>
        )
    }
}

export default Sidebar2;
