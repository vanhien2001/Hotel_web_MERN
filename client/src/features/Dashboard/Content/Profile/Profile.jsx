import React from "react";
import clsx from "clsx";
import { useStore } from "../../Dashboard";
import { priceFormat } from "../../../../util/dataFormat";
import styles from "./Profile.module.scss";

const Profile = () => {
    const { staff, theme } = useStore();

    return (
        <div
            className={clsx(styles.profile, {
                [styles.light]: theme === "light",
            })}
        >
            <div className="grid">
                <div className="row">
                    <div className="col l-4 c-12">
                        <div
                            className={clsx(
                                styles.cart,
                                styles.left,
                                theme === "light" ? "shadow_light" : "shadow"
                            )}
                        >
                            <img src="../Img/avatar.png" alt="" />
                            <div className={styles.name}>
                                {staff.user.firstname}
                            </div>
                            <div className={styles.item}>
                                {staff.position.name}
                            </div>
                            <div className={styles.item}>
                                <i className="far fa-envelope"></i>
                                {staff.user.email}
                            </div>
                            <div className={styles.item}>
                                <i className="fas fa-phone-alt"></i>
                                {staff.user.phone}
                            </div>
                        </div>
                    </div>
                    <div className="col l-8 c-12">
                        <div
                            className={clsx(
                                styles.cart,
                                styles.right,
                                theme === "light" ? "shadow_light" : "shadow"
                            )}
                        >
                            <div className={styles.title}>Information</div>
                            <div className="grid">
                                <div className="row">
                                    <div className="col l-3 c-3">
                                        <div className={styles.infor}>
                                            <div>First Name</div>
                                            <span>{staff.user.firstname}</span>
                                        </div>
                                    </div>
                                    <div className="col l-3 c-3">
                                        <div className={styles.infor}>
                                            <div>Last Name</div>
                                            <span>{staff.user.lastname}</span>
                                        </div>
                                    </div>
                                    <div className="col l-3 c-3">
                                        <div className={styles.infor}>
                                            <div>Gender</div>
                                            <span>{staff.user.gender}</span>
                                        </div>
                                    </div>
                                    <div className="col l-3 c-3">
                                        <div className={styles.infor}>
                                            <div>Cmnd</div>
                                            <span>{staff.user.cmnd}</span>
                                        </div>
                                    </div>
                                    <div className="col l-3 c-3">
                                        <div className={styles.infor}>
                                            <div>Phone</div>
                                            <span>{staff.user.phone}</span>
                                        </div>
                                    </div>
                                    <div className="col l-3 c-3">
                                        <div className={styles.infor}>
                                            <div>Email</div>
                                            <span>{staff.user.email}</span>
                                        </div>
                                    </div>
                                    <div className="col l-12 c-12">
                                        <div className={styles.infor}>
                                            <div>Address</div>
                                            <span>{staff.user.address}</span>
                                        </div>
                                    </div>
                                    <div className="col l-3 c-3">
                                        <div className={styles.infor}>
                                            <div>Poition</div>
                                            <span>{staff.position.name}</span>
                                        </div>
                                    </div>
                                    <div className="col l-3 c-3">
                                        <div className={styles.infor}>
                                            <div>Salary</div>
                                            <span>
                                                {priceFormat(staff.salary)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
