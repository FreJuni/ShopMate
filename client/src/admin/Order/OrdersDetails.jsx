import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getOrderByOrderCode, getPayInformation } from "../../apicalls/admin/order/order";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import 'ldrs/ring'
import { dotSpinner } from 'ldrs'

const OrdersDetails = () => {
    const [orders, setOrders] = useState([]);
    const [pay, setPay] = useState();
    const { id } = useParams();
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

    const getOrders = async () => {
        try {
            const response = await getOrderByOrderCode(id);

            if (!response.success) {
                throw new Error(response.message);
            }

            setOrders(response.orderDoc);
        } catch (error) {
            errorAlert(error);
        }
    }

    const getPayInfo = async () => {
        setLoading(true);
        try {
            const response = await getPayInformation(id);

            if (!response.success) {
                throw new Error(response.message);
            }

            setPay(response.payDoc[0]);
        } catch (error) {
            errorAlert(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        getOrders();
        getPayInfo()
    }, []);

    let totalPrice = orders && orders.reduce((total, item) => {
        total += Number(item.quantity) * Number(item.product_id.price);

        return total;
    }, 0);

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

                    <div className=" max-xl:py-10">
                        <div className=" shadow-md p-6 rounded-md  max-w-[700px] mb-8">
                            <h2 className=" max-sm:text-xl text-2xl text-gray-600 font-bold pb-3">Payment Information</h2>

                            <div className=" max-[762px]:flex-wrap max-[762px]:justify-center  flex gap-10">
                                <div className="max-[762px]:w-full w-1/2" >
                                    {
                                        pay && <>
                                            <div className=" flex  gap-5">
                                                <h2 className="  max-md:text-base  text-gray-700 text-lg font-semibold pb-1">Name </h2>
                                                <p className="  max-md:text-base text-gray-700 text-lg font-semibold pb-1">: {pay.name}</p>
                                            </div>
                                            <div className=" flex gap-5">
                                                <h2 className="  max-md:text-base text-gray-700 text-lg font-semibold pb-1">Phone Number </h2>
                                                <p className="max-md:text-base text-gray-700 text-lg font-semibold pb-1">: {pay.phone}</p>
                                            </div>
                                            <div className=" flex gap-5">
                                                <h2 className="  max-md:text-base text-gray-700 text-lg font-semibold pb-1">Order Code </h2>
                                                <p className="  max-md:text-base text-gray-700 text-lg font-semibold pb-1">: {pay.order_code}</p>
                                            </div>
                                            <div className=" flex gap-5">
                                                <h2 className="  max-md:text-base text-gray-700 text-lg font-semibold pb-1">Total Price </h2>
                                                <p className="  max-md:text-base text-gray-700 text-lg font-semibold pb-1">: {totalPrice + 400} MMK</p>
                                            </div>
                                            <div className=" flex gap-5">
                                                <h2 className="  max-md:text-base text-gray-700 text-lg font-semibold pb-1">Status </h2>
                                                <p className="  max-md:text-base text-gray-700 text-lg font-semibold pb-1">: {pay.status == 0 ? "PENDING" : pay.status == 1 ? "DELIVERED" : "REJECT"}</p>
                                            </div>
                                            <div className=" flex gap-5">
                                                <h2 className="  max-md:text-base text-gray-700 text-lg font-semibold pb-1">Date </h2>
                                                <p className="  max-md:text-base text-gray-700 text-lg font-semibold pb-1">: {format(new Date(pay.createdAt), 'MM/dd/yyyy')}</p>
                                            </div>
                                            <button className=" pt-4">
                                                <Link to={'/admin/order'} className=" bg-blue-500 pb-1 px-3 rounded-md text-white ">Back</Link>
                                            </button>
                                        </>
                                    }
                                </div>
                                <div className="max-[762px]:w-full">
                                    {
                                        pay && <div >
                                            <img className=" max-[762px]:w-full max-[762px]:h-56 w-80 h-80  object-cover" src={pay.image} alt="" />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className=" overflow-auto">
                            <table className="border-collapse w-full font-sans">
                                <thead>
                                    <tr>
                                        <th className="  max-md:text-sm text-left border-2 p-3 text-gray-600">Image</th>
                                        <th className="  max-md:text-sm text-left border-2 p-3 text-gray-600">Name</th>
                                        <th className="  max-md:text-sm text-left border-2 p-3 text-gray-600">Quantity</th>
                                        <th className="  max-md:text-sm text-left border-2 p-3 text-gray-600">Price</th>
                                        <th className="  max-md:text-sm text-left border-2 p-3 text-gray-600">Total Price</th>
                                    </tr>
                                </thead>
                                {
                                    orders && orders.map((item) => {
                                        return <tbody key={item._id}>
                                            <tr>
                                                <td className="max-md:w-28 max-sm:w-20 text-left border-2 p-2 w-36 h-20 text-gray-500">
                                                    <img className="w-full h-full object-cover" src={item.product_id.image} alt="" />
                                                </td>
                                                <td className="max-md:text-lg max-sm:text-base max-[550px]:whitespace-nowrap text-left text-xl border-2 p-2 text-gray-500">
                                                    {item.product_id.name}
                                                </td>
                                                <td className="max-md:text-lg max-sm:text-base max-[550px]:whitespace-nowrap text-left text-xl border-2 p-2 text-gray-500">
                                                    {item.quantity}
                                                </td>
                                                <td className="max-md:text-lg max-sm:text-base max-[550px]:whitespace-nowrap text-left text-xl border-2 p-2 text-gray-500">
                                                    {item.product_id.price} MMK
                                                </td>
                                                <td className="max-md:text-lg max-sm:text-base max-[550px]:whitespace-nowrap text-left text-xl border-2 p-2 text-gray-500">
                                                    {item.product_id.price * item.quantity} MMK
                                                </td>
                                            </tr>
                                        </tbody>
                                    })
                                }
                            </table>

                        </div>
                    </div>

                </div >
            }
        </>
    )
}

export default OrdersDetails