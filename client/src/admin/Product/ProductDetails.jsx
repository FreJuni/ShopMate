import { useEffect, useState } from "react"
import { deleteProduct, getProducts } from "../../apicalls/admin/product/product";
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import 'ldrs/ring'
import { dotSpinner } from 'ldrs'

const ProductDetails = () => {
    const [product, setProduct] = useState([]);
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

    const getAllProducts = async () => {
        setLoading(true);
        try {
            const response = await getProducts(page);

            if (!response.success) {
                throw new Error(response.message);
            }

            setCount(response.productCount);
            setProduct(response.productDoc);
        } catch (error) {
            errorAlert(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        getAllProducts();
    }, [page]);

    const deleteHandler = async (id) => {
        try {
            const response = await deleteProduct(id);

            if (!response.success) {
                throw new Error(response.message);
            }

            successAlert(response);
            getAllProducts();
        } catch (error) {
            errorAlert(error);
        }
    }

    return (
        <div className=" px-3">
            {
                loading ? <div className=" w-full h-[600px] grid place-items-center">
                    < l-dot-spinner
                        size="80"
                        speed="0.9"
                        color="#3B82F6"
                    ></l-dot-spinner >
                </div> : <>
                    <div className=" overflow-auto">
                        <table className="border-collapse w-full font-sans">
                            <thead>
                                <tr>
                                    <th className=" max-[550px]:w-40  max-md:text-sm text-left border-2 p-3 text-gray-600">Image</th>
                                    <th className=" max-md:text-sm text-left border-2 p-3 text-gray-600">Name</th>
                                    <th className=" max-md:text-sm text-left border-2 p-3 text-gray-600">Price</th>
                                    <th className=" max-md:text-sm text-center border-2 p-3 text-gray-600">Action</th>
                                </tr>
                            </thead>
                            {
                                product && product.map((item) => {
                                    return <tbody key={item._id}>
                                        <tr>
                                            <td className=" max-[550px]:w-[200px] max-[550px]:whitespace-nowrap  border-2 p-2 max-md:w-28  w-36 h-20 text-gray-500">
                                                <img className=" max-[550px]:w-[300px]  w-full h-full object-cover" src={item.image} alt="" />
                                            </td>
                                            <td className=" max-[550px]:whitespace-nowrap max-md:text-lg max-sm:text-base  text-left text-xl border-2 p-2 text-gray-500">
                                                {item.name}
                                            </td>
                                            <td className=" max-[550px]:whitespace-nowrap max-md:text-lg max-sm:text-base  text-left border-2 p-2 text-xl  text-gray-500">
                                                {item.price} MMK
                                            </td>
                                            <td className=" max-[550px]:whitespace-nowrap   border-2 p-2   text-gray-500  text-center">
                                                <div className=" max-sm:flex max-sm:justify-center max-sm:gap-1" >
                                                    <Link to={`/admin/product/info/${item._id}`} className=" pr-3 max-sm:pr-1 text-xl max-md:text-lg max-sm:text-base cursor-pointer hover:text-gray-400 duration-75">
                                                        <i className="fa-solid fa-eye"></i>
                                                    </Link>
                                                    <Link to={`/admin/edit/product/${item._id}`} className=" pr-3 text-xl max-sm:pr-1 max-md:text-lg max-sm:text-base text-green-500 cursor-pointer hover:text-green-400 duration-75">
                                                        <i className="fa-solid fa-pen-to-square"></i>
                                                    </Link>
                                                    <span onClick={() => deleteHandler(item._id)} className=" text-xl max-sm:pr-1 max-md:text-lg max-sm:text-base cursor-pointer text-red-500 hover:text-red-400">
                                                        <i className="fa-solid fa-trash"></i>
                                                    </span>
                                                </div>
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
                </>
            }


        </div >
    )
}

export default ProductDetails