import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from "../../Content";
import styles from "../Checkout/Checkout.module.scss";

const Thankyou = () => {
    
    const { bookingForm } = useStore();

    if(bookingForm && bookingForm.room){
        return (
            <>
                <div className={styles.checkoutContainer}>
                    <div className={styles.checkoutInfo}>
                        <div className={styles.title}>Your Order Details :</div>
                        <div className='grid'>
                            <div className='row'>
                                <div className='col l-4'>
                                    <div className={styles.infoItem}>
                                        <span>Name :</span>{bookingForm.lastname + " " +bookingForm.firstname}
                                    </div>
                                </div>
                                <div className='col l-4'>
                                    <div className={styles.infoItem}>
                                        <span>Phone Number :</span>{bookingForm.phone}
                                    </div>
                                </div>
                                <div className='col l-4'>
                                    <div className={styles.infoItem}>
                                        <span>Email :</span>{bookingForm.email}
                                    </div>
                                </div>
                                <div className='col l-4'>
                                    <div className={styles.infoItem}>
                                    <span>Cmnd :</span>{bookingForm.cmnd}
                                    </div>
                                </div>
                                <div className='col l-4'>
                                    <div className={styles.infoItem}>
                                    <span>Arrive :</span>{bookingForm.arrive.getDate()+"-"+(bookingForm.arrive.getMonth()+1)+"-"+bookingForm.arrive.getFullYear()}
                                    </div>
                                </div>
                                <div className='col l-4'>
                                    <div className={styles.infoItem}>
                                    <span>Depart :</span>{bookingForm.depart.getDate()+"-"+(bookingForm.depart.getMonth()+1)+"-"+bookingForm.depart.getFullYear()}
                                    </div>
                                </div>
                                <div className='col l-4'>
                                    <div className={styles.infoItem}>
                                        <span>Name :</span>Nguyễn Văn Hiền
                                    </div>
                                </div>
                                <div className='col l-12'>
                                    <div className={styles.infoItem}>
                                        <div>Payment Options :</div>{bookingForm.payment}
                                    </div>
                                </div>
                                <div className='col l-12'>
                                    <div className={styles.infoItem}>
                                        <Link to='/room'><button>RETURN TO SEARCH PAGE</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }else{
        return null
    }
}

export default Thankyou;
