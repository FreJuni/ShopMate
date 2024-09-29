/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import { deletePayment, getPayments } from "../../../apicalls/admin/payment/payment";
import Swal from 'sweetalert2'
import PaymentForm from "./PaymentForm";
import 'ldrs/ring'
import { dotSpinner } from 'ldrs'

const PaymentCom = ({ title, state }) => {
    const [payments, setPayments] = useState([]);
    const [isChange, setIsChange] = useState('');
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
            title: 'Error!',
            text: response.message,
            icon: 'error',
            confirmButtonText: 'Cool'
        })
    }

    const getAllPayments = async () => {
        setLoading(true);
        try {
            const response = await getPayments();

            if (!response.success) {
                throw new Error(response.error);
            }
            setPayments(response.paymentDoc);

        } catch (error) {
            errorAlert(error)
        }
        setLoading(false);
    }

    useEffect(() => {
        getAllPayments();
        setIsChange('')
    }, [isChange]);

    const deleteHandler = async (id) => {
        try {
            const response = await deletePayment(id);

            if (!response.success) {
                throw new Error(response.message);
            }
            getAllPayments();
            successAlert(response);
        } catch (error) {
            errorAlert(error);
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
                </div> : <div className=" max-md:my-10 max-md:flex-col px-3 flex gap-5">
                    <div className=" max-md:w-full shadow-md w-1/3 p-5 rounded-md">
                        <PaymentForm setIsChange={setIsChange} title={title} state={state} />
                    </div>
                    <div className=" w-2/3 max-md:w-full">
                        <div className=" overflow-auto">
                            <table className="border-collapse w-full font-sans">
                                <thead>
                                    <tr>
                                        <th className="text-left  max-[530px]:whitespace-nowrap  max-sm:text-base  border-2 p-3 text-gray-600">Type</th>
                                        <th className="text-left max-[530px]:whitespace-nowrap  max-sm:text-base  border-2 p-3 text-gray-600">Account Name</th>
                                        <th className="text-left max-[530px]:whitespace-nowrap   max-sm:text-base border-2 p-3 text-gray-600">Account Number</th>
                                        <th className="text-left max-[530px]:whitespace-nowrap  max-sm:text-base  border-2 p-3 text-gray-600">Action</th>
                                    </tr>
                                </thead>
                                {
                                    payments && payments.map((item) => {
                                        return <tbody key={item._id}>
                                            <tr>
                                                <td className="text-left max-[530px]:whitespace-nowrap  border-2 p-3 text-gray-500">{item.payment_type}</td>
                                                <td className="text-left max-[530px]:whitespace-nowrap  border-2 p-3 text-gray-500">{item.account_name}</td>
                                                <td className="text-left  max-[530px]:whitespace-nowrap   border-2 p-3 text-gray-500">{item.account_number}</td>
                                                <td className="text-left max-[530px]:whitespace-nowrap max-[500px]:p-2 border-2 p-3">
                                                    <Link to={`/admin/edit/payment/${item._id}`}>
                                                        <i className="fa-solid fa-pen-to-square text-lg cursor-pointer text-green-500 hover:text-green-300 duration-75 "></i>
                                                    </Link>
                                                    <i onClick={() => deleteHandler(item._id)} className="fa-solid fa-trash text-lg cursor-pointer pl-4 text-red-500 hover:text-red-300 duration-75"></i>
                                                </td>
                                            </tr>
                                        </tbody>
                                    })
                                }
                            </table>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}

export default PaymentCom