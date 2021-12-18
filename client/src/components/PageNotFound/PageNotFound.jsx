import React from 'react'
import styles from './PageNotFound.module.scss';

const PageNotFound = () => {
    return (
        <>
            <div className={styles.pageNotFound}>
                <div className={styles.text}>
                    <div className={styles.title}>404</div>
                    <div className={styles.desc}>Page Not Found</div>
                </div>
            </div>
        </>
    )
}

export default PageNotFound;
