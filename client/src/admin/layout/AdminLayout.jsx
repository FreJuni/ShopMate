import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom'
import SearchBar from "../Search/SearchBar";
import { useDispatch } from "react-redux";
import { userAction } from "../../store/userSlice";

const AdminLayout = () => {
    const [hover, setHover] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const hover = localStorage.getItem("hover");

        if (hover != null) {
            setHover(Number(hover));
        }

    }, [hover]);

    const logoutHandler = () => {
        dispatch(userAction.setToken(''));
        dispatch(userAction.setUser([]));
        localStorage.removeItem('token');
        localStorage.removeItem('hover');
        navigate('/auth/login');
    }

    return (
        <div className=" xl:flex relative gap-3 ">
            <div className={` xl:w-1/5  ease-in-out h-screen   duration-300  max-xl:fixed max-xl:-translate-x-96 z-50 bg-slate-50 ${showMenu && 'max-xl:translate-x-0'}  border-r-2  p-5 `}>
                <div className="relative flex gap-2 items-center justify-center">
                    <i className="fa-regular max-sm:text-2xl fa-face-smile text-3xl text-blue-500"></i>
                    <h2 onClick={() => {
                        navigate('/admin');
                        setHover(0)
                        localStorage.removeItem('hover');
                    }} className=" text-2xl font-bold cursor-pointer max-sm:text-xl" >FREDDY </h2>
                    <p onClick={() => setShowMenu(false)}>
                        <i className="absolute max-sm:text-2xl hidden max-xl:inline-block -right-2 top-[1px] text-3xl cursor-pointer text-gray-500 hover:text-gray-400 duration-200 fa-solid fa-xmark"></i>
                    </p>
                </div>

                <div className=" pt-7">

                    <Link to={'/admin'}>
                        <div onClick={() => {
                            setShowMenu(false)
                            setHover(0)
                            localStorage.setItem('hover', 0);
                        }} className={` py-2 max-sm:text-[13px] mb-3  px-3 ${hover == 0 ? 'bg-blue-500 text-white ' : 'text-gray-500 hover:text-blue-500 '} rounded-md  flex gap-2 items-center cursor-pointer duration-200 select-none`}>
                            <i
                                className="fas fa-fw fa-table"></i>
                            <h2 className=" text-base  font-semibold ">Dashboard </h2>
                        </div></Link>

                    <Link to={'/admin/category'}>
                        <div onClick={() => {
                            setShowMenu(false)
                            setHover(1)
                            localStorage.setItem('hover', 1);
                        }} className={` py-2 max-sm:text-[13px] mb-3  px-3 ${hover == 1 ? 'bg-blue-500 text-white ' : 'text-gray-500 hover:text-blue-500 '} rounded-md  flex gap-2 items-center cursor-pointer duration-200 select-none`}>
                            <i
                                className="fa-solid fa-circle-plus"></i>                        <h2 className=" text-base  font-semibold ">Category </h2>
                        </div>
                    </Link>

                    <Link to={'/admin/add/category'}>
                        <div onClick={() => {
                            setShowMenu(false)
                            setHover(2)
                            localStorage.setItem('hover', 2);
                        }} className={` py-2 max-sm:text-[13px] mb-3  px-3 ${hover == 2 ? 'bg-blue-500 text-white ' : 'text-gray-500 hover:text-blue-500 '} rounded-md  flex gap-2 items-center cursor-pointer duration-200 select-none`}>
                            <i
                                className="fa-solid fa-sitemap"></i>                        <h2 className=" text-base  font-semibold ">Add Category </h2>
                        </div>
                    </Link>

                    <Link to={'/admin/product/detail'}>
                        <div onClick={() => {
                            setShowMenu(false)
                            setHover(3)
                            localStorage.setItem('hover', 3)
                        }} className={` py-2 max-sm:text-[13px] mb-3  px-3 ${hover == 3 ? 'bg-blue-500 text-white ' : 'text-gray-500 hover:text-blue-500 '} rounded-md  flex gap-2 items-center cursor-pointer duration-200 select-none`}>
                            <i
                                className="fa-solid fa-layer-group"></i>                        <h2 className=" text-base  font-semibold ">Product Details </h2>
                        </div>
                    </Link>

                    <Link to={'/admin/add/product'}>
                        <div onClick={() => {
                            setShowMenu(false)
                            setHover(4)
                            localStorage.setItem('hover', 4);
                        }} className={` py-2 max-sm:text-[13px] mb-3  px-3 ${hover == 4 ? 'bg-blue-500 text-white ' : 'text-gray-500 hover:text-blue-500 '} rounded-md  flex gap-2 items-center cursor-pointer duration-200 select-none`}>
                            <i
                                className="fa-solid fa-plus"></i>                        <h2 className=" text-base  font-semibold ">Add Item </h2>
                        </div>
                    </Link>

                    <Link to={'/admin/payment'}>
                        <div onClick={() => {
                            setShowMenu(false)
                            setHover(5)
                            localStorage.setItem('hover', 5);
                        }} className={` py-2 max-sm:text-[13px] mb-3  px-3 ${hover == 5 ? 'bg-blue-500 text-white ' : 'text-gray-500 hover:text-blue-500 '} rounded-md  flex gap-2 items-center cursor-pointer duration-200 select-none`}>
                            <i
                                className="fa-solid fa-credit-card"></i>                        <h2 className=" text-base  font-semibold ">Payment Method </h2>
                        </div>
                    </Link>

                    <Link to={'/admin/sale/info'}>
                        <div onClick={() => {
                            setShowMenu(false)
                            setHover(6)
                            localStorage.setItem('hover', 6);
                        }} className={` py-2 max-sm:text-[13px] mb-3  px-3 ${hover == 6 ? 'bg-blue-500 text-white ' : 'text-gray-500 hover:text-blue-500 '} rounded-md  flex gap-2 items-center cursor-pointer duration-200 select-none`}>
                            <i className="fa-solid fa-list"></i>                        <h2 className=" text-base  font-semibold ">Sale Information </h2>
                        </div>
                    </Link>

                    <Link to={'/admin/order'}>
                        <div onClick={() => {
                            setShowMenu(false)
                            setHover(7)
                            localStorage.setItem('hover', 7);
                        }} className={` py-2 max-sm:text-[13px] mb-3  px-3 ${hover == 7 ? 'bg-blue-500 text-white ' : 'text-gray-500 hover:text-blue-500 '} rounded-md  flex gap-2 items-center cursor-pointer duration-200 select-none`}>
                            <i
                                className="fa-solid fa-cart-shopping"></i>                        <h2 className=" text-base  font-semibold ">Order Board </h2>
                        </div>
                    </Link>

                    <Link to={'/admin/admin/list'}>
                        <div onClick={() => {
                            setShowMenu(false)
                            setHover(8)
                            localStorage.setItem('hover', 8);
                        }} className={` py-2 max-sm:text-[13px] mb-3  px-3 ${hover == 8 ? 'bg-blue-500 text-white ' : 'text-gray-500 hover:text-blue-500 '} rounded-md  flex gap-2 items-center cursor-pointer duration-200 select-none`}>
                            <i
                                className="fa-solid fa-user-group"></i>                        <h2 className=" text-base  font-semibold ">Admin & User List </h2>
                        </div></Link>

                    <Link to={'/admin/change/password'}>
                        <div onClick={() => {
                            setShowMenu(false)
                            setHover(9)
                            localStorage.setItem('hover', 9);
                        }} className={` py-2 max-sm:text-[13px] mb-3  px-3 ${hover == 9 ? 'bg-blue-500 text-white ' : 'text-gray-500 hover:text-blue-500 '} rounded-md  flex gap-2 items-center cursor-pointer duration-200 select-none`}>
                            <i
                                className="fa-solid fa-lock"></i>                        <h2 className=" text-base  font-semibold ">Change Password </h2>
                        </div>
                    </Link>

                    <Link to={'/admin/report'}>
                        <div onClick={() => {
                            setShowMenu(false)
                            setHover(10)
                            localStorage.setItem('hover', 10);
                        }} className={` py-2 max-sm:text-[13px] mb-3  px-3 ${hover == 10 ? 'bg-blue-500 text-white ' : 'text-gray-500 hover:text-blue-500 '} rounded-md  flex gap-2 items-center cursor-pointer duration-200 select-none`}>
                            <i
                                className="fa-solid fa-envelope-open-text"></i>
                            <h2 className=" text-base  font-semibold ">Report </h2>
                        </div>
                    </Link>

                    <div onClick={() => {
                        logoutHandler();
                    }} className={` py-2 max-sm:text-[13px] mb-3  px-3 text-gray-500 hover:text-blue-500 '} rounded-md  flex gap-2 items-center cursor-pointer duration-200 select-none`}>
                        <i className="fa-solid fa-right-from-bracket"></i>                        <h2 className=" text-base  font-semibold ">Logout </h2>
                    </div>

                </div>
            </div>
            <div className=" xl:w-4/5 max-xl:w-full max-xl:px-5   pt-8">
                <SearchBar setShowMenu={setShowMenu} setHover={setHover} />
                <Outlet />
            </div>
        </div >
    )
}

export default AdminLayout