import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Swal from 'sweetalert2'
import { getDetails } from "../../apicalls/admin/product/product";
import 'ldrs/ring'
import { dotSpinner } from 'ldrs'

const ProductInfo = () => {
    const { id } = useParams();
    const [product, setProduct] = useState();
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

    const getProductDetails = async () => {
        setLoading(true);
        try {
            const response = await getDetails(id);

            if (!response.success) {
                throw new Error(response.message);
            }

            setProduct(response.productDoc[0]);
        } catch (error) {
            errorAlert(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        getProductDetails();
    }, []);

    return (
        <>
            {
                loading ? <div className=" w-full h-[600px] grid place-items-center">
                    < l-dot-spinner
                        size="80"
                        speed="0.9"
                        color="#3B82F6"
                    ></l-dot-spinner >
                </div> : <>
                    {
                        product != undefined && (
                            <div className=' max-md:my-14 shadow-md p-10 rounded-sm w-5/5  mx-5 ' >
                                <h2 className=' font-bold text-xl text-gray-500'></h2>
                                <div className=' max-md:grid-cols-1 grid gap-6 grid-cols-[330px_minmax(0,1fr)]  '>
                                    <div className=' '>
                                        <div >
                                            <img id='image' src={product.image} className=' max-[500px]:!h-52 max-md:!h-64 w-full object-cover border-[6px] border-gray-300 rounded-md ' style={{ height: '370px' }} alt="" />
                                            <div className=' cursor-pointer select-none absolute -bottom-8 right-32'>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <h2 className=" max-md:text-xl text-2xl text-gray-600 font-bold">{product.name}</h2>
                                        <div className=" pt-3">
                                            <p className=" max-md:text-base text-lg text-gray-500">{product.message}</p>
                                        </div>
                                        <div className=" pt-3 max-[500px]:!gap-10  grid grid-cols-3">
                                            <div className="  font-semibold text-gray-600 ">
                                                <p>Price</p>
                                                <p className="max-md:text-base text-lg">{product.price} MMK</p>
                                            </div>
                                            <div className="  font-semibold text-gray-600 ">
                                                <p className=" max-[500px]:text-center">Category</p>
                                                <p className="max-md:text-base max-[500px]:text-center text-lg">{product.category.category} </p>
                                            </div>                        <div className="  font-semibold text-gray-600 ">
                                                <p className=" max-[500px]:text-center">Quantity</p>
                                                <p className="max-md:text-base max-[500px]:text-center text-lg">{product.quantity}</p>
                                            </div>

                                        </div>
                                        <button className=" pt-5">
                                            <Link className=" max-md:text-base bg-blue-500 text-white pb-1 px-3 font-semibold text-lg rounded-md" to={'/admin/product/detail'}>Back</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </>
            }
        </>
    )
}

export default ProductInfo