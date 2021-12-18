import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { useStore } from "../../Dashboard";
import {
    getAll,
    addService,
    editService,
} from '../../../../store/reducer/serviceSlice';
import Alert from '../../Alert/Alert';
import styles from "../Add.module.scss";

const Add_service = ({ edit, service, setEdit, setMessagesAll }) => {
    const { theme } = useStore()
    // const { serviceLoading, services } = useSelector(serviceSelector);
    const dispatch = useDispatch();

    const [serviceForm, setserviceForm] = useState({
        name: service ? service.name : '',
        description: service ? service.description : '',
        price: service ? service.price : '',
        icon: service ? service.icon : ''
    });

    const [messages, setMessages] = useState(null);
    const formChange = (e) => {
        setserviceForm({
            ...serviceForm,
            [e.target.name]: e.target.value,
        });
    };
    const add_service = (e) => {
        e.preventDefault();
        dispatch(
            service ? editService({ id: service._id, serviceForm }) : addService(serviceForm)
        ).then((data) => {
            if(edit){
                setMessagesAll(data.payload)
                setTimeout(() => {
                    setMessagesAll(null)
                }, 3000);
            }else{
                setMessages(data.payload)
                setTimeout(() => {
                    setMessages(null)
                }, 3000);
            }
            setserviceForm({
                name: '',
                description: '',
                price: '',
            });
            dispatch(getAll()).then(() => {
                if(edit) {
                    setEdit({
                        show: false,
                        service: null,
                    })
                }
            });
        });
    };

    useEffect(() => {
        dispatch(getAll());
    }, []);

    return (
        <>
            { !service && messages && <Alert success={messages.success} messages={messages.messages}/>}
            <div className={clsx(styles.addForm, {[styles.light]: theme === "light"}, theme === "light" ? 'shadow_light' : 'shadow')}>
                <div className={styles.title}>{service ? 'Edit Service' : 'Add Service'}</div>
                <form action='' method='post' onSubmit={(e) => add_service(e)}>
                    <div className='grid'>
                        <div className='row'>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <input
                                        type='text'
                                        name='name'
                                        placeholder=' '
                                        value={serviceForm.name}
                                        onChange={(e) => formChange(e)}
                                    />
                                    <span>Name *</span>
                                </div>
                            </div>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <input
                                        type='text'
                                        name='description'
                                        placeholder=' '
                                        value={serviceForm.description}
                                        onChange={(e) => formChange(e)}
                                    />
                                    <span>Description</span>
                                </div>
                            </div>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <input
                                        type='text'
                                        name='icon'
                                        placeholder=' '
                                        value={serviceForm.icon}
                                        onChange={(e) => formChange(e)}
                                        required
                                    />
                                    <span>Icon *</span>
                                    <i className={`icon_service ${serviceForm.icon}`}></i>
                                </div>
                            </div>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <input
                                        type='number'
                                        name='price'
                                        placeholder=' '
                                        value={serviceForm.price}
                                        onChange={(e) => formChange(e)}
                                    />
                                    <span>Price</span>
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

export default Add_service;
