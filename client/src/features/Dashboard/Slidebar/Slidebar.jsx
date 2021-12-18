import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import clsx from "clsx";
import { useStore } from "../Dashboard";
import styles from "./Slidebar.module.scss";

const Slidebar = () => {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const [menu, setMenu] = useState("home");
    const toggleMenu = (menu_change) => {
        if (menu_change === menu) {
            setIsOpen(!isOpen);
        } else {
            setMenu(menu_change);
            setIsOpen(true);
        }
    };

    const { staff, resizeSlidebar, theme, slidebarTheme } = useStore()

    return (
        <>
            <div
                className={clsx(
                    styles.slidebar,{
                        [styles.light]: slidebarTheme === "light",
                        [styles.resize]: resizeSlidebar === true
                    },theme === "light" ? 'shadow_light' : 'shadow')}
            >
                <div title="Hotel" className={styles.title} onClick={() => history.push("/home")}>
                    <i className="fas fa-hotel"></i>
                    Hotel
                </div>
                <div className={styles.slidebarContent}>
                    <div className={styles.staffInfor}>
                        <i
                            className={clsx(
                                "fas fa-user-circle",
                                styles.avatar
                            )}
                        ></i>
                        <div className={styles.staffName}>
                            {staff.user.firstname}
                        </div>
                        <div className={styles.staffJob}>{staff.position}</div>
                        <div className={styles.staffFeature}>
                            <i
                                title="Profile"
                                className="fas fa-user-circle"
                            ></i>
                            <i title="Email" className="far fa-envelope"></i>
                            <i
                                title="Calender"
                                className="fas fa-calendar-day"
                            ></i>
                            <i title="Lock" className="fas fa-lock"></i>
                        </div>
                    </div>
                    <div className={styles.slidebarList}>
                        <div className={styles.title}>-- MAIN</div>
                        <div
                            className={clsx(styles.slidebarItem, {
                                [styles.open]: menu === "home" && isOpen,
                            })}
                        >
                            <Link
                                to="/dashboard/home"
                                onClick={() => toggleMenu("home")}
                                className={styles.name}
                            >
                                <div>
                                    <i className="fas fa-home"></i>Home
                                </div>
                            </Link>
                        </div>
                        <div
                            className={clsx(styles.slidebarItem, {
                                [styles.open]: menu === "room" && isOpen,
                            })}
                        >
                            <div
                                onClick={() => toggleMenu("room")}
                                className={styles.name}
                            >
                                <div>
                                    <i className="fas fa-bed"></i>Room
                                </div>
                                {menu === "room" && isOpen ? (
                                    <i className="fas fa-minus"></i>
                                ) : (
                                    <i className="fas fa-plus"></i>
                                )}
                            </div>
                            <div className={styles.menu}>
                                <Link
                                    className={styles.detail}
                                    to="/dashboard/all-room"
                                >
                                    All Room
                                </Link>
                                <Link
                                    className={styles.detail}
                                    to="/dashboard/add-room"
                                >
                                    Add Room
                                </Link>
                                <Link
                                    className={styles.detail}
                                    to="/dashboard/type-room"
                                >
                                    Type Room
                                </Link>
                                <Link
                                    className={styles.detail}
                                    to="/dashboard/all-service-room"
                                >
                                    Service Room
                                </Link>
                            </div>
                        </div>
                        <div
                            className={clsx(styles.slidebarItem, {
                                [styles.open]: menu === "booking" && isOpen,
                            })}
                        >
                            <div
                                onClick={() => toggleMenu("booking")}
                                className={styles.name}
                            >
                                <div>
                                    <i className="far fa-file-alt"></i>Booking
                                </div>
                                {menu === "booking" && isOpen ? (
                                    <i className="fas fa-minus"></i>
                                ) : (
                                    <i className="fas fa-plus"></i>
                                )}
                            </div>
                            <div className={styles.menu}>
                                <Link
                                    className={styles.detail}
                                    to="/dashboard/all-booking"
                                >
                                    All Booking
                                </Link>
                                <Link
                                    className={styles.detail}
                                    to="/dashboard/add-booking"
                                >
                                    Add Booking
                                </Link>
                            </div>
                        </div>
                        <div
                            className={clsx(styles.slidebarItem, {
                                [styles.open]: menu === "service" && isOpen,
                            })}
                        >
                            <div
                                onClick={() => toggleMenu("service")}
                                className={styles.name}
                            >
                                <div>
                                    <i className="fas fa-concierge-bell"></i>
                                    Service
                                </div>
                                {menu === "service" && isOpen ? (
                                    <i className="fas fa-minus"></i>
                                ) : (
                                    <i className="fas fa-plus"></i>
                                )}
                            </div>
                            <div className={styles.menu}>
                                <Link
                                    className={styles.detail}
                                    to="/dashboard/all-service"
                                >
                                    All Service
                                </Link>
                                <Link
                                    className={styles.detail}
                                    to="/dashboard/add-service"
                                >
                                    Add Service
                                </Link>
                            </div>
                        </div>
                        <div
                            className={clsx(styles.slidebarItem, {
                                [styles.open]: menu === "staff" && isOpen,
                            })}
                        >
                            <div
                                onClick={() => toggleMenu("staff")}
                                className={styles.name}
                            >
                                <div>
                                    <i className="fas fa-male"></i>Staff
                                </div>
                                {menu === "staff" && isOpen ? (
                                    <i className="fas fa-minus"></i>
                                ) : (
                                    <i className="fas fa-plus"></i>
                                )}
                            </div>
                            <div className={styles.menu}>
                                <Link
                                    className={styles.detail}
                                    to="/dashboard/all-staff"
                                >
                                    All Staff
                                </Link>
                                <Link
                                    className={styles.detail}
                                    to="/dashboard/add-staff"
                                >
                                    Add Staff
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Slidebar;