import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { useStore } from "../../Dashboard";
import {
    getAll,
    getAllDelete,
    serviceSelector,
    deleteService,
    deleteMultiService,
    restore,
    restoreMulti
} from '../../../../store/reducer/serviceSlice';
import Add from './Add';
import Alert from '../../Alert/Alert';
import Preload from '../../Preload/Preload';
import DeleteConfirm from '../../Confirm/Delete';
import handleSort from '../../../../util/sort';
import styles from "../All.module.scss";

const All = () => {
    const { theme, deleteConfirm, setDeleteConfirm } = useStore()
    let { serviceLoading, services } = useSelector(serviceSelector);
    if (services) {
        services = services.filter(service => service.extraService === true)
    }
    const dispatch = useDispatch();
    const [checkAll, setCheckAll] = useState(false);
    const [edit, setEdit] = useState({
        show: false,
        service: null,
    });
    const [messages, setMessages] = useState(null);
    const [itemChoose, setItemChoose] = useState([]);
    const [showDelete, setShowDelete] = useState(false);

    const closeModal = (e) => {
        if (e.target === document.querySelector('.'+styles.modal) || e.target === document.querySelector(clsx('.'+styles.modal,'.'+styles.btnClose))) {
            setEdit({
                show: false,
                service: null,
            });
        }
    };

    const toggleChecked = () => {
        const itemAll = document.querySelectorAll(
            clsx('.'+styles.allContainer, '.'+styles.allTable, 'td', 'input')
        );
        setCheckAll(!checkAll);
        let itemChoose = []
        itemAll.forEach((item) => {
            item.checked = !checkAll;
            if(!checkAll) {
                itemChoose.push(item.value)
            }
        });
        setItemChoose(itemChoose)
    };

    const itemToggleChecked = (e) => {
        const itemAll = document.querySelectorAll(
            clsx('.'+styles.allContainer, '.'+styles.allTable, 'td', 'input')
        );
        setCheckAll(
            itemAll.length ===
            document.querySelectorAll(
                clsx('.'+ styles.allContainer, '.'+ styles.allTable, 'td', 'input:checked')
            ).length
        );
        if (e.target.checked) {
            let item = [...itemChoose]
            item.push(e.target.value)
            setItemChoose(item)
        } else {
            let item = [...itemChoose]
            let index = item.indexOf(e.target.value)
            item.splice(index, 1)
            setItemChoose(item)
        }
    };

    const handleDeleteService = (id) => {
        dispatch(Array.isArray(id) ? deleteMultiService(id) : deleteService(id)).then((data) => {
            dispatch(getAll())
            setMessages(data.payload);
            setTimeout(() => {
                setMessages(null)
            }, 3000);
        });
    };

    const handleRestoreService = (id) => {
        dispatch(Array.isArray(id) ? restoreMulti(id) : restore(id)).then((data) => {
            dispatch(getAllDelete())
            setMessages(data.payload);
            setTimeout(() => {
                setMessages(null)
            }, 3000);
        });
    };

    let data;
    if (services) {
        if(services.length > 0) {
            data = services.map((service) => {
                return (
                    <tr key={service._id}>
                        <td>
                            <input
                                type='checkbox'
                                name=''
                                onChange={(e) => itemToggleChecked(e)}
                                value={service._id}
                            />
                        </td>
                        <td>{service.name}</td>
                        <td>{service.description}</td>
                        <td>{service.price}</td>
                        <td>
                            {showDelete ? 
                                <button title='Restore' className={styles.restoreBtn} onClick={() => handleRestoreService(service._id)}>Restore</button> :
                                <>
                                    <i
                                        title='Edit'
                                        className='fas fa-edit'
                                        onClick={() => setEdit({ show: true, service })}
                                    ></i>
                                    <i
                                        title='Delete'
                                        className='fas fa-trash-alt'
                                        onClick={() => setDeleteConfirm({show:true, data: service._id})}
                                    ></i>
                                </>
                            }
                        </td>
                    </tr>
                );
            })
        }else{
            data = <tr><td colspan="10">Empty data</td></tr>
        }
    }

    const [sort, setSort] = useState(null)
    const [search, setSearch] = useState('')

    useEffect(() => {
        dispatch(showDelete ? getAllDelete({ sort: sort ? { [sort.field]: sort.value } : '', search }) : getAll({ sort: sort ? { [sort.field]: sort.value } : '', search }));
    }, [sort, search])

    useEffect(() => {
        setCheckAll(false)
        setItemChoose([])
    }, [showDelete])

    return (
        <>
            <div className={clsx(styles.allContainer, {[styles.light]: theme === "light"}, theme === "light" ? 'shadow_light' : 'shadow')}>
                {messages && (
                    <Alert
                        success={messages.success}
                        messages={messages.messages}
                    />
                )}
                {edit.show && (
                    <div className={styles.modal} onClick={(e) => closeModal(e)}>
                        <div className={clsx(styles.modalContainer, theme === "light" ? 'shadow_light' : 'shadow')}>
                            <i title='Close' className={clsx('fas fa-times', styles.btnClose)} onClick={(e) => closeModal(e)}></i>
                            <Add service={edit.service} setEdit={setEdit} setMessagesAll={setMessages} edit={true} />
                        </div>
                    </div>
                )}
                {deleteConfirm.show && <DeleteConfirm deleteAction={handleDeleteService}/>}
                <div className={styles.allHeader}>
                    <div className={styles.headerLeft}>
                        <div className={styles.allName}>Service</div>
                        <div title='Search' className={styles.allSearch}>
                            <i className='fas fa-search'></i>
                            <input type='text' placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        { itemChoose.length > 0 ? showDelete ?
                            <div title='Delete' className={styles.icon} onClick={() => handleRestoreService(itemChoose)}>
                                <i className="fas fa-undo"></i>
                            </div>
                        :
                            <div title='Delete' className={styles.icon} onClick={() => setDeleteConfirm({show:true, data: itemChoose})}>
                                <i className="far fa-trash-alt"></i>
                            </div>
                        : ''
                        }
                    </div>
                    <div className={styles.headerRight}>
                        <div
                            title='New'
                            className={styles.icon}
                            onClick={() => setEdit({ show: true, service: null })}
                        >
                            <i className='fas fa-plus'></i>
                        </div>
                        <div title='Refresh' className={styles.icon} onClick={() => dispatch(getAll())}>
                            <i className='fas fa-redo'></i>
                        </div>
                        {showDelete ? 
                            <div title='Back' className={styles.icon} onClick={() => {dispatch(getAll()); setShowDelete(false)}}>
                                <i className="fas fa-arrow-alt-circle-left"></i>
                            </div> :
                            <div title='Trash' className={styles.icon} onClick={() => {dispatch(getAllDelete()); setShowDelete(true)}}>
                                <i className="fas fa-trash"></i>
                            </div> 
                        }
                    </div>
                </div>
                <table className={styles.allTable}>
                    <tr>
                        <th width="5%">
                            <input
                                type='checkbox'
                                name=''
                                onChange={() => toggleChecked()}
                                checked={checkAll}
                            />
                        </th>
                        <th width="25%"><div><span onClick={() => setSort(handleSort(sort, "name"))}>Name {sort && sort.field === 'name' ? sort.value === 1 ? <i className="fas fa-sort-amount-down-alt"></i> : <i className="fas fa-sort-amount-up"></i> : ''}</span></div></th>
                        <th width="45%"><div><span onClick={() => setSort(handleSort(sort, "description"))}>Description {sort && sort.field === 'description' ? sort.value === 1 ? <i className="fas fa-sort-amount-down-alt"></i> : <i className="fas fa-sort-amount-up"></i> : ''}</span></div></th>
                        <th width="15%"><div><span onClick={() => setSort(handleSort(sort, "pricec"))}>Price {sort && sort.field === 'pricec' ? sort.value === 1 ? <i className="fas fa-sort-amount-down-alt"></i> : <i className="fas fa-sort-amount-up"></i> : ''}</span></div></th>
                        <th width="10%">Action</th>
                    </tr>
                    {serviceLoading ? 
                        <tr>
                            <td colspan="10">
                                <div className={styles.loading}>
                                    <Preload/>
                                </div>
                            </td>
                        </tr>
                    : data
                    }
                </table>
            </div>
        </>
    );
};

export default All;
