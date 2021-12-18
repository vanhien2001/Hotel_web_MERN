import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { useStore } from "../../Dashboard";
import {
    getAll,
    addRoom,
    editRoom,
} from '../../../../store/reducer/roomSlice';
import {
    getAll as getAllTypeRoom,
    typeRoomSelector,
} from '../../../../store/reducer/typeRoomSlice';
import { getAll as getAll_Service, serviceSelector } from '../../../../store/reducer/serviceSlice';
import Alert from '../../Alert/Alert';
import styles from "../Add.module.scss";

const Add = ({ edit, room, setEdit, setMessagesAll }) => {
    const { theme } = useStore()
    const { typeRoom } = useSelector(typeRoomSelector);
    let { services } = useSelector(serviceSelector);
    if (services) {
        services = services.filter(service => service.extraService === false)
    }
    const dispatch = useDispatch();

    const [roomForm, setRoomForm] = useState({
        name: room ? room.name : '',
        typeRoom: room ? room.typeRoom._id : typeRoom ? typeRoom[0]._id : '',
        description: room ? room.description : '',
        size: room ? room.size : '',
        bed: room ? room.bed : '',
        price: room ? room.price : '',
        services: room ? room.services.map(service => service._id) : [],
        image: null
    });

    const [messages, setMessages] = useState(null);
    const formChange = (e) => {
        setRoomForm({
            ...roomForm,
            [e.target.name]: e.target.value,
        });
    };
    const serviceChoose = (e) => {
        if (e.target.checked) {
            let services = [...roomForm.services]
            services.push(e.target.value)
            setRoomForm({
                ...roomForm,
                services: services
            })
        } else {
            let services = [...roomForm.services]
            let index = services.indexOf(e.target.value)
            services.splice(index, 1)
            setRoomForm({
                ...roomForm,
                services: services
            })
        }
    }
    const add_room = (e) => {
        e.preventDefault()
        let formData = new FormData(e.target)
        // formData.append('services',roomForm.services)
        dispatch(
            room ? editRoom({ id: room._id, roomForm: formData }) : addRoom(formData)
        ).then((data) => {
            if (edit) {
                setMessagesAll(data.payload)
                setTimeout(() => {
                    setMessagesAll(null)
                }, 3000);
            } else {
                setMessages(data.payload)
                setTimeout(() => {
                    setMessages(null)
                }, 3000);
            }
            setRoomForm({
                name: '',
                typeRoom: `${typeRoom ? typeRoom[0]._id : ''}`,
                description: '',
                size: '',
                bed: '',
                price: '',
                services: []
            });
            dispatch(getAll()).then(() => {
                if (edit) {
                    setEdit({
                        show: false,
                        room: null,
                    })
                }
            });
        });
    };

    let type_room;
    if (typeRoom) {
        type_room = typeRoom.map((type) => {
            return (
                <option key={type._id} value={type._id}>
                    {type.name}
                </option>
            );
        });
    }

    let serviceData;
    if (services) {
        serviceData = services.map((service) => {
            return (
                <div key={service._id} className="col l-3 c-12 m-6">
                    <div className={styles.serviceItem}>
                        <input type="checkbox" name="services[]" id={service.name} value={service._id} onClick={(e) => serviceChoose(e)} checked={room && roomForm.services.includes(service._id)} />
                        <label htmlFor={service.name}>{service.name}</label>
                    </div>
                </div>
            );
        });
    }

    useEffect(() => {
        dispatch(getAllTypeRoom())
            .then(() => dispatch(getAll_Service()))
    }, []);

    return (
        <>
            {!room && messages && <Alert success={messages.success} messages={messages.messages} />}
            <div className={clsx(styles.addForm, {[styles.light]: theme === "light"}, theme === "light" ? 'shadow_light' : 'shadow')}>
                <div className={styles.title}>{room ? 'Edit Room' : 'Add Room'}</div>
                <form action='' method='post' onSubmit={(e) => add_room(e)} encType="multipart/form-data">
                    <div className='grid'>
                        <div className='row'>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <input
                                        type='text'
                                        name='name'
                                        placeholder=' '
                                        value={roomForm.name}
                                        onChange={(e) => formChange(e)}
                                    />
                                    <span>Name *</span>
                                </div>
                            </div>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <select
                                        name='typeRoom'
                                        value={roomForm.typeRoom}
                                        onChange={(e) => formChange(e)}
                                    >
                                        {type_room}
                                    </select>
                                    <span>Type Room</span>
                                </div>
                            </div>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <input
                                        type='number'
                                        name='size'
                                        placeholder=' '
                                        value={roomForm.size}
                                        onChange={(e) => formChange(e)}
                                    />
                                    <span>Size</span>
                                </div>
                            </div>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <input
                                        type='number'
                                        name='bed'
                                        placeholder=' '
                                        value={roomForm.bed}
                                        onChange={(e) => formChange(e)}
                                    />
                                    <span>Bed</span>
                                </div>
                            </div>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <input
                                        type='number'
                                        name='price'
                                        placeholder=' '
                                        value={roomForm.price}
                                        onChange={(e) => formChange(e)}
                                    />
                                    <span>Price</span>
                                </div>
                            </div>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <input
                                        type='file'
                                        name='image'
                                        placeholder=' '
                                        value={roomForm.image}
                                        onChange={(e) => formChange(e)}
                                        multiple
                                        accept="image/*"
                                    />
                                    <span>Image</span>
                                </div>
                            </div>
                            <div className='col l-12 c-12 m-12'>
                                <div className={styles.formControl}>
                                    <textarea placeholder=' ' name="description" value={roomForm.description} onChange={(e) => formChange(e)}></textarea>
                                    <span>Description</span>
                                </div>
                            </div>
                            <div className='col l-12 c-12 m-12'>
                                <div className={styles.formControl}>
                                    <div className={styles.title}>Service :</div>
                                    <div className={styles.serviceList}>
                                        <div className="row">
                                            {serviceData}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col l-12 c-12 m-12'>
                                <button className={styles.formBtn}>Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Add;
