import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll, serviceSelector } from "../../../store/reducer/serviceSlice";
import DateChoose from "./Calender/DateChoose";
import { useStore } from "../Content";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
    const { filter, setFilter, serviceChoose } = useStore();
    const { services } = useSelector(serviceSelector);
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [width, setWidth] = useState(100);
    const changePrice = (e) => {
        setFilter({
            ...filter,
            price: e.target.value,
        });
        setWidth(
            (e.target.offsetWidth * ((filter.price * 100) / e.target.max)) / 100
        );
    };

    let servicesRoom;
    let servicesExtra;

    if (services) {
        servicesRoom = services
            .filter((service) => service.extraService === false)
            .map((service) => {
                return (
                    <div
                        key={service._id}
                        className={`col l-6 c-6 ${styles.serviceItem}`}
                    >
                        <input
                            type="checkbox"
                            name="servicesRoom"
                            id={service._id}
                            value={service._id}
                            onClick={(e) => serviceChoose(e)}
                            checked={filter.services && filter.services.includes(service._id)}
                        />
                        <label htmlFor={service._id}>{service.name}</label>
                    </div>
                );
            });
        servicesExtra = services
            .filter((service) => service.extraService === true)
            .map((service) => {
                return (
                    <div
                        key={service._id}
                        className={`col l-6 c-6 ${styles.serviceItem}`}
                    >
                        <input
                            type="checkbox"
                            name="servicesExtra"
                            id={service._id}
                            value={service._id}
                        />
                        <label htmlFor={service._id}>{service.name}</label>
                    </div>
                );
            });
    }

    useEffect(() => {
        dispatch(getAll());
    }, []);

    return (
        <>
            <div className={styles.sidebar}>
                <DateChoose />
                <div className={styles.filterList}>
                    <div className={styles.filterItem}>
                        <div className={styles.title}>
                            <div className={styles.name}>
                                Max Night Price :
                            </div>
                            <div className={styles.price}>
                                {filter.price + " $"}
                            </div>
                        </div>
                        <input
                            onChange={(e) => changePrice(e)}
                            type="range"
                            name=""
                            min="0"
                            max="1000"
                            value={filter.price}
                        />
                        <span
                            className={styles.process}
                            style={{ width: width + "px" }}
                        ></span>
                    </div>
                    <div className={styles.filterItem + (isOpen ? " "+ styles.open : "")}>
                        <div className={styles.title}>
                            <div className={styles.name}>Services :</div>
                            <i
                                onClick={() => setIsOpen(!isOpen)}
                                className="fas fa-angle-down"
                            ></i>
                        </div>
                        <div className="grid">
                            <div className={`${styles.serviceList} row`}>
                                {servicesRoom}
                            </div>
                        </div>
                    </div>
                    <div className={styles.filterItem + (isOpen2 ? " "+ styles.open : "")}>
                        <div className={styles.title}>
                            <div className={styles.name}>Extra Services :</div>
                            <i
                                onClick={() => setIsOpen2(!isOpen2)}
                                className="fas fa-angle-down"
                            ></i>
                        </div>
                        <div className="grid">
                            <div className={`${styles.serviceList} row`}>
                                {servicesExtra}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
