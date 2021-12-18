import React from 'react';
import clsx from 'clsx';
import { useStore } from "../../features/Main/Content";
import styles from './Subnav.module.scss';

const Subnav = () => {

    const { viewGrid, setViewGrid, filter, setFilter } = useStore();

    return (
        <div className={styles.subnav}>
            <div className={styles.navbarContainer}>
                <div className={styles.navbarItem}>
                    <div className={clsx(styles.itemContainer,{[styles.active]: filter.sort && filter.sort.price})}>
                        <span>STAY PRICE</span> <i className='fas fa-chevron-down'></i>
                        <div className={styles.itemList}>
                            <div className={styles.item}  onClick={() => setFilter({...filter,sort: {price:1}}) }>LOWEST PRICE {filter.sort && filter.sort.price === 1 ? <i className="fas fa-check"></i> : ''}</div>
                            <div className={styles.item}  onClick={() => setFilter({...filter,sort: {price:-1}}) }>HIGHEST PRICE {filter.sort && filter.sort.price === -1 ? <i className="fas fa-check"></i> : ''}</div>
                        </div>
                    </div>
                    <div className={clsx(styles.itemContainer,{[styles.active]: filter.sort && filter.sort.size})}>
                        <span>ROOM SIZE</span> <i className='fas fa-chevron-down'></i>
                        <div className={styles.itemList}>
                            <div className={styles.item} onClick={() => setFilter({...filter,sort: {size:-1}}) }>LARGER ROOM {filter.sort && filter.sort.size === -1 ? <i className="fas fa-check"></i> : ''}</div>
                            <div className={styles.item}  onClick={() => setFilter({...filter,sort: {size:1}}) }>SMALLEST ROOM {filter.sort && filter.sort.size === 1 ? <i className="fas fa-check"></i> : ''}</div>
                        </div>
                    </div>
                </div>
                <div className={styles.navbarItem}>
                    <i className={clsx('view fas fa-list',styles.view, {[styles.active]: viewGrid === false})} onClick={() => setViewGrid(false)}></i>
                    <i className={clsx('view fas fa-th',styles.view, {[styles.active]: viewGrid})} onClick={() => setViewGrid(true)}></i>
                </div>
            </div>
        </div>
    );
};

export default Subnav;
