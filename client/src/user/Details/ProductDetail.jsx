/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom"
import Starter from "../Starter/Starter";
import Footer from '../Footer/Footer'
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { addToCart, getRate, getReviews, productInfo, rateProduct, reviewProduct } from "../../apicalls/user/user";
import DefaultProfile from '../../../public/defaultProfile/defaultProfile.jpg';
import 'ldrs/ring'
import { dotSpinner } from 'ldrs'

const ProductDetail = ({ setCar }) => {
    const { id } = useParams();

    const [input, setInput] = useState(1);
    const [show, setShow] = useState(0);
    const [hover, setHover] = useState(0);
    const [validate, setValidate] = useState(false);
    const [rev, setRev] = useState(false);
    const [product, setProduct] = useState();
    const [message, setMessage] = useState('');
    const [review, setReview] = useState('');
    const [isShow, setIsShow] = useState(false);
    const [rate, setRate] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [avgRage, setAvgRate] = useState(0);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.reducer.userInfo.user);
    dotSpinner.register();

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


    const submitHandler = async () => {
        try {
            if (message.trim() == '') {
                setValidate(true);
            } else {
                const data = {
                    userId: user.userId,
                    productId: id,
                    message: message,
                }

                const response = await reviewProduct(data);

                if (!response.success) {
                    throw new Error(response.message);
                }

                successAlert(response);
                setMessage('');
                setShow(0);
                setHover(0);
                Review();
            }
        } catch (error) {
            errorAlert(error);
        }
    }

    const Review = async () => {
        try {
            const response = await getReviews(id);

            if (!response.success) {
                throw new Error(response.message);
            }

            setReviews(response.reviewDoc);

        } catch (error) {
            // errorAlert(error);
        }
    }

    const Rate = async () => {
        try {
            const response = await getRate(id);

            if (!response.success) {
                throw new Error(response.message);
            }

            if (response.rateDoc.length > 0) {
                setReview(response.rateDoc[0].message);
                setReview(response.rateDoc[0].message);
                setRate(response.rateDoc[0].rate)
            }
            setAvgRate(response.averageRate);
        } catch (error) {
            // errorAlert(error);
        }
    }

    const rateHandler = async () => {
        try {
            if (review.trim() == '') {
                setValidate(true);
                setRev(true);
            }
            else {
                const data = {
                    userId: user.userId,
                    productId: id,
                    rate: rate,
                    message: review,
                }

                const response = await rateProduct(data);

                if (!response.success) {
                    throw new Error(response.message);
                }

                successAlert(response);
                setReview('');
                setRate(1);
                setIsShow(false);

            }
            productDetail();
            Rate();
        } catch (error) {
            errorAlert(error);
        }
    }

    const productDetail = async () => {
        setLoading(true);
        try {
            const response = await productInfo(id);
            if (!response.success) {
                throw new Error(response.message);
            }

            setProduct(response.productDoc);
        } catch (error) {
            errorAlert(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        productDetail();
        Rate();
        Review();
    }, []);


    useEffect(() => {
        setValidate(false);
    }, [message, review]);

    const array = [];
    const arr = [];

    for (let i = 0; i < avgRage; i++) {
        array.push(i);
    }

    for (let i = avgRage + 1; i < 6; i++) {
        arr.push(i);
    }

    const addToCartHandler = async () => {
        let random = Math.floor(Math.random() * 385948);
        try {
            const data = {
                productId: id,
                userId: user.userId,
                quantity: input,
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

    return (
        <>
            {
                loading ? <div className=" w-full h-[600px] grid place-items-center">
                    < l-dot-spinner
                        size="80"
                        speed="0.9"
                        color="#3B82F6"
                    ></l-dot-spinner >
                </div> : product && <div>
                    <Starter title={'Shop Detail'} />
                    <div className=" max-[950px]:grid-cols-1 grid grid-cols-2 gap-5 py-10">
                        <div className="max-[950px]:w-full max-[950px]:inline-block flex items-center justify-center">
                            <img className=" max-[500px]:h-[300px] object-cover max-[950px]:h-[350px] max-[950px]:w-full w-[500px] h-[500px] rounded-md" src={product[0].image} alt="" />
                        </div>
                        <div>
                            <div>
                                <h1 className=" max-[500px]:text-3xl max-md:text-4xl text-5xl tracking-widest text-gray-800">{product[0].name}</h1>
                                <p className=" max-[500px]:text-xl max-md:text-2xl text-3xl py-4 text-orange-500">4040.09 MMK</p>
                                <div>
                                    {
                                        array && array.map((index) => {
                                            return <i key={index} className=" max-md:text-[.9rem] fa-solid fa-star text-orange-500 pl-1"></i>
                                        })
                                    }
                                    {
                                        arr && arr.map((index) => {
                                            return <i key={index} className=" max-md:text-[.9rem] fa-solid fa-star text-gray-500 pl-1"></i>
                                        })
                                    }
                                </div>
                                <p className=" max-md:text-lg text-gray-500 py-4 text-xl font-lighter">{product[0].message}</p>
                                <div className=" flex gap-3 pt-4">
                                    <p onClick={() => setInput(input - 1)} className="  border shadow-sm text-center font-bold pb-1 px-[10px] pt-1 cursor-pointer select-none text-xl max-md:text-lg  rounded-full inline-block">
                                        <i className="fa-solid fa-minus"></i>
                                    </p>
                                    <input value={input} onChange={(e) => setInput(e.target.value)} className=" rounded-md w-10 border outline-none px-2 py-1" type="text" />
                                    <p onClick={() => setInput(input + 1)} className=" border shadow-sm text-center font-bold pb-1 px-[10px] pt-1 cursor-pointer select-none text-xl max-md:text-lg  rounded-full inline-block">
                                        <i className="fa-solid fa-plus"></i>
                                    </p>
                                </div>
                                <div className=" pt-9">
                                    <button onClick={addToCartHandler} className=" px-5 pt-1 pb-[6px] hover:bg-orange-500 duration-200 rounded-full border text-gray-500 hover:text-white border-orange-500 cursor-pointer ">ADD TO CART</button>
                                </div>
                                <div className=" pt-9">
                                    <button onClick={() => setIsShow(!isShow)} className=" px-5 pt-1 pb-[6px] hover:bg-gray-500 duration-200 rounded-md bg-orange-500 text-white border-orange-500 cursor-pointer ">Rage this product</button>
                                    {
                                        isShow && <div>
                                            <div className="  py-5">
                                                <select value={rate} onChange={(e) => setRate(e.target.value)} className=" border outline-none rounded-md w-80 text-center py-1" name="" id="">
                                                    <option value="1">Star 1</option>
                                                    <option value="2">Star 2</option>
                                                    <option value="3">Star 3</option>
                                                    <option value="4">Star 4</option>
                                                    <option value="5">Star 5</option>
                                                </select>
                                            </div>
                                            <textarea value={review} onChange={(e) => setReview(e.target.value)} name="" id="" className=" w-80 h-32 outline-none border p-2 rounded-md resize-none " placeholder="Message ...">

                                            </textarea>
                                            {
                                                rev && <p className=" text-red-500">Message field is required*</p>
                                            }
                                            <div className=" pt-4">
                                                <button onClick={rateHandler} className=" bg-orange-500 px-6 text-lg pt-1 pb-2 max-md:pb-1 max-md:pt-[1px]  rounded-full text-white">Submit</button>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=" py-20">
                        <div className=" flex gap-5">
                            <h1 onClick={() => { setShow(0); setHover(0) }} className={` max-md:text-xl text-2xl text-gray-500 font-light ${hover == 0 ? 'text-orange-500 ' : 'hover:text-orange-500 duration-200'} cursor-pointer select-none tracking-widest`}>DESCRIPTION</h1>
                            <h1 onClick={() => { setShow(1); setHover(1) }} className={`max-md:text-xl text-2xl text-gray-500 font-light ${hover == 1 ? 'text-orange-500 ' : 'hover:text-orange-500 duration-200'} cursor-pointer select-none tracking-widest`}>REVIEWS</h1>
                        </div>
                        <div className=" pt-4">
                            {
                                show == 0 && <div >
                                    <h2 className=" text-xl tracking-wider font-lighter text-gray-700">Product Description</h2>
                                    <p className=" max-md:text-base text-xl text-gray-500 font-light">
                                        {product[0].message}
                                    </p>
                                </div>
                            }
                            {
                                show == 1 && <>

                                    {
                                        reviews && reviews.map((item) => {
                                            return <div key={item._id} className=" max-sm:gap-3 max-sm:flex-col flex gap-5 pb-5">
                                                {
                                                    item.user_id.image == null ? <img className=" max-sm:h-20 max-lg:h-24 h-28  max-sm:w-20 rounded-md w-28" src={DefaultProfile} alt="" /> : <img className="max-sm:h-20 max-lg:h-24 h-28   max-sm:w-20 rounded-md w-28" src={item.user_id.image} alt="" />
                                                }
                                                <div>
                                                    <div className="">
                                                        <h2 className=" max-md:text-lg text-xl  font-semibold">{item.user_id.name}</h2>
                                                    </div>
                                                    <p className=" max-md:text-base text-lg text-gray-500">
                                                        {item.message}
                                                    </p>
                                                </div>
                                            </div>
                                        })
                                    }
                                    <div className=" pt-5">
                                        <div className=" max-sm:flex-col flex gap-5">
                                            <input disabled value={user.userName} className=" border outline-none max-sm:w-full px-5 py-3 w-96 rounded-md" type="text" name="" id="" />
                                            <input disabled value={user.userEmail} className=" border outline-none px-5  max-sm:w-full py-3 w-96 rounded-md" type="text" name="" id="" />
                                        </div>
                                        <div className=" max-w-[790px] pt-5">
                                            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message ..." className=" w-full py-3 px-5 h-44 outline-none rounded-md resize-none border " name="" id=""></textarea>
                                            {
                                                validate && <p className=" text-red-500">Message field is required*</p>
                                            }
                                        </div>
                                        <div className=" pt-4">
                                            <button onClick={submitHandler} className=" pt-2 pb-3 text-lg text-gray-600  px-5 border border-orange-500 hover:text-white hover:bg-orange-500 duration-200 rounded-full">Post Comment</button>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                    <Footer />
                </div>
            }
        </>
    )
}

export default ProductDetail