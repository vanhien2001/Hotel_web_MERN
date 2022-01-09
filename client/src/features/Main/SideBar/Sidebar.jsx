import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { getAll, serviceSelector } from "../../../store/reducer/serviceSlice";
import {
    getAll as getAllTypeRoom,
    typeRoomSelector,
} from "../../../store/reducer/typeRoomSlice";
import DateChoose from "./Calender/DateChoose";
import { useStore } from "../Content";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
    const { filter, setFilter, serviceChoose, typeRoomChoose } = useStore();
    const { services } = useSelector(serviceSelector);
    const { typeRoom } = useSelector(typeRoomSelector);
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
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

    let typeRoomData;
    let servicesRoom;
    let servicesExtra;

    if (typeRoom) {
        typeRoomData = typeRoom.map((type) => {
            return (
                <div
                    key={type._id}
                    className={`col l-6 c-6 ${styles.serviceItem}`}
                >
                    <input
                        type="checkbox"
                        name="servicesRoom"
                        id={type._id}
                        value={type._id}
                        onClick={(e) => typeRoomChoose(e)}
                        checked={
                            filter.typeRoom &&
                            filter.typeRoom.includes(type._id)
                        }
                    />
                    <label htmlFor={type._id}>{type.name}</label>
                </div>
            );
        });
    }
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
                            checked={
                                filter.services &&
                                filter.services.includes(service._id)
                            }
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
        dispatch(getAllTypeRoom());
    }, []);

    return (
        <>
            <div className={styles.sidebar}>
                <DateChoose />
                <div className={styles.filterList}>
                    <div className={styles.filterItem}>
                        <div className={styles.title}>
                            <div className={styles.name}>Max Night Price :</div>
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
                    <div
                        className={clsx(styles.filterItem,{[styles.open]: isOpen})}
                    >
                        <div className={styles.title}>
                            <div className={styles.name}>Type Room :</div>
                            <i
                                onClick={() => setIsOpen(!isOpen)}
                                className="fas fa-angle-down"
                            ></i>
                        </div>
                        <div className="grid">
                            <div className={`${styles.serviceList} row`}>
                                {typeRoomData}
                            </div>
                        </div>
                    </div>
                    <div
                        className={clsx(styles.filterItem,{[styles.open]: isOpen2})}
                    >
                        <div className={styles.title}>
                            <div className={styles.name}>Services :</div>
                            <i
                                onClick={() => setIsOpen2(!isOpen2)}
                                className="fas fa-angle-down"
                            ></i>
                        </div>
                        <div className="grid">
                            <div className={`${styles.serviceList} row`}>
                                {servicesRoom}
                            </div>
                        </div>
                    </div>
                    <div
                        className={clsx(styles.filterItem,{[styles.open]: isOpen3})}
                    >
                        <div className={styles.title}>
                            <div className={styles.name}>Extra Services :</div>
                            <i
                                onClick={() => setIsOpen3(!isOpen3)}
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
