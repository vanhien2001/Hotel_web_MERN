import React from "react";
import { ErrorMessage } from "formik";
import styles from "../Login.module.scss";
// import PropTypes from "prop-types";

const InputField = ({ form, field, label, type, placeholder, disabled, options }) => {
    const { name } = field;
    const { errors, touched } = form;
    console.log(field)
    return (
        <>
            <div className={styles.formGroup}>
                <label htmlFor={name}>{label}</label>
                <select
                    className={errors[name] && touched[name] ? styles.invalid : ""}
                    id={name}
                    {...field}
                    onChange={(e) => field.onChange({target:{name:name, value:e.target.value}})}
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                >
                    {options.map(option => {
                        return (
                            <option value={option.value}>{option.name}</option>
                        )
                    })}
                </select>
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
