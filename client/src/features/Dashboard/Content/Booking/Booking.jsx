import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useStore } from "../../Dashboard";
import Add from './Add';
import All from './All';
import styles from "../Content.module.scss";

const Booking = () => {
    const { type, theme } = useStore()
    return (
        <>
            <div className={clsx(styles.content,{[styles.light]: theme === "light"})}>
                <div className={styles.header}>
                    <span>{type === 'all' ? 'All' : 'Add'} Booking</span>
                    <Link title="Home" to='/dashboard' className={clsx(styles.link,styles.icon)}>
                        <i className='fas fa-home'></i>
                    </Link>
                    /
                    <Link to='/dashboard/home' className={styles.link}>
                        Home
                    </Link>
                    /
                    <Link
                        to={`/dashboard/${
                            type === 'all' ? 'all-booking' : 'add-booking'
                        }`}
                        className={styles.link}
                    >
                        Booking
                    </Link>
                    / {type === 'all' ? 'All' : 'Add'}
                </div>
                <div className={styles.body}>{type === 'all' ? <All /> : <Add />}</div>
            </div>
        </>
    );
};

export default Booking;
