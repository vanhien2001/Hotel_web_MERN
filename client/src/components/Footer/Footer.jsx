import React from 'react';
import styles from './Footer.module.scss'

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className='grid wide'>
                <div className='row'>
                    <div className='col l-4 c-12'>
                        <div className={styles.footerItem}>
                            <div className={styles.text}>Phone Support</div>
                            <div className={styles.subtext}>24 HOURS A DAY</div>
                            <div className={styles.text}>0936642182</div>
                        </div>
                    </div>
                    <div className='col l-4 c-12'>
                        <div className={styles.footerItem}>
                            <div className={styles.text}>Connect With Us</div>
                            <div className={styles.subtext}>SOCIAL MEDIA CHANNELS</div>
                            <div className={styles.icon}>
                                <i className='fab fa-instagram'></i>
                                <i className='fab fa-twitter'></i>
                                <i className='fab fa-facebook-f'></i>
                                <i className='fab fa-pinterest-p'></i>
                                <i className='fab fa-youtube'></i>
                            </div>
                        </div>
                    </div>
                    <div className='col l-4 c-12'>
                        <div className={styles.footerItem}>
                            <div className={styles.text}>Newsletter</div>
                            <div className={styles.subtext}>
                                SIGN UP FOR SPECIAL OFFERS
                            </div>
                            <div className={styles.email}>
                                <input type='text' placeholder='Email' />
                                <button>SUBCRIBE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footerBar}>
                <div className={styles.footerBarContainer}>
                    <div className={styles.footerList}>
                        <div className={styles.item}>
                            <a href=''>Home</a>
                        </div>
                        <div className={styles.item}>
                            <a href=''>About Us</a>
                        </div>
                        <div className={styles.item}>
                            <a href=''>Services</a>
                        </div>
                        <div className={styles.item}>
                            <a href=''>Booking</a>
                        </div>
                        <div className={styles.item}>
                            <a href=''>Contact</a>
                        </div>
                    </div>
                    <img src='/Img/footer.png' alt='' className={styles.img} />
                </div>
            </div>
        </div>
    );
};

export default Footer;
