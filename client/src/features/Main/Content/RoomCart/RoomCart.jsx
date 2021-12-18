import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { roomSelector, getAll, setRoom } from '../../../../store/reducer/roomSlice';
import Loading from '../../../../components/Loading/Loading';
import { useStore } from "../../Content";
import styles from "./RoomCart.module.scss";


const RoomCart = () => {

    const { viewGrid, filter, setFilter } = useStore();
    const history = useHistory()
    const dispatch = useDispatch()
    const { roomLoading, rooms, quantity } = useSelector(roomSelector)

    const showDetail = (e, room) => {
        e.preventDefault()
        dispatch(setRoom(room))
        history.push('/detail')
    }

    const booking = (room) => {
        dispatch(setRoom(room))
        history.push('/booking')
    }

    let data
    let paginationData = []
    if (rooms) {
        data = rooms.map(room => {
            return (
                <div key={room._id} className={`col ${viewGrid ? 'l-6' : 'l-12'} c-12`}>
                    <div className={styles.room}>
                        <span className={styles.ranking}>
                            {room.name.toUpperCase()}
                            <i className='fas fa-star'></i>
                            <i className='fas fa-star'></i>
                            <i className='fas fa-star'></i>
                            <i className='fas fa-star'></i>
                        </span>
                        <img src={process.env.REACT_APP_API_URL + room.images[0]} alt='' />
                        <div className={styles.roomDetail}>
                            <div className={styles.roomName}>{room.name.toUpperCase()}</div>
                            <div className={styles.roomInfo}>
                                <i className='far fa-user'></i>
                                <span>{room.bed} BEDS</span>
                                <i className='fas fa-expand-arrows-alt'></i>
                                <span>{room.size} Ft</span>
                            </div>
                            <div className={styles.roomDesc}>
                                {room.description}
                            </div>
                            <button onClick={() => booking(room)}>BOOK NOW FOR {room.price} $</button>
                            <div className={styles.roomFooter}>
                                <div className={styles.roomService}>
                                    {room.services.map(service => {
                                        return (
                                            <i key={service._id} title={service.name} className={service.icon}></i>
                                        )
                                    })}
                                </div>
                                <a href='/detail' onClick={(e) => showDetail(e, room)}>
                                    FULL INFO{' '}
                                    <i className='fas fa-chevron-right'></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        for (let i = 1; i <= Math.ceil(quantity / filter.limit); i++) {
            paginationData.push(
                <>
                    <div className={styles.paginationItem + (i === filter.skip ? ' ' + styles.active : '')} onClick={() => setFilter({ ...filter, skip: i })}>
                        {i}
                    </div>
                </>
            )
        }
    }

    return (
        <>
            <div className={styles.roomContainer}>
                {roomLoading ? <Loading /> :
                    <>
                        <div className='grid'>
                            <div className='row'>
                                {data}
                            </div>
                        </div>
                        <div className={styles.pagination}>
                            {paginationData}
                        </div>
                    </>
                }
            </div>
        </>
    );
};

export default RoomCart;
