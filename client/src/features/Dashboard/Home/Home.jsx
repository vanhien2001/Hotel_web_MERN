import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Legend,
    Tooltip,
    Title,
} from "chart.js";
import { Chart, Doughnut, Bar, Line  } from "react-chartjs-2";
import styles from "./Home.module.scss";
import Cart from "./Cart";
import { useStore } from "../Dashboard";
import { roomSelector, getStatistics } from "../../../store/reducer/roomSlice";
import { getAll, typeRoomSelector, getStatistics as getStatisticsTypeRoom } from "../../../store/reducer/typeRoomSlice";
import { getAll as getAllService, serviceSelector, getStatistics as getStatisticsService} from "../../../store/reducer/serviceSlice";
import { bookingSelector } from "../../../store/reducer/bookingSlice";
import { staffSelector } from "../../../store/reducer/staffSlice";
import { priceFormat } from "../../../util/dataFormat";

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Legend,
    Tooltip,
    Title,
);

const Home = () => {
    const dispatch = useDispatch();
    const { theme } = useStore();
    const { quantity, statistics, rooms } = useSelector(roomSelector);
    const { statistics: statisticsTypeRoom, typeRoom } = useSelector(typeRoomSelector);
    const { statistics: statisticsService, services } = useSelector(serviceSelector);
    const { bookings } = useSelector(bookingSelector);
    const { staffs } = useSelector(staffSelector);

    const [year, setYear] = useState(2021);
    const [year2, setYear2] = useState(2021);
    const [year3, setYear3] = useState(2021);

    let servicesExtra
    if(services){
        servicesExtra = services.filter(service => service.extraService)
    }

    useEffect(() => {
        dispatch(getAll());
        dispatch(getAllService());
    }, []);

    useEffect(() => {
        dispatch(getStatistics({ year: year }));
    }, [year]);

    useEffect(() => {
        dispatch(getStatisticsService({ year: year2 }));
    }, [year2]);

    useEffect(() => {
        dispatch(getStatisticsTypeRoom({ year: year3 }));
    }, [year3]);

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
                                <Cart color={'#6f42c1'} icon={'fas fa-copy'} title={'Total Booking'} value={bookings?.length}/>
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
                            {/* <div className="col l-8 c-12">
                                <div className={styles.charContainer}> 
                                    <div
                                        className={clsx(
                                            styles.cartItem,
                                            styles.chart,
                                            theme==="light"
                                                ? "shadow_light"
                                                : "shadow"
                                        )}
                                    >
                                        <Chart
                                            type='bar'
                                            data={{
                                                labels: rooms.map(room => room.name),
                                                datasets: [
                                                    {
                                                        type: 'line',
                                                        label: "Doanh thu",
                                                        data: rooms.map(room => {
                                                            const a = statistics?.find(statistic => statistic._id?._id === room._id)
                                                            return (a?.count || 0)*room.price
                                                        }),
                                                        fill: true,
                                                        borderColor:
                                                            "rgba(255, 99, 132, 1)", 
                                                        backgroundColor:
                                                            "rgba(255, 99, 132, 0.8)", 
                                                        borderWidth: 1,
                                                        yAxisID: 'A',
                                                    },
                                                    {
                                                        type: 'bar',
                                                        label: "Số ngày được đặt", // Name the series
                                                        data: rooms.map(room => {
                                                            const a = statistics?.find(statistic => statistic._id?._id === room._id)
                                                            return a?.count || 0
                                                        }), // Specify the data values array
                                                        fill: true,
                                                        borderColor:
                                                            "rgba(75, 192, 192, 1)", // Add custom color border (Line)
                                                        backgroundColor:
                                                            "rgba(75, 192, 192, 0.8)", // Add custom color background (Points and Fill)
                                                        borderWidth: 3, // Specify bar border width
                                                        yAxisID: 'B',
                                                    },
                                                ],
                                            }}
                                            options={{
                                                plugins: {
                                                    title: {
                                                    display: true,
                                                    text: 'Thống kê số ngày được đặt và doanh thu các phòng',
                                                    },
                                                    tooltip: {
                                                        callbacks: {
                                                            footer: (tooltipItems) => {
                                                            let type
                                                            let price = 0;
        
                                                            tooltipItems.forEach(function(tooltipItem) {
                                                                type = tooltipItem.dataset.type
                                                                price += tooltipItem.parsed.y;
                                                            });
                                                            if(type === 'line'){
                                                                return 'Doanh thu: ' + priceFormat(price);
                                                            }
                                                            return 'Số ngày được đặt: ' + price;
                                                            },
                                                        }
                                                    }
                                                },
                                                scales: {
                                                    A: {
                                                        type: 'linear',
                                                        position: 'left',
                                                    },
                                                    B: {
                                                        type: 'linear',
                                                        position: 'right',
                                                        suggestedMax: 20
                                                    }
                                                },
                                            }}
                                        />
                                    </div>
                                </div>
                            </div> */}
                            <div className="col l-8 c-12">
                                <div className={styles.charContainer}>
                                    <div
                                        className={clsx(
                                            styles.cartItem,
                                            styles.chart,
                                            theme==="light"
                                                ? "shadow_light"
                                                : "shadow"
                                        )}
                                    >
                                        <div className={styles.yearChoose}>
                                            <i class="fas fa-chevron-left" onClick={() => setYear(year-1)}></i>
                                            <span>{year}</span>
                                            <i class="fas fa-chevron-right" onClick={() => {year < (new Date()).getFullYear() && setYear(year+1)}}></i>
                                        </div> 
                                        <Bar
                                            data={{
                                                labels: rooms.map(room => room.name),
                                                datasets: [
                                                    {
                                                        label: "Số ngày được đặt", // Name the series
                                                        data: rooms.map(room => {
                                                            const a = statistics?.find(statistic => statistic._id?._id === room._id)
                                                            return a?.count || 0
                                                        }), // Specify the data values array
                                                        fill: true,
                                                        borderColor:
                                                            "rgba(75, 192, 192, 1)", // Add custom color border (Line)
                                                        backgroundColor:
                                                            "rgba(75, 192, 192, 0.8)", // Add custom color background (Points and Fill)
                                                        borderWidth: 3, // Specify bar border width
                                                        yAxisID: 'B',
                                                    },
                                                ],
                                            }}
                                            options={{
                                                plugins: {
                                                    title: {
                                                    display: true,
                                                    text: 'Thống kê số ngày được đặt của các phòng',
                                                    },
                                                    tooltip: {
                                                        callbacks: {
                                                            footer: (tooltipItems) => {
                                                            let type
                                                            let day = 0;
                                                            tooltipItems.forEach(function(tooltipItem) {
                                                                type = tooltipItem.dataset.type
                                                                day += tooltipItem.parsed.y;
                                                            });
                                                            return 'Số ngày được đặt: ' + day;
                                                            },
                                                        }
                                                    }
                                                },
                                                scales: {
                                                    B: {
                                                        type: 'linear',
                                                        position: 'left',
                                                        suggestedMax: 20
                                                    }
                                                },
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col l-4 c-12">
                                <div className={styles.charContainer}>
                                    <div
                                        className={clsx(
                                            styles.cartItem,
                                            styles.chart,
                                            theme==="light"
                                                ? "shadow_light"
                                                : "shadow"
                                        )}
                                    >
                                        <div className={styles.yearChoose}>
                                            <i class="fas fa-chevron-left" onClick={() => setYear2(year2-1)}></i>
                                            <span>{year2}</span>
                                            <i class="fas fa-chevron-right" onClick={() => {year2 < (new Date()).getFullYear() && setYear2(year2+1)}}></i>
                                        </div> 
                                        <Doughnut
                                            data={{
                                                labels: servicesExtra?.map(index => index.name),
                                                datasets: [
                                                    {
                                                        label: "My First Dataset",
                                                        data: servicesExtra?.map(index => {
                                                            const a = statisticsService?.find(statistic => statistic._id === index._id)
                                                            return a?.totalPrice || 0
                                                        }),
                                                        backgroundColor: [
                                                            "rgba(255, 163, 47, 0.8)",
                                                            "rgba(55, 138, 255, 0.8)",
                                                            "rgba(255, 236, 33, 0.8)",
                                                            "rgba(245, 79, 82, 0.8)",
                                                            "rgba(147, 240, 59, 0.8)",
                                                            "rgba(149, 82, 234, 0.8)",
                                                            "rgba(155, 49, 146, 0.8)",
                                                        ],
                                                        hoverBackgroundColor: [
                                                            "rgba(255, 163, 47, 1)",
                                                            "rgba(55, 138, 255, 1)",
                                                            "rgba(255, 236, 33, 1)",
                                                            "rgba(245, 79, 82, 1)",
                                                            "rgba(147, 240, 59, 1)",
                                                            "rgba(149, 82, 234, 1)",
                                                            "rgba(155, 49, 146, 1)",
                                                        ],
                                                        borderWidth: 0,
                                                        hoverOffset: 20,
                                                    },
                                                ],
                                            }}
                                            options={{
                                                scales: {
                                                    yAxes: [{
                                                        gridLines : {
                                                            display : false
                                                        }
                                                    }]
                                                },
                                                plugins: {
                                                    title: {
                                                    display: true,
                                                    text: 'Doanh thu từng loại dịch vụ',
                                                    },
                                                    tooltip: {
                                                        callbacks: {
                                                        footer: (tooltipItems) => {
                                                            console.log(tooltipItems)
                                                            let price = 0;

                                                            tooltipItems.forEach(function(tooltipItem) {
                                                                price += tooltipItem.parsed;
                                                            });
                                                            return 'Doanh thu: ' + priceFormat(price);
                                                        },
                                                        }
                                                    }
                                                },
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col l-8 c-12">
                                <div className={styles.charContainer}> 
                                    <div
                                        className={clsx(
                                            styles.cartItem,
                                            styles.chart,
                                            theme==="light"
                                                ? "shadow_light"
                                                : "shadow"
                                        )}
                                    >
                                        <div className={styles.yearChoose}>
                                            <i class="fas fa-chevron-left" onClick={() => setYear(year-1)}></i>
                                            <span>{year}</span>
                                            <i class="fas fa-chevron-right" onClick={() => {year < (new Date()).getFullYear() && setYear(year+1)}}></i>
                                        </div> 
                                        <Line
                                            data={{
                                                labels: rooms.map(room => room.name),
                                                datasets: [
                                                    {
                                                        type: 'line',
                                                        label: "Doanh thu",
                                                        data: rooms.map(room => {
                                                            const a = statistics?.find(statistic => statistic._id?._id === room._id)
                                                            return (a?.count || 0)*room.price
                                                        }),
                                                        fill: true,
                                                        borderColor:
                                                            "rgba(255, 99, 132, 1)", 
                                                        backgroundColor:
                                                            "rgba(255, 99, 132, 0.8)", 
                                                        borderWidth: 1,
                                                        yAxisID: 'A',
                                                    },
                                                ],
                                            }}
                                            options={{
                                                plugins: {
                                                    title: {
                                                    display: true,
                                                    text: 'Thống kê doanh thu các phòng',
                                                    },
                                                    tooltip: {
                                                        callbacks: {
                                                            footer: (tooltipItems) => {
                                                            let type
                                                            let price = 0;
        
                                                            tooltipItems.forEach(function(tooltipItem) {
                                                                type = tooltipItem.dataset.type
                                                                price += tooltipItem.parsed.y;
                                                            });
                                                            return 'Doanh thu: ' + priceFormat(price);
                                                            },
                                                        }
                                                    }
                                                },
                                                scales: {
                                                    A: {
                                                        type: 'linear',
                                                        position: 'left',
                                                    },
                                                },
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col l-4 c-12">
                                <div className={styles.charContainer}>  
                                    <div
                                        className={clsx(
                                            styles.cartItem,
                                            styles.chart,
                                            theme==="light"
                                                ? "shadow_light"
                                                : "shadow"
                                        )}
                                    >
                                        <div className={styles.yearChoose}>
                                            <i class="fas fa-chevron-left" onClick={() => setYear3(year3-1)}></i>
                                            <span>{year3}</span>
                                            <i class="fas fa-chevron-right" onClick={() => {year3 < (new Date()).getFullYear() && setYear3(year3+1)}}></i>
                                        </div> 
                                        <Doughnut
                                            data={{
                                                labels: typeRoom?.map(index => index.name),
                                                datasets: [
                                                    {
                                                        label: "My First Dataset",
                                                        data: typeRoom?.map(index => {
                                                            const a = statisticsTypeRoom?.find(statistic => statistic.typeRoom?._id === index._id)
                                                            return a?.totalPrice || 0
                                                        }),
                                                        backgroundColor: [
                                                            "rgba(255, 159, 64, 0.8)",
                                                            "rgba(255, 99, 132, 0.8)",
                                                            "rgba(54, 162, 235, 0.8)",
                                                            "rgba(255, 206, 86, 0.8)",
                                                            "rgba(75, 192, 192, 0.8)",
                                                            "rgba(153, 102, 255, 0.8)",
                                                        ],
                                                        hoverBackgroundColor: [
                                                            "rgba(255, 159, 64, 1)",
                                                            "rgba(255, 99, 132, 1)",
                                                            "rgba(54, 162, 235, 1)",
                                                            "rgba(255, 206, 86, 1)",
                                                            "rgba(75, 192, 192, 1)",
                                                            "rgba(153, 102, 255, 1)",
                                                        ],
                                                        borderWidth: 0,
                                                        hoverOffset: 20,
                                                    },
                                                ],
                                            }}
                                            options={{
                                                scales: {
                                                    yAxes: [{
                                                        gridLines : {
                                                            display : false
                                                        }
                                                    }]
                                                },
                                                plugins: {
                                                    title: {
                                                    display: true,
                                                    text: 'Doanh thu từng loại phòng',
                                                    },
                                                    tooltip: {
                                                        callbacks: {
                                                        footer: (tooltipItems) => {
                                                            console.log(tooltipItems)
                                                            let price = 0;

                                                            tooltipItems.forEach(function(tooltipItem) {
                                                                price += tooltipItem.parsed;
                                                            });
                                                            return 'Doanh thu: ' + priceFormat(price);
                                                        },
                                                        }
                                                    }
                                                },
                                            }}
                                        />
                                    </div>
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
