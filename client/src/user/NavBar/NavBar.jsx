/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux'
import { userAction } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const NavBar = ({ nav, order, cart, setShowMenu, setNav, favorite }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    // const [showMenu, setShowMenu] = useState(false);
    // const refElement = useRef();

    // let height = 0;

    // if (refElement.current) {
    //     height = refElement.current.getBoundingClientRect().height;
    // }

    const logoutHandler = () => {
        dispatch(userAction.setToken(null));
        dispatch(userAction.setUser([]));
        localStorage.removeItem("nav");
        localStorage.removeItem('token');
        navigate('/auth/login');
        window.location.reload();
    }

    return (
        <div>
            <nav className=" flex justify-between items-center py-6">
                <div>
                    <a onClick={() => {
                        setNav(0)
                        localStorage.setItem('nav', 0)
                    }} href="/user/home"> <h1 className="max-lg:text-3xl font-bold text-4xl text-gray-600">POS<span className="text-gray-400 font-normal">LITE</span></h1></a>
                </div>
                <div className=' max-lg:hidden'>
                    <ul className=" flex gap-3 items-center">
                        <a onClick={() => {
                            setNav(0)
                            localStorage.setItem('nav', 0)
                        }} className={`text-lg text-gray-600  ${nav == 0 ? ' text-orange-500' : 'hover:text-orange-400 duration-75'} uppercase tracking-wider`} href="/user/home">
                            <li>Home</li>
                        </a>
                        <a onClick={() => {
                            setNav(1)
                            localStorage.setItem('nav', 1)
                        }} href="/user/about" className={`text-lg text-gray-600 ${nav == 1 ? ' text-orange-500' : 'hover:text-orange-400 duration-75'} uppercase tracking-wider`} >
                            <li>About</li>
                        </a>
                        <a onClick={() => {
                            setNav(2)
                            localStorage.setItem('nav', 2)
                        }} href="/user/shop" className={`text-lg text-gray-600 ${nav == 2 ? ' text-orange-500' : 'hover:text-orange-400 duration-75'} uppercase tracking-wider`} >
                            <li>Shop</li>
                        </a>
                        <a onClick={() => {
                            setNav(3)
                            localStorage.setItem('nav', 3)
                        }} href="/user/contact" className={`text-lg text-gray-600 ${nav == 3 ? ' text-orange-500' : 'hover:text-orange-400 duration-75'} uppercase tracking-wider`} >
                            <li>Contact</li>
                        </a>
                        <button onClick={() => logoutHandler()} className=" bg-orange-500 text-white px-3 pt-1 pb-2 rounded-3xl text-lg">
                            <li>Logout</li>
                        </button>
                    </ul>
                </div>
                <div className=" flex gap-4 items-center">
                    <button onClick={() => setShowMenu(true)} className='hidden max-lg:inline-block'>
                        <i className="fa-solid max-lg:text-2xl fa-bars text-3xl text-gray-500"></i>
                    </button>
                    <a href="/user/favorite" className=' relative'>
                        <i className="fa-regular max-lg:text-2xl fa-heart text-3xl text-gray-500 "></i>
                        <span className='max-lg:px-[8px] max-lg:-right-3 max-lg:pb-[2px] absolute -top-3 -right-4 bg-red-500 px-[10px] pb-1 rounded-full text-white'>{favorite.length}</span>
                    </a>
                    <a href="/user/cart" className=' relative'>
                        <i className="fa-solid max-lg:text-2xl  fa-cart-shopping text-3xl text-gray-500 "></i>
                        <span className='max-lg:px-[8px] max-lg:-right-3 max-lg:pb-[2px] absolute -top-3 -right-4 bg-red-500 px-[10px] pb-1 rounded-full text-white'>{cart.length}</span>
                    </a>
                    <a href="/user/order" className=' relative'>
                        <i className="fa-solid fa-bag-shopping max-lg:text-2xl text-3xl text-gray-500 "></i>
                        <span className='max-lg:px-[8px] max-lg:-right-3 max-lg:pb-[2px] absolute -top-3 -right-4 bg-red-500 px-[10px] pb-1 rounded-full text-white'>{order.length}</span>
                    </a>
                    <div className=' relative cursor-pointer'>
                        <i onClick={() => setShow(!show)} className="fa-regular fa-user text-3xl max-lg:text-2xl text-gray-500 "></i>
                        {
                            show && <div className=" border z-50 bg-white top-10 shadow-lg px-1 rounded-md absolute -left-36 ">
                                <div className=" select-none border-b-2 hover:text-blue-500 duration-75 text-gray-500 px-3 py-2 font-semibold">
                                    <a href="/user/profile">Profile</a>
                                </div>
                                <div className=" select-none border-b-2 hover:text-blue-500 duration-75 text-gray-500 px-3 py-2 font-semibold">
                                    <a href="/user/change/password/page">Change Password </a>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </nav>
            {/* <div ref={refElement} className={` ease-in-out duration-200 ${showMenu ? 'translate-y-0' : height != 0 && `-translate-y-[${height}px]`}  z-50 fixed left-0 top-0 text-center p-6 bg-gray-200 w-full`}>
                <ul className=' h-full flex justify-center items-center flex-col gap-5'>
                    <a onClick={() => {
                        setNav(0)
                        localStorage.setItem('nav', 0)
                        setShowMenu(false)
                    }} className={`text-base text-gray-600  ${nav == 0 ? ' text-orange-500' : 'hover:text-orange-400 duration-75'} uppercase tracking-wider`} href="/user">
                        <li>HOME</li>
                    </a>
                    <a onClick={() => {
                        setNav(1)
                        localStorage.setItem('nav', 1)
                        setShowMenu(false)
                    }} href="#" className={`text-base text-gray-600 ${nav == 1 ? ' text-orange-500' : 'hover:text-orange-400 duration-75'} uppercase tracking-wider`}>
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
                    }} href="#" className={`text-base text-gray-600 ${nav == 3 ? ' text-orange-500' : 'hover:text-orange-400 duration-75'} uppercase tracking-wider`} >
                        <li>CONTACT</li>
                    </a>
                    <button onClick={() => logoutHandler()} className=" bg-orange-500 text-white px-5 text-center pt-1 pb-2 rounded-3xl text-base">
                        <li>Logout</li>
                    </button>
                </ul>
                <i onClick={() => setShowMenu(false)} className="text-2xl cursor-pointer text-gray-600 absolute right-6 top-3 fa-solid fa-xmark"></i>
            </div> */}
        </div >
    )
}

export default NavBar