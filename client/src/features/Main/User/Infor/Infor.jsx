import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import clsx from 'clsx';
import { userSelector, changeInfor, load } from "../../../../store/reducer/userSlice";
import styles from "./Infor.module.scss";

const Infor = () => {
    const { user } = useSelector(userSelector);
    const dispatch = useDispatch();
    const [userInfor, setUserInfor] = useState(user);
    const [edit, setEdit] = useState(false);

    const formChange = (e) => {
        setUserInfor({
            ...userInfor,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(changeInfor(userInfor)).then(data => {
            if(data.payload.success) {
                setEdit(false)
                dispatch(load())
            }
        })
    }

    if (!user) {
        return <Redirect to="/room" />
    }

    return (
        <>
            <div className={styles.userInfor}>
                <div className={styles.title}>Thông tin cá nhân</div>
                <form onSubmit={(e)=>handleSubmit(e)} className={styles.infor}>
                    <div className="grid wide">
                        <div className="row">
                            <div className="col l-12 c-12">
                                <div className={styles.inforItem}>
                                    <span className={styles.item}>First Name :</span>
                                    <input className={clsx({[styles.disabled]: edit === false})} onChange={(e) => formChange(e)} type="text" name="firstname" value={userInfor.firstname} disabled={!edit}/>
                                </div>
                            </div>
                            <div className="col l-12 c-12">
                                <div className={styles.inforItem}>
                                    <span className={styles.item}>Last Name :</span>
                                    <input className={clsx({[styles.disabled]: edit === false})} onChange={(e) => formChange(e)} type="text" name="lastname" value={userInfor.lastname} disabled={!edit}/>
                                </div>
                            </div>
                            <div className="col l-12 c-12">
                                <div className={styles.inforItem}>
                                    <span className={styles.item}>Cmnd :</span>
                                    <input className={clsx({[styles.disabled]: edit === false})} onChange={(e) => formChange(e)} type="text" name="cmnd" value={userInfor.cmnd} disabled={!edit}/>
                                </div>
                            </div>
                            <div className="col l-12 c-12">
                                <div className={styles.inforItem}>
                                    <span className={styles.item}>Gender :</span>
                                    {edit ? 
                                    <select name="gender" id="" className={clsx({[styles.disabled]: edit === false})} onChange={(e) => formChange(e)} value={userInfor.gender} disabled={!edit}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    :
                                    <input className={clsx(styles.disabled)}  name="gender" value={userInfor.gender} disabled/>
                                    }
                                </div>
                            </div>
                            <div className="col l-12 c-12">
                                <div className={styles.inforItem}>
                                    <span className={styles.item}>Phone :</span>
                                    <input className={clsx({[styles.disabled]: edit === false})} onChange={(e) => formChange(e)} type="text" name="phone" value={userInfor.phone} disabled={!edit}/>
                                </div>
                            </div>
                            <div className="col l-12 c-12">
                                <div className={styles.inforItem}>
                                    <span className={styles.item}>Email :</span>
                                    <input className={clsx({[styles.disabled]: edit === false})} onChange={(e) => formChange(e)} type="email" name="email" value={userInfor.email} disabled={!edit}/>
                                </div>
                            </div>
                            <div className="col l-12 c-12">
                                <div className={styles.inforItem}>
                                    <span className={styles.item}>Address :</span>
                                    <input className={clsx({[styles.disabled]: edit === false})} onChange={(e) => formChange(e)} type="text" name="address" value={userInfor.address} disabled={!edit}/>
                                </div>
                            </div>
                            <div className="col l-12 c-12">
                                <div className={styles.inforItem}>
                                    {edit ? 
                                    <div className={styles.btnContainer}>
                                        <button className={styles.btn}>Xác nhận</button>
                                        <span className={styles.btn} onClick={() => {setEdit(false); setUserInfor(user)}}>Huỷ bỏ</span>
                                    </div>
                                    :
                                    <span className={styles.btn} onClick={() => setEdit(true)}>Chỉnh sửa</span>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Infor;
