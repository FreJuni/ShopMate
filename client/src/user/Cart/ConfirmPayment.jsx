/* eslint-disable react/prop-types */
import { useSelector } from "react-redux"
import Footer from "../Footer/Footer"
import Starter from "../Starter/Starter"
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { payment } from "../../apicalls/user/user";
import { useNavigate } from "react-router-dom";

const ConfirmPayment = ({ setOrd }) => {
    const product = useSelector((state) => state);
    const [paymentMethod, setPaymentMethod] = useState([]);
    const [image, setImage] = useState(false);
    const [img, setImg] = useState();
    const imgRef = useRef();
    const [check, setCheck] = useState(true);
    const navigate = useNavigate();

    const [validate, setValidate] = useState({
        name: '',
        phone: '',
        image: '',
        paymentType: '',
    });

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

    const imageHandler = (e) => {

        if (imgRef.current) {
            const image = e.target.files;

            imgRef.current.src = URL.createObjectURL(image[0]);
            setImg(image[0]);
            setImage(true);
            setValidate({ ...validate, image: 'choose' });
        }
    }

    const getPaymentMethod = async () => {

        try {
            const response = await payment();

            if (!response.success) {
                throw new Error(response.message);
            }

            setPaymentMethod(response.paymentDoc);
            setValidate({ ...validate, paymentType: response.paymentDoc[0]._id })

        } catch (error) {
            errorAlert(error);
        }
    }

    let total = 0;

    {
        product.reducer.productInfo && product.reducer.productInfo.product.map((item) => {
            total += item.quantity * item.product_id.price;
        })
    }

    useEffect(() => {
        getPaymentMethod();
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            if (validate.name.trim() === '' || validate.phone.trim() === '' || !img) {
                setCheck(false);
            } else {
                // setLoading(true)
                const productArray = product.reducer.productInfo.product.map(product => ({
                    userId: product.user_id,
                    productId: product.product_id._id,
                    quantity: product.quantity,
                }));

                const body = {
                    products: productArray,
                    name: validate.name,
                    phone: validate.phone,
                    payment: validate.paymentType,
                    orderCode: product.reducer.productInfo.orderCode
                };

                const formData = new FormData();
                formData.append('name', body.name);
                formData.append('phone', body.phone);
                formData.append('orderCode', body.orderCode);
                formData.append('payment', body.payment);
                formData.append('products', JSON.stringify(body.products)); // Convert products array to JSON string
                formData.append('image', img); // Append image file

                const response = await fetch("http://localhost:3000/user/order/product", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const responseData = await response.json();

                if (!responseData.success) {
                    throw new Error(responseData.message);
                }
                let random = Math.floor(Math.random() * 343434);

                successAlert(responseData);
                // setLoading(false);
                setOrd(random);
                navigate('/user/order');
            }
        } catch (error) {
            errorAlert(error);
        }

    }

    useEffect(() => {

    }, [validate.name, validate.phone]);


    return (
        <div>
            <Starter title={"Confirm Payment"} />
            <form encType="multipart/form-data" className=" py-20 ">
                <div className=" p-8 rounded-md shadow-md ">
                    <h2 className=" pb-5 max-md:text-2xl text-3xl text-gray-8 font-light00 font-light">Payment Information Details</h2>
                    <div className=" max-[900px]:grid-cols-1 grid grid-cols-2 gap-10">
                        <div>
                            {
                                paymentMethod && paymentMethod.map((item) => {
                                    return <div key={item._id} className=" gap-7 flex border-b-2 pb-6 pt-2">
                                        <div>
                                            <h2 className=" max-md:text-lg text-xl text-gray-800 font-light">Payment Type :</h2>
                                            <h2 className=" max-md:text-lg text-xl text-gray-800 font-light">Account Name : </h2>
                                            <h2 className=" max-md:text-lg text-xl text-gray-800 font-light">Account Number :</h2>
                                        </div>
                                        <div>
                                            <p className=" max-md:text-lg text-xl text-gray-800 font-light">{item.payment_type}</p>
                                            <p className=" max-md:text-lg text-xl text-gray-800 font-light">{item.account_name}</p>
                                            <p className=" max-md:text-lg text-xl text-gray-800 font-light">{item.account_number}</p>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                        <div className=" max-[900px]:w-full ">
                            <div>
                                <label htmlFor="" className=" max-lg:text-base text-lg font-medium text-gray-700">Name</label>
                                <input value={validate.name} onChange={(e) => setValidate({ ...validate, name: e.target.value })} className=" w-full outline-none border rounded-md px-3 py-2" placeholder="Name ..." type="text" name="" id="" />
                                {
                                    (validate.name.trim() == '' && check == false) && <span className=" text-red-500">
                                        Name field is required*
                                    </span>
                                }
                            </div>
                            <div className=" pt-2">
                                <label className=" max-lg:text-base text-lg font-medium text-gray-700" htmlFor="">Phone Number</label>
                                <input onChange={(e) => setValidate({ ...validate, phone: e.target.value })} value={validate.phone} placeholder="Phone ..." className=" w-full outline-none border rounded-md px-3 py-2" type="text" name="" id="" />
                                {
                                    (validate.phone.trim() == '' && check == false) && <span className=" text-red-500">
                                        Phone field is required*
                                    </span>
                                }
                            </div>
                            <div className=" pt-2">
                                <label className=" max-lg:text-base text-lg font-medium text-gray-700" htmlFor="">Payment Method</label>
                                <select value={validate.paymentType} onChange={(e) => setValidate({ ...validate, paymentType: e.target.value })} className=" w-full outline-none border rounded-md px-3 py-2 text-center" name="" id="">
                                    {
                                        paymentMethod && paymentMethod.map((item) => {
                                            return <option value={item._id} key={item._id}>{item.payment_type}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className=" pt-2">
                                <label className=" max-lg:text-base text-lg font-medium text-gray-700" htmlFor="">Payslip Image</label>
                                <input onChange={(e) => imageHandler(e)} className=" w-full outline-none border rounded-md px-3 py-2 text-center" type="file" name="image" id="" />
                                {
                                    (validate.image == '' && check == false) && <span className=" text-red-500">
                                        Image field is required*
                                    </span>
                                }
                                <div className=" pt-2">
                                    <img ref={imgRef} className={`w-full ${image ? '' : 'hidden'} h-52 object-cover rounded-md`} src={''} alt="" />
                                </div>

                            </div>
                            <div className=" pt-5 flex gap-10">
                                <div className=" pb-2">
                                    <p className=" max-lg:text-base text-lg pb-2 font-medium text-gray-700">Order Code  </p>
                                    <p className=" max-lg:text-base text-lg font-medium text-gray-700">Total Amount </p>
                                </div>
                                <div>
                                    <p className=" max-lg:text-base text-lg font-medium pb-2 text-orange-500">: {product.reducer.productInfo.orderCode}</p>
                                    <p className=" text-lg font-medium text-orange-500">: {total + 400} MMK</p>                                </div>
                            </div>
                            <div className=" w-full pt-5">
                                <button type="submit" onClick={submitHandler} className=" w-full max-lg:text-base text-lg text-white bg-orange-500 hover:bg-gray-800 duration-200 rounded-sm pt-1 pb-2">ORDER PRODUCT</button>
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </form>
            <Footer />
        </div>
    )
}

export default ConfirmPayment