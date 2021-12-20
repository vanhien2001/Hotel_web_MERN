import React from "react";
import clsx from "clsx";
import styles from "./Home.module.scss";
import { useStore } from "../Dashboard";

const Cart = ({ color, icon, title, value}) => {
    const { theme } = useStore();

    return (
        <div>
            <div
                className={clsx(
                    styles.cartItem,
                    theme === "light" ? "shadow_light" : "shadow"
                )}
            >
                <div className={styles.detail}>
                    <div
                        style={{
                            backgroundColor: color,
                        }}
                        className={styles.icon}
                    >
                        <i className={icon}></i>
                    </div>
                    <div>
                        <div className={styles.name}>{title}</div>
                        <div className={styles.value}>{value}</div>
                    </div>
                </div>
                <progress id="progress" value="40" max="100">
                    40%
                </progress>
            </div>
        </div>
    );
};

export default Cart;
