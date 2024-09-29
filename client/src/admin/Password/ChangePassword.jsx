import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux';
import { changePassword } from "../../apicalls/admin/password/password";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [checkValidate, setCheckValidate] = useState(true);
    const [isSame, setIsSame] = useState(false);
    const user = useSelector((state) => state.reducer.userInfo.user);

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
        if (oldPassword.trim() == '' || newPassword.trim() == '' || confirmPassword.trim() == '') {
            setCheckValidate(false);
        } else {
            if (newPassword != confirmPassword) {
                setIsSame(true);
            } else {
                try {
                    const data = {
                        oldPassword: oldPassword,
                        newPassword: newPassword,
                        confirmPassword: confirmPassword,
                        userId: user.userId,
                    }

                    const response = await changePassword(data);

                    if (!response.success) {
                        throw new Error(response.message);
                    }

                    setOldPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                    successAlert(response);
                } catch (error) {
                    errorAlert(error);
                }
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        setIsSame(false);
    }, [newPassword, confirmPassword])


    return (
        <div className=" max-xl:py-10 grid place-items-center" >
            <div className="shadow-md w-[450px] max-sm:w-[300px] max-md:w-[400px] p-5 rounded-md ">
                <div className="pb-4">
                    <h2 className=" text-lg text-gray-500 font-bold pb-3">Change Password</h2>
                    <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className=" w-full py-2 px-3 outline-none border-2 rounded-md" name="" id="" placeholder="OldPassword ..." />
                    {
                        (checkValidate == false && oldPassword.trim() == '') && <span className=" text-red-500">Old Password field is required*</span>
                    }
                </div>

                <div className="pb-4">
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className=" w-full py-2 px-3 outline-none border-2 rounded-md" name="" id="" placeholder="New Password ..." />
                    {
                        (checkValidate == false && newPassword.trim() == '') && <span className=" text-red-500">New Password field is required*</span>
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
                    <button onClick={submitHandler} disabled={loading} className=" pt-[1px] pb-1 px-3 rounded-md  max-sm:text-[15px] bg-blue-500 text-white cursor-pointer text-lg ">{loading ? "Loading ..." : 'Change'}</button>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default ChangePassword