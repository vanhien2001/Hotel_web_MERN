import React from "react";
import clsx from "clsx";
import { useStore } from "../Dashboard";
import styles from "./Setting.module.scss";

const Setting = () => {
    const {
        theme,
        setTheme,
        slidebarTheme,
        setSlidebarTheme,
        openSetting,
        setOpenSetting,
        navbarTheme,
        setNavbarTheme,
    } = useStore()

    return (
        <>
            <div
                className={clsx(styles.setting, {
                    [styles.open]: openSetting,
                    [styles.light]: theme === "light",
                }, theme === "light" ? 'shadow_light' : 'shadow')}
            >
                <i
                    title="Close"
                    className={`far fa-times-circle ${styles.btnClose}`}
                    onClick={() => setOpenSetting(false)}
                ></i>
                <div className={styles.settingItem}>
                    <div className={styles.settingName}>GENERAL SETTINGS</div>
                    <div className={styles.settingDetail}>
                        <div>
                            <input type="checkbox" name="" id="1" />
                            <label htmlFor="1">Save History</label>
                        </div>
                        <div>
                            <input type="checkbox" name="" id="2" />
                            <label htmlFor="2">Show Status</label>
                        </div>
                        <div>
                            <input type="checkbox" name="" id="3" />
                            <label htmlFor="3">Auto Submit Issue</label>
                        </div>
                        <div>
                            <input type="checkbox" name="" id="4" />
                            <label htmlFor="4">Show Status To All</label>
                        </div>
                    </div>
                </div>
                <div className={styles.settingItem}>
                    <div className={styles.settingName}>
                        SIDEBAR MENU COLORS
                    </div>
                    <div className={styles.settingDetail}>
                        <button
                            onClick={() => setSlidebarTheme("light")}
                            className={
                                slidebarTheme === "light" ? styles.active : ""
                            }
                        >
                            Light
                        </button>
                        <button
                            onClick={() => setSlidebarTheme("dark")}
                            className={
                                slidebarTheme === "dark" ? styles.active : ""
                            }
                        >
                            Dark
                        </button>
                    </div>
                </div>
                <div className={styles.settingItem}>
                    <div className={styles.settingName}>THEME COLORS</div>
                    <div className={styles.settingDetail}>
                        <button
                            onClick={() => {
                                setTheme("light");
                                setSlidebarTheme("light");
                                setNavbarTheme("#fff");
                            }}
                            className={theme === "light" ? styles.active : ""}
                        >
                            Light
                        </button>
                        <button
                            onClick={() => {
                                setTheme("dark");
                                setSlidebarTheme("dark");
                                setNavbarTheme("#1a202e");
                            }}
                            className={theme === "dark" ? styles.active : ""}
                        >
                            Dark
                        </button>
                    </div>
                </div>
                <div className={styles.settingItem}>
                    <div className={styles.settingName}>SKINS</div>
                    <div className={styles.settingDetail}>
                        <div className={styles.colorList}>
                            <div
                                onClick={() => setNavbarTheme("#fff")}
                                className={
                                    styles.color +
                                    (navbarTheme === "#fff"
                                        ? " " + styles.active
                                        : "")
                                }
                            >
                                <i className="fas fa-check"></i>
                            </div>
                            <div
                                onClick={() => setNavbarTheme("#1a202e")}
                                className={
                                    styles.color +
                                    (navbarTheme === "#1a202e"
                                        ? " " + styles.active
                                        : "")
                                }
                            >
                                <i className="fas fa-check"></i>
                            </div>
                            <div
                                onClick={() => setNavbarTheme("#813ae1")}
                                className={
                                    styles.color +
                                    (navbarTheme === "#813ae1"
                                        ? " " + styles.active
                                        : "")
                                }
                            >
                                <i className="fas fa-check"></i>
                            </div>
                            <div
                                onClick={() => setNavbarTheme("#03a9f3")}
                                className={
                                    styles.color +
                                    (navbarTheme === "#03a9f3"
                                        ? " " + styles.active
                                        : "")
                                }
                            >
                                <i className="fas fa-check"></i>
                            </div>
                            <div
                                onClick={() => setNavbarTheme("#13d1d3")}
                                className={
                                    styles.color +
                                    (navbarTheme === "#13d1d3"
                                        ? " " + styles.active
                                        : "")
                                }
                            >
                                <i className="fas fa-check"></i>
                            </div>
                            <div
                                onClick={() => setNavbarTheme("#13b464")}
                                className={
                                    styles.color +
                                    (navbarTheme === "#13b464"
                                        ? " " + styles.active
                                        : "")
                                }
                            >
                                <i className="fas fa-check"></i>
                            </div>
                            <div
                                onClick={() => setNavbarTheme("#f06533")}
                                className={
                                    styles.color +
                                    (navbarTheme === "#f06533"
                                        ? " " + styles.active
                                        : "")
                                }
                            >
                                <i className="fas fa-check"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.settingItem}>
                    <div className={styles.settingName}>Disk Space</div>
                    <div className={styles.settingDetail}>
                        <progress id="progress" value="32" max="100">
                            {" "}
                            26%{" "}
                        </progress>
                        <label htmlFor="progress">26% remaining</label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Setting;
