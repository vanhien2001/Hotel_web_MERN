import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useStore } from "../../Dashboard";
import Add from './Add';
import All from './All';
import Add_service from './Add_service';
import All_service from './All_service';
import Type_room from './Type_room';
import styles from "../Content.module.scss";

const Room = () => {
    const { type, slug, theme } = useStore()
    let body;
    if(type === 'all'){
        if(slug === 'room'){
            body =  <All />
        }else if(slug === 'service-room'){
            body =  <All_service />
        }
    }else if(type === 'add'){
        if(slug === 'room'){
            body =  <Add />
        }else if(slug === 'service-room'){
            body =  <Add_service />
        }
    }else{
        body =  <Type_room />
    }
    return (
        <>
            <div className={clsx(styles.content,{[styles.light]: theme === "light"})}>
                <div className={styles.header}>
                    <span>{type === 'all' && slug === 'service-room' ? 'Service' : type === 'all' ? 'All' : type === 'add' ? 'Add' : 'Type'} Room</span>
                    <Link title="Home" to='/dashboard/home' className={clsx(styles.link,styles.icon)}>
                        <i className='fas fa-home'></i>
                    </Link>
                    /
                    <Link to='/dashboard' className={styles.link}>
                        Home
                    </Link>
                    /
                    <Link
                        to={`/dashboard/all-room`}
                        className={styles.link}
                    >
                        Room
                    </Link>
                    / {type === 'all' && slug === 'service-room' ? 'Service' : type === 'all' ? 'All' : type === 'add' ? 'Add' : 'Type'}
                </div>
                <div className={styles.body}>{body}</div>
            </div>
        </>
    );
};

export default Room;
