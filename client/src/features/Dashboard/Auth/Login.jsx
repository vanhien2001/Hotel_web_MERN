import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { staffSelector, login , load} from '../../../store/reducer/staffSlice';
import Loading from "../../../components/Loading/Loading";
import styles from "./Login.module.scss";

const Login = () => {
    const dispatch = useDispatch()
    const { staffLoading, staff } = useSelector(staffSelector);
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    });
    const [messages, setMessages] = useState(null);

    const formChange = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value,
        });
    }

    const loginStaff = (e) => {
        e.preventDefault();
        dispatch(login(loginForm)).then(data => {
            setMessages(data.payload.messages)
            dispatch(load())
        });
    };

    useEffect(() => {
        dispatch(load())
    },[])

    useEffect(() => {
        let timeout = setTimeout(() => {
            setMessages(null);
        }, 3000);
        return clearTimeout(timeout);
    }, [messages]);

    if(staff){
        return <Redirect to="/dashboard/home" />
    }else{
        return (
            <>
                <div className={styles.login}>
                    <div className="grid wide">
                        <div className="row">
                            <div className="col l-8 c-12">
                                <img src="../Img/loginBackgroud.png" alt="" />
                            </div>
                            <div className={`col l-4 ${styles.formWrap} c-12`}>
                                <form action="" method="post" className={styles.formContainer} onSubmit={(e) => loginStaff(e)}>
                                    {staffLoading && <Loading dark/>}
                                    <div className={styles.title}>Login</div>
                                    {messages && (
                                        <div className={styles.notify}>{messages}</div>
                                    )}
                                    <div className="grid">
                                        <div className="row">
                                            <div className="col l-12 c-12">
                                                <div className={styles.formControl}>
                                                    <input
                                                        type='text'
                                                        name='username'
                                                        placeholder=' '
                                                        value={loginForm.username}
                                                        onChange={(e) => formChange(e)}
                                                        required
                                                    />
                                                    <span>Username *</span>
                                                </div>
                                            </div>
                                            <div className="col l-12 c-12">
                                                <div className={styles.formControl}>
                                                    <input
                                                        type='password'
                                                        name='password'
                                                        placeholder=' '
                                                        value={loginForm.password}
                                                        onChange={(e) => formChange(e)}
                                                        required
                                                    />
                                                    <span>Passowrd *</span>
                                                </div>
                                            </div>
                                            <div className="col l-12 c-12">
                                                <button className={styles.formBtn} type="submit">Login</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Login
