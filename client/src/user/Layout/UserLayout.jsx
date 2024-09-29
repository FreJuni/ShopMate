/* eslint-disable react/prop-types */
import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "../NavBar/NavBar"
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { userAction } from "../../store/userSlice";

const UserLayout = ({ order, nav, cart, setNav, favorite }) => {
    const [showMenu, setShowMenu] = useState(false);
    const refElement = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let height = 0;

    if (refElement.current) {
        height = refElement.current.getBoundingClientRect().height;
    }

    const logoutHandler = () => {
        dispatch(userAction.setToken(null));
        dispatch(userAction.setUser([]));
        localStorage.removeItem("nav");
        localStorage.removeItem('token');
        navigate('/auth/login');
        window.location.reload();
    }

    return (
        <div className=" max-lg:mx-16 max-md:mx-12 max-sm:mx-10 max-[500px]:mx-7  mx-20">
            <div ref={refElement} className={` ease-in-out duration-200 ${showMenu == true ? 'translate-y-0' : `-translate-y-[260px]`}  z-50 fixed left-0 top-0 text-center p-6 bg-gray-200 w-full`}>
                <ul className=' h-full flex justify-center items-center flex-col gap-5'>
                    <a onClick={() => {
                        setNav(0)
                        localStorage.setItem('nav', 0)
                        setShowMenu(false)
                    }} className={`text-base text-gray-600  ${nav == 0 ? ' text-orange-500' : 'hover:text-orange-400 duration-75'} uppercase tracking-wider`} href="/user/home">
                        <li>HOME</li>
                    </a>
                    <a onClick={() => {
                        setNav(1)
                        localStorage.setItem('nav', 1)
                        setShowMenu(false)
                    }} href="/user/about" className={`text-base text-gray-600 ${nav == 1 ? ' text-orange-500' : 'hover:text-orange-400 duration-75'} uppercase tracking-wider`}>
                        <li>ABOUT</li>
                    </a>
                    <a onClick={() => {
                        setNav(2)
                        localStorage.setItem('nav', 2)
                        setShowMenu(false)
                    }} href="/user/shop" className={`text-base text-gray-600 ${nav == 2 ? ' text-orange-500' : 'hover:text-orange-400 duration-75'} uppercase tracking-wider`}>
                        <li>SHOP</li>
                    </a>
                    <a onClick={() => {
                        setNav(3)
                        localStorage.setItem('nav', 3)
                        setShowMenu(false)
                    }} href="/user/contact" className={`text-base text-gray-600 ${nav == 3 ? ' text-orange-500' : 'hover:text-orange-400 duration-75'} uppercase tracking-wider`} >
                        <li>CONTACT</li>
                    </a>
                    <button onClick={() => logoutHandler()} className=" bg-orange-500 text-white px-5 text-center pt-1 pb-2 rounded-3xl text-base">
                        <li>Logout</li>
                    </button>
                </ul>
                <i onClick={() => setShowMenu(false)} className="text-2xl cursor-pointer text-gray-600 absolute right-6 top-3 fa-solid fa-xmark"></i>
            </div>
            <NavBar setShowMenu={setShowMenu} cart={cart} order={order} favorite={favorite} nav={nav} setNav={setNav} />
            <Outlet />
        </div>
    )
}

export default UserLayout