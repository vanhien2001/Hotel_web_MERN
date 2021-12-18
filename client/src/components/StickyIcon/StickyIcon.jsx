import React from 'react';
import styles from './StickyIcon.module.scss';

const StickyIcon = () => {
    return (
        <>
            <a href="https://1.envato.market/WLRW3" className={styles.stickyIcon}>
                <div className={styles.title}>NEW</div>
                <div className={styles.icon}><i className="fas fa-fire"></i></div>
                <div className={styles.text}>54</div>
            </a>
        </>
    )
}

export default StickyIcon
