import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import { Navigation, Pagination, Autoplay } from "swiper";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    bookingSelector,
    getAll as getBooking,
} from "../../../store/reducer/bookingSlice";
import {
    roomSelector,
    getAll,
    setRoom,
    loadRoom,
} from "../../../store/reducer/roomSlice";
import DateChoose from "../SlideBar/Calender/DateChoose";
import "./Detail.scss";
import "swiper/swiper.scss";
import styles from "../Content/RoomCart/RoomCart.module.scss";

const Detail = ({ bookingForm, setbookingForm, numberDay }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { bookings } = useSelector(bookingSelector);
    const { rooms, room } = useSelector(roomSelector);

    const booking = (room) => {
        dispatch(setRoom(room));
        history.push("/booking");
    };

    let data;
    if (rooms) {
        data = rooms.map((room) => {
            return (
                <div key={room._id} className={`col l-4 c-12`}>
                    <div className={styles.room}>
                        <span className={styles.ranking}>
                            {room.name.toUpperCase()}
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </span>
                        <img
                            src={"http://localhost:5000" + room.images[0]}
                            alt=""
                        />
                        <div className={styles.roomDetail}>
                            <div className={styles.roomName}>
                                {room.name.toUpperCase()}
                            </div>
                            <div className={styles.roomInfo}>
                                <i className="far fa-user"></i>
                                <span>{room.bed} BEDS</span>
                                <i className="fas fa-expand-arrows-alt"></i>
                                <span>{room.size} Ft</span>
                            </div>
                            <div className={styles.roomDesc}>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Integer vel molestie nisl. Duis
                                ac mi leo.
                            </div>
                            <button onClick={() => booking(room)}>
                                BOOK NOW FOR {room.price} $
                            </button>
                            <div className={styles.roomFooter}>
                                <div className={styles.roomService}>
                                    {room.services.map((service) => {
                                        return (
                                            <i
                                                title={service.name}
                                                className={service.icon}
                                            ></i>
                                        );
                                    })}
                                </div>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        dispatch(setRoom(room));
                                        history.push("/detail");
                                    }}
                                >
                                    FULL INFO{" "}
                                    <i className="fas fa-chevron-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }

    let service;
    if (room) {
        service = room.services.map((service) => {
            return (
                <div key={service._id} className="col l-4 c-6">
                    <div className="service_item">
                        <i title={service.name} className={service.icon}></i>
                        {service.name}
                    </div>
                </div>
            );
        });
    }

    var swiper;

    useEffect(() => {
        dispatch(getBooking({ room: room ? room._id : "" }));
    }, [room]);

    useEffect(() => {
        dispatch(loadRoom());
        dispatch(getAll({ limit: 3 }));
    }, []);

    return (
        <>
            <div className="detail_container">
                <div className="grid">
                    <div className="title">
                        <div className="name">{room ? room.name : ""}</div>
                        <div className="rate">
                            HOTEL ROME
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col l-8 c-12">
                            <div className="room_detail">
                                <div className="slider">
                                    <Swiper
                                        // install Swiper modules
                                        className="swiper"
                                        modules={[
                                            Navigation,
                                            Pagination,
                                            Autoplay,
                                        ]}
                                        loop={true}
                                        autoplay={{
                                            delay: 2500,
                                            disableOnInteraction: false,
                                        }}
                                        spaceBetween={30}
                                        centeredSlides={true}
                                        navigation
                                        pagination={{ clickable: true }}
                                    >
                                        {room
                                            ? room.images.map((image) => {
                                                  return (
                                                      <SwiperSlide>
                                                          <img
                                                              src={
                                                                  "http://localhost:5000" +
                                                                  image
                                                              }
                                                              alt=""
                                                          />
                                                      </SwiperSlide>
                                                  );
                                              })
                                            : ""}
                                    </Swiper>
                                </div>
                                <div className="infor">
                                    <div className="infor_item">
                                        <i className="far fa-user-circle"></i>
                                        <div>{room ? room.bed : ""} Beds</div>
                                    </div>
                                    <div className="infor_item">
                                        <i className="fas fa-expand-arrows-alt"></i>
                                        <div>{room ? room.size : ""} Ft</div>
                                    </div>
                                    <div className="infor_item">
                                        <i className="fas fa-dollar-sign"></i>
                                        <div>{room ? room.price : ""} $</div>
                                    </div>
                                    <div className="infor_item">
                                        <i className="fas fa-dollar-sign"></i>
                                        <div>{room ? room.price : ""} $</div>
                                    </div>
                                </div>
                                <div className="desc">
                                    {room ? room.description : ""}
                                </div>
                                <div className="detail_item">
                                    <div className="title">Room Services</div>
                                    <div className="service_list">
                                        <div className="row">{service}</div>
                                    </div>
                                </div>
                                <div className="detail_item">
                                    <div className="title">
                                        Around The Hotel
                                    </div>
                                    <div className="around_list">
                                        <div className="row">
                                            <div className="col l-4">
                                                <div className="around_item">
                                                    <img
                                                        src="/Img/room1.jpg"
                                                        alt=""
                                                    />
                                                    <span>Lounge Bar</span>
                                                </div>
                                            </div>
                                            <div className="col l-4">
                                                <div className="around_item">
                                                    <img
                                                        src="/Img/room1.jpg"
                                                        alt=""
                                                    />
                                                    <span>Restaurants</span>
                                                </div>
                                            </div>
                                            <div className="col l-4">
                                                <div className="around_item">
                                                    <img
                                                        src="/Img/room1.jpg"
                                                        alt=""
                                                    />
                                                    <span>Wellness</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col l-4 c-12">
                            <div className="slidebar">
                                <DateChoose
                                    bookingForm={bookingForm}
                                    setbookingForm={setbookingForm}
                                    bookings={bookings}
                                    numberDay={numberDay}
                                />
                                <div className="grid">
                                    <div className="row">
                                        <div className="col l-12 c-12">
                                            <button
                                                className="book_btn"
                                                onClick={() =>
                                                    history.push("/booking")
                                                }
                                            >
                                                BOOK NOW
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col l-12 c-12">
                            <div className="detail_item">
                                <div className="title">Around The Hotel</div>
                                <div className="room_container">
                                    <div className="grid">
                                        <div className="row">{data}</div>
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

export default Detail;
