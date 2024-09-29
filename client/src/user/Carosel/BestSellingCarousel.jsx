/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Slider from "react-slick";
import Swal from "sweetalert2";
import { addToCart, getSBestSell } from "../../apicalls/user/user";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


// Custom Next Arrow Component
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} custom-next-arrow`}
            style={{
                ...style,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "40px",
                height: "40px",
                borderRadius: "100%",
                background: "#F6F6F6",
                cursor: "pointer",
                color: "#D0D0D0",
                fontSize: "20px",
                position: "absolute",
                top: "50%",
                right: "-8px",
                transform: "translateY(-50%)",
                zIndex: 1,
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)"
            }}
            onClick={onClick}
        >
            <i className="fa-solid fa-angle-right"></i>
        </div>
    );
}

// Custom Previous Arrow Component
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} custom-prev-arrow`}
            style={{
                ...style,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "40px",
                height: "40px",
                borderRadius: "100%",
                background: "#F6F6F6",
                cursor: "pointer",
                color: "#D0D0D0",
                fontSize: "20px",
                position: "absolute",
                top: "50%",
                left: "-7px",
                transform: "translateY(-50%)",
                zIndex: 1,
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)"
            }}
            onClick={onClick}
        >
            <i className="fa-solid fa-angle-left"></i>
        </div>
    );
}


const BestSellingCarousel = ({ setCar }) => {
    const [sell, setSell] = useState([]);
    const user = useSelector((state) => state.reducer.userInfo.user);

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

    const getBestSellProduct = async () => {
        try {
            const response = await getSBestSell();

            if (!response.success) {
                throw new Error(response.message);
            }

            setSell(response.sellDoc);

        } catch (error) {
            errorAlert(error);
        }
    }

    useEffect(() => {
        getBestSellProduct();
    }, []);


    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1354,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 890,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className=" best-sell">
            <div className="slider-container">
                <Slider {...settings}>
                    {
                        sell && sell.map((item) => {
                            return <div key={item._id}>
                                <div key={item._id} className=" relative flex gap-8  rounded-md p-5">
                                    <div>
                                        <Link to={`/user/product/detail/${item.product_id._id}`}>
                                            <img className="max-[430px]:w-24 max-[430px]:h-24 max-[950px]:w-32 max-[950px]:h-32 rounded-full object-cover h-36 w-36 " src={item.product_id.image} alt="" />
                                        </Link>
                                    </div>
                                    <div>
                                        <Link to={`/user/product/detail/${item.product_id._id}`} >
                                            <h2 className="max-[430px]:text-lg max-[950px]:text-xl text-2xl font-semibold text-gray-600 hover:text-orange-500 duration-200 cursor-pointer">{item.product_id.name}</h2></Link>
                                        <div className=" pt-2">
                                            <p className="max-[430px]:text-[1.1rem] max-[950px]:text-[1.3rem] text-xl font-semibold text-orange-500">{item.product_id.price} MMK</p>
                                        </div>
                                        <div className=" pt-3">
                                            <button onClick={() => addToCartHandler(item.product_id._id)} className=" max-[430px]:whitespace-nowrap max-[430px]:truncate  max-[430px]:px-3 max-[430px]:text-[.9rem] max-[950px]:px-4 max-[950px]:pt-[1px] max-[950px]:pb-[4px] px-5 pt-1 pb-[6px] hover:bg-orange-500 duration-200 rounded-full border text-gray-500 hover:text-white border-orange-500 cursor-pointer ">ADD TO CART</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </Slider>
            </div >
        </div >
    )
}

export default BestSellingCarousel