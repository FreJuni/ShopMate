/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import defaultImage from '../../../../public/defaultImage/defaultImage.webp';
import { createProduct, getAllCategory, oldProduct, updateProduct } from '../../../apicalls/admin/product/product';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import 'ldrs/ring'
import { dotSpinner } from 'ldrs'

const ProductCom = ({ title, state, id }) => {
    const navigate = useNavigate();
    const elementRef = useRef();
    const imageConRef = useRef();
    const [condition, setCondition] = useState(true);
    const [image, setImage] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(false);
    const [dataInfo, setDataInfo] = useState({
        name: '',
        image: '',
        price: '',
        category: '',
        quantity: '',
        message: '',
    });
    dotSpinner.register();

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

    const onChangeHandler = (e) => {
        const imageToShow = e.target.files;
        setDataInfo({ ...dataInfo, image: 'choose' });
        setImage(imageToShow[0]);
        imageConRef.current.src = URL.createObjectURL(imageToShow[0]);
    }

    const getCategory = async () => {
        try {
            const response = await getAllCategory();
            if (!response.success) {
                throw new Error(response.message);
            }
            setCategories(response.categoryDoc);
        } catch (error) {
            errorAlert(error)
        }
    }

    const getOldProduct = async () => {
        setLoad(true);
        try {
            const response = await oldProduct(id);
            if (!response.success) {
                throw new Error(response.message);
            }

            if (response.oldProduct[0].image != null) {
                imageConRef.current.src = response.oldProduct[0].image;
            }

            setDataInfo({ name: response.oldProduct[0].name, image: 'choose', price: response.oldProduct[0].price, quantity: response.oldProduct[0].quantity, category: response.oldProduct[0].category._id, message: response.oldProduct[0].message })
        } catch (error) {
            // errorAlert(error)
        }
        setLoad(false);
    }

    useEffect(() => {
        getCategory();
        if (state == 'Update') {
            getOldProduct();
        }
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (dataInfo.name.trim() == '' || dataInfo.price.trim() == '' || dataInfo.category.trim() == '' || dataInfo.quantity.trim() == '' || dataInfo.message.trim() == '' || dataInfo.image.trim() == undefined) {
            setCondition(false);
        } else {
            setCondition(true);
            const formData = new FormData();

            formData.append('name', dataInfo.name);
            formData.append('price', dataInfo.price);
            formData.append('category', dataInfo.category);
            formData.append('quantity', dataInfo.quantity);
            formData.append('message', dataInfo.message);
            formData.append('image', image);

            let response;

            try {
                if (state == 'Create') {
                    response = await createProduct(formData);
                } else {
                    formData.append('productId', id);
                    response = await updateProduct(formData);
                }

                if (!response.success) {
                    throw new Error(response);
                }

                setDataInfo({ name: "", price: "", quantity: "", category: "", image: "", message: "" })
                if (state == 'Update') {
                    navigate('/admin/product/detail');
                }
                imageConRef.current.src = defaultImage;
                successAlert(response);
            } catch (error) {
                errorAlert(error);
            }
        }
        setLoading(false);
    }

    return (
        <>
            {
                load ? <div className=" w-full h-[600px] grid place-items-center">
                    < l-dot-spinner
                        size="80"
                        speed="0.9"
                        color="#3B82F6"
                    ></l-dot-spinner >
                </div > : <div className=' max-xl:my-10 max-sm:p-5  shadow-md p-10 rounded-sm w-5/5  mx-5 ' >
                    {
                        state == "Update" && <button type='button' onClick={() => navigate(-1)} className='hover:text-blue-400 duration-200 pb-3 text-2xl text-blue-500'><i className="fa-solid fa-arrow-left"></i></button>
                    }
                    <h2 className=' font-bold max-sm:text-lg text-xl text-gray-500'>{title}</h2>
                    <div className=' grid max-lg:grid-cols-1 max-sm:gap-3 gap-6 grid-cols-[330px_minmax(0,1fr)]  '>
                        <div className=' pt-6 '>
                            <div className='relative'>
                                {(condition === false && dataInfo.image.trim() === '') && (
                                    <span className='absolute -top-7 text-red-500 pb-2'>
                                        Image field is required*
                                    </span>
                                )}
                                <img
                                    ref={imageConRef}
                                    id='image'
                                    className='max-lg:!h-72 max-sm:!h-60  w-full object-cover border-[6px] border-gray-300 rounded-md'
                                    style={{ height: '370px' }}
                                    src={defaultImage}
                                    alt=""
                                />
                                <div className='absolute bottom-9 right-48 max-lg:inset-0 max-lg:relative'>
                                    <div
                                        onClick={() => {
                                            elementRef.current.click();
                                        }}
                                        className='absolute max-lg:relative max-lg:left-1/2 max-lg:top-1/2 max-lg:transform max-lg:-translate-x-1/2 max-lg:-translate-y-1/2 p-8 rounded-full w-10 h-10 text-center bg-blue-500 text-white cursor-pointer select-none'
                                    >
                                        <span className='absolute top-2 right-0 text-sm'>
                                            Add photo
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <input name='image' onChange={(event) => onChangeHandler(event)} ref={elementRef} type="file" hidden />
                        </div>
                        <div className=''>
                            <div className=' grid max-sm:grid-cols-1  grid-cols-2 gap-x-10 gap-y-3'>
                                <div className=''>
                                    <label htmlFor="Name" className=' font-semibold text-gray-500 pb-4'>Name</label>
                                    <input type="text" name='name' value={dataInfo.name} onChange={(e) => setDataInfo({ ...dataInfo, name: e.target.value })} className=" w-full py-2 px-3 outline-none border-2 rounded-md" placeholder="Name ..." />
                                    {
                                        (condition == false && dataInfo.name.trim() == '') && <span className='  text-red-500 pb-2'>Name field is required*</span>
                                    }
                                </div>
                                <div className=' '>
                                    <label htmlFor="Price" className=' font-semibold text-gray-500 pb-4'>Price</label>
                                    <input type="text" value={dataInfo.price} onChange={(e) => setDataInfo({ ...dataInfo, price: e.target.value })} className=" w-full py-2 px-3 outline-none border-2 rounded-md" name="price" id="" placeholder="Price ..." />
                                    {
                                        (condition == false && dataInfo.price.trim() == '') && <span className='  text-red-500 pb-2'>Price field is required*</span>
                                    }
                                </div>

                                <div className=''>
                                    <label htmlFor="Category" className=' font-semibold text-gray-500 pb-4'>Category</label>
                                    <div>
                                        <select value={dataInfo.category} onChange={(e) => setDataInfo({ ...dataInfo, category: e.target.value })} name="" id="" className=" w-full py-2 px-3 outline-none border-2 rounded-md">
                                            <option value="">Choose Category ...</option>
                                            {
                                                categories && categories.map((item) => {
                                                    return <option value={item._id} key={item._id}>{item.category}</option>
                                                })
                                            }
                                        </select>
                                        {
                                            (condition == false && dataInfo.category.trim() == '') && <span className='  text-red-500 pb-2'>Category field is required*</span>
                                        }
                                    </div>

                                </div>
                                <div className=' '>
                                    <label htmlFor="Quantity" className=' font-semibold text-gray-500 '>Quantity</label>
                                    <input type="text" value={dataInfo.quantity} onChange={(e) => setDataInfo({ ...dataInfo, quantity: e.target.value })} className=" w-full py-2 px-3 outline-none border-2 rounded-md" name="quantity" id="" placeholder="Quantity ..." />
                                    {
                                        (condition == false && dataInfo.quantity.trim() == '') && <span className='  text-red-500 pb-2'>Quantity field is required*</span>
                                    }
                                </div>
                            </div>
                            <div className=' pt-3'>
                                <div className=' pb-1'>
                                    <label htmlFor="Description" className=' font-semibold text-gray-500 '>Description</label>
                                </div>
                                <textarea onChange={(e) => setDataInfo({ ...dataInfo, message: e.target.value })} value={dataInfo.message} className=' border-2 outline-none resize-none w-full rounded-md p-3' placeholder='Description' name="description" rows={5} id=""></textarea>
                                {
                                    (condition == false && dataInfo.message.trim() == '') && <span className='  text-red-500 pb-2'>Message field is required*</span>
                                }
                                <button type='submit' disabled={loading} onClick={submitHandler} className=' mt-2 rounded-md  cursor-pointer max-sm:p-1 hover:shadow-sm duration-75 bg-blue-500 text-white w-full p-2 font-semibold text-lg'>{loading ? "Loading ..." : state}</button>
                            </div>
                        </div>
                    </div>
                </div >
            }
        </>


    )
}

export default ProductCom