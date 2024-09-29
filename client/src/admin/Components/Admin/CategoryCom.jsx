/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { addCategory, editCategory, updateCategory } from "../../../apicalls/admin/category/category";
import Swal from 'sweetalert2'
import { useNavigate, Link } from "react-router-dom";

const Category = ({ title, state, id }) => {
    const [checkCategory, setCheckCategory] = useState(true);
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const getCategory = async () => {
        try {
            const response = await editCategory(id);

            if (response.success) {
                setCategory(response.category[0].category);
            }

        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
    }

    useEffect(() => {
        if (state == 'Update') {
            getCategory();
        }
    }, [state, title]);

    const submitHandler = async () => {
        setLoading(true);
        if (category.trim() == '') {
            setCheckCategory(false);
        } else {
            const data = {
                category: category,
                id: id
            };

            let response;

            if (state == "Create") {
                response = await addCategory(data);
            } else {
                response = await updateCategory(data);
            }
            if (!response.success) {
                Swal.fire({
                    title: 'Error!',
                    text: response.message,
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
            } else {
                setCategory("");
                if (state == 'Update') {
                    navigate("/admin/category");
                }
                Swal.fire({
                    title: 'Success',
                    text: response.message,
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        setCheckCategory(true);
    }, [category])

    return (
        <div className=" px-3 grid place-items-center">
            <div className=" shadow-md w-[450px] max-sm:w-[300px] max-md:w-[400px] p-5 rounded-md">
                <div className=" flex justify-between items-center">
                    <h2 className=" text-lg font-semibold text-gray-500 ">{title}</h2>
                    {
                        state == 'Update' && <Link className=" text-blue-500 hover:underline" to={'/admin/category'}>
                            Back
                        </Link>
                    }
                </div>
                <div className=" pt-4">
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className=" w-full py-2 px-3 outline-none border-2 rounded-md" name="" id="" placeholder="Category ..." />
                    {
                        checkCategory == false && <span className=" text-red-500">Category field is required*</span>
                    }
                    <div className=" pt-3">
                        <button onClick={submitHandler} disabled={loading} className=" py-1 px-3 rounded-md bg-blue-500  max-sm:text-[15px] text-white cursor-pointer text-lg ">{loading ? "Loading ..." : state}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category;