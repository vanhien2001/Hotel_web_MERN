import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { useStore } from "../../Dashboard";
import {
    getAll,
    addJob,
    editJob,
} from '../../../../store/reducer/jobSlice';
import Alert from '../../Alert/Alert';
import styles from "../Add.module.scss";

const Add_position = ({ edit, job, setEdit, setMessagesAll }) => {
    const { theme } = useStore()
    const dispatch = useDispatch();

    const [jobForm, setJobForm] = useState({
        name: job ? job.name : '',
    });

    const [messages, setMessages] = useState(null);
    const formChange = (e) => {
        setJobForm({
            ...jobForm,
            [e.target.name]: e.target.value,
        });
    };
    const add_job = (e) => {
        e.preventDefault();
        dispatch(
            job ? editJob({ id: job._id, jobForm }) : addJob(jobForm)
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
            setJobForm({
                name: '',
            });
            dispatch(getAll()).then(() => {
                if(edit) {
                    setEdit({
                        show: false,
                        job: null,
                    })
                }
            });
        });
    };

    return (
        <>
            { !job && messages && <Alert success={messages.success} messages={messages.messages}/>}
            <div className={clsx(styles.addForm, {[styles.light]: theme === "light"}, theme === "light" ? 'shadow_light' : 'shadow')}>
                <div className={styles.title}>{job ? 'Edit job' : 'Add job'}</div>
                <form action='' method='post' onSubmit={(e) => add_job(e)}>
                    <div className='grid'>
                        <div className='row'>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <input
                                        type='text'
                                        name='name'
                                        placeholder=' '
                                        value={jobForm.name}
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

export default Add_position;
