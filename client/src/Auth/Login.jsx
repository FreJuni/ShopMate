import { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { login } from "../apicalls/auth/auth";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { userAction } from "../store/userSlice";

const Login = () => {
    const [validate, setValidate] = useState(false);
    const [email, setEmail] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    localStorage.removeItem('hover');
    localStorage.removeItem('nav');

    const [dataInfo, setData] = useState({
        email: "",
        password: "",
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
            if (dataInfo.email.trim() == "" || dataInfo.password.trim() == "") {
                setValidate(true);
            } else {
                if (!dataInfo.email.includes("@gmail.com")) {
                    setEmail(true);
                } else {
                    const data = {
                        email: dataInfo.email,
                        password: dataInfo.password,
                    }

                    const response = await login(data);

                    if (!response.success) {
                        throw new Error(response.message);
                    }

                    if (response.userInfo.userRole == 'superadmin' || response.userInfo.userRole == 'admin') {
                        navigate('/admin');
                    } else {
                        navigate('/user/home');
                    }

                    dispatch(userAction.setToken(response.token));
                    dispatch(userAction.setUser(response.userInfo));
                    localStorage.setItem('token', response.token);

                    successAlert(response);
                }
            }
            setLoading(false);
        } catch (error) {
            errorAlert(error);
        }
    }

    useEffect(() => {
        setValidate(false);
        setEmail(false);
    }, [])

    return (
        <div className=" flex justify-center">
            <div className="  pt-28">
                <div className=" max-[500px]:w-[350px] max-sm:w-[380px] max-lg:w-[420px] shadow-md rounded-md px-5 pt-5 pb-10 w-[480px] text-center">
                    <h2 className=" max-sm:text-2xl text-3xl pb-5 font-semibold text-blue-500">Sign In</h2>
                    <div className=" pb-5 text-left">
                        <input value={dataInfo.email} onChange={(e) => setData({ ...dataInfo, email: e.target.value })} className="max-sm:text-sm  w-full border rounded-md py-2 outline-none px-3" placeholder="Email ..." type="email" name="" id="" />
                        {
                            (validate == true && dataInfo.email.trim() == "") && <span className=" text-red-500 text-left">Email field is required*</span>
                        }
                        {
                            email == true && <span className=" text-red-500 text-left">Email must be valid*</span>
                        }
                    </div>
                    <div className=" text-left">
                        <input value={dataInfo.password} onChange={(e) => setData({ ...dataInfo, password: e.target.value })} className="max-sm:text-sm  w-full border rounded-md py-2 outline-none px-3" placeholder="Password ..." type="password" name="" id="" />
                        {
                            (validate == true && dataInfo.password.trim() == "") && <span className=" text-red-500 text-left">Password field is required*</span>
                        }
                    </div>
                    <div className=" pt-2 pb-5 text-left flex justify-between items-center">
                        <div><input type="checkbox" name="" id="" /> <span className=" max-sm:text-sm text-gray-600 font-semibold">Remember me</span></div>
                        <div>
                            <Link className=" max-sm:text-sm text-blue-500 underline">Forget Password</Link>
                        </div>
                    </div>
                    <div className=" pt-3">
                        <button disabled={loading} onClick={submitHandler} className=" max-sm:text-base bg-blue-500 text-white pt-1 pb-2 px-10 rounded-full text-lg">
                            {loading ? 'Loading ...' : ' Sign in'}
                        </button>
                    </div>
                    <div className=" pt-5">
                        <p className=" max-sm:text-base text-lg text-gray-600">Don&apos;t have an account?</p>
                        <Link to={'/auth/register'} className=" text-sm text-blue-500">Create new account</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login