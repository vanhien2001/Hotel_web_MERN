import React from 'react';
import { Route, Switch, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Infor from "./Infor/Infor";
import BookingInfor from "./BookingInfor/BookingInfor";
import BookingDetail from "./BookingDetail/BookingDetail";
import ChangePassForm from "./ChangePassForm/ChangePassForm";
import styles from "./User.module.scss";
import { logout } from "../../../store/reducer/userSlice";
import { userSelector } from "../../../store/reducer/userSlice";
import PageNotFound from "../../../components/PageNotFound/PageNotFound";

const User = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(userSelector);

    return (
        <div className={styles.account}>
            <div className="grid wide">
                <div className="row">
                    <div className="col l-3 c-12">
                        <div className={styles.sidebar}>
                            <div className={styles.sidebarHeader}>
                                <img src="/Img/avatar.png" alt="" />
                                <span>{user?.firstname}</span>
                            </div>
                            <Link to='/account/infor'>
                                <div className={styles.item}>
                                    <i className="fas fa-user-circle"></i>
                                    <span>Thông tin cá nhân</span>
                                </div>
                            </Link>
                            <Link to='/account/booking-infor'>
                                <div className={styles.item}>
                                    <i className="fas fa-scroll"></i>
                                    <span>Thông tin đặt phòng</span>
                                </div>
                            </Link>
                            <Link to='/account/change-password'>
                                <div className={styles.item}>
                                    <i class="fas fa-lock"></i>
                                    <span>Đổi mật khẩu</span>
                                </div>
                            </Link>
                            <Link to='#' onClick={(e) => {e.preventDefault(); dispatch(logout())}}>
                                <div className={styles.item}>
                                    <i className="fas fa-sign-out-alt"></i>
                                    <span>Đăng xuất</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col l-8 l-o-1 c-12">
                        <div className={styles.content}>
                            <Switch>
                                <Route exact path={`/account/infor`} component={Infor}/>
                                <Route exact path={`/account/change-password`} component={ChangePassForm}/>
                                <Route exact path={`/account/booking-infor`} component={BookingInfor}/>
                                <Route exact path={`/account/booking-detail/:id`} component={BookingDetail}/>
                                <Route component={PageNotFound}/>

                                {/* <Route exact path={`/`} component={User}/> */}
                                {/* <Route exact path={`/account/*`} render={(props) => {
                                    console.log(props);
                                    return ['/account/infor'].includes(props.location.pathname) ? null : <PageNotFound/>
                                }}/> */}
                                {/* <Route exact path={`/account/*`} component={PageNotFound}/> */}
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User
