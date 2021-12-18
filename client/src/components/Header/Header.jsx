import React from 'react';
import clsx from 'clsx';
import Navbar from './Navbar';
import Subnav from './Subnav';
import { useStore } from "../../features/Main/Content";
import styles from './Header.module.scss';

const Header = () => {

    const { slug } = useStore();

    return (
        <div>
            <Navbar slug={slug}/>
            <div className={styles.banner}>
                <div className={styles.text}>
                    {slug === 'login' || slug === 'register' ? 'ACCOUNT' : slug === 'home' ? 'HOME' : slug.toUpperCase()}
                </div>
                {!(
                    slug === 'home' ||
                    slug === 'login' ||
                    slug === 'register' ||
                    slug === 'room' ||
                    slug === 'detail' ||
                    slug === 'about' ||
                    slug === 'pages' ||
                    slug === 'news' ||
                    slug === 'contact' ||
                    slug === 'account'
                ) && (
                    <div className={styles.progressContainer}>
                        <div className={styles.process}>
                            <div className={styles.processItem}>
                                <span>1</span>
                                SEARCH
                            </div>
                            <div className={styles.processItem}>
                                <span
                                    className={clsx({[styles.active]: slug === 'booking'})}
                                >
                                    2
                                </span>
                                BOOKING
                            </div>
                            <div className={styles.processItem}>
                                <span
                                    className={clsx({[styles.active]: slug === 'checkout'})}
                                >
                                    3
                                </span>
                                CHECKOUT
                            </div>
                            <div className={styles.processItem}>
                                <span
                                    className={clsx({[styles.active]: slug === 'thankyou'})}
                                >
                                    4
                                </span>
                                THANK YOU
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {slug === 'room' ? <Subnav /> : ''}
        </div>
    );
};

export default Header;
