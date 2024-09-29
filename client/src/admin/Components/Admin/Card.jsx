/* eslint-disable react/prop-types */

const Card = ({ title, content, icon }) => {
    return (
        <div className=" bg-blue-500 text-white pt-4  px-4 pb-8 rounded-lg flex justify-between">
            <div>
                <p className="text-base">{title}</p>
                <p className="font-bold text-lg">{content}</p>
            </div>
            <div >
                <div className=" bg-white text-black py-2 px-3 rounded-full">
                    {icon}
                </div>
            </div>
        </div>
    )
}

export default Card