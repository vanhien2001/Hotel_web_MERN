import React from 'react';
import { Route, Switch } from "react-router-dom";
import Infor from "./Infor/Infor";
import BookingInfor from "./BookingInfor/BookingInfor";
import ChangePassForm from "./ChangePassForm/ChangePassForm";
// import PageNotFound from "../../../components/PageNotFound/PageNotFound";

const User = () => {
    return (
        <Switch>
            <Route exact path={`/account/infor`} component={Infor}/>
            <Route exact path={`/account/changePassword`} component={ChangePassForm}/>
            <Route exact path={`/account/bookingInfor`} component={BookingInfor}/>

            {/* <Route exact path={`/`} component={User}/> */}
            {/* <Route exact path={`/account/*`} render={(props) => {
                console.log(props);
                return ['/account/infor'].includes(props.location.pathname) ? null : <PageNotFound/>
            }}/> */}
            {/* <Route exact path={`/account/*`} component={PageNotFound}/> */}
        </Switch>
    )
}

export default User
