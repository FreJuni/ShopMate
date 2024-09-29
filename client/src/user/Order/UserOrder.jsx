/* eslint-disable react/prop-types */
import Footer from "../Footer/Footer"
import Starter from "../Starter/Starter"
import 'ldrs/ring'
import { dotSpinner } from 'ldrs'


const UserOrder = ({ order, load }) => {
    dotSpinner.register();

    return (
        <>
            {
                load ? <div className=" w-full h-[600px] grid place-items-center">
                    < l-dot-spinner
                        size="80"
                        speed="0.9"
                        color="#3B82F6"
                    ></l-dot-spinner >
                </div> : <div>
                    <Starter title={"Order"} />
                    <div className='overflow-auto'>
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className=" text-gray-600 max-sm:text-[.8rem] max-[940px]:text-lg max-[885px]:text-base whitespace-nowrap text-left p-3 text-xl  border">IMAGE</th>
                                    <th className=" text-gray-600 max-sm:text-[.8rem] max-[940px]:text-lg max-[885px]:text-base whitespace-nowrap text-left p-3 text-xl  border">PRODUCT NAME</th>
                                    <th className=" text-gray-600 max-sm:text-[.8rem] max-[940px]:text-lg max-[885px]:text-base whitespace-nowrap text-left p-3 text-xl  border">ORDER CODE</th>
                                    <th className=" text-gray-600 max-sm:text-[.8rem] max-[940px]:text-lg max-[885px]:text-base whitespace-nowrap text-left p-3 text-xl  border">QUANTITY</th>
                                    <th className=" text-gray-600 max-sm:text-[.8rem] max-[940px]:text-lg max-[885px]:text-base whitespace-nowrap text-left p-3 text-xl  border">STATUS</th>
                                    <th className=" text-gray-600 max-sm:text-[.8rem] max-[940px]:text-lg max-[885px]:text-base whitespace-nowrap text-left p-3 text-xl  border">TOTAL PRICE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order && order.map((item) => (
                                    <tr key={item._id} className="border-b">
                                        <td className="p-3 flex items-center">
                                            <img className=" max-sm:w-16 max-sm:h-16 w-20 h-20 object-cover rounded-md" src={item.product_id.image} alt={item.product_id.name} />
                                        </td>
                                        <td className=" max-sm:text-base p-3 text-xl text-orange-500  max-sm:text-[.7rem">
                                            {item.product_id.name}
                                        </td>
                                        <td className="p-3  max-sm:text-base text-orange-500 text-xl">
                                            {item.order_code}
                                        </td>
                                        <td className="p-3  max-sm:text-base text-gray-500 text-xl">
                                            {item.quantity}
                                        </td>
                                        <td className="p-3  max-sm:text-base text-xl">
                                            {Number(item.status) === 0 ? (
                                                <span className="text-orange-500">PENDING</span>
                                            ) : Number(item.status) === 1 ? (
                                                <span className="text-green-500">SUCCESS</span>
                                            ) : (
                                                <span className="text-red-500">REJECT</span>
                                            )}
                                        </td>
                                        <td className="p-3  max-sm:text-base text-orange-500 text-xl">
                                            {Number(item.quantity) * item.product_id.price} MMK
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Footer />
                </div>
            }
        </>
    )
}

export default UserOrder