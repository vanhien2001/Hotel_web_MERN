import React from 'react'
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useStore } from "../../Dashboard";
import styles from "../Content.module.scss";
import styles2 from "./Map.module.scss";

const Map = () => {
    const { theme } = useStore()
    return (
        <div className={clsx(styles.content,{[styles.light]: theme === "light"})}>
            <div className={styles.header}>
                <span>Map</span>
                <Link title="Home" to='/dashboard' className={clsx(styles.link,styles.icon)}>
                    <i className='fas fa-home'></i>
                </Link>
                /
                <Link to='/dashboard/home' className={styles.link}>
                    Home
                </Link>
                /
                <Link
                    to={'/dashboard/map'}
                    className={styles.link}
                >
                    Map
                </Link>
            </div>
            <div className={styles.body}>
                <div className={clsx(styles2.map, {[styles2.light] : theme === 'light'}, theme === "light" ? 'shadow_light' : 'shadow')}>
                    <div className={styles2.header}>
                        <div className={styles2.title}>Map</div>
                    </div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1107.7253814824453!2d106.62628438436755!3d10.804802207359693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b81ffd3fda3%3A0x1d2c2bf62de7328!2zMjUsIDI3IFPGoW4gS-G7sywgVMOibiBQaMO6LCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1640490082224!5m2!1svi!2s" height="400" allowfullscreen="" loading="lazy"></iframe>
                </div>
            </div>
        </div>
    )
}

export default Map
