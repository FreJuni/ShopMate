/* eslint-disable react/prop-types */
import { useState } from "react"
import { useSelector } from 'react-redux';


const SearchBar = ({ setHover, setShowMenu }) => {

    const [show, setShow] = useState(false);
    const userRole = useSelector((state) => state.reducer.userInfo.user.userRole);

    return (
        <div className=" w-full flex max-xl:pt-5 justify-between items-center px-4 pb-8">
            <div>
                <p onClick={() => setShowMenu(true)}>
                    <i className=" text-gray-500 max-sm:text-2xl hidden max-xl:inline-block hover:text-gray-400 duration-200 text-3xl cursor-pointer absolute top-3 fa-solid fa-bars"></i>
                </p>
                <h2 className=" font-bold max-sm:text-lg text-xl text-gray-500">Dashboard</h2>
            </div>
            <div>
                <div className="flex gap-5 items-center pr-10 max-xl:pr-3 max-[410px]:gap-2 ">
                    <form action="">
                        <button type="submit" className="max-sm:p-1 max-[410px]:p-[1px] bg-gray-300 p-2 rounded-s-md"><i className="fa fa-search text-white px-2"></i></button>
                        <input placeholder="Search.." className=" max-sm:w-28 w-32 rounded-e-md p-2 max-sm:p-1 max-[410px]:p-[1px] bg-gray-300 outline-none" name="search" />
                    </form>
                    <div className=" relative" >
                        <i onClick={() => setShow(!show)} className="fa-solid text-gray-500 fa-user  text-3xl cursor-pointer max-sm:text-2xl"></i>
                        {
                            show && <div className=" border z-50 bg-white top-10 shadow-lg px-1 rounded-md absolute -left-36 ">
                                <div className=" select-none border-b-2 hover:text-blue-500 duration-75 text-gray-500 px-3 py-2 font-semibold">
                                    <a href="/admin/profile">Profile</a>
                                </div>
                                <div className=" select-none border-b-2 hover:text-blue-500 duration-75 text-gray-500 px-3 py-2 font-semibold">
                                    <a onClick={() => {
                                        setHover(9)
                                        localStorage.setItem('hover', 9)
                                    }} href="/admin/change/password">Change Password </a>
                                </div>
                                {
                                    userRole == 'superadmin' && <div className=" select-none border-b-2 hover:text-blue-500 duration-75 text-gray-500 px-3 py-2 font-semibold">
                                        <a href="/admin/add/new/admin">Add New Admin</a>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchBar