import React,{ useState, useEffect, useRef } from "react";
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { format } from 'timeago.js';
import { useSelector, useDispatch } from 'react-redux';
import { io } from "socket.io-client";
import { getAll as getConversation, conversationSelector, addConversation } from '../../store/reducer/conversationSlice';
import {
    getAll,
    addMessage,
    messageSelector
} from '../../store/reducer/messageSlice';
import { userSelector } from "../../store/reducer/userSlice";
import styles from "./StickyIcon.module.scss";

const StickyIcon = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const ref = useRef();
    const { user } = useSelector(userSelector);
    const { conversations } = useSelector(conversationSelector);
    const { messages } = useSelector(messageSelector);
    const [openMessage, setOpenMessage] = useState(false);
    const [messageForm, setMessageForm] = useState(null);
    const [socket, setSocket] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(addMessage(messageForm))
        setMessageForm({
            ...messageForm,
            content: ''
        })
        socket.emit('send message',conversations[0]._id)
    }

    const handleAddConversation = async () => {
        await dispatch(addConversation({ userId: user._id }))
        const data = await dispatch(getConversation({ userId: user._id }))
        await dispatch(getAll({ conversationId: data.payload.conversations[0]._id }))
        setMessageForm({
            conversation: data.payload.conversations[0]._id,
            user: user._id,
            content: ''
        })
    }

    let messagesData
    if(messages){
        messagesData = messages.map(message => {
            return (
                <div className={clsx(styles.messageText,{[styles.own]: message.user?._id === user?._id})} ref={ref}>
                    <div className={styles.content}>{message.content}</div>
                    <div className={styles.time}>{format(message.createdAt)}</div>
                </div>
            )
        })
    }

    useEffect(() => {
        if(user){
            dispatch(getConversation({userId: user._id}))
                .then(data => {
                    if(data.payload.conversations.length > 0){
                        dispatch(getAll({ conversationId: data.payload.conversations[0]._id }))
                        setMessageForm({
                            conversation: data.payload.conversations[0]._id,
                            user: user._id,
                            content: ''
                        })
                    }
            })
        }
    }, [user])

    useEffect(() => {
        if(socket && conversations){
            socket.on('fetch message', (conversationID) => {
                if(user && conversationID === conversations[0]._id){
                    dispatch(getAll({ conversationId: conversations[0]._id }))
                }
            })
        }
    }, [socket, conversations])

    useEffect(() => {
        if(openMessage){
            if(user){
                setSocket(io("http://localhost:5000"))
            }
            ref.current?.scrollIntoView()
        }else{
            socket?.disconnect()
        }
    }, [messages, openMessage])

    return (
        <div className={styles.message}>
            {openMessage && 
                <div className={clsx(styles.messageContainer, 'shadow_light')}>
                    <div className={styles.messageHeader}>
                        Chat Box
                        <i className="fas fa-times" onClick={() => setOpenMessage(false)}></i>
                    </div>
                    <div className={styles.messageBody}>
                        {user ? messagesData ? messagesData : <button onClick={() => handleAddConversation()}>Start Chat</button> : <button onClick={() => {history.push('/login'); setOpenMessage(false)}}>Sign In</button>}
                    </div>
                    <div className={styles.messageFooter}>
                        <form method="post" onSubmit={(e) => handleSubmit(e)}>
                            <input type="text" value={messageForm?.content} onChange={(e) => setMessageForm({...messageForm, content: e.target.value})} disabled={!(user && messages)}/>
                            <button type="submit" disabled={!(user && messages)}><i className="fas fa-paper-plane"></i></button>
                        </form>
                    </div>
                </div>
            }
            <div className={styles.stickyIcon} onClick={() => setOpenMessage(!openMessage)}>
                <div className={styles.title}>Chat</div>
                <div className={styles.icon}>
                    <i className="fas fa-fire"></i>
                </div>
                <div className={clsx(styles.text, 'shadow')}><i className="fas fa-comment"></i></div>
            </div>
        </div>
    );
};

export default StickyIcon;
