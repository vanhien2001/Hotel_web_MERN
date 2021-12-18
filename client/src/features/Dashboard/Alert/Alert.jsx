import React from 'react';
import styles from "./Alert.module.scss";
import clsx from 'clsx';

const Alert = ({ success, messages }) => {
    return (
        <>
            <div className={clsx(styles.alert,{[styles.success]: success},{[styles.fail]: success === false})}>
                { success ? <i className='fas fa-check-circle'></i> : <i className="fas fa-exclamation-circle"></i>}
                <span>{messages}</span>
            </div>
        </>
    );
};

export default Alert;
