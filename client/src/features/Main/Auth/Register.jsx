import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import { userSelector, register, load } from "../../../store/reducer/userSlice";
import InputField from "./custom-fields/InputField";
import SelectField from "./custom-fields/SelectField";
import styles from "./Login.module.scss";

const Register = () => {
    const userState = useSelector(userSelector);
    const dispatch = useDispatch();

    const initialValues = {
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        cmnd: "",
        gender: "male",
        address: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
        firstname: Yup.string().required("First name is required"),
        lastname: Yup.string().required("Last name is required"),
        email: Yup.string().required("Email is required").email("Email invalid"),
        phone: Yup.string().min(10, "Phone number invalid").max(10, "Phone number invalid").required("Phone number is required"),
        cmnd: Yup.string().min(12, "Cmnd number invalid").max(12, "Cmnd number invalid").required("Cmnd is required"),
        address: Yup.string().notRequired(),
    });

    const options = [
        { name: "Male", value: "Male" },
        { name: "Female", value: "Female" },
        { name: "Other", value: "Other" },
    ];

    const [messages, setMessages] = useState(null);
    const registerUser = (values) => {
        dispatch(register(values)).then((data) => {
            setMessages(data.payload.messages);
            dispatch(load())
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
                    onSubmit={registerUser}
                >
                    {(formikProps) => {
                        return (
                            <Form className={styles.formContainer}>
                                <div className={styles.title}>Register</div>
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
                                    label="Password* :"
                                    type="password"
                                    placeholder=""
                                />
                                <FastField
                                    name="firstname"
                                    component={InputField}
                                    label="First Name* :"
                                    placeholder=""
                                />
                                <FastField
                                    name="lastname"
                                    component={InputField}
                                    label="Last Name* :"
                                    placeholder=""
                                />
                                <FastField
                                    name="email"
                                    component={InputField}
                                    label="Email* :"
                                    placeholder=""
                                />
                                <FastField
                                    name="phone"
                                    component={InputField}
                                    label="Phone Number* :"
                                    placeholder=""
                                />
                                <FastField
                                    name="cmnd"
                                    component={InputField}
                                    label="Cmnd :"
                                    placeholder=""
                                />
                                <FastField
                                    name="gender"
                                    component={SelectField}
                                    label="Gender :"
                                    options={options}
                                    placeholder=""
                                />
                                 <FastField
                                    name="address"
                                    component={InputField}
                                    label="Address :"
                                    placeholder=""
                                />
                                <button>REGISTER</button>
                                <Link to="/login">Log In</Link>
                            </Form>
                        );
                    }}
                </Formik>
            </>
        );
    }
};

export default Register;
