import React from 'react';
import clsx from 'clsx';
import { useStore } from '../Dashboard';
import styles from "./Preload.module.scss";

const Preload = () => {
    const { theme } = useStore();
    return (
        <>
            <div className={clsx(styles.preload,{[styles.light]: theme === "light"})}>
                <div className={styles.preloadDot}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                </div>
                <div className={styles.preloadText}></div>
            </div>
        </>
    )
}

export default Preload
