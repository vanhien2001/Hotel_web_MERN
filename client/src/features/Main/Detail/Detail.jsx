import React, { useEffect, useState } from "react";
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
import {
    commentSelector,
    getAll as getComment,
    addComment,
    editComment,
} from "../../../store/reducer/commentSlice";
import { userSelector } from "../../../store/reducer/userSlice";
import DateChoose from "../SideBar/Calender/DateChoose";
import Comment from "./Comment";
import WriteComment from "./WriteComment";
import "./Detail.scss";
import "swiper/swiper.scss";
import styles from "../Content/RoomCart/RoomCart.module.scss";

const Detail = ({ bookingForm, setbookingForm, numberDay }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { bookings } = useSelector(bookingSelector);
    const { rooms, room } = useSelector(roomSelector);
    const { comments } = useSelector(commentSelector);
    const { user } = useSelector(userSelector);

    const [showEdit, setShowEdit] = useState("");
    const [showReply, setShowReply] = useState("");
    const [comment, setComment] = useState("");
    const [commentEdit, setCommentEdit] = useState("");
    const [commentReply, setCommentReply] = useState("");

    const booking = (room) => {
        dispatch(setRoom(room));
        history.push("/booking");
    };

    const handleAddCommnet = (e) => {
        e.preventDefault();
        dispatch(
            addComment({
                user: user ? user._id : null,
                room: room ? room._id : null,
                content: comment,
            })
        )
            .then(() => dispatch(getComment({ room: room._id })))
            .then(() => {
                setComment("");
            });
    };

    const handleEditComment = (e) => {
        e.preventDefault();
        dispatch(
            editComment({
                id: showEdit,
                commentForm: {
                    user: user ? user._id : null,
                    room: room ? room._id : null,
                    content: commentEdit,
                },
            })
        )
            .then(() => dispatch(getComment({ room: room._id })))
            .then(() => {
                setCommentEdit("");
                setShowEdit("");
            });
    };

    const handleReplyComment = (e) => {
        e.preventDefault();
        dispatch(
            addComment({
                user: user ? user._id : null,
                room: room ? room._id : null,
                content: commentReply,
                parentComment: showReply
            })
        )
            .then(() => dispatch(getComment({ room: room._id })))
            .then(() => {
                setCommentReply("");
                setShowReply("");
            });
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
                            src={(process.env.REACT_APP_API_URL || "http://192.168.1.128:5000") + room.images[0]}
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
                                {room.description}
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

    let commentData;
    if (comments && comments.length > 0) {
        commentData = comments.map((index) => {
            return (
                <div className="comment">
                    <Comment comment={index} handleReply={() => setShowReply(index._id)} setShowEdit={setShowEdit} setCommentEdit={setCommentEdit}/>
                    {showEdit == index._id && (
                        <WriteComment title="Sửa bình luận" handleSubmit={handleEditComment} handleOnChange={(e)=>setCommentEdit(e.target.value)} handleCancel={()=>setShowEdit('')} value={commentEdit}/>
                    )}
                    {index.childComment &&
                        index.childComment.length > 0 &&
                        index.childComment.map((childComment) => {
                            return (
                                <>
                                <Comment comment={childComment} handleReply={() => setShowReply(index._id)} setShowEdit={setShowEdit} setCommentEdit={setCommentEdit} reply={true}/>
                                {showEdit == childComment._id && (
                                    <WriteComment title="Sửa bình luận" handleSubmit={handleEditComment} handleOnChange={(e)=>setCommentEdit(e.target.value)} handleCancel={()=>setShowEdit('')} value={commentEdit} reply={true}/>
                                )}                                
                                </>
                            );
                        })}
                    {showReply == index._id && (
                        <WriteComment title="Viết bình luận" handleSubmit={handleReplyComment} handleOnChange={(e)=>setCommentReply(e.target.value)} handleCancel={()=>setShowReply('')} value={commentReply} reply={true}/>
                    )}
                </div>
            );
        });
    } else {
        commentData = <span className="emptyComment">Chưa có bình luận</span>;
    }

    useEffect(() => {
        dispatch(getBooking({ room: room ? room._id : "" }));
        dispatch(getComment({ room: room ? room._id : "" }));
    }, [room]);

    useEffect(() => {
        window.scrollTo(0, 0)
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
                                                                (process.env.REACT_APP_API_URL || "http://192.168.1.128:5000") +
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
                                                        src="/Img/blog-7.jpg"
                                                        alt=""
                                                    />
                                                    <span>Lounge Bar</span>
                                                </div>
                                            </div>
                                            <div className="col l-4">
                                                <div className="around_item">
                                                    <img
                                                        src="/Img/blog-6.jpg"
                                                        alt=""
                                                    />
                                                    <span>Restaurants</span>
                                                </div>
                                            </div>
                                            <div className="col l-4">
                                                <div className="around_item">
                                                    <img
                                                        src="/Img/blog-5.jpg"
                                                        alt=""
                                                    />
                                                    <span>Wellness</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="detail_item">
                                    <div className="title">Bình luận</div>
                                    <div className="comment_list">
                                        {commentData}
                                    </div>
                                    <WriteComment title="Viết bình luận" handleSubmit={handleAddCommnet} handleOnChange={(e)=>setComment(e.target.value)} showCancel={false} value={comment}/>
                                </div>
                            </div>
                        </div>
                        <div className="col l-4 c-12">
                            <div className="sidebar">
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
                                <div className="title">Similar Rooms</div>
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
