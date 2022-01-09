import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { useStore } from "../../Dashboard";
import {
    getAll,
    addTypeRoom,
    editTypeRoom,
} from '../../../../store/reducer/typeRoomSlice';
import Alert from '../../Alert/Alert';
import styles from "../Add.module.scss";

const Add_type = ({ edit, typeRoom, setEdit, setMessagesAll }) => {
    const { theme } = useStore()
    const dispatch = useDispatch();

    const [roomForm, setRoomForm] = useState({
        name: typeRoom ? typeRoom.name : '',
    });

    const [messages, setMessages] = useState(null);
    const formChange = (e) => {
        setRoomForm({
            ...roomForm,
            [e.target.name]: e.target.value,
        });
    };
    const add_room = (e) => {
        e.preventDefault();
        dispatch(
            typeRoom ? editTypeRoom({ id: typeRoom._id, roomForm }) : addTypeRoom(roomForm)
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
            setRoomForm({
                name: '',
            });
            dispatch(getAll()).then(() => {
                if(edit) {
                    setEdit({
                        show: false,
                        typeRoom: null,
                    })
                }
            });
        });
    };

    return (
        <>
            { !typeRoom && messages && <Alert success={messages.success} messages={messages.messages}/>}
            <div className={clsx(styles.addForm, {[styles.light]: theme === "light"}, theme === "light" ? 'shadow_light' : 'shadow')}>
                <div className={styles.title}>{typeRoom ? 'Edit Room' : 'Add Room'}</div>
                <form action='' method='post' onSubmit={(e) => add_room(e)}>
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

export default Add_type;
