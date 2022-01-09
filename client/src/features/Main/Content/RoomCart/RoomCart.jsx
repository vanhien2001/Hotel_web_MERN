import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import { roomSelector, getAll, setRoom } from '../../../../store/reducer/roomSlice';
import Loading from '../../../../components/Loading/Loading';
import { useStore } from "../../Content";
import styles from "./RoomCart.module.scss";


const RoomCart = () => {
    const { viewGrid, filter, setFilter, bookingForm, setbookingForm } = useStore();
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()
    const { roomLoading, rooms, quantity } = useSelector(roomSelector)
    const [skip, setSkip] = useState(1)

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
    if (rooms?.length > 0) {
        data = rooms.map(room => {
            return (
                <div key={room._id} className={`col ${viewGrid ? 'l-6' : 'l-12'} c-12`}>
                    <div className={clsx(styles.room, {[styles.room2]: !viewGrid})}>
                        <span className={styles.ranking}>
                            {room.name.toUpperCase()}
                            <i className='fas fa-star'></i>
                            <i className='fas fa-star'></i>
                            <i className='fas fa-star'></i>
                            <i className='fas fa-star'></i>
                        </span>
                        {/* <img src={(process.env.REACT_APP_API_URL || "http://192.168.1.128:5000") + room.images[0]} alt='' /> */}
                        <img src={"http://192.168.1.128:5000" + room.images[0]} alt='' />
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
    }else{
        data = (
            <div className="col l-12 c-12">
                <div className={styles.empty}><i class="fas fa-exclamation-circle"></i>No results</div>
            </div>
        )
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        if(location.search){
            const filterA = queryString.parse(location.search,{
                arrayFormat: 'bracket-separator', 
                arrayFormatSeparator: '|'
            })
            setFilter({
                price: parseInt(filterA.price),
                skip: parseInt(filterA.skip),
                limit: parseInt(filterA.limit),
                services: filterA.services || [],
                typeRoom: filterA.typeRoom || [],
                sort: filterA ? JSON.parse(filterA.sort ? filterA.sort[0] : null) : null,
            })
            setbookingForm({
                ...bookingForm,
                arrive: new Date(parseInt(filterA.arrive)),
                depart: new Date(parseInt(filterA.depart))
            })
        }else{
            setFilter(() => {
                const date = new Date();
                date.setDate(date.getDate() + 1);
                return {
                    typeRoom: [],
                    services: [],
                    price: 300,
                    sort: null,
                    skip: 1,
                    limit: 4,
                    arrive: new Date(),
                    depart: date
                }
            })
        }
        return history.push({
            search: null
        })
    }, []);

    useEffect(() => {
        dispatch(getAll(filter));
        if(skip === 3){
            history.push({
                search: queryString.stringify({
                    ...filter,
                    sort: filter.sort ? [JSON.stringify(filter.sort)] : null,
                    arrive: filter.arrive ? filter.arrive.getTime() : null,
                    depart: filter.depart ? filter.depart.getTime() : null
                },{
                    arrayFormat: 'bracket-separator', 
                    arrayFormatSeparator: '|',
                    skipNull: true
                })
            })
        }else{
            setSkip(skip+1)
        }
    }, [filter]);

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
