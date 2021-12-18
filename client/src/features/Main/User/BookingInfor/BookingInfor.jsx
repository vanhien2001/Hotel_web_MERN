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
    const history = useHistory();
    const dispatch = useDispatch();
    const [userInfor, setUserInfor] = useState(user);

    const formChange = (e) => {
        setUserInfor({
            ...userInfor,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    let body;
    if (bookings) {
        body = bookings.map((booking) => {
            const dayArrive = new Date(booking.arrive)
            const dayDepart = new Date(booking.depart)
            return (
                <div className="row">
                    <div className="col l-6 c-12">
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
                    <div className="col l-6 c-12">
                        <div className={styles.inforItem}>
                            <div className={styles.item}>
                                Room Name : <span>{booking.room.name}</span>
                            </div>
                            <div className={styles.item}>
                                Day arrive : <span>{dayArrive.getDate()+"-"+(dayArrive.getMonth()+1)+"-"+dayArrive.getFullYear()}</span>
                            </div>
                            <div className={styles.item}>
                                Day depart : <span>{dayDepart.getDate()+"-"+(dayDepart.getMonth()+1)+"-"+dayDepart.getFullYear()}</span>
                            </div>
                            <div className={styles.item}>
                                Total Price : <span>{booking.totalPrice}</span>
                            </div>
                            <div className={styles.item}>
                                <button className={styles.btn}>Chi tiết</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }

    useEffect(() => {
        dispatch(getAll(user ? { user: user.id } : ""));
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
