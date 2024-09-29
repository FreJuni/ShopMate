/* eslint-disable react/prop-types */
import 'react-multi-carousel/lib/styles.css';
import ReviewCarousel from "../Carosel/ReviewCarousel";
import HomeSlider from "../Carosel/HomeSlider";
import BestSellingCarousel from "../Carosel/BestSellingCarousel";
import { useEffect, useState } from 'react';
import { addToCart, categories, findByCategory, products } from '../../apicalls/user/user';
import Swal from 'sweetalert2'
import Footer from '../Footer/Footer';
import { getUsers } from '../../apicalls/admin/list/list';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'ldrs/ring'
import { dotSpinner } from 'ldrs'


const Index = ({ setCar, setNav }) => {
    const [product, setProduct] = useState([]);
    const [user, setUser] = useState([]);
    const [category, setCategory] = useState([]);
    const [hover, setHover] = useState(0);
    const [toShow, setToShow] = useState([]);
    const [loading, setLoading] = useState(false);
    const users = useSelector((state) => state.reducer.userInfo.user);
    dotSpinner.register()

    const productToShow = () => {
        const toShowProduct = product && product.slice(0, 4);
        setToShow(toShowProduct);
    }

    useEffect(() => {
        productToShow();
    }, [product]);

    const getAllUsers = async () => {
        try {
            const response = await getUsers();

            if (!response.success) {
                throw new Error(response.message);
            }

            setUser(response.userDoc);

        } catch (error) {
            errorAlert(error);
        }
    }

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

    const getAllProducts = async () => {
        setLoading(true);
        try {
            const response = await products();

            if (!response.success) {
                throw new Error(response.message);
            }

            setProduct(response.productsDoc);

        } catch (error) {
            errorAlert(error);
        }
        setLoading(false);
    }

    const getAllCategory = async () => {
        try {
            const response = await categories();

            if (!response.success) {
                throw new Error(response.message);
            }

            setCategory(response.categoryDoc);

        } catch (error) {
            errorAlert(error);
        }
    }

    useEffect(() => {
        getAllProducts();
        getAllCategory();
        getAllUsers();
    }, []);


    const onClickHandler = async (para) => {
        try {
            setHover(para.index + 1)
            const response = await findByCategory(para.id);

            if (!response.success) {
                throw new Error(response.message)
            }

            setToShow(response.productsDoc);
        } catch (error) {
            errorAlert(error);
        }
    }

    const addToCartHandler = async (id) => {

        let random = Math.floor(Math.random() * 385948);
        try {
            const data = {
                productId: id,
                userId: users.userId,
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

    return (
        <>
            {
                loading ? <div className=" w-full h-[600px] grid place-items-center">
                    < l-dot-spinner
                        size="80"
                        speed="0.9"
                        color="#3B82F6"
                    ></l-dot-spinner >
                </div> : <div>
                    <div className=" h-[500px]">
                        <HomeSlider setNav={setNav} product={product} />
                    </div>

                    {/* some information */}
                    <div className=" max-sm:mt-20 max-sm:pb-14 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 grid grid-cols-4 gap-7 pt-52 pb-20">
                        <div className=" flex gap-3">
                            <p>
                                <i className="max-sm:text-2xl text-orange-500 text-3xl fa-solid fa-cart-plus"></i></p>
                            <div>
                                <h2 className='max-sm:text-[1.3rem] max-lg:text-[1.4rem] text-2xl font-thin text-gray-700 tracking-wider'>FREE DELIVERY</h2>
                                <p className="max-sm:text-base text-lg text-gray-600 tracking-wide font-thin">Consectetur adipi elit lorem ipsum dolor sit amet.</p>
                            </div>
                        </div>
                        <div className=" flex gap-3">
                            <p>
                                <i className="max-sm:text-2xl text-orange-500 text-3xl fa-solid fa-award"></i>
                            </p>
                            <div>
                                <h2 className='max-sm:text-[1.3rem] max-lg:text-[1.4rem] text-2xl font-thin text-gray-700 tracking-wider'>QUALITY GUARANTEE
                                </h2>
                                <p className="max-sm:text-base text-lg text-gray-600 tracking-wide font-thin">Dolor sit amet orem ipsu mcons ectetur adipi elit.</p>
                            </div>
                        </div>
                        <div className=" flex gap-3">
                            <p>
                                <i className=" max-sm:text-2xl text-orange-500 text-3xl fa-solid fa-wand-sparkles"></i>
                            </p>
                            <div>
                                <h2 className='max-sm:text-[1.3rem] max-lg:text-[1.4rem] text-2xl font-thin text-gray-700 tracking-wider'>DAILY OFFERS</h2>
                                <p className="max-sm:text-base text-lg text-gray-600 tracking-wide font-thin">Amet consectetur adipi elit loreme ipsum dolor sit.</p>
                            </div>
                        </div>
                        <div className=" flex gap-3">
                            <p>
                                <i className="max-sm:text-2xl text-orange-500 text-3xl fa-solid fa-shield-halved"></i>
                            </p>
                            <div>
                                <h2 className='max-sm:text-[1.3rem] max-lg:text-[1.4rem] text-2xl font-thin text-gray-700 tracking-wider'>100% SECURE PAYMENT</h2>
                                <p className="max-sm:text-base  text-lg text-gray-600 tracking-wide font-thin">Rem Lopsum dolor sit amet, consectetur adipi elit.</p>
                            </div>
                        </div>
                    </div >
                    {/* end some information */}

                    {/* products start */}
                    <div className=" max-sm:py-20 py-28">
                        <h1 className=" max-md:text-2xl pb-10 text-3xl tracking-wider font-thin">OUR PRODUCTS</h1>

                        <div className=" flex gap-3 flex-wrap">
                            <p href="" onClick={() => { setHover(0); productToShow() }} className={` max-md:pb-1 max-md:pt-[1px] px-5 cursor-pointer select-none pt-1 pb-2 ${hover == 0 ? 'bg-orange-500 text-white ' : 'hover:text-white border hover:bg-orange-500 border-orange-500'}   duration-200 rounded-full`} >
                                All Products
                            </p>
                            {
                                category.length > 0 && category.map((item, index) => {
                                    return <p key={item._id} onClick={() => onClickHandler({ id: item._id, index })} href="" className={`px-5 pt-1 cursor-pointer max-md:pb-1 max-md:pt-[1px] select-none pb-2 ${hover == index + 1 ? 'bg-orange-500 text-white ' : 'hover:text-white border hover:bg-orange-500 border-orange-500'}   duration-200 rounded-full`}>
                                        {item.category}
                                    </p>
                                })
                            }
                        </div>
                        <div className=" max-[1195px]:grid-cols-3 max-[950px]:grid-cols-2 max-sm:grid-cols-1 grid grid-cols-4 gap-8 pt-8">
                            {
                                toShow.length > 0 && toShow.map((item) => {
                                    return (
                                        <div key={item._id} className=" shadow-md p-1 rounded-md ">
                                            <div className=" overflow-hidden">
                                                <Link to={`/user/product/detail/${item._id}`}>
                                                    <img className='w-full hover:scale-125 duration-150 object-cover max-md:h-[230px] rounded-md h-[250px] ' src={item.image} alt="" /></Link>

                                            </div>
                                            <div className=" pt-3 px-2">
                                                <Link to={`/user/product/detail/${item._id}`}>
                                                    <h1 className="max-md:text-xl text-2xl hover:text-orange-500 duration-200 text-gray-600 font-semibold cursor-pointer">{item.name}</h1></Link>

                                                <p className=" max-md:text-[1.1rem] text-lg text-gray-500 pt-1">{item.message.slice(0, 86)}...</p>
                                                <div className=" py-3 text-center">
                                                    <button onClick={() => addToCartHandler(item._id)} className=" px-5 pt-1 pb-[6px] hover:bg-orange-500 duration-200 rounded-full border text-gray-500 hover:text-white border-orange-500 cursor-pointer ">ADD TO CART</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })

                            }
                        </div>
                    </div>
                    {/* products end */}

                    {/* best selling start */}
                    <div className=" max-sm:py-16 py-24">
                        <h1 className=" max-md:text-2xl pb-10 text-3xl tracking-wider font-thin">BEST SELLING ITEMS</h1>

                        <BestSellingCarousel setCar={setCar} />

                    </div>
                    {/* best selling end */}


                    {/* some information */}
                    <div className="  pt-40 pb-20">
                        <div className='max-[1150px]:grid-cols-3 max-sm:grid-cols-1 max-[900px]:grid-cols-2  grid grid-cols-4 gap-7  bg-gray-100 rounded-md p-10'>
                            <div className=' bg-white text-center p-9 rounded-md'>
                                <p className=' pb-5'>
                                    <i className="fa-solid max-[900px]:text-4xl fa-users text-5xl text-gray-500"></i>
                                </p>
                                <p className='pb-5 max-[900px]:text-xl text-2xl font-semibold text-orange-500'>SATISFIED CUSTOMERS</p>
                                <p className=' text-3xl  max-[900px]:text-2xl text-gray-500 font-semibold font-sans'>{user.length}</p>
                            </div>

                            <div className=' bg-white text-center p-9 rounded-md'>
                                <p className=' pb-5'>
                                    <i className="fa-solid  max-[900px]:text-4xl fa-users text-5xl text-gray-500"></i>
                                </p>
                                <p className='pb-5 text-2xl  max-[900px]:text-xl font-semibold text-orange-500'>QUALITY OF SERVICE</p>
                                <p className=' text-3xl  max-[900px]:text-2xl text-gray-500 font-semibold font-sans'>99%</p>
                            </div>

                            <div className=' bg-white text-center p-9 rounded-md'>
                                <p className=' pb-5'>
                                    <i className="fa-solid fa-users  max-[900px]:text-4xl text-5xl text-gray-500"></i>
                                </p>
                                <p className='pb-5 text-2xl  max-[900px]:text-xl font-semibold text-orange-500'>QUALITY CERTIFICATES</p>
                                <p className=' text-3xl  max-[900px]:text-2xl text-gray-500 font-semibold font-sans'>33</p>
                            </div>

                            <div className=' bg-white text-center p-9 rounded-md'>
                                <p className=' pb-5'>
                                    <i className="fa-solid  max-[900px]:text-4xl fa-users text-5xl text-gray-500"></i>
                                </p>
                                <p className='pb-5 text-2xl  max-[900px]:text-xl font-semibold text-orange-500'>AVAILABLE PRODUCTS</p>
                                <p className=' text-3xl  max-[900px]:text-2xl text-gray-500 font-semibold font-sans'>{product.length}</p>
                            </div>
                        </div>
                    </div >
                    {/* end some information */}

                    {/* customer review start */}
                    <div className="reviewContainer py-20">
                        <h1 className=" max-md:text-2xl pb-10 text-3xl tracking-wider font-thin">CUSTOMERS REVIEWS</h1>
                        <ReviewCarousel />
                    </div>
                    {/* customer review end */}

                    {/* footer start */}
                    <Footer />
                    {/* footer end */}
                </div >
            }
        </>
    )
}

export default Index;