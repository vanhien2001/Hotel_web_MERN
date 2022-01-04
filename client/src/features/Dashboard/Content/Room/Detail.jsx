import React from 'react';
import clsx from 'clsx';
import { useStore } from "../../Dashboard";
import styles from './Detail.module.scss';

const Detail = ({ room }) => {
    const { theme } = useStore()
    const servicesData = room.services.map(service => {
        return (
            <div className={clsx(styles.serviceItems,'col l-3 c-4')}>
                <i title={service.name} className={service.icon}></i>
                {service.name}
            </div>
        )
    })
    return (
        <div className={clsx(styles.detail,{[styles.light]: theme === "light"})}>
            <div className={styles.header}>
                <img src={"http://192.168.1.128:5000" + room.images[0]} alt="" />
                <div className={styles.title}>
                    <div className={styles.name}>
                        {room.name}
                    </div>
                    <div className={styles.typeroom}>
                        {room.typeRoom.name}
                    </div>
                    <div className={styles.price}>
                        Price: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(room.price*1000)}/night
                    </div>
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.description}>
                    {room.description}
                </div>
                <div className={styles.services}>
                    <div className={styles.title}>
                        Services :
                    </div>
                    <div className="row">
                        {servicesData}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail
