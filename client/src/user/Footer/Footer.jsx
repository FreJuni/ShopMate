
const Footer = () => {
    return (

        <div className=" pb-20 pt-32" >
            <footer className=" max-[900px]:grid-cols-2 max-[550px]:grid-cols-1 grid grid-cols-3 gap-10">
                <div>
                    <h1 className="max-[900px]:text-2xl tracking-widest text-3xl font-semibold text-gray-600">POS<span className=" font-thin text-gray-500">LITE</span></h1>
                    <p className="text-lg max-[900px]:text-base pt-3 text-gray-500 font-thin">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos praesentium nesciunt iure autem aliquid nihil similique recusandae quidem eius quasi obcaecati quo, voluptatibus tempore modi placeat, neque sed saepe! Eveniet!</p>
                    <div className=" pt-3 flex gap-4">
                        <i className="fa-brands max-[900px]:text-lg fa-facebook-f text-xl text-gray-300 cursor-pointer hover:text-orange-500 duration-200"></i>
                        <i className="fa-brands max-[900px]:text-lg fa-instagram text-xl text-gray-300 cursor-pointer hover:text-orange-500 duration-200"></i>
                        <i className="fa-brands max-[900px]:text-lg fa-twitter text-xl text-gray-300 cursor-pointer hover:text-orange-500 duration-200"></i>
                        <i className="fa-brands max-[900px]:text-lg fa-linkedin-in text-xl text-gray-300 cursor-pointer hover:text-orange-500 duration-200"></i>
                    </div>
                </div>
                <div>
                    <h2 className="max-[900px]:text-xl text-2xl">Help & Info Help</h2>
                    <div className=" pt-3">
                        <p className=" max-[900px]:text-base font-thin text-lg tracking-wider pb-1 text-gray-700 cursor-pointer select-none hover:text-orange-500 duration-200">TRACK YOUR ORDER</p>
                        <p className=" max-[900px]:text-base font-thin text-lg tracking-wider pb-1 text-gray-700 cursor-pointer select-none hover:text-orange-500 duration-200">RETURN POLICES</p>
                        <p className=" max-[900px]:text-base font-thin text-lg tracking-wider pb-1 text-gray-700 cursor-pointer select-none hover:text-orange-500 duration-200">SHIPPING + DELIVERY</p>
                        <p className=" max-[900px]:text-base font-thin text-lg tracking-wider pb-1 text-gray-700 cursor-pointer select-none hover:text-orange-500 duration-200">CONTACT UA</p>
                        <p className=" max-[900px]:text-base font-thin text-lg tracking-wider pb-1 text-gray-700 cursor-pointer select-none hover:text-orange-500 duration-200">FAQS</p>
                    </div>
                </div>
                <div>
                    <h2 className="max-[900px]:text-xl text-2xl">Contact Us</h2>
                    <div className=" pt-3">
                        <p className="max-[900px]:text-base text-gray-700 font-thin text-lg">Do you have any question or suggestions? <span className=" cursor-pointer hover:text-orange-500 duration-200 underline">example@gamil.com</span></p>
                    </div>
                    <div className=" pt-3">
                        <p className="max-[900px]:text-base text-gray-700 font-thin text-lg">If you need support,Just give us a call. <span className=" hover:text-orange-500 duration-200 underline cursor-pointer">+022 833 432</span></p>
                    </div>
                </div>
            </footer>
        </div >
    )
}

export default Footer