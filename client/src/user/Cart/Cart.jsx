/* eslint-disable react/prop-types */
import { useState } from "react";
import Footer from "../Footer/Footer";
import Starter from "../Starter/Starter";
import { removeCart } from "../../apicalls/user/user";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { productAction } from "../../store/productSlice";
import { Link } from "react-router-dom";
import 'ldrs/ring';
import { dotSpinner } from 'ldrs';

const Cart = ({ Carts, cart, loading, setCar, setCart }) => {
    const dispatch = useDispatch();
    dotSpinner.register();

    const successAlert = (response) => {
        Swal.fire({
            title: 'Success!',
            text: response.message,
            icon: 'success',
            confirmButtonText: 'Cool'
        });
    };

    const errorAlert = (response) => {
        Swal.fire({
            title: 'Error!',
            text: response.message,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    };

    const increase = (ite) => {
        const cartArr = [...cart];
        const findByIndex = cart.findIndex((item) => item._id === ite._id);
        const filterProduct = cart.find((item) => item._id === ite._id);
        const update = { ...filterProduct, quantity: Number(filterProduct.quantity) + 1 };
        cartArr[findByIndex] = update;
        setCart(cartArr);
    };

    const decrease = (ite) => {
        const cartArr = [...cart];
        const findByIndex = cart.findIndex((item) => item._id === ite._id);
        const filterProduct = cart.find((item) => item._id === ite._id);
        const update = { ...filterProduct, quantity: Number(filterProduct.quantity) - 1 };
        cartArr[findByIndex] = update;
        setCart(cartArr);
    };

    const removeFormCartHandler = async (id) => {
        let random = Math.floor(Math.random() * 385948);
        try {
            const response = await removeCart(id);
            if (!response.success) {
                throw new Error(response.message);
            }
            Carts();
            successAlert(response);
        } catch (error) {
            errorAlert(error);
        }
        setCar(random);
    };

    const paymentHandler = () => {
        const orderCode = "TSK" + Math.floor(Math.random() * 234242343245);
        dispatch(productAction.setProduct(cart));
        dispatch(productAction.setOrderCode(orderCode));
    };

    let total = 0;
    cart && cart.forEach((item) => {
        total += Number(item.quantity) * item.product_id.price;
    });

    return (
        <>
            {loading ? (
                <div className="w-full h-[600px] grid place-items-center">
                    <l-dot-spinner size="80" speed="0.9" color="#3B82F6"></l-dot-spinner>
                </div>
            ) : (
                <div>
                    <Starter title={"Cart"} />
                    <div>
                        <div className="rounded-lg overflow-x-auto">
                            <table className="w-full table-fixed">
                                <thead>
                                    <tr>
                                        <th className="text-center w- max-[500px]:w-52 max-[720px]:p-2 max-[720px]:text-[.9rem]  max-[720px]:w-56 w-1/2 border-2 p-3 text-xl lg:text-2xl text-gray-600 max-[900px]:text-base whitespace-nowrap">PRODUCT</th>
                                        <th className="text-center max-[500px]:w-36 max-[720px]:p-2 max-[720px]:text-[.9rem] max-[720px]:w-40 w-2/6 border-2 p-3 text-xl lg:text-2xl text-gray-600 max-[900px]:text-base whitespace-nowrap">QUANTITY</th>
                                        <th className="text-center max-[500px]:w-36 max-[720px]:p-2 max-[720px]:text-[.9rem] max-[720px]:w-40 w-2/6 border-2 p-3 text-xl lg:text-2xl text-gray-600 max-[900px]:text-base whitespace-nowrap">SUBTOTAL</th>
                                        <th className="text-center max-[500px]:w-36 max-[720px]:p-2 max-[720px]:text-[.9rem] max-[720px]:w-40 mx-5 w-1/6 border-2 p-3 text-xl lg:text-2xl text-gray-600 max-[900px]:text-base whitespace-nowrap">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {cart && cart.map((item) => (
                                        <tr key={item._id} className="border-b-2">
                                            <td className=" max-[500px]:w-48 max-[720px]:w-40 py-3 whitespace-nowrap ">
                                                <div className="flex gap-2 items-center">
                                                    <img className="max-[720px]:h-14 max-[720px]:w-14 w-16 h-16 lg:w-20 lg:h-20 object-cover rounded-md" src={item.product_id.image} alt="" />
                                                    <div className="">
                                                        <h3 className="truncate text-base lg:text-lg text-gray-700">{item.product_id.name}</h3>
                                                        <p className="text-base lg:text-lg text-orange-500">{item.product_id.price} MMK</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-center py-3 whitespace-nowrap">
                                                <div className="flex justify-center gap-1 lg:gap-3 pt-2 lg:pt-4">
                                                    <button
                                                        onClick={() => decrease(item)}
                                                        className="border shadow-sm text-center font-bold pb-0.5 px-1 lg:px-[10px] pt-0.5 cursor-pointer select-none text-sm lg:text-xl rounded-full inline-block"
                                                    >
                                                        <i className="fa-solid fa-minus"></i>
                                                    </button>
                                                    <input
                                                        value={item.quantity}
                                                        onChange={(e) => e.target.value}
                                                        className="rounded-md w-6 lg:w-10 border outline-none px-1 lg:px-2 py-0.5 lg:py-1 text-sm lg:text-base"
                                                        type="text"
                                                    />
                                                    <button
                                                        onClick={() => increase(item)}
                                                        className="border shadow-sm text-center font-bold pb-0.5 px-1 lg:px-[10px] pt-0.5 cursor-pointer select-none text-sm lg:text-xl rounded-full inline-block"
                                                    >
                                                        <i className="fa-solid fa-plus"></i>
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="py-3 whitespace-nowrap text-lg lg:text-2xl text-center text-orange-500">{Number(item.quantity) * (item.product_id.price)} MMK</td>
                                            <td className="py-3 whitespace-nowrap text-center">
                                                <i onClick={() => removeFormCartHandler(item._id)} className="fa-solid text-red-500 cursor-pointer text-2xl lg:text-3xl fa-xmark"></i>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {cart.length > 0 && (
                            <div className="pt-5 flex justify-end">
                                <div className="border pt-4 px-6 py-6 rounded-md shadow-md w-96">
                                    <h1 className="max-sm:text-2xl font-thin text-3xl text-gray-700">CART TOTAL</h1>
                                    <div className="max-[450px]:gap-14 flex gap-24 pt-6 border-b-2 pb-3">
                                        <div>
                                            <p className="max-sm:text-lg text-xl text-wide font-light pb-1">SUBTOTAL:</p>
                                            <p className="max-sm:text-lg text-xl text-wide font-light pb-1">SHIPPING:</p>
                                        </div>
                                        <div>
                                            <p className="max-sm:text-lg text-xl text-wide font-medium text-orange-500 pb-1">{total} MMK</p>
                                            <p className="max-sm:text-lg text-xl text-wide font-medium text-orange-500 pb-1">400 MMK</p>
                                        </div>
                                    </div>
                                    <div className="max-[450px]:gap-20 flex gap-32 pt-2">
                                        <p className="max-sm:text-lg text-xl text-wide font-light pb-1">TOTAL:</p>
                                        <p className="max-sm:text-lg text-xl text-wide font-medium text-orange-500 pb-1">{total + 400} MMK</p>
                                    </div>
                                    <div className="pt-6 text-center">
                                        <Link to={'/user/confirm/payment'} onClick={paymentHandler} className="bg-orange-500 pt-1 hover:bg-gray-800 duration-200 pb-2 px-5 rounded-full text-white">CONFIRM PAYMENT</Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <Footer />
                </div>
            )}
        </>
    );
};

export default Cart;
