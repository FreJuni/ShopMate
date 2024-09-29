import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { userAction } from "../store/userSlice";
import { register } from "../apicalls/auth/auth";
import Swal from "sweetalert2";

const Register = () => {
    const [validate, setValidate] = useState(false);
    const [email, setEmail] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [dataInfo, setData] = useState({
        name: '',
        email: "",
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
    });


    const errorAlert = (response) => {
        Swal.fire({
            title: 'Error!',
            text: response.message,
            icon: 'error',
            confirmButtonText: 'Cool'
        })
    }

    const successAlert = (response) => {
        Swal.fire({
            title: 'Success',
            text: response.message,
            icon: 'success',
            confirmButtonText: 'Cool'
        })
    }


    const submitHandler = async () => {
        setLoading(true);
        try {
            if (dataInfo.name.trim() == "" || dataInfo.email.trim() == "" || dataInfo.phone.trim() == "" || dataInfo.address.trim() == "" || dataInfo.password.trim() == "" || dataInfo.confirmPassword.trim() == "") {
                setValidate(true);
            } else {
                if (!dataInfo.email.includes("@gmail.com")) {
                    setEmail(true);
                } else {
                    if (dataInfo.password != dataInfo.confirmPassword) {
                        setCheckPassword(true);
                    } else {
                        const data = {
                            name: dataInfo.name,
                            email: dataInfo.email,
                            phone: dataInfo.phone,
                            address: dataInfo.address,
                            password: dataInfo.password,
                        }

                        const response = await register(data);

                        if (!response.success) {
                            throw new Error(response.message);
                        }

                        navigate('/user/home');
                        dispatch(userAction.setToken(response.token));
                        dispatch(userAction.setUser(response.userInfo));
                        localStorage.setItem('token', response.token);

                        successAlert(response);
                    }
                }
            }
            setLoading(false);
        } catch (error) {
            errorAlert(error);
        }
    }

    useEffect(() => {
        setCheckPassword(false);
    }, [dataInfo.password, dataInfo.confirmPassword])

    return (
        <div className=" flex justify-center">
            <div className=" pt-28">
                <div className=" max-[500px]:w-[350px] max-sm:w-[380px] max-lg:w-[420px] shadow-md rounded-md px-5 pt-5 pb-10 w-[480px] text-center">
                    <h2 className=" max-sm:text-2xl text-3xl pb-5 font-semibold text-blue-500">Sign Up</h2>
                    <div className=" pb-5 text-left">
                        <input value={dataInfo.name} onChange={(e) => setData({ ...dataInfo, name: e.target.value })} className=" max-sm:text-sm w-full border rounded-md py-2 outline-none px-3" placeholder="Name ..." type="text" name="" id="" />
                        {
                            (validate == true && dataInfo.name.trim() == "") && <span className=" text-red-500 text-left">Name field is required*</span>
                        }
                    </div>
                    <div className=" pb-5 text-left">
                        <input value={dataInfo.email} onChange={(e) => setData({ ...dataInfo, email: e.target.value })} className="max-sm:text-sm  w-full border rounded-md py-2 outline-none px-3" placeholder="Email ..." type="email" name="" id="" />
                        {
                            (validate == true && dataInfo.email.trim() == "") && <span className=" text-red-500 text-left">Email field is required*</span>
                        }
                        {
                            email == true && <span className=" text-red-500 text-left">Email must be valid*</span>
                        }
                    </div>
                    <div className=" pb-5 text-left">
                        <input value={dataInfo.phone} onChange={(e) => setData({ ...dataInfo, phone: e.target.value })} className="max-sm:text-sm  w-full border rounded-md py-2 outline-none px-3" placeholder="Phone ..." type="text" name="" id="" />
                        {
                            (validate == true && dataInfo.phone.trim() == "") && <span className=" text-red-500 text-left">Phone field is required*</span>
                        }
                    </div>
                    <div className="pb-5 text-left">
                        <input value={dataInfo.address} onChange={(e) => setData({ ...dataInfo, address: e.target.value })} className=" max-sm:text-sm w-full border rounded-md py-2 outline-none px-3" placeholder="Address ..." type="text pb-5" name="" id="" />
                        {
                            (validate == true && dataInfo.address.trim() == "") && <span className=" text-red-500 text-left">Address field is required*</span>
                        }
                    </div>
                    <div className=" grid grid-cols-2 gap-5 text-left">
                        <div>
                            <input value={dataInfo.password} onChange={(e) => setData({ ...dataInfo, password: e.target.value })} className="max-sm:text-sm  w-full border rounded-md py-2 outline-none px-3" placeholder="Password ..." type="password" name="" id="" />
                            {
                                (validate == true && dataInfo.password.trim() == "") && <span className=" text-red-500 text-left">Password field is required*</span>
                            }
                        </div>
                        <div>
                            <input value={dataInfo.confirmPassword} onChange={(e) => setData({ ...dataInfo, confirmPassword: e.target.value })} className="max-sm:text-sm  w-full border rounded-md py-2 outline-none px-3" placeholder="Confirm Password ..." type="password" name="" id="" />
                            {
                                (validate == true && dataInfo.confirmPassword.trim() == "") && <span className=" text-red-500 text-left">Confirm Password field is required*</span>
                            }
                            {
                                checkPassword == true && <span className=" text-red-500 text-left">Password must match*</span>
                            }
                        </div>
                    </div>
                    <div className=" pt-8">
                        <button disabled={loading} onClick={submitHandler} className=" max-sm:text-base bg-blue-500 text-white pt-1 pb-2 px-10 rounded-full text-lg">
                            {loading ? "Loading ..." : " Sign up"}
                        </button>
                    </div>
                    <div className=" pt-5">
                        <span className=" max-sm:text-base text-lg pr-1 text-gray-600">Already have an account?</span>
                        <Link to={'/auth/login'} className=" text-blue-500">Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register