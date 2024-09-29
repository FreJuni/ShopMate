/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { getOldPayment, paymentCreate, paymentUpdate } from "../../../apicalls/admin/payment/payment";
import Swal from 'sweetalert2'

const PaymentForm = ({ title, state, id, setIsChange }) => {

    const [payment, setPayment] = useState('');
    const [accountName, setAccountName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [checkValidate, setCheckValidate] = useState(true);
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);

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

    const submitHandler = async () => {
        setLoading(true);
        if (payment.trim() == '' || accountName.trim() == '' || accountNumber.trim() == '') {
            setCheckValidate(false);
        } else {
            const data = {
                payment: payment,
                accountName: accountName,
                accountNumber: accountNumber,
                id: id
            };

            try {
                let response;

                if (state == 'Create') {
                    response = await paymentCreate(data);

                    if (!response.success) {
                        throw new Error(response.message);
                    }
                    successAlert(response);
                    setIsChange('change');

                } else {
                    response = await paymentUpdate(data);

                    if (response.success) {
                        successAlert(response);
                        navigate('/admin/payment');
                    }
                }

                setPayment('')
                setAccountName('')
                setAccountNumber('')

            } catch (error) {
                errorAlert(error);
            }
        }
        setLoading(false);
    }

    const getOldPaymentInfo = async () => {
        setLoad(true);

        try {
            const response = await getOldPayment(id);

            if (!response.success) {
                throw new Error(response.message);
            }
            setPayment(response.paymentDoc[0].payment_type)
            setAccountName(response.paymentDoc[0].account_name)
            setAccountNumber(response.paymentDoc[0].account_number)
        } catch (error) {
            errorAlert(error);
        }
        setLoad(false);
    }

    useEffect(() => {
        if (state == 'Update') {
            getOldPaymentInfo();
        }
    }, []);

    return (
        <>
            {
                state == "Update" ?

                    load ? <div className=" w-full h-[600px] grid place-items-center">
                        < l-dot-spinner
                            size="80"
                            speed="0.9"
                            color="#3B82F6"
                        ></l-dot-spinner >
                    </div > : <div className="  grid place-items-center">
                        <div className="shadow-md w-[450px] max-sm:w-[300px] max-md:w-[400px] p-5 rounded-md ">
                            <div className=" flex justify-between items-center">
                                <h2 className=" text-lg font-semibold text-gray-500 ">{title}</h2>
                                {
                                    state == 'Update' && <Link className=" text-blue-500 hover:underline" to={'/admin/payment'}>
                                        Back
                                    </Link>
                                }
                            </div>
                            <div className=" pt-4">
                                <div>
                                    <div className="pb-4">
                                        <input type="text" value={payment} onChange={(e) => setPayment(e.target.value)} className=" w-full  max-sm:text-sm py-2 px-3 outline-none border-2 rounded-md" name="" id="" placeholder="Payment Type ..." />
                                        {
                                            (checkValidate == false && payment.trim() == '') && <span className=" text-red-500  max-sm:text-sm">Payment field is required*</span>
                                        }
                                    </div>

                                    <div className="pb-4">
                                        <input type="text" value={accountName} onChange={(e) => setAccountName(e.target.value)} className=" w-full  max-sm:text-sm py-2 px-3 outline-none border-2 rounded-md" name="" id="" placeholder="Account Name ..." />
                                        {
                                            (checkValidate == false && accountName.trim() == '') && <span className=" text-red-500  max-sm:text-sm">Account Name field is required*</span>
                                        }
                                    </div>

                                    <div className="pb-4">
                                        <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className=" w-full  max-sm:text-sm py-2 px-3 outline-none border-2 rounded-md" name="" id="" placeholder="Account Number ..." />
                                        {
                                            (checkValidate == false && accountNumber.trim() == '') && <span className=" text-red-500  max-sm:text-sm">Account Number field is required*</span>
                                        }
                                    </div>
                                    <div className=" pt-3">
                                        <button onClick={submitHandler} disabled={loading} className="  pt-[1px] pb-1 px-3 rounded-md bg-blue-500 text-white   max-sm:text-[15px]  cursor-pointer text-lg ">{loading ? "Loading ..." : state}</button>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <>
                        <div className=" flex justify-between items-center">
                            <h2 className=" text-lg font-semibold text-gray-500 ">{title}</h2>
                            {
                                state == 'Update' && <Link className=" text-blue-500 hover:underline" to={'/admin/payment'}>
                                    Back
                                </Link>
                            }
                        </div>
                        <div className=" pt-4">
                            <div>
                                <div className="pb-4">
                                    <input type="text" value={payment} onChange={(e) => setPayment(e.target.value)} className=" max-sm:text-sm w-full py-2 px-3 outline-none border-2 rounded-md" name="" id="" placeholder="Payment Type ..." />
                                    {
                                        (checkValidate == false && payment.trim() == '') && <span className=" text-red-500 max-sm:text-sm">Payment field is required*</span>
                                    }
                                </div>

                                <div className="pb-4">
                                    <input type="text" value={accountName} onChange={(e) => setAccountName(e.target.value)} className=" w-full  max-sm:text-sm py-2 px-3 outline-none border-2 rounded-md" name="" id="" placeholder="Account Name ..." />
                                    {
                                        (checkValidate == false && accountName.trim() == '') && <span className=" text-red-500 max-sm:text-sm">Account Name field is required*</span>
                                    }
                                </div>

                                <div className="pb-4">
                                    <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className=" w-full  max-sm:text-sm py-2 px-3 outline-none border-2 rounded-md" name="" id="" placeholder="Account Number ..." />
                                    {
                                        (checkValidate == false && accountNumber.trim() == '') && <span className=" text-red-500 max-sm:text-sm">Account Number field is required*</span>
                                    }
                                </div>
                                <div className=" pt-3">
                                    <button onClick={submitHandler} disabled={loading} className="  pt-[1px] pb-1 px-3 rounded-md bg-blue-500 text-white    max-sm:text-[15px] cursor-pointer text-lg ">{loading ? "Loading ..." : state}</button>
                                </div>
                                <div>

                                </div>
                            </div>
                        </div></>
            }
        </>
    )
}

export default PaymentForm