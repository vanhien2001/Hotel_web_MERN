import React,{ useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { format } from 'timeago.js';
import { useSelector, useDispatch } from 'react-redux';
import { io } from "socket.io-client";
import { useStore } from "../../Dashboard";
import { getAll as getConversation, conversationSelector } from '../../../../store/reducer/conversationSlice';
import {
    getAll,
    addMessage,
    messageSelector
} from '../../../../store/reducer/messageSlice';
import styles from "../Content.module.scss";
import styles2 from "./Message.module.scss";

const Message = () => {
    const dispatch = useDispatch();
    const ref = useRef();
    const { theme, staff } = useStore();
    const { conversations } = useSelector(conversationSelector);
    const { messages } = useSelector(messageSelector);

    const [conversation, setConversation] = useState(null);
    const [messageForm, setMessageForm] = useState(null);
    const [socket, setSocket] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(addMessage(messageForm))
        await dispatch(getAll({ conversationId: conversation._id}))
        setMessageForm({
            ...messageForm,
            content: ''
        })
        socket.emit('send message')
    }

    let conversationsData
    if(conversations){
        conversationsData = conversations.map(conversation => {
            return (
                <div className={styles2.conversationItem} onClick={() => setConversation(conversation)}>
                    <img src="../Img/avatar.png" alt="Avatar" />
                    <div className={styles2.infor}>
                        <div className={styles2.name}>
                            {conversation.user.firstname}
                        </div>
                        <div className={styles2.text}>
                            Hello
                        </div>
                    </div>
                </div>
            )
        })
    }

    let messagesData
    if(messages){
        messagesData = messages.map(message => {
            return (
                <div className={clsx(styles2.messageText,{[styles2.own]: message.user._id === staff.idUser})} ref={ref}>
                    <div className={styles2.content}>{message.content}</div>
                    <div className={styles2.time}>{format(message.createdAt)}</div>
                </div>
            )
        })
    }

    useEffect(() => {
        setSocket(io("http://localhost:5000"))
        dispatch(getConversation())
    }, [])

    useEffect(() => {
        return () => {
            if(socket){
                socket.disconnect()
            }
        }
    }, [socket])

    useEffect(() => {
        if(conversation){
            if(socket){
                socket.on('fetch message', () => {
                    dispatch(getAll({ conversationId: conversation._id }))
                })
            }
            dispatch(getAll({ conversationId: conversation._id}))
            setMessageForm({
                conversation: conversation._id,
                user: staff.idUser,
                content: ''
            })
        }
    }, [conversation])

    useEffect(() => {
        ref.current?.scrollIntoView()
    }, [messages])

    return (
        <div className={clsx(styles.content,{[styles.light]: theme === "light"})}>
            <div className={styles.header}>
                <span>Message</span>
                <Link title="Home" to='/dashboard' className={clsx(styles.link,styles.icon)}>
                    <i className='fas fa-home'></i>
                </Link>
                /
                <Link to='/dashboard/home' className={styles.link}>
                    Home
                </Link>
                /
                <Link
                    to={'/dashboard/message'}
                    className={styles.link}
                >
                    Message
                </Link>
            </div>
            <div className={styles.body}>
                <div className={clsx(styles2.message, {[styles2.light] : theme === 'light'}, theme === "light" ? 'shadow_light' : 'shadow')}>
                    <div className={styles2.header}>
                        <div className={styles2.title}>Message</div>
                    </div>
                    <div className={styles2.body}>
                        <div className={styles2.conversation}>
                            {conversationsData}
                        </div>
                        <div className={clsx(styles2.messageContainer, conversation ? theme === "light" ? "shadow_light" : "shadow" : '')}>
                        {conversation && 
                            <>
                                <div className={styles2.messageHeader}>
                                    {conversation?.user.firstname}
                                </div>
                                <div className={styles2.messageBody}>
                                    {messagesData}
                                </div>
                                <form method="post" className={styles2.messageFooter} onSubmit={(e) => handleSubmit(e)}>
                                    <input type="text" value={messageForm?.content} onChange={(e) => setMessageForm({...messageForm, content: e.target.value})}/>
                                    <button type="submit" className=""><i className="fas fa-paper-plane"></i></button>
                                </form>
                            </>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Message
