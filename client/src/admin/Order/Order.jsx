import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { changeStatus, getOrders } from "../../apicalls/admin/order/order";
import { format } from 'date-fns';
import { Link } from 'react-router-dom'
import 'ldrs/ring'
import { dotSpinner } from 'ldrs'

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState();
    const [loading, setLoading] = useState(false);
    dotSpinner.register()

    const errorAlert = (response) => {
        Swal.fire({
            title: 'Error!',
            text: response.message,
            icon: 'error',
            confirmButtonText: 'Cool'
        })
    }

    const successAlert = (response) => {
        Swal.fire({
            title: 'Success!',
            text: response.message,
            icon: 'success',
            confirmButtonText: 'Cool'
        })
    }

    const getAllOrders = async () => {
        setLoading(true);
        try {
            const response = await getOrders(page);

            if (!response.success) {
                throw new Error(response.message);
            }

            setCount(response.orderCount);
            setOrders(response.payDoc);

        } catch (error) {
            errorAlert(error);
        }
        setLoading(false);
    }

    const onChangeHandler = async (value) => {
        try {

            const data = {
                status: value.e.target.value,
                id: value.id,
                orderCode: value.orderCode,
            }

            const response = await changeStatus(data);

            if (!response.success) {
                throw new Error(response.message);
            }

            getAllOrders();
        } catch (error) {
            errorAlert(error);
        }
    }

    useEffect(() => {
        getAllOrders();
    }, [page]);

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
                    <div className=" overflow-auto">
                        <table className="border-collapse w-full font-sans">
                            <thead>
                                <tr>
                                    <th className=" max-[550px]:w-20 whitespace-nowrap max-md:text-base text-left border-2 p-3 text-gray-600">User</th>
                                    <th className=" max-[550px]:w-20 whitespace-nowrap max-md:text-base text-left border-2 p-3 text-gray-600">Order Code</th>
                                    <th className=" max-[550px]:w-20 whitespace-nowrap max-md:text-base text-left border-2 p-3 text-gray-600">Date</th>
                                    <th className=" max-[550px]:w-20 whitespace-nowrap max-md:text-base text-left border-2 p-3 text-gray-600">Status</th>
                                    <th className=" max-[600px]:w-64  whitespace-nowrap max-md:text-base text-center border-2 p-3 text-gray-600">Action</th>
                                </tr>
                            </thead>
                            {
                                orders && orders.map((item) => {
                                    return <tbody key={item._id}>
                                        <tr>
                                            <td className=" max-[600px]:whitespace-nowrap  max-md:text-lg max-sm:text-base text-left border-2 p-2 text-xl  text-gray-500">{item.name}</td>
                                            <td className=" max-[600px]:whitespace-nowrap  max-md:text-lg max-[550px]:break-all max-sm:text-base text-left border-2 p-2 text-xl  text-gray-500"><Link className=" underline text-blue-400" to={`/admin/order/details/${item.order_code}`}>{item.order_code}</Link></td>
                                            <td className=" max-[600px]:whitespace-nowrap  max-md:text-lg max-[500px]:break-all max-sm:text-base text-left border-2 p-2 text-xl  text-gray-500">{format(new Date(item.createdAt), 'MM/dd/yyyy')}</td>
                                            <td className=" max-[600px]:whitespace-nowrap  max-md:text-lg max-sm:text-base text-left border-2 p-2 text-xl  text-gray-500">
                                                {
                                                    item.status == 0 ? <p>PENDING</p> : item.status == 1 ? <p className=" text-green-500">DELIVERED</p> : <p className=" text-red-500">REJECT</p>
                                                }
                                            </td>
                                            <td className=" max-[600px]:whitespace-nowrap  text-left border-2 py-1 px-3 w-36 h-20 text-gray-500">
                                                <select value={item.status} className="max-[600px]:w-28 w border  max-md:text-lg  max-sm:text-base text-xl rounded-md w-full text-center py-1" name="" id="" onChange={(e) => onChangeHandler({ e, id: item._id, orderCode: item.order_code })}>
                                                    <option className="  max-md:text-lg  max-sm:text-base text-left border-2 p-2 text-xl  text-gray-500" value='0'>PENDING</option>
                                                    <option className="  max-md:text-lg  max-sm:text-base text-left border-2 p-2 text-xl  text-gray-500" value='1'>DELIVERED</option>
                                                    <option className="  max-md:text-lg  max-sm:text-base text-left border-2 p-2 text-xl  text-gray-500" value="2">REJECT</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                })
                            }
                        </table>

                    </div>
                    {
                        count > 7 && <div className="max-md:pb-10 pt-10 grid place-items-center text-center">
                            <div className="max-md:gap-2 max-md:px-3 max-md:py-1 cursor-pointer flex items-center gap-4 rounded-sm bg-gray-100 px-5 py-2 ">
                                <i onClick={() => setPage(page - 1)} className={`fa-solid fa-chevron-left max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}></i>
                                <p onClick={() => { setPage(1) }} className={` ${page == 1 && 'bg-blue-500 text-white'} text-gray-500 select-none text-lg  px-[13px] pt-[3px] pb-[5px]  rounded-full max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}>1</p>
                                <p onClick={() => { setPage(2) }} className={` ${page == 2 && 'bg-blue-500 text-white'} text-gray-500 select-none text-lg  px-[13px] pt-[3px] pb-[5px]  rounded-full max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}>2</p>
                                {
                                    count > 14 && <p onClick={() => { setPage(3) }} className={` ${page == 3 && 'bg-blue-500 text-white'} text-gray-500 select-none text-lg  px-[13px] pt-[3px] pb-[5px]  rounded-full max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}>3</p>
                                }
                                {
                                    count > 21 && <p onClick={() => { setPage(4) }} className={` ${page == 4 && 'bg-blue-500 text-white'} text-gray-500 select-none text-lg  px-[13px] pt-[3px] pb-[5px]  rounded-full max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}>4</p>
                                }
                                <i onClick={() => setPage(page + 1)} className="  fa-solid fa-chevron-right max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] "></i>
                            </div>
                        </div>
                    }
                </div >
            }
        </>
    )
}

export default Order