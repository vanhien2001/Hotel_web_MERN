import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { logout } from "../../../store/reducer/staffSlice";
import { useStore } from "../Dashboard";
import styles from "./Navbar.module.scss";

const Navbar = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    // const {staff} = useSelector(staffSelector)
    const [openUser, setOpenUser] = useState(false);

    const {
        resizeSidebar,
        setResizeSidebar,
        theme,
        navbarStyle,
        setOpenSetting,
        openSetting,
    } = useStore();

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      }

    return (
        <>
            <div
                style={navbarStyle}
                className={clsx(
                    styles.navbar,{
                        [styles.resize]: resizeSidebar === true,
                    }, theme === "light" ? "shadow_light" : "shadow"
                )}
            >
                <i
                    className="fas fa-bars"
                    onClick={() => {
                        setResizeSidebar(!resizeSidebar);
                        setOpenSetting(false);
                        setOpenUser(false);
                    }}
                ></i>
                <div className={styles.navbarList}>
                    <div className={styles.navbarItem}>
                        <i title="Full view" className="fas fa-expand" onClick={() => toggleFullScreen()}></i>
                    </div>
                    <div className={styles.navbarItem}>
                        <i title="Notify" className="far fa-bell"></i>
                    </div>
                    <div className={styles.navbarItem}>
                        <i
                            title="User"
                            className="fas fa-user-circle"
                            onClick={() => {
                                setOpenUser(!openUser);
                                setOpenSetting(false);
                                setResizeSidebar(false);
                            }}
                        ></i>
                        <div
                            style={navbarStyle}
                            className={clsx(styles.dropdown, theme === "light" ? 'shadow_light' : 'shadow', {
                                [styles.open]: openUser
                            })}
                        >
                            <div className={styles.dropdownItem} onClick={() => {setOpenUser(false);history.push('/dashboard/profile')}}>
                                <i className="fas fa-user"></i>
                                <span>Profile</span>
                            </div>
                            <div className={styles.dropdownItem}>
                                <i className="fas fa-comment-dots"></i>
                                <span>Feedback</span>
                            </div>
                            <div className={styles.dropdownItem}>
                                <i className="fas fa-question-circle"></i>
                                <span>Help</span>
                            </div>
                            <div
                                className={styles.dropdownItem}
                                onClick={() => {
                                    dispatch(logout());
                                }}
                            >
                                <i className="fas fa-sign-out-alt"></i>
                                <span>Logout</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.navbarItem}>
                        <i
                            title="Setting"
                            onClick={() => {
                                setOpenSetting(!openSetting);
                                setOpenUser(false);
                                setResizeSidebar(false);
                            }}
                            className="fas fa-cog"
                        ></i>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
