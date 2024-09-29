/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import Footer from "../Footer/Footer"
import Starter from "../Starter/Starter"
import Swal from "sweetalert2"
import { addToCart, removeFavorite } from "../../apicalls/user/user"
import { useSelector } from "react-redux"
import 'ldrs/ring'
import { dotSpinner } from 'ldrs'

const Favorite = ({ favorite, Loading, setFav, setCar }) => {
    const user = useSelector((state) => state.reducer.userInfo.user);
    dotSpinner.register();

    const successAlert = (response) => {
        Swal.fire({
            title: 'Success!',
            text: response.message,
            icon: 'success',
            confirmButtonText: 'Cool'
        })
    }

    const addToCartHandler = async (id) => {
        let random = Math.floor(Math.random() * 385948);
        try {
            const data = {
                productId: id,
                userId: user.userId,
                quantity: 1,
            }
            const response = await addToCart(data);

            if (!response.success) {
                throw new Error(response.message)
            }

            successAlert(response);
        } catch (error) {
            errorAlert(error);
        }
        setCar(random);
    }



    const errorAlert = (response) => {
        Swal.fire({
            title: 'Error!',
            text: response.message,
            icon: 'error',
            confirmButtonText: 'Cool'
        })
    }

    const removeFromFavorite = async (id) => {
        let random = Math.floor(Math.random() * 385948);

        try {
            const response = await removeFavorite(id);

            if (!response.success) {
                throw new Error(response.message);
            }

            successAlert(response);
            setFav(random);

        } catch (error) {
            errorAlert(error);
        }
    }

    return (
        <>
            {
                Loading ? <div className=" w-full h-[600px] grid place-items-center">
                    < l-dot-spinner
                        size="80"
                        speed="0.9"
                        color="#3B82F6"
                    ></l-dot-spinner >
                </div> : <div>
                    <Starter title={"Favorite"} />
                    <div className="  ">
                        {
                            favorite.length == 0 && <div className=" pt-10 text-center">
                                <h1 className=" text-2xl text-gray-600">OOPS! No Product Found!</h1>
                            </div>
                        }
                        <div className=" max-lg:grid-cols-3 max-[550px]:grid-cols-1 max-md:grid-cols-2 grid grid-cols-4 gap-5 py-4">
                            {
                                favorite && favorite.map((item) => {
                                    return <div key={item._id} className=" shadow-md p-1 rounded-md ">
                                        <div className="relative overflow-hidden">
                                            <Link className=" " to={`/user/product/detail/${item.product_id._id}`}>
                                                <img className='w-full hover:scale-125 duration-150 object-cover rounded-md h-[150px] ' src={item.product_id.image} alt="" />
                                            </Link>
                                            <i onClick={() => removeFromFavorite(item._id)} className="max-[850px]:text-2xl absolute top-1 cursor-pointer right-3 z-50 fa-solid fa-eraser hover:text-orange-400 duration-200 text-3xl text-orange-500"></i>
                                        </div>
                                        <div className=" pt-3 px-2">
                                            <Link to={`/user/product/detail/${item.product_id._id}`}>
                                                <h1 className="max-[850px]:text-xl select-none text-2xl hover:text-orange-500 duration-200 text-gray-600 font-semibold cursor-pointer">{item.product_id.name}</h1>
                                            </Link>
                                            <p className="max-[850px]:text-[1.1rem] text-lg text-gray-500 pt-1">{item.product_id.message.slice(0, 46)}...</p>
                                            <div className=" py-3 text-center">
                                                <button onClick={() => addToCartHandler(item.product_id)} className=" px-5 pt-1 pb-[6px] hover:bg-orange-500 duration-200 rounded-full border text-gray-500 hover:text-white border-orange-500 cursor-pointer ">ADD TO CART</button>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <Footer />
                </div>
            }
        </>
    )
}

export default Favorite