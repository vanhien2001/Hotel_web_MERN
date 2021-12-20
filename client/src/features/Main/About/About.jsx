import React,{ useEffect } from 'react'
import styles from './About.module.scss'

const About = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className={styles.about}>
            <h1>About</h1>
        </div>
    )
}

export default About
