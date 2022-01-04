import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import clsx from "clsx";
import { userSelector, load } from "../../../../store/reducer/userSlice";
import {
    bookingSelector,
    getAll,
} from "../../../../store/reducer/bookingSlice";
import styles from "./BookingInfor.module.scss";

const BookingInfor = () => {
    const { user } = useSelector(userSelector);
    const { bookings } = useSelector(bookingSelector);
    const dispatch = useDispatch();

    let body;
    if (bookings?.length > 0) {
        body = bookings.map((booking) => {
            const dayArrive = new Date(booking.arrive)
            const dayDepart = new Date(booking.depart)
            const dayBooking = new Date(booking.createdAt)
            return (
                <div className="row">
                    <div className="col l-5 c-12">
                        <div className={styles.itemImg}>
                            <img
                                src={
                                    process.env.REACT_APP_API_URL +
                                    booking.room.images[0]
                                }
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="col l-7 c-12">
                        <div className={styles.inforItem}>
                            <div className={styles.item}>
                                Tên phòng : <span>{booking.room.name}</span>
                            </div>
                            <div className={styles.date}>
                                <div className={styles.item}>
                                    Ngày tới : <span>{dayArrive.getDate()+"-"+(dayArrive.getMonth()+1)+"-"+dayArrive.getFullYear()}</span>
                                </div>
                                <div className={styles.item}>
                                    Ngày đi : <span>{dayDepart.getDate()+"-"+(dayDepart.getMonth()+1)+"-"+dayDepart.getFullYear()}</span>
                                </div>
                            </div>
                            <div className={styles.item}>
                                Ngày đặt : <span>{dayBooking.getDate()+"-"+(dayBooking.getMonth()+1)+"-"+dayBooking.getFullYear()}</span>
                            </div>
                            <div className={styles.item}>
                                Tổng tiền : <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(booking.totalPrice*1000)}</span>
                            </div>
                            <div className={styles.item}>
                                Tình trạng : <span>{booking.payed ? 'Đã thanh toán' : <span style={{color: "rgba(255, 0, 0, 0.8)"}}>Chưa thanh toán</span>}</span>
                            </div>
                            <div className={styles.item}>
                                <button className={styles.btn}>Chi tiết</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    } else {
        body = (
            <div className={styles.empty}><i className="far fa-sad-tear"></i><span>Không có thông tin đặt phòng</span></div>
        )
    }

    useEffect(() => {
        dispatch(getAll({ user: user?._id }));
    }, [user]);

    if (!user) {
        return <Redirect to="/room" />;
    }

    return (
        <>
            <div className={styles.bookingInfor}>
                <div className={styles.title}>Thông tin đặt phòng</div>
                <div className={styles.infor}>
                    <div className="grid wide">
                        {body}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingInfor;
