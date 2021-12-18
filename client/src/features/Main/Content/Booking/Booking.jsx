import React, { useState, useEffect } from 'react';
import {useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAll as getAll_Service, serviceSelector } from '../../../../store/reducer/serviceSlice';
import { roomSelector } from '../../../../store/reducer/roomSlice';
import { useStore } from "../../Content";
import styles from  "./Booking.module.scss";

const Booking = () => {

    const { bookingForm, setbookingForm, numberDay } = useStore()
    const history = useHistory()
    const dispatch = useDispatch()
    const { services } = useSelector(serviceSelector)
    const { room } = useSelector(roomSelector)

    // const [messages, setMessages] = useState(null)
    const formChange = (e) => {
        setbookingForm({
            ...bookingForm,
            [e.target.name]: e.target.value,
        });
    };
    const serviceChoose = (e) => {
        if (e.target.checked) {
            let servicesChoose = [...bookingForm.services]
            servicesChoose.push(e.target.value)
            setbookingForm({
                ...bookingForm,
                services: servicesChoose,
                totalPrice: bookingForm.totalPrice + services.find( service => service._id === e.target.value).price*numberDay
            })
        } else {
            let servicesChoose = [...bookingForm.services]
            let index = servicesChoose.indexOf(e.target.value)
            servicesChoose.splice(index, 1)
            setbookingForm({
                ...bookingForm,
                services: servicesChoose,
                totalPrice: bookingForm.totalPrice - services.find( service => service._id === e.target.value).price*numberDay
            })
        }
    }

    let servicesExtra
    if (services) {
        servicesExtra = services.filter(service => service.extraService === true).map(service => {
            return (
                <div key={service._id} className='col l-6 c-12'>
                    <div className={styles.serviceItem}>
                        <input type='checkbox' name='servicesExtra[]' id={service._id} value={service._id} onClick={e => serviceChoose(e)}/>
                        <label htmlFor={service._id}>
                            <span>{service.name} :</span>{service.price} $ ( Room / Night
                            ) = {service.price*numberDay} $
                        </label>
                    </div>
                </div>
            )
        })
    }

    const submit = (e) => {
        e.preventDefault();
        history.push('/checkout')
    }

    useEffect(() => {
        dispatch(getAll_Service())
        setbookingForm({
            ...bookingForm,
            room: room ? room._id : '',
            totalPrice: room ? room.price*numberDay : 0
        })
    }, [])
    if(room){
        return (
            <>
                <div className={styles.bookingContainer}>
                    { !bookingForm.firstname && <div className={styles.notify}>You are booking as guest, LOGIN or REGISTER if you want to save your reservation on your account</div> }
                    <div className={styles.serviceContainer}>
                        <div className={styles.title}>Add Extra Services :</div>
                        <div className='grid'>
                            <div className='row'>
                                {servicesExtra}
                            </div>
                        </div>
                    </div>
                    <form action='' method='post' onSubmit={(e) => submit(e)}>
                        <div className={styles.title}>Add Your Informations :</div>
                        <div className='grid'>
                            <div className='row'>
                                <div className='col l-6 c-12'>
                                    <div className={styles.formGroup}>
                                        <label htmlFor='firstname'>First Name* :</label>
                                        <input
                                            type='text'
                                            id='firstname'
                                            name='firstname'
                                            placeholder=''
                                            value={bookingForm.firstname}
                                            onChange={ e => formChange(e) }
                                        />
                                    </div>
                                </div>
                                <div className='col l-6 c-12'>
                                    <div className={styles.formGroup}>
                                        <label htmlFor='lastname'>Last Name* :</label>
                                        <input
                                            type='text'
                                            id='lastname'
                                            name='lastname'
                                            placeholder=''
                                            value={bookingForm.lastname}
                                            onChange={ e => formChange(e) }
                                        />
                                    </div>
                                </div>
                                <div className='col l-6 c-12'>
                                    <div className={styles.formGroup}>
                                        <label htmlFor='email'>Email* :</label>
                                        <input
                                            type='email'
                                            id='email'
                                            name='email'
                                            placeholder=''
                                            value={bookingForm.email}
                                            onChange={ e => formChange(e) }
                                        />
                                    </div>
                                </div>
                                <div className='col l-6 c-12'>
                                    <div className={styles.formGroup}>
                                        <label htmlFor='phone'>
                                            Phone Number* :
                                        </label>
                                        <input
                                            type='text'
                                            id='phone'
                                            name='phone'
                                            placeholder=''
                                            value={bookingForm.phone}
                                            onChange={ e => formChange(e) }
                                        />
                                    </div>
                                </div>
                                <div className='col l-6 c-12'>
                                    <div className={styles.formGroup}>
                                        <label htmlFor='cmnd'>Cmnd :</label>
                                        <input
                                            type='text'
                                            id='cmnd'
                                            name='cmnd'
                                            placeholder=''
                                            value={bookingForm.cmnd}
                                            onChange={ e => formChange(e) }
                                        />
                                    </div>
                                </div>
                                <div className='col l-6 c-12'>
                                    <div className={styles.formGroup}>
                                        <label htmlFor='gender'>Gender :</label>
                                        <select name='gender' id='gender' value={bookingForm.gender} onChange={ e => formChange(e) }>
                                            <option value='male'>Male</option>
                                            <option value='female'>Female</option>
                                            <option value='other'>Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col l-12 c-12'>
                                    <div className={styles.formGroup}>
                                        <label htmlFor='address'>Address :</label>
                                        <input
                                            type='text'
                                            id='address'
                                            name='address'
                                            placeholder=''
                                            value={bookingForm.address}
                                            onChange={ e => formChange(e) }
                                        />
                                    </div>
                                </div>
                                <div className='col l-12 c-12'>
                                    <div className={styles.formGroup + ' ' + styles.last}>
                                        <input
                                            type='checkbox'
                                            id='confirm'
                                            name='confirm'
                                            placeholder=''
                                        />
                                        <label htmlFor='confirm'>
                                            Terms and conditions *
                                        </label>
                                        <button>CHECKOUT</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    }else {
        return null
    }
}

export default Booking;
