import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import { userSelector, changePass, load } from "../../../../store/reducer/userSlice";
import Loading from "../../../../components/Loading/Loading";
import InputField from "../../Auth/custom-fields/InputField";
import styles from "../../Auth/Login.module.scss";

const ChangePassForm = () => {
    const { authLoading, user } = useSelector(userSelector);
    const dispatch = useDispatch();
    const history = useHistory();
    const initialValues = {
        username: user ? user.username : "",
        password: "",
        newPassword: ""
    };

    const validationSchema = Yup.object().shape({
        password: Yup.string().required("Password is required"),
        newPassword: Yup.string().required("Password is required"),
        confirmPassword: Yup.string().test(
            "abc",
            "Password không khớp",
            function (value) {
            return this.parent.newPassword === value;
        },)
    });
    const [messages, setMessages] = useState(null);
    const changePassUser = (values) => {
        dispatch(changePass(values)).then((data) => {
            setMessages(data.payload.messages);
            if(data.payload.messages){
                dispatch(load());
                setTimeout(()=>{
                    history.push('infor')
                }, 1000)
            }
        });
    };

    useEffect(() => {
        let timeout = setTimeout(() => {
            setMessages(null);
        }, 3000);
        return clearTimeout(timeout);
    }, [messages]);

    if (!user) {
        return <Redirect to="/room" />;
    } else {
        return (
            <>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={changePassUser}
                >
                    {(formikProps) => {
                        return (
                            <>
                                <Form className={styles.formContainer}>
                                    {authLoading && <Loading />}
                                    <div className={styles.title}>Change Password</div>
                                    {messages && (
                                        <div className={styles.notify}>{messages}</div>
                                    )}
                                    <FastField
                                        name="password"
                                        component={InputField}
                                        label="Current Pass :"
                                        placeholder=""
                                    />

                                    <FastField
                                        name="newPassword"
                                        component={InputField}
                                        label="New Pass :"
                                        type="password"
                                        placeholder=""
                                    />
                                    <FastField
                                        name="confirmPassword"
                                        component={InputField}
                                        label="Confirm Pass :"
                                        type="password"
                                        placeholder=""
                                    />
                                    <button>Change Pass</button>
                                    <Link to="/account/infor">Back</Link>
                                </Form>
                            </>
                        );
                    }}
                </Formik>
            </>
        );
    }
};

export default ChangePassForm;
