import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import clsx from "clsx";
import { userSelector, load } from "../../../../store/reducer/userSlice";
import {
    bookingSelector,
    getAllWithDelete,
    deleteBooking
} from "../../../../store/reducer/bookingSlice";
import { dateFormat, priceFormat } from '../../../../util/dataFormat';
import styles from "./BookingInfor.module.scss";

const BookingInfor = () => {
    const history = useHistory();
    const { user } = useSelector(userSelector);
    const { bookings } = useSelector(bookingSelector);
    const dispatch = useDispatch();

    const handleCancel = async (id) => {
        console.log(id)
        await dispatch(deleteBooking(id))
        await dispatch(getAllWithDelete({user: user?._id}))
    }

    let body;
    if (bookings?.length > 0) {
        body = bookings.map((booking) => {
            const check = ((new Date(booking.depart)).getTime() - (new Date()).getTime())/(1000 * 3600 * 24) < 2
            return (
                <div className="row">
                    <div className="col l-5 c-12">
                        <div className={styles.itemImg}>
                            <img
                                src={
                                    (process.env.REACT_APP_API_URL || "http://192.168.1.128:5000") +
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
                                    Ngày tới : <span>{dateFormat(new Date(booking.arrive))}</span>
                                </div>
                                <div className={styles.item}>
                                    Ngày đi : <span>{dateFormat(new Date(booking.depart))}</span>
                                </div>
                            </div>
                            <div className={styles.item}>
                                Ngày đặt : <span>{dateFormat(new Date(booking.createdAt))}</span>
                            </div>
                            <div className={styles.item}>
                                <button className={styles.btn} onClick={()=>history.push(`/account/booking-detail/${booking._id}`)}>Chi tiết</button>
                                    {booking.deleted ? 
                                        <button className={clsx(styles.btn, styles.disabled, styles.cancelled)} disabled={true}>
                                            Đã huỷ
                                        </button>:
                                        <button className={clsx(styles.btn, styles.btn_cancel, {[styles.disabled]: check})} onClick={() => handleCancel(booking._id)} disabled={check}>
                                            Huỷ đơn
                                        </button>
                                    }
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
        dispatch(getAllWithDelete({ user: user?._id }));
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
