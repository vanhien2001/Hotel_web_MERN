import React,{ useEffect } from 'react'
import styles from './Contact.module.scss'

const Contact = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className={styles.contact}>
            <h1>Contact</h1>
        </div>
    )
}

export default Contact