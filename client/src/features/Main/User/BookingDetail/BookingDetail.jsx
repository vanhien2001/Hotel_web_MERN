import React from 'react';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import {
    bookingSelector,
    getAllWithDelete,
    deleteBooking
} from "../../../../store/reducer/bookingSlice";
import { userSelector } from "../../../../store/reducer/userSlice";
import { dateFormat, priceFormat } from '../../../../util/dataFormat';
import styles from './BookingDetail.module.scss';

const BookingDetail = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams()
    const { bookings } = useSelector(bookingSelector);
    const { user } = useSelector(userSelector);
    const booking = bookings?.find(booking => booking._id === id);
    
    const handleCancel = async (id) => {
        console.log(id)
        await dispatch(deleteBooking(id))
        await dispatch(getAllWithDelete({user: user?._id}))
    }
    
    if(!booking){
        return <Redirect to="/account/booking-infor"/>
    }
    let servicesData
    if(booking.services.length > 0){
        servicesData = booking.services.map(service => {
            return (
                <div className="col l-4 c-6">
                    <div className={styles.service}>{service.name}</div>
                </div>
            )
        })
    }else{
        servicesData = (
            <div className="col l-12 c-12">
                <div className={styles.service}>Bạn không chọn dịch vụ nào</div>
            </div>
        )
    }

    const check = ((new Date(booking.depart)).getTime() - (new Date()).getTime())/(1000 * 3600 * 24) < 2

    return (
        <div className={styles.bookingDetail}>
            <div className={styles.title}>
                Chi tiết đặt phòng
                <i title="Back" className={clsx(styles.back,"fas fa-long-arrow-alt-left")} onClick={() => history.push('/account/booking-infor')}></i>
            </div>
            <div className={styles.infor}>
                <div className="grid">
                    <div className="row">
                        <div className="col l-5 c-6">
                            <img src={"http://192.168.1.128:5000" + booking.room.images[0]} alt="" />
                        </div>
                        <div className="col l-7 c-6">
                            <div className={styles.name}>
                                Phòng: {booking.room.name} 
                            </div>
                            <div className="row">
                                <div className="col l-6 c-6">
                                    <div className={styles.item}>
                                        Ngày tới : <span>{dateFormat(new Date(booking.arrive))}</span>
                                    </div>
                                </div>
                                <div className="col l-6 c-6">
                                    <div className={styles.item}>
                                        Ngày đi : <span>{dateFormat(new Date(booking.depart))}</span>
                                    </div>
                                </div>
                                <div className="col l-12 c-12">
                                    <div className={styles.services}>
                                        <span>Dịch vụ đã chọn :</span>
                                        <div className="row">
                                            {servicesData}
                                        </div>
                                    </div>
                                </div>
                                <div className="col l-12 c-12">
                                    <div className={styles.item}>
                                        Ngày đặt : <span>{dateFormat(new Date(booking.createdAt))}</span>
                                    </div>
                                </div>
                                <div className="col l-12 c-12">
                                    <div className={styles.item}>
                                        Tổng tiền : <span>{priceFormat(booking.totalPrice)}</span>
                                    </div>
                                </div>
                                <div className="col l-12 c-12">
                                    <div className={styles.item}>
                                        Tình trạng : <span>{booking.payed ? 'Đã thanh toán' : <span style={{color: "rgba(255, 0, 0, 0.8)"}}>Chưa thanh toán</span>}</span>
                                    </div>
                                </div>
                                <div className="col l-12 c-12">
                                    <div className={styles.item}>
                                        {booking.deleted ? 
                                            <button className={clsx(styles.btn, styles.disabled, styles.cancelled)} disabled={true}>
                                                Đã huỷ
                                            </button>:
                                            <button className={clsx(styles.btn, {[styles.disabled]: check})} onClick={() => handleCancel(booking._id)} disabled={check}>
                                                Huỷ đơn
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingDetail
