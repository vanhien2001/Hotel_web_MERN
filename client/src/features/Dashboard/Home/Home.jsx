import React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { Line, Doughnut } from "react-chartjs-2";
import styles from "./Home.module.scss";
import Cart from "./Cart";
import { useStore } from "../Dashboard";
import { roomSelector } from "../../../store/reducer/roomSlice";
import { bookingSelector } from "../../../store/reducer/bookingSlice";
import { staffSelector } from "../../../store/reducer/staffSlice";

const Home = () => {
    const { theme } = useStore();
    const { quantity } = useSelector(roomSelector);
    const { bookings } = useSelector(bookingSelector);
    const { staffs } = useSelector(staffSelector);

    return (
        <>
            <div
                className={clsx(styles.home, {
                    [styles.light]: theme==="light",
                })}
            >
                <div className={styles.header}>
                    <div className={styles.title}>
                        <div className={styles.text}>Hi, Welcome back!</div>
                        Hotel Dashboard
                    </div>
                    <div className={styles.infor}>
                        <div className={styles.inforItem}>
                            <div className={styles.inforItemName}>
                                Customer Ratings
                            </div>
                            <div className={styles.inforItemIcon}>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star-half-alt"></i>
                                <i className="far fa-star"></i>
                                (9,876)
                            </div>
                        </div>
                        <div className={styles.inforItem}>
                            <div className={styles.inforItemName}>
                                Total Income
                            </div>
                            <div className={styles.inforItemIcon}>
                                <i className="fas fa-signal"></i>
                                <i className="fas fa-signal"></i>
                                <i className="fas fa-signal"></i>
                                <i className="fas fa-signal"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.cartList}>
                    <div className="grid">
                        <div className="row">
                            <div className="col l-3 c-12">
                                <Cart color={'#6f42c1'} icon={'fas fa-copy'} title={'Total Booking'} value={bookings.length}/>
                            </div>
                            <div className="col l-3 c-12">
                                <Cart color={'#fd7e14'} icon={'fas fa-bed'} title={'Rooms Available'} value={quantity}/>
                            </div>
                            <div className="col l-3 c-12">
                                <Cart color={'#198754'} icon={'fas fa-users'} title={'Staffs'} value={staffs.length}/>
                            </div>
                            <div className="col l-3 c-12">
                                <Cart color={'#0dcaf0'} icon={'fas fa-dollar-sign'} title={'Total Revenue'} value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(bookings.reduce((value, booking)=> value + booking.totalPrice, 0)*1000)}/>
                            </div>
                            <div className="col l-8 c-12">
                                <div
                                    className={clsx(
                                        styles.cartItem,
                                        styles.chart,
                                        theme==="light"
                                            ? "shadow_light"
                                            : "shadow"
                                    )}
                                >
                                    <Line
                                        data={{
                                            labels: [
                                                "00:00",
                                                "01:00",
                                                "02:00",
                                                "03:00",
                                                "04:00",
                                                "05:00",
                                                "06:00",
                                            ],
                                            datasets: [
                                                {
                                                    label: "Old Customer", // Name the series
                                                    data: [
                                                        11, 32, 45, 32, 34, 52,
                                                        41,
                                                    ], // Specify the data values array
                                                    fill: true,
                                                    borderColor:
                                                        "rgba(255, 159, 64, 1)", // Add custom color border (Line)
                                                    backgroundColor:
                                                        "rgba(255, 159, 64, 0.5)", // Add custom color background (Points and Fill)
                                                    borderWidth: 3, // Specify bar border width
                                                },
                                                {
                                                    label: "New Customer", // Name the series
                                                    data: [
                                                        31, 40, 28, 51, 42, 85,
                                                        77,
                                                    ], // Specify the data values array
                                                    fill: true,
                                                    borderColor:
                                                        "rgba(153, 102, 255, 1)", // Add custom color border (Line)
                                                    backgroundColor:
                                                        "rgba(153, 102, 255, 0.5)", // Add custom color background (Points and Fill)
                                                    borderWidth: 3, // Specify bar border width
                                                },
                                            ],
                                        }}
                                        options={{
                                            scales: {
                                                y: {
                                                    type: "linear",
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col l-4 c-12">
                                <div
                                    className={clsx(
                                        styles.cartItem,
                                        styles.chart,
                                        theme==="light"
                                            ? "shadow_light"
                                            : "shadow"
                                    )}
                                >
                                    <Doughnut
                                        data={{
                                            labels: [
                                                "Red",
                                                "Blue",
                                                "Yellow",
                                                "Green",
                                                "Purple",
                                                "Orange",
                                            ],
                                            datasets: [
                                                {
                                                    label: "My First Dataset",
                                                    data: [12, 19, 3, 5, 2, 3],
                                                    backgroundColor: [
                                                        "rgba(255, 99, 132, 0.5)",
                                                        "rgba(54, 162, 235, 0.5)",
                                                        "rgba(255, 206, 86, 0.5)",
                                                        "rgba(75, 192, 192, 0.5)",
                                                        "rgba(153, 102, 255, 0.5)",
                                                        "rgba(255, 159, 64, 0.5)",
                                                    ],
                                                    hoverBackgroundColor: [
                                                        "rgba(255, 99, 132, 1)",
                                                        "rgba(54, 162, 235, 1)",
                                                        "rgba(255, 206, 86, 1)",
                                                        "rgba(75, 192, 192, 1)",
                                                        "rgba(153, 102, 255, 1)",
                                                        "rgba(255, 159, 64, 1)",
                                                    ],
                                                    borderWidth: 0,
                                                    hoverOffset: 20,
                                                },
                                            ],
                                        }}
                                        options={{
                                            scales: {
                                                y: {
                                                    type: "linear",
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
