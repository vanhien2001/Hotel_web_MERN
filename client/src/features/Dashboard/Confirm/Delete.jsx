import React from 'react'
import clsx from 'clsx'
import { useStore } from "../Dashboard";
import styles from './Delete.module.scss'

const Delete = ({ deleteAction }) => {
    const { theme, deleteConfirm, setDeleteConfirm } = useStore()

    const closeModal = (e) => {
        if (e.target === document.querySelector('.'+styles.modal)) {
            setDeleteConfirm({
                show: false,
                data: null,
            });
        }
    };

    return (
        <div className={styles.modal} onClick={(e) => closeModal(e)}>
            <div className={clsx(styles.modalContainer,{[styles.light]: theme === "light"}, theme === "light" ? 'shadow_light' : 'shadow')}>
                <i title='Close' className={clsx('fas fa-times', styles.btnClose)} onClick={() => setDeleteConfirm({show:false, data:null})}></i>
                <div className={styles.icon}>
                    <i className="far fa-times-circle"></i>
                </div>
                <div className={styles.title}>
                    Are you sure ?
                </div>
                <div className={styles.text}>
                    You can restore item in Trash
                </div>
                <div className={styles.btnContainer}>
                    <button className={styles.btn} onClick={() => {setDeleteConfirm({show:false, data:null}); deleteAction(deleteConfirm.data)}}>Confirm</button>
                    <button className={styles.btn} onClick={() => setDeleteConfirm({show:false, data:null})}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Delete
