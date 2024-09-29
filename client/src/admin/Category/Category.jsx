/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Categories, deleteCategory } from "../../apicalls/admin/category/category";
import Swal from 'sweetalert2'
import { format } from 'date-fns';
import { Link } from "react-router-dom";
import 'ldrs/ring'
import { dotSpinner } from 'ldrs'


const Category = () => {

    const [category, setCategory] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState();
    const [loading, setLoading] = useState(true);
    dotSpinner.register();


    const getCategory = async () => {
        setLoading(true);
        try {
            const response = await Categories(page);

            if (response.success) {
                setCount(response.categoryCount);
                setCategory(response.category);
            }

        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
        setLoading(false);
    }

    useEffect(() => {
        getCategory();
    }, [page]);

    const deleteHandler = async (id) => {
        try {
            const response = await deleteCategory(id);

            if (!response.success) {
                throw new Error(response.message);
            }

            Swal.fire({
                title: 'Success',
                text: response.message,
                icon: 'success',
                confirmButtonText: 'Cool'
            })

            getCategory();
            setPage(1);
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
    }

    return (
        <div className=" px-3">
            {
                loading ? <div className=" w-full h-[600px] grid place-items-center">
                    < l-dot-spinner
                        size="80"
                        speed="0.9"
                        color="#3B82F6"
                    ></l-dot-spinner >
                </div> : <>
                    <div className=" max-xl:py-10">
                        <table className="border-collapse w-full font-sans">
                            <thead>
                                <tr>
                                    <th className="text-left border-2 p-3 text-gray-600">Name</th>
                                    <th className="text-left border-2 p-3 text-gray-600">Created At</th>
                                    <th className="text-left border-2 p-3 text-gray-600">Action</th>
                                </tr>
                            </thead>
                            {
                                category && category.map((item) => {
                                    return <tbody key={item._id}>
                                        <tr>
                                            <td className="text-left border-2 p-3 text-gray-500">{item.category}</td>
                                            <td className="text-left border-2 p-3 text-gray-500">{format(new Date(item.createdAt), 'MM/dd/yyyy')}</td>
                                            <td className="text-left border-2 p-3">
                                                <Link to={`/admin/edit/category/${item._id}`}>
                                                    <i className="fa-solid fa-pen-to-square text-lg cursor-pointer text-green-500 hover:text-green-300 duration-75 "></i>
                                                </Link>
                                                <i onClick={() => deleteHandler(item._id)} className="fa-solid fa-trash text-lg cursor-pointer pl-4 text-red-500 hover:text-red-300 duration-75"></i>
                                            </td>
                                        </tr>
                                    </tbody>
                                })
                            }
                        </table>

                    </div>
                    {
                        count > 10 && <div className="max-md:pb-10 pt-10 grid place-items-center text-center">
                            <div className="max-md:gap-2 max-md:px-3 max-md:py-1 cursor-pointer flex items-center gap-4 rounded-sm bg-gray-100 px-5 py-2 ">
                                <i onClick={() => setPage(page - 1)} className={`fa-solid fa-chevron-left max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}></i>
                                <p onClick={() => { setPage(1) }} className={` ${page == 1 && 'bg-blue-500 text-white'} text-gray-500 select-none text-lg  px-[13px] pt-[3px] pb-[5px]  rounded-full max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}>1</p>
                                <p onClick={() => { setPage(2) }} className={` ${page == 2 && 'bg-blue-500 text-white'} text-gray-500 select-none text-lg  px-[13px] pt-[3px] pb-[5px]  rounded-full max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}>2</p>
                                {
                                    count > 14 && <p onClick={() => { setPage(3) }} className={` ${page == 3 && 'bg-blue-500 text-white'} text-gray-500 select-none text-lg  px-[13px] pt-[3px] pb-[5px]  rounded-full max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}>3</p>
                                }
                                {
                                    count > 21 && <p onClick={() => { setPage(4) }} className={` ${page == 4 && 'bg-blue-500 text-white'} text-gray-500 select-none text-lg  px-[13px] pt-[3px] pb-[5px]  rounded-full max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] `}>4</p>
                                }
                                <i onClick={() => setPage(page + 1)} className="  fa-solid fa-chevron-right max-md:text-base max-sm:text-sm max-md:px-[10px] max-md:pt-[2px] max-md:pb-[3px] "></i>
                            </div>
                        </div>
                    }
                </>
            }

        </div >
    )
}

export default Category