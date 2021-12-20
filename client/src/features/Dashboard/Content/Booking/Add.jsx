import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { useStore } from "../../Dashboard";
import { staffSelector } from '../../../../store/reducer/staffSlice';
import { roomSelector, getAll as getAll_room } from '../../../../store/reducer/roomSlice';
import {
    getAll,
    addBooking,
    editBooking,
} from '../../../../store/reducer/bookingSlice';
import { getAll as getAll_Service, serviceSelector } from '../../../../store/reducer/serviceSlice';
import Alert from '../../Alert/Alert';
import styles from "../Add.module.scss";

const Add = ({ edit, booking, setEdit, setMessagesAll }) => {
    const { theme } = useStore()
    let { rooms } = useSelector(roomSelector);
    const { staff } = useSelector(staffSelector);
    let { services } = useSelector(serviceSelector);
    if (services) {
        services = services.filter(service => service.extraService === true)
    }
    const dispatch = useDispatch();
    let serviceState = []
    if (booking) {
        booking.services.forEach(service => {
            serviceState.push(service._id)
        })
    }
    const [bookingForm, setbookingForm] = useState({
        id: booking ? booking._id : '',
        firstname: booking ? booking.user.firstname : '',
        lastname: booking ? booking.user.lastname : '',
        gender: booking ? booking.user.gender : 'male',
        phone: booking ? booking.user.phone : '',
        cmnd: booking ? booking.user.cmnd : '',
        email: booking ? booking.user.email : '',
        address: booking ? booking.user.address : '',
        room: booking ? booking.room._id : rooms ? rooms[0]._id : '',
        services: serviceState,
        arrive: booking ? booking.arrive : '',
        depart: booking ? booking.depart : '',
        totalPrice: booking ? booking.totalPrice : 0,
        staffBooking: staff._id,
        payment: "Payment on arrive"
    });

    const [messages, setMessages] = useState(null);
    const formChange = (e) => {
        setbookingForm({
            ...bookingForm,
            [e.target.name]: e.target.value,
        });
    };
    const serviceChoose = (e) => {
        if (e.target.checked) {
            let services = [...bookingForm.services]
            services.push(e.target.value)
            setbookingForm({
                ...bookingForm,
                services: services
            })
        } else {
            let services = [...bookingForm.services]
            let index = services.indexOf(e.target.value)
            services.splice(index, 1)
            setbookingForm({
                ...bookingForm,
                services: services
            })
        }
    }


    const add_booking = (e) => {
        e.preventDefault()
        let servicePrice = 0
        bookingForm.services.forEach(service => {
            console.log(services.find(index => index._id === service))
            servicePrice += services.find(index => index._id === service).price
        })
        let date1 = new Date(bookingForm.arrive)
        let date2 = new Date(bookingForm.depart)
        let day = Math.ceil((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24))
        let totalPrice = (rooms.find(index => index._id === bookingForm.room).price + servicePrice) * day
        dispatch(
            booking ? editBooking({ id: booking._id, bookingForm: { ...bookingForm, totalPrice, user: booking.user._id } }) : addBooking(bookingForm)
        ).then((data) => {
            if (edit) {
                setMessagesAll(data.payload)
                setTimeout(() => {
                    setMessagesAll(null)
                }, 3000);
            } else {
                setMessages(data.payload)
                setTimeout(() => {
                    setMessages(null)
                }, 3000);
            }
            setbookingForm({
                firstname: '',
                lastname: '',
                gender: 'male',
                phone: '',
                cmnd: '',
                email: '',
                address: '',
                room: '',
                services: [],
                arrive: '',
                depart: '',
                totalPrice: '',
                staffBooking: staff._id
            });
            dispatch(getAll()).then(() => {
                if (edit) {
                    setEdit({
                        show: false,
                        booking: null,
                    })
                }
            });
        });
    };

    let roomData;
    if (booking) {
        roomData = (
            <option key={booking.room._id} value={booking.room._id}>
                {booking.room.name}
            </option>
        );
    }
    else if (rooms) {
        roomData = rooms.map((room) => {
            return (
                <option key={room._id} value={room._id}>
                    {room.name}
                </option>
            );
        });
    }

    let serviceData;
    if (services) {
        serviceData = services.map((service) => {
            return (
                <div key={service._id} className="col l-3 c-12 m-6">
                    <div className={styles.serviceItem}>
                        <input type="checkbox" name="services[]" id={service.name} value={service._id} onClick={(e) => serviceChoose(e)} checked={booking && bookingForm.services.includes(service._id)} />
                        <label htmlFor={service.name}>{service.name}</label>
                    </div>
                </div>
            );
        });
    }

    useEffect(async () => {
        await dispatch(getAll_room())
        await dispatch(getAll_Service())
    }, []);

    return (
        <>
            {!booking && messages && <Alert success={messages.success} messages={messages.messages} />}
            <div className={clsx(styles.addForm, {[styles.light]: theme === "light"}, theme === "light" ? 'shadow_light' : 'shadow')}>
                <div className={styles.title}>{booking ? 'Edit booking' : 'Add booking'}</div>
                <form action='' method='post' onSubmit={(e) => add_booking(e)}>
                    <div className='grid'>
                        <div className='row'>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <input
                                        type='text'
                                        name='firstname'
                                        placeholder=' '
                                        value={bookingForm.firstname}
                                        onChange={(e) => formChange(e)}
                                        required
                                    />
                                    <span>FirstName *</span>
                                </div>
                            </div>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <input
                                        type='text'
                                        name='lastname'
                                        placeholder=' '
                                        value={bookingForm.lastname}
                                        onChange={(e) => formChange(e)}
                                        required
                                    />
                                    <span>LastName *</span>
                                </div>
                            </div>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <select
                                        name='gender'
                                        id='gender'
                                        value={bookingForm.gender}
                                        onChange={(e) => formChange(e)}
                                    >
                                        <option value='male'>Male</option>
                                        <option value='female'>Female</option>
                                        <option value='other'>Other</option>
                                    </select>
                                    <span>Gender</span>
                                </div>
                            </div>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <input
                                        type='email'
                                        name='email'
                                        placeholder=' '
                                        value={bookingForm.email}
                                        onChange={(e) => formChange(e)}
                                        required
                                    />
                                    <span>Email</span>
                                </div>
                            </div>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <input
                                        type='text'
                                        name='phone'
                                        placeholder=' '
                                        value={bookingForm.phone}
                                        onChange={(e) => formChange(e)}
                                        required
                                    />
                                    <span>Phone *</span>
                                </div>
                            </div>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <input
                                        type='text'
                                        name='cmnd'
                                        placeholder=' '
                                        value={bookingForm.cmnd}
                                        onChange={(e) => formChange(e)}
                                        required
                                    />
                                    <span>Cmnd *</span>
                                </div>
                            </div>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <input
                                        type='text'
                                        name='address'
                                        placeholder=' '
                                        value={bookingForm.address}
                                        onChange={(e) => formChange(e)}
                                    />
                                    <span>Address</span>
                                </div>
                            </div>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <select
                                        name='room'
                                        id='room'
                                        value={bookingForm.room}
                                        onChange={(e) => formChange(e)}
                                    >
                                        {roomData}
                                    </select>
                                    <span>Room</span>
                                </div>
                            </div>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <input
                                        type='date'
                                        name='arrive'
                                        placeholder=' '
                                        value={bookingForm.arrive}
                                        onChange={(e) => formChange(e)}
                                        required
                                    />
                                    <span>Arrive </span>
                                </div>
                            </div>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <input
                                        type='date'
                                        name='depart'
                                        placeholder=' '
                                        value={bookingForm.depart}
                                        onChange={(e) => formChange(e)}
                                        required
                                    >
                                    </input>
                                    <span>Depart</span>
                                </div>
                            </div>
                            <div className={`col l-12 c-12 m-12`}>
                                <div className={styles.formControl}>
                                    <div className={styles.title}>Extra Service :</div>
                                    <div className={styles.serviceList}>
                                        <div className="row">
                                            {serviceData}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col l-12 c-12 m-12'>
                                <button className={styles.formBtn}>Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Add;
