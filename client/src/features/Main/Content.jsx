import React, { useState, useEffect, createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useParams } from "react-router-dom";
import Sidebar from "./SideBar/Sidebar";
import Sidebar2 from "./SideBar/Sidebar2";
import RoomCart from "./Content/RoomCart/RoomCart";
import Booking from "./Content/Booking/Booking";
import Checkout from "./Content/Checkout/Checkout";
import Thankyou from "./Content/Thankyou/Thankyou";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import StickyIcon from "../../components/StickyIcon/StickyIcon";
import Detail from "./Detail/Detail";
import Home from "./Home/Home";
import News from "./News/News";
import About from "./About/About";
import Pages from "./Pages/Pages";
import Contact from "./Contact/Contact";
import User from './/User/User';
import PageNotFound from "../../components/PageNotFound/PageNotFound";
import { load, userSelector } from "../../store/reducer/userSlice";

const Context = createContext();
export const useStore = () => {
    return useContext(Context);
};

const Content = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(userSelector);
    const { slug } = useParams();

    let numberDay;
    let body;

    const [bookingForm, setbookingForm] = useState(() => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        return {
            room: "",
            services: [],
            arrive: new Date(),
            depart: date,
            guests: 1,
            totalPrice: 0
        }
    });
    const [viewGrid, setViewGrid] = useState(true);
    let [filter, setFilter] = useState({});
    const typeRoomChoose = (e) => {
        if (e.target.checked) {
            filter.typeRoom.push(e.target.value);
            setFilter({
                ...filter,
                typeRoom: filter.typeRoom,
            });
        } else {
            let index = filter.typeRoom.indexOf(e.target.value);
            filter.typeRoom.splice(index, 1);
            setFilter({
                ...filter,
                typeRoom: filter.typeRoom,
            });
        }
    };

    const serviceChoose = (e) => {
        if (e.target.checked) {
            filter.services.push(e.target.value);
            setFilter({
                ...filter,
                services: filter.services,
            });
        } else {
            let index = filter.services.indexOf(e.target.value);
            filter.services.splice(index, 1);
            setFilter({
                ...filter,
                services: filter.services,
            });
        }
    };

    if (bookingForm && bookingForm.arrive && bookingForm.depart) {
        numberDay = Math.ceil(
            (bookingForm.depart.getTime() - bookingForm.arrive.getTime()) /
                (1000 * 3600 * 24)
        );
    }

    const control = {
        slug,
        numberDay,
        viewGrid,
        setViewGrid,
        filter,
        setFilter,
        bookingForm,
        setbookingForm,
        serviceChoose,
        typeRoomChoose
    }
    
    const [skipRender, setSkipRender] = useState(true)
    useEffect(() => {
        if(!skipRender){
            setbookingForm({
                ...bookingForm,
                firstname: user ? user.firstname : "",
                lastname: user ? user.lastname : "",
                gender: user ? user.gender : "male",
                phone: user ? user.phone : "",
                cmnd: user ? user.cmnd : "",
                email: user ? user.email : "",
                address: user ? user.address : "",
            });
        }
    }, [user]);

    useEffect(() => {
        if(skipRender){
            setSkipRender(false);
        }else{
            setFilter({
                ...filter,
                arrive: bookingForm ? bookingForm.arrive : null,
                depart: bookingForm ? bookingForm.depart : null
            })
        }
    }, [bookingForm.arrive, bookingForm.depart]);

    useEffect(() => {
        dispatch(load());
    }, []);

    if (["room", "booking", "checkout", "thankyou", 'login', 'register', 'home','detail','about','pages','news','contact','account'].includes(slug)) {
        if(["room", "booking", "checkout", "thankyou"].includes(slug)) {
            body = (
                <>
                    <div className="col l-4 c-12">
                        <Switch>
                            <Route exact path={`/room`} component={Sidebar} />
                            <Route exact path={`/*`} component={Sidebar2} />
                        </Switch>
                    </div>
                    <div className="col l-8 c-12">
                        <Switch>
                            <Route exact path={`/room`} component={RoomCart} />
                            <Route exact path={`/booking`} component={Booking} />
                            <Route exact path={`/checkout`} component={Checkout} />
                            <Route exact path={`/thankyou`} component={Thankyou} />
                        </Switch>
                    </div>
                </>
            );
        }else {
            body = (
                <div className="col l-12 c-12">
                    <Switch>
                        <Route exact path={`/login`} component={Login} />
                        <Route exact path={`/register`} component={Register} />
                        <Route exact path={`/home`} component={Home} />
                        <Route exact path={`/detail`} component={Detail} />
                        <Route exact path={`/about`} component={About} />
                        <Route exact path={`/pages`} component={Pages} />
                        <Route exact path={`/news`} component={News} />
                        <Route exact path={`/contact`} component={Contact} />
                        <Route exact path={`/account/*`} component={User} />
                    </Switch>
                </div>
            );
        }
        return (
            <Context.Provider value={control}>
                <Header/>
                <div>
                    <div className="content">
                        <div className={`grid ${slug !== "home" && "wide"}`}>
                            <div
                                className={`row ${slug === "home" && "no-gutters"}`}
                            >
                                {body}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                <StickyIcon />
            </Context.Provider>
        );
    } else {
        return <PageNotFound/>
    }
};

export default Content;
