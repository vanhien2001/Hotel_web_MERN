import React from 'react'
import styles from './Loading.module.scss';
import clsx from 'clsx';

const Loading = ({dark}) => {
    return (
        <>
            <div className={clsx(styles.loaderContainer,{[styles.darkTheme]: dark})}>
                <div className={styles.loader}></div>
            </div>   
        </>
    )
}

export default Loading
