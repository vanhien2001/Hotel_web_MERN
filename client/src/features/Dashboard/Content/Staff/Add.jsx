import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { useStore } from "../../Dashboard";
import {
    getAll,
    addStaff,
    editStaff,
} from '../../../../store/reducer/staffSlice';
import {
    getAll as getAllPosition,
    jobSelector
} from '../../../../store/reducer/jobSlice';
import Alert from '../../Alert/Alert';
import styles from "../Add.module.scss";

const Add = ({ edit, staff, setEdit, setMessagesAll }) => {
    const { theme } = useStore()
    const { jobs } = useSelector(jobSelector)
    const dispatch = useDispatch();

    const [staffForm, setStaffForm] = useState({
        idUser : staff ? staff.user._id : '',
        username: staff ? staff.user.username : '',
        password: staff ? staff.user.password : '',
        firstname: staff ? staff.user.firstname : '',
        lastname: staff ? staff.user.lastname : '',
        email: staff ? staff.user.email : '',
        phone: staff ? staff.user.phone : '',
        cmnd: staff ? staff.user.cmnd : '',
        gender: staff ? staff.user.gender : 'Male',
        address: staff ? staff.user.address : '',
        position: staff ? staff.position._id : '',
        salary: staff ? staff.salary : ''
    });

    const [messages, setMessages] = useState(null);
    const formChange = (e) => {
        setStaffForm({
            ...staffForm,
            [e.target.name]: e.target.value,
        });
    };
    const add_staff = (e) => {
        e.preventDefault();
        dispatch(
            staff
                ? editStaff({ id: staff._id, staffForm })
                : addStaff(staffForm)
        ).then((data) => {
            if (edit) {
                setMessagesAll(data.payload);
                setTimeout(() => {
                    setMessagesAll(null);
                }, 3000);
            } else {
                setMessages(data.payload);
                setTimeout(() => {
                    setMessages(null);
                }, 3000);
            }
            setStaffForm({
                idUser : '',
                username: '',
                password: '',
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
                cmnd: '',
                gender: 'male',
                address: '',
                position: '',
                salary: '',
            });
            dispatch(getAll()).then(() => {
                if (edit) {
                    setEdit({
                        show: false,
                        staff: null,
                    });
                }
            });
        });
    };

    let positionData
    if(jobs){
        positionData = jobs.map(job => {
            return (
                <option key={job._id} value={job._id}>
                    {job.name}
                </option>
            )
        })
    }

    useEffect(() => {
        dispatch(getAllPosition())
    }, [])

    return (
        <>
            {!staff && messages && (
                <Alert
                    success={messages.success}
                    messages={messages.messages}
                />
            )}
            <div className={clsx(styles.addForm, {[styles.light]: theme === "light"}, theme === "light" ? 'shadow_light' : 'shadow')}>
                <div className={styles.title}>
                    {staff ? 'Edit staff' : 'Add staff'}
                </div>
                <form action='' method='post' onSubmit={(e) => add_staff(e)}>
                    <input type="text" value={staffForm.idUser} name='idUser'hidden/>
                    <div className='grid'>
                        <div className='row'>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <input
                                        type='text'
                                        name='username'
                                        placeholder=' '
                                        value={staffForm.username}
                                        onChange={(e) => formChange(e)}
                                        required
                                        disabled={staff}
                                    />
                                    <span>Username *</span>
                                </div>
                            </div>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <input
                                        type='password'
                                        name='password'
                                        placeholder=' '
                                        value={staffForm.password}
                                        onChange={(e) => formChange(e)}
                                        required
                                        disabled={staff}
                                    />
                                    <span>Passowrd *</span>
                                </div>
                            </div>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <input
                                        type='text'
                                        name='firstname'
                                        placeholder=' '
                                        value={staffForm.firstname}
                                        onChange={(e) => formChange(e)}
                                        required
                                    />
                                    <span>Firstname *</span>
                                </div>
                            </div>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <input
                                        type='text'
                                        name='lastname'
                                        placeholder=' '
                                        value={staffForm.lastname}
                                        onChange={(e) => formChange(e)}
                                        required
                                    />
                                    <span>Lastname *</span>
                                </div>
                            </div>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <select
                                        name='gender'
                                        id=''
                                        value={staffForm.gender}
                                        onChange={(e) => formChange(e)}
                                    >
                                        <option value='Male'>Male</option>
                                        <option value='Female'>Female</option>
                                        <option value='Other'>Other</option>
                                    </select>
                                    <span>Gender</span>
                                </div>
                            </div>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <input
                                        type='email'
                                        name='email'
                                        placeholder=' '
                                        value={staffForm.email}
                                        onChange={(e) => formChange(e)}
                                    />
                                    <span>Email</span>
                                </div>
                            </div>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <input
                                        type='text'
                                        name='phone'
                                        placeholder=' '
                                        value={staffForm.phone}
                                        onChange={(e) => formChange(e)}
                                    />
                                    <span>Phone</span>
                                </div>
                            </div>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <input
                                        type='text'
                                        name='cmnd'
                                        placeholder=' '
                                        value={staffForm.cmnd}
                                        onChange={(e) => formChange(e)}
                                    />
                                    <span>Cmnd</span>
                                </div>
                            </div>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <select
                                        name='position'
                                        value={staffForm.position}
                                        onChange={(e) => formChange(e)}
                                    >
                                        {positionData}
                                    </select>
                                    <span>Position</span>
                                </div>
                            </div>
                            <div className='col l-6 c-12 m-6'>
                                <div className={styles.formControl}>
                                    <input
                                        type='number'
                                        name='salary'
                                        placeholder=' '
                                        value={staffForm.salary}
                                        onChange={(e) => formChange(e)}
                                    />
                                    <span>Salary</span>
                                </div>
                            </div>
                            <div className='col l-12 c-12 m-12'>
                                <div className={styles.formControl}>
                                    <input
                                        type='text'
                                        name='address'
                                        placeholder=' '
                                        value={staffForm.address}
                                        onChange={(e) => formChange(e)}
                                    />
                                    <span>Address</span>
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
