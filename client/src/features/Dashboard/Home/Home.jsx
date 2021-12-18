import React from "react";
import clsx from "clsx";
import { Line, Doughnut } from "react-chartjs-2";
import styles from "./Home.module.scss";
import { useStore } from "../Dashboard";

const Home = () => {
    const { theme } = useStore();
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
                                <div
                                    className={clsx(
                                        styles.cartItem,
                                        theme==="light"
                                            ? "shadow_light"
                                            : "shadow"
                                    )}
                                >
                                    <div className={styles.detail}>
                                        <div
                                            style={{
                                                backgroundColor: "#6f42c1",
                                            }}
                                            className={styles.icon}
                                        >
                                            <i className="fas fa-copy"></i>
                                        </div>
                                        <div>
                                            <div className={styles.name}>
                                                Total Booking
                                            </div>
                                            <div className={styles.value}>
                                                1,245
                                            </div>
                                        </div>
                                    </div>
                                    <progress
                                        id="progress"
                                        value="40"
                                        max="100"
                                    >
                                        40%
                                    </progress>
                                </div>
                            </div>
                            <div className="col l-3 c-12">
                                <div
                                    className={clsx(
                                        styles.cartItem,
                                        theme==="light"
                                            ? "shadow_light"
                                            : "shadow"
                                    )}
                                >
                                    <div className={styles.detail}>
                                        <div
                                            style={{
                                                backgroundColor: "#fd7e14",
                                            }}
                                            className={styles.icon}
                                        >
                                            <i className="fas fa-bed"></i>
                                        </div>
                                        <div>
                                            <div className={styles.name}>
                                                Rooms Available
                                            </div>
                                            <div className={styles.value}>
                                                287
                                            </div>
                                        </div>
                                    </div>
                                    <progress
                                        id="progress"
                                        value="40"
                                        max="100"
                                    >
                                        40%
                                    </progress>
                                </div>
                            </div>
                            <div className="col l-3 c-12">
                                <div
                                    className={clsx(
                                        styles.cartItem,
                                        theme==="light"
                                            ? "shadow_light"
                                            : "shadow"
                                    )}
                                >
                                    <div className={styles.detail}>
                                        <div
                                            style={{
                                                backgroundColor: "#198754",
                                            }}
                                            className={styles.icon}
                                        >
                                            <i className="fas fa-users"></i>
                                        </div>
                                        <div>
                                            <div className={styles.name}>
                                                New Customers
                                            </div>
                                            <div className={styles.value}>
                                                1,532
                                            </div>
                                        </div>
                                    </div>
                                    <progress
                                        id="progress"
                                        value="40"
                                        max="100"
                                    >
                                        40%
                                    </progress>
                                </div>
                            </div>
                            <div className="col l-3 c-12">
                                <div
                                    className={clsx(
                                        styles.cartItem,
                                        theme==="light"
                                            ? "shadow_light"
                                            : "shadow"
                                    )}
                                >
                                    <div className={styles.detail}>
                                        <div
                                            style={{
                                                backgroundColor: "#0dcaf0",
                                            }}
                                            className={styles.icon}
                                        >
                                            <i className="fas fa-dollar-sign"></i>
                                        </div>
                                        <div>
                                            <div className={styles.name}>
                                                Total Revenue
                                            </div>
                                            <div className={styles.value}>
                                                $22,567
                                            </div>
                                        </div>
                                    </div>
                                    <progress
                                        id="progress"
                                        value="40"
                                        max="100"
                                    >
                                        40%
                                    </progress>
                                </div>
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
