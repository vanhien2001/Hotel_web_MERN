import React, { useState, useEffect, createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, useParams, Redirect } from 'react-router-dom';
import clsx from 'clsx';
import Slidebar from './Slidebar/Slidebar';
import Navbar from './Navbar/Navbar';
import Setting from './Setting/Setting';
import Home from './Home/Home';
import Room from './Content/Room/Room';
import Booking from './Content/Booking/Booking';
import Service from './Content/Service/Service';
import Staff from './Content/Staff/Staff';
import Preload from './Preload/Preload';
import PageNotFound from '../../components/PageNotFound/PageNotFound';
import Login from './Auth/Login';
import { getAll as getAllBooking } from '../../store/reducer/bookingSlice';
import { getAll as getAllRoom } from '../../store/reducer/roomSlice';
import { getAll as getAllService } from '../../store/reducer/serviceSlice';
import { getAll as getAllStaff, staffSelector } from '../../store/reducer/staffSlice';
import styles from "./Dashboard.module.scss";

const Context = createContext()
export const useStore = () => {
    return useContext(Context)
}

const Dashboard = () => {
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)

    const { staff } = useSelector(staffSelector)

    // const match = useRouteMatch()
    let { slug } = useParams()
    let type = null
    if(slug && slug.split('-').length > 1) {
        [type, ...slug] = slug.split('-')
        slug = slug.join('-')
    }
    const [theme, setTheme] = useState('dark')
    const [resizeSlidebar, setResizeSlidebar] = useState(false)
    const [slidebarTheme, setSlidebarTheme] = useState('dark')
    const [openSetting, setOpenSetting] = useState(false)
    const [navbarTheme, setNavbarTheme] = useState('#1a202e')
    const [deleteConfirm, setDeleteConfirm] = useState({
        show: false,
        data: null,
    });
    const navbarStyle = {
        backgroundColor: navbarTheme,
        color: navbarTheme === '#fff' ? '#232b3e' : '#fff',
    }
    const setting = {
        type,
        slug,
        staff,
        theme,
        resizeSlidebar,
        setResizeSlidebar,
        setTheme,
        slidebarTheme,
        setSlidebarTheme,
        openSetting,
        setOpenSetting,
        navbarStyle,
        navbarTheme,
        setNavbarTheme,
        deleteConfirm,
        setDeleteConfirm
    }

    useEffect(async () => {
        await dispatch(getAllBooking())
        await dispatch(getAllRoom())
        await dispatch(getAllService())
        await dispatch(getAllStaff())
        setLoading(false)
    }, [])
    if(!['home','room','service-room','booking','service','staff','login'].includes(slug)){
        return <PageNotFound/>
    }
    else if( slug === 'login' ){
        return <Login/>
    }
    else if (!staff) {
        return <Redirect to="/dashboard/login" />
    } else {
        return (
            <Context.Provider value={setting}>
                <div className={clsx(styles.dashboard,{[styles.light]: theme === 'light'})}>
                    {loading ? <Preload /> :
                        <>
                            <div className={clsx(styles.colLeft,{[styles.resize]: resizeSlidebar === true})}>
                                <Slidebar/>
                            </div>
                            <div className={clsx(styles.colRight,{[styles.resize]: resizeSlidebar === true})}>
                                <Navbar/>
                                <Setting/>
                                <div className={styles.app}>
                                    <Switch>
                                        <Route exact path={`/dashboard/`}>
                                            <Redirect to={`/dashboard/home`}/>
                                        </Route>
                                        <Route exact path={`/dashboard/home`} component={Home} />
                                        <Route exact path={`/dashboard/:slug-room`} component={Room} />
                                        <Route exact path={`/dashboard/:slug-service-room`} component={Room} />
                                        <Route exact path={`/dashboard/:slug-booking`} component={Booking} />
                                        <Route exact path={`/dashboard/:slug-service`} component={Service} />
                                        <Route exact path={`/dashboard/:slug-staff`} component={Staff} />
                                    </Switch>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </Context.Provider>
        )
    }
}

export default Dashboard