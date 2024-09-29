/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import { changeToAdmin, changeToUser, deleteUser, getAdminList, getUserList } from "../../../apicalls/admin/list/list";
import { useSelector } from "react-redux";
import 'ldrs/ring'
import { dotSpinner } from 'ldrs'

const List = ({ title, state }) => {
    const [adminLists, setAdminLists] = useState([]);
    const [userLists, setUserLists] = useState([]);
    const selector = useSelector((state) => state.reducer.userInfo.user.userRole);
    const [adminPage, setAdminPage] = useState(1);
    const [userPage, setUserPage] = useState(1);
    const [adminCount, setAdminCount] = useState();
    const [userCount, setUserCount] = useState();
    const [loading, setLoading] = useState(false);
    dotSpinner.register()

    const successAlert = (response) => {
        Swal.fire({
            title: 'Success!',
            text: response.message,
            icon: 'success',
            confirmButtonText: 'Cool'
        })
    }

    const errorAlert = (response) => {
        Swal.fire({
            title: 'Success!',
            text: response.message,
            icon: 'success',
            confirmButtonText: 'Cool'
        })
    }

    const adminList = async () => {
        setLoading(true);
        try {
            const response = await getAdminList(adminPage);

            if (!response.success) {
                throw new Error(response.message);
            }
            // setAdminLists(response.listDoc.length)
            setAdminLists(response.listDoc);
            setAdminCount(response.count);
        } catch (error) {
            errorAlert(error);
        }
        setLoading(false);
    }

    const userList = async () => {
        setLoading(true);
        try {
            const response = await getUserList(userPage);

            if (!response.success) {
                throw new Error(response.message);
            }

            setUserLists(response.listDoc);
            setUserCount(response.count);
        } catch (error) {
            errorAlert(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        adminList();
    }, [adminPage]);

    useEffect(() => {
        userList();
    }, [userPage]);

    const deleteHandler = async (id, state) => {
        try {
            const response = await deleteUser(id);

            if (!response.success) {
                throw new Error(response.message);
            }

            if (state == 'admin') {
                adminList();
            } else {
                userList();
            }
            successAlert(response);

        } catch (error) {
            errorAlert(error);
        }
    }

    const roleChange = async (id, state) => {
        let response;
        try {
            if (state == 'admin') {
                response = await changeToUser(id);

            } else {
                response = await changeToAdmin(id);
            }

            if (!response.success) {
                throw new Error(response.message);
            }

            adminList();
            userList();

            successAlert(response);
        } catch (error) {
            errorAlert(error)
        }
    }

    return (
        <>
            {
                loading ? <div className=" w-full h-[600px] grid place-items-center">
                    < l-dot-spinner
                        size="80"
                        speed="0.9"
                        color="#3B82F6"
                    ></l-dot-spinner >
                </div> : <div className=" px-3">
                    <h2 className=" max-md:text-lg text-xl text-gray-500 font-bold">{title}</h2>
                    <div className=" pt-3 pb-6">
                        <Link to={'/admin/admin/list'} className=" bg-blue-500 text-base font-semibold me-2 text-white px-4 pb-2 pt-1 max-[575px]:px-2 max-[575px]:pb-1 max-[575px]:pt-0 max-[575px]:text-[13px] rounded-sm">Admin List ( {adminLists.length} )</Link>
                        <Link to={'/admin/user/list'} className=" bg-blue-500  max-[575px]:px-2 max-[575px]:pb-1 max-[575px]:pt-0 max-[575px]:text-[13px] text-base font-semibold text-white px-2 pb-2 pt-1 rounded-sm">User List ( {userLists.length} )</Link>
                    </div>
                    <div>
                        <div className=" overflow-auto">
                            <table className="border-collapse w-full font-sans">
                                <thead>
                                    <tr>
                                        <th className=" max-md:text-base  text-left border-2 p-3 text-gray-600">Name</th>
                                        <th className=" max-md:text-base  text-left border-2 p-3 text-gray-600">Email</th>
                                        <th className=" max-md:text-base  text-left border-2 p-3 text-gray-600">Phone</th>
                                        <th className=" max-md:text-base  text-left border-2 p-3 text-gray-600">Address</th>
                                        {
                                            selector == 'superadmin' && <th className=" max-md:text-base  text-left border-2 p-3 text-gray-600">Action</th>
                                        }
                                    </tr>
                                </thead>
                                {
                                    state == 'admin' ? adminLists && adminLists.map((item) => {
                                        return <tbody key={item._id}>
                                            <tr>
                                                <td className="max-md:text-lg    max-sm:text-base text-left text-xl border-2 p-2 text-gray-500">{item.name}</td>
                                                <td className="max-md:text-lg    max-sm:text-base text-left text-xl border-2 p-2 text-gray-500">{item.email}</td>
                                                <td className="max-md:text-lg    max-sm:text-base text-left text-xl border-2 p-2 text-gray-500">{item.phone}</td>
                                                <td className="max-md:text-lg    max-sm:text-base text-left text-xl border-2 p-2 text-gray-500">{item.address}</td>
                                                {
                                                    selector === 'superadmin' && <>
                                                        <td className="text-left max-[880px]:text-center border-2 p-3">
                                                            {
                                                                item.role === 'superadmin' ? "" : <div className='flex'>
                                                                    <i onClick={() => deleteHandler(item._id, item.role)} className="max-md:text-lg    max-sm:text-base text-left  fa-solid fa-trash text-lg cursor-pointer text-red-500 hover:text-red-300 duration-75"></i>
                                                                    <button onClick={() => roleChange(item._id, item.role)} className="  max-md:text-lg max-sm:text-base pl-5 hover:-translate-y-1 hidden duration-150 text-xl text-gray-500 max-[880px]:inline-block  hover:underline ps-2 hover:text-gray-400 ">
                                                                        <i className="fa-solid fa-arrow-down"></i>
                                                                    </button>
                                                                    <button onClick={() => roleChange(item._id, item.role)} className="max-[880px]:hidden text-gray-500  hover:underline ps-2 hover:text-gray-400 duration-75 max-md:text-lg    max-sm:text-base text-left text-xl ">{`Change to ${state != 'admin' ? "admin role" : "user role"}`}</button>
                                                                </div>
                                                            }
                                                        </td>
                                                    </>
                                                }
                                            </tr>
                                        </tbody>
                                    }) : userLists && userLists.map((item) => {
                                        return <tbody key={item._id}>
                                            <tr>
                                                <td className="max-md:text-lg  max-sm:text-base  text-left text-xl border-2 p-2 text-gray-500">{item.name}</td>
                                                <td className="max-md:text-lg   max-sm:text-base  text-left text-xl border-2 p-2 text-gray-500">{item.email}</td>
                                                <td className="max-md:text-lg   max-sm:text-base text-left text-xl border-2 p-2 text-gray-500">{item.phone}</td>
                                                <td className="max-md:text-lg  max-sm:text-base  text-left text-xl border-2 p-2 text-gray-500">{item.address}</td>
                                                {
                                                    selector === 'superadmin' && <>
                                                        <td className="text-left border-2 p-3">
                                                            {
                                                                item.role === 'superadmin' ? "" : <div className='flex'>
                                                                    <i onClick={() => deleteHandler(item._id, item.role)} className="max-md:text-lg  text-left  fa-solid fa-trash text-lg cursor-pointer text-red-500 hover:text-red-300 duration-75"></i>
                                                                    <button onClick={() => roleChange(item._id, item.role)} className=" max-md:text-lg pl-5 hover:-translate-y-1 hidden duration-150 text-xl text-gray-500 max-[830px]:inline-block  hover:underline ps-2 hover:text-gray-400 "><i className="fa-solid fa-arrow-up"></i> </button>
                                                                    <button onClick={() => roleChange(item._id, item.role)} className="max-[830px]:hidden text-gray-500  hover:underline ps-2 hover:text-gray-400 duration-75 max-md:text-lg  text-left text-xl">{`Change to ${state != 'admin' ? "admin role" : "user role"}`}</button></div>
                                                            }
                                                        </td>
                                                    </>
                                                }
                                            </tr>
                                        </tbody>
                                    })
                                }
                            </table>
                        </div>

                    </div>
                    {
                        state == 'admin' ? <>
                            {
                                adminCount > 8 && <div className="max-md:pb-10 pt-10 grid place-items-center text-center">
                                    <div className="max-md:gap-2 max-md:px-3 max-md:py-1 cursor-pointer flex items-center gap-4 rounded-sm bg-gray-100 px-5 py-2 ">
                                        <i onClick={() => setAdminPage(adminPage - 1)} className={`fa-solid fa-chevron-left max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}></i>
                                        <p onClick={() => { setAdminPage(1) }} className={` ${adminPage == 1 && 'bg-blue-500 text-white'} text-gray-500 select-none text-lg  px-[13px] pt-[3px] pb-[5px]  rounded-full max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}>1</p>
                                        <p onClick={() => { setAdminPage(2) }} className={` ${adminPage == 2 && 'bg-blue-500 text-white'} text-gray-500 select-none text-lg  px-[13px] pt-[3px] pb-[5px]  rounded-full max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}>2</p>
                                        {
                                            adminCount > 16 && <p onClick={() => { setAdminPage(3) }} className={` ${adminPage == 3 && 'bg-blue-500 text-white'} text-gray-500 select-none text-lg  px-[13px] pt-[3px] pb-[5px]  rounded-full max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}>3</p>
                                        }
                                        {
                                            adminCount > 24 && <p onClick={() => { setAdminPage(4) }} className={` ${adminPage == 4 && 'bg-blue-500 text-white'} text-gray-500 select-none text-lg  px-[13px] pt-[3px] pb-[5px]  rounded-full max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}>4</p>
                                        }
                                        <i onClick={() => setAdminPage(adminPage + 1)} className="  fa-solid fa-chevron-right max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] "></i>
                                    </div>
                                </div>
                            }
                        </> : <>
                            {
                                userCount > 8 && <div className="max-md:pb-10 pt-10 grid place-items-center text-center">
                                    <div className="max-md:gap-2 max-md:px-3 max-md:py-1 cursor-pointer flex items-center gap-4 rounded-sm bg-gray-100 px-5 py-2 ">
                                        <i onClick={() => setUserPage(userPage - 1)} className={`fa-solid fa-chevron-left max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}></i>
                                        <p onClick={() => { setUserPage(1) }} className={` ${userPage == 1 && 'bg-blue-500 text-white'} text-gray-500 select-none text-lg  px-[13px] pt-[3px] pb-[5px]  rounded-full max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}>1</p>
                                        <p onClick={() => { setUserPage(2) }} className={` ${userPage == 2 && 'bg-blue-500 text-white'} text-gray-500 select-none text-lg  px-[13px] pt-[3px] pb-[5px]  rounded-full max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}>2</p>
                                        {
                                            userCount > 16 && <p onClick={() => { setUserPage(3) }} className={` ${userPage == 3 && 'bg-blue-500 text-white'} text-gray-500 select-none text-lg  px-[13px] pt-[3px] pb-[5px]  rounded-full max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}>3</p>
                                        }
                                        {
                                            userCount > 24 && <p onClick={() => { setUserPage(4) }} className={` ${userPage == 4 && 'bg-blue-500 text-white'} text-gray-500 select-none text-lg  px-[13px] pt-[3px] pb-[5px]  rounded-full max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}>4</p>
                                        }
                                        <i onClick={() => setUserPage(userPage + 1)} className="  fa-solid fa-chevron-right max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] "></i>
                                    </div>
                                </div>
                            }
                        </>
                    }
                </div >
            }
        </>
    )
}

export default List