import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { addNewAdmin } from "../../apicalls/admin/profile/profile";

const AddNewAdmin = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [checkValidate, setCheckValidate] = useState(true);
    const [isSame, setIsSame] = useState(false);
    const [isEmail, setIsEmail] = useState(false);

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

    const submitHandler = async () => {
        setLoading(true);
        try {
            if (name.trim() == '' || email.trim() == '' || confirmPassword.trim() == '' || password.trim() == '') {
                setCheckValidate(false);
            } else {
                if (!email.includes('@gmail.com')) {
                    setIsEmail(true);
                } else {
                    if (password != confirmPassword) {
                        setIsSame(true);
                    } else {
                        const data = {
                            name: name,
                            email: email,
                            password: password,
                        }
                        const response = await addNewAdmin(data);

                        if (!response.success) {
                            throw new Error(response.message);
                        }

                        successAlert(response);

                        setName('');
                        setEmail('');
                        setPassword('')
                        setConfirmPassword('');
                    }
                }
            }
        } catch (error) {
            errorAlert(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        setIsSame(false);
    }, [confirmPassword])


    return (
        <div className=" max-xl:py-10 grid place-items-center" >
            <div className="w-[450px] max-sm:w-[300px] max-md:w-[400px] pt-4  shadow-md p-5 rounded-md ">
                <div className="pb-4">
                    <h2 className=" text-lg text-gray-500 font-bold pb-3">Add New Admin</h2>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className=" w-full py-2 px-3 outline-none border-2 rounded-md" name="" id="" placeholder="Name ..." />
                    {
                        (checkValidate == false && name.trim() == '') && <span className=" text-red-500">Name field is required*</span>
                    }
                </div>

                <div className="pb-4">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className=" w-full py-2 px-3 outline-none border-2 rounded-md" name="" id="" placeholder="Email ..." />
                    {
                        (checkValidate == false && email.trim() == '') && <span className=" text-red-500">Email field is required*</span>
                    }
                    {
                        isEmail && <span className=" text-red-500">Email must be valid*</span>
                    }
                </div>

                <div className="pb-4">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className=" w-full py-2 px-3 outline-none border-2 rounded-md" name="" id="" placeholder="Password ..." />
                    {
                        (checkValidate == false && password.trim() == '') && <span className=" text-red-500">Password field is required*</span>
                    }

                </div>

                <div className="pb-4">
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className=" w-full py-2 px-3 outline-none border-2 rounded-md" name="" id="" placeholder="Confirm Password ..." />
                    {
                        (checkValidate == false && confirmPassword.trim() == '') && <span className=" text-red-500">Confirm Password field is required*</span>
                    }
                    {
                        isSame && <span className=" text-red-500">Password must match*</span>
                    }
                </div>
                <div className=" pt-3">
                    <button onClick={submitHandler} disabled={loading} className="pt-[1px] pb-1 px-3 rounded-md  max-sm:text-[15px]  bg-blue-500 text-white cursor-pointer text-lg ">{loading ? "Loading ..." : 'Add'}</button>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default AddNewAdmin