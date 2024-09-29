/* eslint-disable react/prop-types */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import '../../App.css'
import defaultImage from '../../../public/defaultProfile/defaultProfile.jpg'
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getReview } from "../../apicalls/user/user";

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

const ReviewCarousel = () => {
    const [review, setReview] = useState([]);

    const errorAlert = (response) => {
        Swal.fire({
            title: 'Error!',
            text: response.message,
            icon: 'error',
            confirmButtonText: 'Cool'
        })
    }

    const getAllReview = async () => {
        try {
            const response = await getReview();

            if (!response.success) {
                throw new Error(response.message);
            }

            setReview(response.reviewDoc);

        } catch (error) {
            errorAlert(error);
        }
    }

    useEffect(() => {
        getAllReview();
    }, []);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="reviewContainer">
            <Slider {...settings}>
                {
                    review && review.map((item) => {
                        return <div key={item._id} className=" p-5 ">
                            <div className=" border-b pb-3 border-orange-500">
                                <p className=" text-gray-500  max-[900px]:text-base  text-lg">{item.message}</p>
                            </div>
                            <div className=" pt-4 flex gap-5 w-full">
                                <div>
                                    {
                                        item.user_id.image == null ? <img className=" max-[900px]:w-24  max-[900px]:h-16  w-28 h-20 object-cover rounded-md" src={defaultImage} alt="" /> : <img className="  max-[900px]:w-24  max-[900px]:h-16 w-28 h-20 object-cover rounded-md" src={item.user_id.image} alt="" />
                                    }
                                </div>
                                <div className=" flex justify-between w-full">
                                    <div>
                                        <h2 className=" max-[900px]:lg text-xl pb-2 tracking-wide font-semibold text-gray-500">{item.user_id.name}</h2>
                                        {
                                            item.rate == 1 ? <>
                                                <i className="fa-solid  max-[900px]:text-[.8rem] text-orange-500 fa-star" ></i>
                                                <i className="fa-solid  max-[900px]:text-[.8rem] fa-star"></i>
                                                <i className="fa-solid  max-[900px]:text-[.8rem] fa-star"></i>
                                                <i className="fa-solid  max-[900px]:text-[.8rem] fa-star"></i>
                                                <i className="fa-solid  max-[900px]:text-[.8rem] fa-star"></i>
                                            </> :
                                                item.rate == 2 ? <>
                                                    <i className="fa-solid  max-[900px]:text-[.8rem] text-orange-500 fa-star" ></i>
                                                    <i className="fa-solid  max-[900px]:text-[.8rem] text-orange-500 fa-star" ></i>
                                                    <i className="fa-solid  max-[900px]:text-[.8rem] fa-star"></i>
                                                    <i className="fa-solid  max-[900px]:text-[.8rem] fa-star"></i>
                                                    <i className="fa-solid  max-[900px]:text-[.8rem] fa-star"></i>
                                                </> :

                                                    item.rate == 3 ? <>
                                                        <i className="fa-solid  max-[900px]:text-[.8rem] text-orange-500 fa-star" ></i>
                                                        <i className="fa-solid  max-[900px]:text-[.8rem] text-orange-500 fa-star" ></i>
                                                        <i className="fa-solid  max-[900px]:text-[.8rem] text-orange-500 fa-star" ></i>
                                                        <i className="fa-solid  max-[900px]:text-[.8rem] fa-star"></i>
                                                        <i className="fa-solid  max-[900px]:text-[.8rem] fa-star"></i>
                                                    </> :

                                                        item.rate == 4 ? <>
                                                            <i className="fa-solid  max-[900px]:text-[.8rem] text-orange-500 fa-star" ></i>
                                                            <i className="fa-solid  max-[900px]:text-[.8rem] text-orange-500 fa-star" ></i>
                                                            <i className="fa-solid  max-[900px]:text-[.8rem] text-orange-500 fa-star" ></i>
                                                            <i className="fa-solid  max-[900px]:text-[.8rem] text-orange-500 fa-star" ></i>
                                                            <i className="fa-solid fa-star"></i>
                                                        </> :
                                                            <>
                                                                <i className="fa-solid  max-[900px]:text-[.8rem] text-orange-500 fa-star" ></i>
                                                                <i className="fa-solid  max-[900px]:text-[.8rem] text-orange-500 fa-star" ></i>
                                                                <i className="fa-solid  max-[900px]:text-[.8rem] text-orange-500 fa-star" ></i>
                                                                <i className="fa-solid  max-[900px]:text-[.8rem] text-orange-500 fa-star" ></i>
                                                                <i className="fa-solid  max-[900px]:text-[.8rem] text-orange-500 fa-star" ></i>
                                                            </>
                                        }
                                    </div>
                                    <div>
                                        <i className="fa-solid  max-[900px]:text-2xl text-orange-500 text-3xl fa-quote-right"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }
            </Slider>
        </div>
    )
}

export default ReviewCarousel

