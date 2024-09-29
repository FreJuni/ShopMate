/* eslint-disable react/prop-types */
import Footer from '../Footer/Footer';
import Starter from '../Starter/Starter';
import Product from '../../../public/defaultImage/pro.jpg'

const About = ({ setNav }) => {
    return (
        <div>
            < Starter title={"About"} />
            {/* some information */}
            <div className=" max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 grid grid-cols-4 gap-7 pt-52 pb-20">
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

            {/* our shop detail start */}
            <div className='max-lg:grid-cols-1 py-20 grid gap-16 grid-cols-2'>
                <div>
                    <img className=' max-sm:h[385px] max-lg:h-[430px] w-full h-[480px] object-cover rounded-md ' src={Product} alt="product" />
                </div>
                <div>

                    <h2 className=' max-md:text-2xl pb-2 text-3xl font-light text-gray-600 tracking-wide'>BEST DIGITAL STORE BASICSTORE</h2>

                    <p className=' max-md:text-lg pb-5 text-xl text-gray-500 font-light'>Risus augue curabitur diam senectus congue velit et. Sed vitae metus nibh sit era. Nulla adipiscing pharetra pellentesque maecenas odio eros at. Et libero vulputate amet duis erat volutpat vitae eget. Sed vitae metus nibh sit era. Nulla adipiscing pharetra eros at.</p>

                    <p className=' max-lg:text-lg pb-8 text-xl text-gray-500 font-light'>Nulla adipiscing pharetra pellentesque maecenas odio eros at. Et libero vulputate amet duis erat volutpat vitae eget. Quam libero etiam et in ac at quis. Risus augue curabitur diam senectus congue velit et.</p>

                    <a onClick={() => {
                        setNav(2)
                        localStorage.setItem('nav', 2)
                    }} href="/user/shop">
                        <button className=" max-md:px-7 max-md:py-2 max-md:text-[14px] hover:bg-gray-800 duration-200 bg-orange-500 text-white py-4 px-10 tracking-wider text-lg rounded-full font-thin max-lg:text-base max-lg:py-3 max-lg:px-8">GO TO SHOP</button>
                    </a>
                </div>
            </div>
            {/* our shop detail end */}

            < Footer />
        </div>
    )
}

export default About