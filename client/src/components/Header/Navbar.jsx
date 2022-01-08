import React,{ useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { userSelector, logout } from '../../store/reducer/userSlice';
import styles from './Navbar.module.scss';

const Navbar = ({ slug }) => {
    const history = useHistory()
    const userState = useSelector(userSelector)
    const dispatch = useDispatch()

    const [openMenu, setOpenMenu] = useState(false)

    const userLogout = (e) => {
        e.preventDefault()
        dispatch(logout())
    }

    useEffect(() => {
        setOpenMenu(false)
    }, [slug])

    return (
        <div className={clsx(styles.navbar, 'shadow')}>
            <div className={styles.navbarContainer}>
                <img className={styles.navbarIcon} src='/Img/hotel-logo.png' alt='' onClick={() => history.push('/home')} />
                <div className={clsx(styles.navbarList,{[styles.open]: openMenu === true })}>
                    <div className={clsx(styles.navbarItem,{[styles.active]: slug === 'home'})}>
                        <Link to='/home'>Home</Link>
                    </div>
                    <div className={clsx(styles.navbarItem,{[styles.active]: slug === 'room'})}>
                        <Link to='/room'>Rooms</Link>
                    </div>
                    <div className={clsx(styles.navbarItem,{[styles.active]: slug === 'about'})}>
                        <Link to='/about'>About us</Link>
                    </div>
                    <div className={clsx(styles.navbarItem,{[styles.active]: slug === 'pages'})}>
                        <Link to='/pages'>Pages</Link>
                    </div>
                    <div className={clsx(styles.navbarItem,{[styles.active]: slug === 'news'})}>
                        <Link to='/news'>News</Link>
                    </div>
                    <div className={clsx(styles.navbarItem,{[styles.active]: slug === 'contact'})}>
                        <Link to='/contact'>Contact</Link>
                    </div>
                    <div className={styles.navbarItem}>
                        {!userState.user ? (
                            <Link className={styles.user} to='/login'>Login</Link>
                        ) : (
                            <div className={styles.user}>
                                {userState.user.firstname}
                                <div className={clsx(styles.userItemContainer,'shadow_light')}>
                                    <div className={styles.userItem}>
                                        <Link to='/account/infor'>Thông tin cá nhân</Link>
                                    </div>
                                    <div className={styles.userItem}>
                                        <Link to='/account/booking-infor'>Thông tin đặt phòng</Link>
                                    </div>
                                    <div className={styles.userItem}>
                                        <a href='#' onClick={(e) => userLogout(e)}>Đăng xuất</a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <i className={clsx('fas fa-bars',styles.navbarMenuIcon)} onClick={() => setOpenMenu(!openMenu)}></i>
            </div>
        </div>
    );
};

export default Navbar;
