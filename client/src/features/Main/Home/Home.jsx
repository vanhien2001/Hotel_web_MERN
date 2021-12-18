import React, { useState, useEffect } from 'react';
import News from '../News/News';
import styles from "./Home.module.scss";

const Home = () => {
    const [openVideo, setOpenVideo] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <>
            <div className={styles.home}>
                <div className={styles.homeSection}>
                    <div className={styles.section_1}>
                        <div className="grid wide">
                            <div className="row">
                                <div className="col l-6 c-12">
                                    <div className={styles.detail}>
                                        <div className={styles.text}>
                                            HOTEL BAYVIEW
                                        </div>
                                        <div className={styles.title}>
                                            Relax in our Resort
                                        </div>
                                        <div className={styles.desc}>
                                            Vivamus volutpat eros pulvinar velit laoreet, sit amet egestas erat dignissim. Sed quis rutrum tellus, sit amet viverra felis. Cras sagittis sem sit amet urna feugiat rutrum. Nam nulla ipsum, venenatis malesuada felis.
                                        </div>
                                        <button>ABOUT US</button>
                                    </div>
                                </div>
                                <div className="col l-6 c-12">
                                    <img src="/Img/home1.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.section_2}>
                        <div className={styles.section_2_1}>
                            <div className="grid">
                                <div className="row no-gutters">
                                    <div className="col l-6 c-0">
                                        <img src="/Img/home2.jpg" alt="" />
                                    </div>
                                    <div className="col l-6 c-12">
                                        <div className={styles.detail}>
                                            <div className={styles.text}>
                                                {'LUXURY HOTEL & BEST RESORT'}
                                            </div>
                                            <div className={styles.title}>
                                                <span>Discover our</span>
                                                Locations
                                            </div>

                                            <div className="row">
                                                <div className="col l-6">
                                                    <div className={styles.desc}>
                                                        Phasellus enim libero, blandit vel sapien vitae, condimentum ultricies magna et. Quisque euismod orci ut et lobortis. Blandit vel sapien vitae, condimentum ultricies magna et orci ut et lobortis, Phasellus enim
                                                    </div>
                                                </div>
                                                <div className="col l-6">
                                                    <div className={styles.desc}>
                                                        Phasellus enim libero, blandit vel sapien vitae, condimentum ultricies magna et. Quisque euismod orci ut et lobortis. Blandit vel sapien vitae, condimentum ultricies magna et orci ut et lobortis, Phasellus enim
                                                    </div>
                                                </div>
                                            </div>

                                            <button>CHECK ALL PACKAGES</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.section_2_2}>
                            Phasellus enim libero, blandit vel sapien vitae, condimentumultricies magna et. Best services orci ut et lobortis. Blandit vel sapienvitae, condimentum
                        </div>
                    </div>
                    <div className={styles.section_3}>
                        <div className="grid wide">
                            <div className={styles.section_3_Container}>
                                <div className="row no-gutters">
                                    <div className="col l-6">
                                        <div className={styles.detail}>
                                            <div className={styles.text}>
                                                FINE FOOD
                                            </div>
                                            <div className={styles.title}>
                                                Restaurant
                                            </div>
                                            <div className={styles.desc}>
                                                Phasellus enim libero, blandit vel sapien vitae, condimentum ultricies magna et. Quisque euismod orci ut et lobortis. Phasellus enim libero, blandit.
                                            </div>
                                            <button>READ MORE</button>
                                        </div>
                                    </div>
                                    <div className="col l-6">
                                        <img src="/Img/home3.jpg" alt="" />
                                    </div>
                                    <div className="col l-6">
                                        <img src="/Img/home3.jpg" alt="" />
                                    </div>
                                    <div className="col l-6">
                                        <div className={styles.detail}>
                                            <div className={styles.text}>
                                                HOTEL LUXURY
                                            </div>
                                            <div className={styles.title}>
                                                Receptions
                                            </div>
                                            <div className={styles.desc}>
                                                Phasellus enim libero, blandit vel sapien vitae, condimentum ultricies magna et. Quisque euismod orci ut et lobortis. Phasellus enim libero, blandit.
                                            </div>
                                            <button>READ MORE</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.section_4}>
                        <div className={styles.detail}>
                            <div className={styles.title}>
                                Relax and Enjoy <br />
                                your Holiday
                            </div>
                            <div className={styles.text}>
                                {'LUXURY HOTEL & BEST RESORT'}
                            </div>
                            <i onClick={() => setOpenVideo(true)} className="far fa-play-circle"></i>
                        </div>
                        <div className={styles.videoContainer + (openVideo ? ' ' + styles.show : '')} onClick={() => setOpenVideo(false)}>
                            <iframe className={styles.video} src={openVideo ? "https://www.youtube.com/embed/rYbtBXhMFAQ" : ''} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div className={styles.section_5}>
                        <div className="grid wide">
                            <div className={styles.section_5_Detail}>
                                <div className={styles.text}>HOTEL NEWS</div>
                                <div className={styles.title}>
                                    Our Blog
                                </div>
                                <News />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
