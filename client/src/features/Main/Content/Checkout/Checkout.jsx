import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import {
    bookingSelector,
    addBooking,
} from "../../../../store/reducer/bookingSlice";
import { serviceSelector } from '../../../../store/reducer/serviceSlice';
import Loading from "../../../../components/Loading/Loading";
import { useStore } from "../../Content";
import styles from "./Checkout.module.scss";

const Checkout = () => {

    const { bookingForm } = useStore();
    const dispatch = useDispatch();
    const history = useHistory();
    const { bookingLoading } = useSelector(bookingSelector);
    const { services } = useSelector(serviceSelector);
    const [payment, setPayment] = useState("Paypal");

    const booked = () => {
        dispatch(addBooking({
            ...bookingForm,
            payment: payment,
            payed:
                payment === "Payment on arrive" || payment === "Booking request"
                    ? false
                    : true,
        })).then((data) => {
            if (data.payload.success) {
                history.push("thankyou");
            }
        });
    };

    if (bookingForm && bookingForm.room) {
        return (
            <>
                <div className={styles.checkoutContainer}>
                    {bookingLoading && <Loading />}
                    <div className={styles.checkoutInfo}>
                        <div className={styles.title}>Your Informations :</div>
                        <div className="grid">
                            <div className="row">
                                <div className="col l-4 c-12">
                                    <div className={styles.infoItem}>
                                        <span>Name :</span>
                                        {bookingForm.lastname +
                                            " " +
                                            bookingForm.firstname}
                                    </div>
                                </div>
                                <div className="col l-4 c-12">
                                    <div className={styles.infoItem}>
                                        <span>Gender :</span>
                                        {bookingForm.gender}
                                    </div>
                                </div>
                                <div className="col l-4 c-12">
                                    <div className={styles.infoItem}>
                                        <span>Phone Number :</span>
                                        {bookingForm.phone}
                                    </div>
                                </div>
                                <div className="col l-4 c-12">
                                    <div className={styles.infoItem}>
                                        <span>Cmnd :</span>
                                        {bookingForm.cmnd}
                                    </div>
                                </div>
                                <div className="col l-4 c-6">
                                    <div className={styles.infoItem}>
                                        <span>Arrive :</span>
                                        {bookingForm.arrive.getDate() +
                                            "-" +
                                            (bookingForm.arrive.getMonth() +
                                                1) +
                                            "-" +
                                            bookingForm.arrive.getFullYear()}
                                    </div>
                                </div>
                                <div className="col l-4 c-6">
                                    <div className={styles.infoItem}>
                                        <span>Depart :</span>
                                        {bookingForm.depart.getDate() +
                                            "-" +
                                            (bookingForm.depart.getMonth() +
                                                1) +
                                            "-" +
                                            bookingForm.depart.getFullYear()}
                                    </div>
                                </div>
                                <div className="col l-12 c-12">
                                    <div className={styles.infoItem}>
                                        <div>Extra Services :</div>
                                        <div className='row'>
                                        { bookingForm.services.length  > 0 && services
                                            ?services.filter((service) => bookingForm.services.includes(service._id)).map((service) =>{
                                                return (
                                                    <div className={clsx(styles.service,'col l-4')}>{service.name}</div>
                                            )})
                                            : "You have not selected any additional services"}
                                        </div>
                                    </div>
                                </div>
                                <div className="col l-12 c-12">
                                    <div className={styles.infoItem}>
                                        <div>Tax :</div>Included 3 $ City Tax{" "}
                                        <br /> Included 22 % VAT
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.paymentContainer}>
                        <div className={styles.title}>Payment Options :</div>
                        <div className={styles.paymentList}>
                            <div
                                onClick={() => setPayment("Credit card")}
                                className={clsx(styles.paymentItem, {
                                    [styles.active]: payment === "Credit card",
                                })}
                            >
                                CREDIT CARD
                            </div>
                            <div
                                onClick={() => setPayment("Bank transfer")}
                                className={clsx(styles.paymentItem, {
                                    [styles.active]:
                                        payment === "Bank transfer",
                                })}
                            >
                                BANK TRANSFER
                            </div>
                            <div
                                onClick={() => setPayment("Paypal")}
                                className={clsx(styles.paymentItem, {
                                    [styles.active]: payment === "Paypal",
                                })}
                            >
                                PAYPAL
                            </div>
                            <div
                                onClick={() => setPayment("Payment on arrive")}
                                className={clsx(styles.paymentItem, {
                                    [styles.active]:
                                        payment === "Payment on arrive",
                                })}
                            >
                                PAYMENT ON ARRIVE
                            </div>
                            <div
                                onClick={() => setPayment("Booking request")}
                                className={clsx(styles.paymentItem, {
                                    [styles.active]:
                                        payment === "Booking request",
                                })}
                            >
                                BOOKING REQUEST
                            </div>
                        </div>
                        <div className={styles.paymentDetail}>
                            <div
                                className={
                                    styles.paymentDetailItem +
                                    (payment === "Credit card"
                                        ? " " + styles.active
                                        : "")
                                }
                            >
                                <input
                                    type="checkbox"
                                    name="confirm"
                                    id="confirm"
                                />
                                <label htmlFor="confirm">
                                    Simple and safe. Make payments with any type
                                    of credit card.
                                </label>
                                <input
                                    type="text"
                                    className={styles.creditNumber}
                                    placeholder="Số thẻ"
                                />
                                <button
                                    className={styles.paymentBtn}
                                    onClick={() => booked()}
                                >
                                    SUBMIT PAYMENT
                                </button>
                            </div>
                            <div
                                className={
                                    styles.paymentDetailItem +
                                    (payment === "Bank transfer"
                                        ? " " + styles.active
                                        : "")
                                }
                            >
                                <input
                                    type="checkbox"
                                    name="confirm"
                                    id="confirm"
                                />
                                <label htmlFor="confirm">
                                    Your reservation will be confirmed when we
                                    receive the bank transfer, below our data :
                                </label>
                                <button
                                    className={styles.paymentBtn}
                                    onClick={() => booked()}
                                >
                                    BOOK NOW
                                </button>
                            </div>
                            <div
                                className={
                                    styles.paymentDetailItem +
                                    (payment === "Paypal"
                                        ? " " + styles.active
                                        : "")
                                }
                            >
                                <div className={styles.paymentNote}>
                                    <i className="fab fa-paypal"></i>NOTE : Wait
                                    the automatic return to the site to complete
                                    the transaction.
                                </div>
                                <button
                                    className={styles.paymentBtn}
                                    onClick={() => booked()}
                                >
                                    PAY NOW
                                </button>
                            </div>
                            <div
                                className={
                                    styles.paymentDetailItem +
                                    (payment === "Payment on arrive"
                                        ? " " + styles.active
                                        : "")
                                }
                            >
                                <div className={styles.paymentNote}>
                                    <i className="fas fa-wallet"></i>NOTE : Wait
                                    the automatic return to the site to complete
                                    the transaction.
                                </div>
                                <button
                                    className={styles.paymentBtn}
                                    onClick={() => booked()}
                                >
                                    BOOK NOW
                                </button>
                            </div>
                            <div
                                className={
                                    styles.paymentDetailItem +
                                    (payment === "Booking request"
                                        ? " " + styles.active
                                        : "")
                                }
                            >
                                <div className={styles.paymentNote}>
                                    <i className="far fa-envelope"></i>NOTE :
                                    Wait the automatic return to the site to
                                    complete the transaction.
                                </div>
                                <button
                                    className={styles.paymentBtn}
                                    onClick={() => booked()}
                                >
                                    SEND REQUESR
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return null;
    }
};

export default Checkout;
