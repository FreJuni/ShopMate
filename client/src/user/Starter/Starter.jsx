/* eslint-disable react/prop-types */

const Starter = ({ title }) => {

    return (
        <div>
            <div className=" w-full h-60 grid place-items-center bg-gray-200">
                <div className=" text-center">
                    <h1 className=" max-md:text-4xl text-5xl font-light tracking-widest text-gray-800">{title.toUpperCase()}</h1>
                    <div className=" pt-3 max-md:text-lg text-xl text-gray-600">
                        {
                            title == "Shop Detail" ? <><a onClick={() => { localStorage.setItem('nav', 2) }} href="/user/shop" className=" hover:text-orange-500 duration-200 " >Shop</a> {" > "}<span className=" underline">{title}</span></> : <> <a onClick={() => { localStorage.setItem('nav', 0) }} href="/user/home" className=" hover:text-orange-500 duration-200 " >Home</a> {" > "}<span className=" underline">{title}</span></>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Starter