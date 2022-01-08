import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Profile from './Profile';
import { useStore } from "../../Dashboard";
import styles from "../Content.module.scss";

const ProfileContainer = () => {
    const { theme } = useStore();

    return (
        <div className={clsx(styles.content,{[styles.light]: theme === "light"})}>
                <div className={styles.header}>
                    <span>Profile</span>
                    <Link title="Home" to='/dashboard' className={clsx(styles.link,styles.icon)}>
                        <i className='fas fa-home'></i>
                    </Link>
                    /
                    <Link to='/dashboard/home' className={styles.link}>
                        Home
                    </Link>
                    /
                    <Link
                        to={`/dashboard/profile`}
                        className={styles.link}
                    >
                        Profile
                    </Link>
                </div>
                <div className={styles.body}>
                    <Profile/>
                </div>
            </div>
    )
}

export default ProfileContainer
