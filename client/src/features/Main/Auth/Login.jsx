import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import { userSelector, login, load } from "../../../store/reducer/userSlice";
import Loading from "../../../components/Loading/Loading";
import InputField from "./custom-fields/InputField";
import styles from "./Login.module.scss";

const Login = () => {
    const userState = useSelector(userSelector);
    const dispatch = useDispatch();
    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
    });
    const [messages, setMessages] = useState(null);
    const loginUser = (values) => {
        dispatch(login(values)).then((data) => {
            setMessages(data.payload.messages);
            dispatch(load());
        });
    };

    useEffect(() => {
        let timeout = setTimeout(() => {
            setMessages(null);
        }, 3000);
        return clearTimeout(timeout);
    }, [messages]);

    if (userState.user) {
        return <Redirect to="/room" />;
    } else {
        return (
            <>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={loginUser}
                >
                    {(formikProps) => {
                        return (
                            <>
                                <Form className={styles.formContainer}>
                                    {userState.authLoading && <Loading />}
                                    <div className={styles.title}>Login</div>
                                    {messages && (
                                        <div className={styles.notify}>{messages}</div>
                                    )}
                                    <FastField
                                        name="username"
                                        component={InputField}
                                        label="Username :"
                                        placeholder=""
                                    />

                                    <FastField
                                        name="password"
                                        component={InputField}
                                        label="Password :"
                                        type="password"
                                        placeholder=""
                                    />
                                    <div>
                                        <input
                                            type="checkbox"
                                            name="remember"
                                            id="remember"
                                            className={styles.remember}
                                        />
                                        <label htmlFor="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                    <button>LOG IN</button>
                                    <Link to="/register">Register</Link>
                                </Form>
                            </>
                        );
                    }}
                </Formik>
            </>
        );
    }
};

export default Login;
