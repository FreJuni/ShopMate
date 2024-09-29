import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getSaleProduct } from "../../apicalls/admin/order/order";
import { format } from "date-fns";
import 'ldrs/ring'
import { dotSpinner } from 'ldrs'

const SaleInformation = () => {

    const [saleProduct, setSaleProduct] = useState([]);
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

    const getOrders = async () => {
        setLoading(true);
        try {
            const response = await getSaleProduct(page);

            if (!response.success) {
                throw new Error(response.message);
            }
            setCount(response.saleCount);
            setSaleProduct(response.saleDoc);
        } catch (error) {
            errorAlert(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        getOrders();
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
                    <div className=" max-xl:py-10">
                        <h2 className=" max-sm:text-xl text-2xl text-gray-600 font-bold pb-3">Product Sale Information</h2>
                        <div className=" overflow-auto">
                            <table className="border-collapse w-full font-sans">
                                <thead>
                                    <tr>
                                        <th className=" max-[630px]:w-20 whitespace-nowrap w-  max-md:text-sm   text-left border-2 p-3 text-gray-600">Image</th>
                                        <th className=" max-[630px]:w-28  whitespace-nowrap    max-md:text-sm text-left border-2 p-3 text-gray-600">Name</th>
                                        <th className=" max-[630px]:w-20 whitespace-nowrap    max-md:text-sm text-left border-2 p-3 text-gray-600">Quantity</th>
                                        <th className=" max-[630px]:w-20 whitespace-nowrap    max-md:text-sm text-left border-2 p-3 text-gray-600">Price</th>
                                        <th className=" max-[630px]:w-20 whitespace-nowrap    max-md:text-sm text-center border-2 p-3 text-gray-600">Total Price</th>
                                        <th className=" max-[630px]:w-20 whitespace-nowrap   max-md:text-sm text-center border-2 p-3 text-gray-600">Date</th>
                                    </tr>
                                </thead>
                                {
                                    saleProduct && saleProduct.map((item) => {
                                        return <tbody key={item._id}>
                                            <tr>
                                                <td className="max-md:w-28 max-sm:w-20 text-left border-2 p-2 w-36 h-20 text-gray-500">
                                                    <img className="w-full h-full object-cover" src={item.product_id.image} alt="" />
                                                </td>
                                                <td className=" max-[630px]:w-28 max-[630px]:whitespace-nowrap max-md:text-lg   max-sm:text-base text-left text-xl border-2 p-2 text-gray-500">
                                                    {item.product_id.name}
                                                </td>
                                                <td className="  max-md:text-lg max-sm:text-base text-left border-2 p-2  text-gray-500 text-xl">
                                                    {item.quantity}
                                                </td>
                                                <td className=" max-[630px]:whitespace-nowrap   max-md:text-lg max-sm:text-base  border-2 p-2  text-gray-500 text-left text-xl">
                                                    {item.product_id.price} MMK
                                                </td>
                                                <td className=" max-[630px]:whitespace-nowrap   max-md:text-lg max-sm:text-base  border-2 p-2  text-gray-500 text-center text-xl">
                                                    {item.product_id.price * item.quantity} MMK
                                                </td>
                                                <td className="  max-md:text-lg max-sm:text-base text-xl text-center border-2 p-2 text-gray-500">
                                                    <p className="">
                                                        {format(new Date(item.createdAt), 'MM/dd/yyyy')}
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    })
                                }
                            </table>
                        </div>

                        {
                            count > 6 && <div className="max-md:pb-10 pt-10 grid place-items-center text-center">
                                <div className="max-md:gap-2 max-md:px-3 max-md:py-1 cursor-pointer flex items-center gap-4 rounded-sm bg-gray-100 px-5 py-2 ">
                                    <i onClick={() => setPage(page - 1)} className={`fa-solid fa-chevron-left max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}></i>
                                    <p onClick={() => { setPage(1) }} className={` ${page == 1 && 'bg-blue-500 text-white'} text-gray-500 select-none text-lg  px-[13px] pt-[3px] pb-[5px]  rounded-full max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}>1</p>
                                    <p onClick={() => { setPage(2) }} className={` ${page == 2 && 'bg-blue-500 text-white'} text-gray-500 select-none text-lg  px-[13px] pt-[3px] pb-[5px]  rounded-full max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}>2</p>
                                    {
                                        count > 12 && <p onClick={() => { setPage(3) }} className={` ${page == 3 && 'bg-blue-500 text-white'} text-gray-500 select-none text-lg  px-[13px] pt-[3px] pb-[5px]  rounded-full max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}>3</p>
                                    }
                                    {
                                        count > 18 && <p onClick={() => { setPage(4) }} className={` ${page == 4 && 'bg-blue-500 text-white'} text-gray-500 select-none text-lg  px-[13px] pt-[3px] pb-[5px]  rounded-full max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}>4</p>
                                    }
                                    <i onClick={() => setPage(page + 1)} className="  fa-solid fa-chevron-right max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] "></i>
                                </div>
                            </div>
                        }
                    </div>
                </div >
            }
        </>

    )
}

export default SaleInformation