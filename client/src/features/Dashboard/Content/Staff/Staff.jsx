import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useStore } from "../../Dashboard";
import Add from './Add';
import All from './All';
import Position from './Position';
import styles from "../Content.module.scss";

const Staff = () => {
    const { type, theme } = useStore()
    let body;
    if(type === 'all'){
        body = <All />
    }else if(type === 'add'){
        body = <Add />
    }else{
        body =  <Position />
    }
    return (
        <>
            <div className={clsx(styles.content,{[styles.light]: theme === "light"})}>
                <div className={styles.header}>
                    <span>{type === 'all' ? 'All' : 'Add'} Staff</span>
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
                            type === 'all' ? 'all-staff' : 'add-staff'
                        }`}
                        className={styles.link}
                    >
                        Staff
                    </Link>
                    / {type === 'all' ? 'All' : 'Add'}
                </div>
                <div className={styles.body}>{body}</div>
            </div>
        </>
    );
};

export default Staff;
