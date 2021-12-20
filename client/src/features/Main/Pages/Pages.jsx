import React,{ useEffect } from 'react'
import styles from './Pages.module.scss'

const Pages = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <div className={styles.pages}>
            <h1>Pages</h1>
        </div>
    )
}

export default Pages