import React from 'react';
import { Link } from 'react-router-dom';
import styles from './News.module.scss';

const News = () => {
    return (
        <>
            <div className={styles.news}>
                <div className={styles.col_left1}>
                    <div className={styles.newsItem}>
                        <img src="Img/news1.jpg" alt="" />
                        <div className={styles.detail}>
                            <div className={styles.text}>
                                LUXURY HOTEL
                            </div>
                            <div className={styles.title}>
                                New Website
                            </div>
                            <div className={styles.desc}>
                                Phasellus enim libero, blandit vel sapien vitae, condimentum ultricies magna et. Quisque euismod orci ut et lobortis.
                            </div>
                            <button>READ MORE</button>
                        </div>
                    </div>
                </div>
                <div className={styles.col_left2}>
                    <div className={styles.newsItem}>
                        <i className="fas fa-link"></i>
                        <span>Check New Events</span>
                    </div>
                </div>
                <div className={styles.col_mid1}>
                    <div className={styles.newsItem}>
                        <span className={styles.title}>Follow our Resort <br /> Luxury Hotels</span>
                        <span className={styles.text}><i className="fas fa-quote-right"></i>JOHN DOE</span>
                    </div>
                </div>
                <div className={styles.col_mid2}>
                    <div className={styles.newsItem}>
                        <img src="Img/news2.jpg" alt="" />
                        <div className={styles.detail}>
                            <div className={styles.text}>
                                LUXURY HOTEL
                            </div>
                            <div className={styles.title}>
                                Around Us
                            </div>
                            <div className={styles.desc}>
                                Phasellus enim libero, blandit vel sapien vitae, condimentum ultricies magna et. Quisque euismod orci ut et lobortis.
                            </div>
                            <button>READ MORE</button>
                        </div>
                    </div>
                </div>
                <div className={styles.col_right1}>
                    <div className={styles.newsItem}>
                        <img src="Img/news3.jpg" alt="" />
                        <div className={styles.detail}>
                            <div className={styles.text}>
                                NEWS
                            </div>
                            <div className={styles.title}>
                                Relax Zone
                            </div>
                            <Link to='/news'>READ MORE <i className="fas fa-chevron-right"></i></Link>
                        </div>
                    </div>
                </div>
                <div className={styles.col_right2}>
                    <div className={styles.newsItem}>
                        <img src="Img/news4.jpg" alt="" />
                        <div className={styles.detail}>
                            <div className={styles.text}>
                                NEWS
                            </div>
                            <div className={styles.title}>
                                Relax Zone
                            </div>
                            <Link to='/news'>READ MORE <i className="fas fa-chevron-right"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default News
