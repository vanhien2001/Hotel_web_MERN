import React from "react";
import { ErrorMessage } from 'formik';
import styles from "../Login.module.scss";
// import PropTypes from "prop-types";

const InputField = ({ form, field, label, type, placeholder, disabled }) => {
    const { name } = field;
    const { errors, touched } = form;
    return (
        <>
            <div className={styles.formGroup}>
                <label htmlFor={name}>{label}</label>
                <input
                    className={errors[name] && touched[name] ? styles.invalid : ''}
                    id={name}
                    {...field}
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                />
                <ErrorMessage name={name} component="span" />
            </div>
        </>
    );
};

// InputField.propTypes = {
//     field: PropTypes.object.isRequired,
//     form: PropTypes.object.isRequired,

//     type: PropTypes.string,
//     label: PropTypes.string,
//     placeholder: PropTypes.string,
//     disabled: PropTypes.bool,
// };

// InputField.defaultProps = {
//     type: "text",
//     label: "",
//     placeholder: "",
//     disabled: false,
// };
export default InputField;
