/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Footer from "../Footer/Footer"
import Starter from "../Starter/Starter"
import { addFavorite, addToCart, categories, products, search, searchByMax, searchByMini, searchByRange, searchCategory } from "../../apicalls/user/user";
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import 'ldrs/ring'
import { dotSpinner } from 'ldrs'

const Shop = ({ setNav, setFav, setCar }) => {
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);
    const [input, setInput] = useState('');
    const [miniPrice, setMiniPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [value, setValue] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState();
    const user = useSelector((state) => state.reducer.userInfo.user);
    dotSpinner.register()

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

    const getAllProducts = async () => {
        setLoading(true);
        try {
            const response = await products(page);

            if (!response.success) {
                throw new Error(response.message);
            }

            setCount(response.count);
            setProduct(response.productsDoc);

        } catch (error) {
            errorAlert(error);
        }
        setLoading(false);
    }

    const searchHandler = async () => {
        try {
            const response = await search(input);

            if (!response.success) {
                throw new Error(response.message);
            }

            setProduct(response.productsDoc);
        } catch (error) {
            errorAlert(error);
        }
    }

    const categoryHandler = async (id) => {
        setLoading(true);

        try {
            const response = await searchCategory(id);

            if (!response.success) {
                throw new Error(response.message);
            }

            setProduct(response.productsDoc);
        } catch (error) {
            errorAlert(error);

        }
        setLoading(false);
    }

    const handleInputChange = async (e) => {
        setLoading(true);
        const searchKey = Number(e.target.value);
        setValue(searchKey);

        try {
            const response = await searchByRange(searchKey);

            if (!response.success) {
                throw new Error(response.message);
            }
            setProduct(response.productsDoc);
        } catch (error) {
            errorAlert(error);

        }
        setLoading(false);
    };

    const filterHandler = async () => {
        setLoading(true);
        let response;
        try {
            if (miniPrice != '') {
                response = await searchByMini(miniPrice);
            } else {
                response = await searchByMax(maxPrice);
            }

            if (!response.success) {
                throw new Error(response.message);
            }

            setProduct(response.productsDoc);
        } catch (error) {
            errorAlert(error);
        }
        setLoading(false);
    }

    const resetHandler = () => {
        setMiniPrice('');
        setMaxPrice('');
        setValue(0);
        getAllProducts();
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

    const favoriteHandler = async (id) => {
        let random = Math.floor(Math.random() * 385948);

        try {
            const data = {
                userId: user.userId,
                productId: id,
            }
            const response = await addFavorite(data);

            if (!response.success) {
                throw new Error(response.message);
            }

            successAlert(response);
            setFav(random);

        } catch (error) {
            errorAlert(error);
        }
    }

    useEffect(() => {
        getAllProducts();
        getAllCategory();
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
                </div> : <div>
                    <Starter setNav={setNav} title={"Shop"} />
                    <div className=" max-[850px]:gap-3 max-[850px]:grid-cols-5 grid grid-cols-4 gap-5">
                        <div className=" max-lg:col-span-3 max-[550px]:col-span-5  col-span-3 ">
                            {
                                product.length == 0 && <div className=" pt-10 text-center">
                                    <h1 className=" text-2xl text-gray-600">OOPS! No Product Found!</h1>
                                </div>
                            }
                            <div className="max-[1300px]:grid-cols-3  max-xl:grid-cols-2 max-[850px]:grid-cols-1 grid grid-cols-4 gap-5 py-4">
                                {
                                    product && product.map((item) => {
                                        return <div key={item._id} className=" shadow-md p-1 rounded-md ">
                                            <div className="relative overflow-hidden">
                                                <Link className=" " to={`/user/product/detail/${item._id}`}>
                                                    <img className='max-[850px]:h-[180px] w-full hover:scale-125 duration-150 object-cover rounded-md h-[200px] ' src={item.image} alt="" />
                                                </Link>
                                                <i onClick={() => favoriteHandler(item._id)} className="max-[850px]:text-2xl absolute top-1 cursor-pointer right-3 z-50 fa-solid fa-heart hover:text-orange-400 duration-200 text-3xl text-orange-500"></i>
                                            </div>
                                            <div className=" pt-3 px-2">
                                                <Link to={`/user/product/detail/${item._id}`}>
                                                    <h1 className="max-[850px]:text-xl select-none text-2xl hover:text-orange-500 duration-200 text-gray-600 font-semibold cursor-pointer">{item.name}</h1>
                                                </Link>
                                                <p className="max-[850px]:text-[1.1rem] text-lg text-gray-500 pt-1">{item.message.slice(0, 46)}...</p>
                                                <div className=" py-3 text-center">
                                                    <button onClick={() => addToCartHandler(item._id)} className=" px-5 pt-1 pb-[6px] hover:bg-orange-500 duration-200 rounded-full border text-gray-500 hover:text-white border-orange-500 cursor-pointer ">ADD TO CART</button>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                            {
                                count > 8 && <div className="max-md:pb-10 pt-10 grid place-items-center text-center">
                                    <div className="max-md:gap-2 max-md:px-3 max-md:py-1 cursor-pointer flex items-center gap-4 rounded-sm bg-gray-100 px-5 py-2 ">
                                        <i onClick={() => setPage(page - 1)} className={`fa-solid fa-chevron-left max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}></i>
                                        <p onClick={() => { setPage(1) }} className={` ${page == 1 && 'bg-blue-500 text-white'} text-gray-500 select-none text-lg  px-[13px] pt-[3px] pb-[5px]  rounded-full max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}>1</p>
                                        <p onClick={() => { setPage(2) }} className={` ${page == 2 && 'bg-blue-500 text-white'} text-gray-500 select-none text-lg  px-[13px] pt-[3px] pb-[5px]  rounded-full max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}>2</p>
                                        {
                                            count > 16 && <p onClick={() => { setPage(3) }} className={` ${page == 3 && 'bg-blue-500 text-white'} text-gray-500 select-none text-lg  px-[13px] pt-[3px] pb-[5px]  rounded-full max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}>3</p>
                                        }
                                        {
                                            count > 24 && <p onClick={() => { setPage(4) }} className={` ${page == 4 && 'bg-blue-500 text-white'} text-gray-500 select-none text-lg  px-[13px] pt-[3px] pb-[5px]  rounded-full max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}>4</p>
                                        }
                                        <i onClick={() => setPage(page + 1)} className="  fa-solid fa-chevron-right max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] "></i>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="max-[850px]:col-span-2  max-[550px]:row-start-1 max-[550px]:col-span-5  max-[850px]:px-3 p-5">
                            <div className=" relative shadow-md w-full    gap-3 rounded-md border">
                                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="max-[850px]:h-10 w-full h-12 px-3 outline-none " placeholder="Search.." name="search" />
                                <span onClick={() => { getAllProducts(); setInput('') }} className={`right-14  top-1 ${input == '' ? 'hidden' : ""} absolute text-red-500 cursor-pointer max-[850px]:text-2xl text-3xl`}>
                                    <i className="fa-solid fa-xmark"></i>
                                </span>
                                <span onClick={() => searchHandler()} className="absolute right-0 rounded-e-md cursor-pointer  border max-[850px]:pt-[6px] max-[850px]:pb-[5px] py-2 px-3">
                                    <i className="fa fa-search max-[850px]:text-xl text-2xl  "></i>
                                </span>
                            </div>

                            <div className=" pt-10">
                                <h2 className=" max-lg:text-2xl text-3xl font-light tracking-wide">CATEGORIES</h2>
                                <div className=" pt-4">
                                    <p onClick={() => getAllProducts()} className=" text-xl pb-1 font-light text-gray-700 cursor-pointer hover:text-orange-500 duration-200 inline-block">All </p> <br />
                                    {
                                        category && category.map((item) => {
                                            return (
                                                <div key={item._id}>
                                                    <p key={item._id} onClick={() => categoryHandler(item._id)} className="max-lg:text-base text-xl pb-1 font-light text-gray-700 cursor-pointer hover:text-orange-500 duration-200 inline-block">{item.category} </p>
                                                    <br />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            <div className=" pt-10">
                                <h2 className="max-lg:text-2xl text-3xl font-light tracking-wide">FILTER BY PRICE</h2>
                                <div className=" pt-4">
                                    <input value={value}
                                        onChange={(e) => handleInputChange(e)} min={0} max={5000000} step={10000} type="range" className="form-range w-full" id="customRange" />
                                    <span className="max-lg:text-base text-lg font-base text-gray-600">{value} MMK</span>
                                    <div className=" max-[900px]:flex-col max-[900px]:gap-2  flex gap-5 pt-3">
                                        <input onChange={(e) => setMiniPrice(e.target.value)} value={miniPrice} className=" w-full py-2 px-3 outline-none border rounded-md mb-3 " type="text" name="" placeholder="Minimum price ..." id="" />
                                        <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className=" py-2 px-3 w-full outline-none border rounded-md mb-3" type=" text" placeholder="Maximum price ..." name="" id="" />
                                    </div>
                                    <div className=" pt-3">
                                        <button onClick={filterHandler} className=" bg-orange-500 py-1 w-full rounded-md text-white" type="button">Filter</button>
                                    </div>

                                    <div className=" pt-3">
                                        <button onClick={resetHandler} className=" bg-orange-500 py-1 w-full rounded-md text-white" type="button">Reset</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Footer />
                </div >
            }
        </>
    )
}

export default Shop

