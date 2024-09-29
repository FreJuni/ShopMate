/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Next Arrow Component
// function SampleNextArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//         <div
//             className={`${className} custom-next-arrow`}
//             style={{
//                 ...style,
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 width: "60px",
//                 height: "60px",
//                 borderRadius: "100%",
//                 background: "#F6F6F6",
//                 cursor: "pointer",
//                 color: "#D0D0D0",
//                 fontSize: "30px",
//                 position: "absolute",
//                 top: "50%",
//                 right: "-8px",
//                 transform: "translateY(-50%)",
//                 zIndex: 1,
//                 boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)"
//             }}
//             onClick={onClick}
//         >
//             <i className="fa-solid fa-angle-right"></i>
//         </div>
//     );
// }

// Custom Previous Arrow Component
// function SamplePrevArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//         <div
//             className={`${className} custom-prev-arrow`}
//             style={{
//                 ...style,
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 width: "63px",
//                 height: "63px",
//                 borderRadius: "100%",
//                 background: "#F6F6F6",
//                 cursor: "pointer",
//                 color: "#D0D0D0",
//                 fontSize: "30px",
//                 position: "absolute",
//                 top: "50%",
//                 left: "-7px",
//                 transform: "translateY(-50%)",
//                 zIndex: 1,
//                 boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)"
//             }}
//             onClick={onClick}
//         >
//             <i className="fa-solid fa-angle-left"></i>
//         </div>
//     );
// }

const HomeSlider = ({ product, setNav }) => {
    const settings = {
        speed: 1200,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000, // 3 seconds
        cssEase: "linear"
    };


    return (
        <div className=" h-full home">
            <div className="slider-container">
                <Slider {...settings}>
                    {
                        product.length > 0 && product.map((item) => {
                            return (
                                <div key={item._id}>
                                    <div className=" max-lg:py-10 max-lg:grid-cols-1 grid grid-cols-2 pt-20 px-5   gap-8 ">
                                        <div className=" flex justify-center items-center">
                                            <div>
                                                <h1 className="max-md:text-4xl max-lg:text-5xl text-6xl font-thin tracking-wider">{item.name}</h1>
                                                <div className=" pt-2">
                                                    <p className=" max-md:text-base max-lg:text-lg text-xl text-gray-500">{item.message}</p>
                                                </div>
                                                <div className=" pt-10">
                                                    <a onClick={() => {
                                                        setNav(2)
                                                        localStorage.setItem('nav', 2)
                                                    }} href="/user/shop">
                                                        <button className=" max-md:px-7 max-md:py-2 max-md:text-[14px] hover:bg-gray-800 duration-200 bg-orange-500 text-white py-4 px-10 tracking-wider text-lg rounded-full font-thin max-lg:text-base max-lg:py-3 max-lg:px-8"> SHOP PRODUCT</button>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="max-lg:h-[300px] max-lg:row-start-1 h-[400px] flex items-center justify-center">
                                            <img className=" w-full h-full rounded-md object-cover" src={item.image} alt="" />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </Slider>
            </div >
        </div >
    )
}

export default HomeSlider