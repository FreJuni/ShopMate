import { useEffect, useState } from "react"
import Footer from "../Footer/Footer"
import Starter from "../Starter/Starter"
import Swal from "sweetalert2";
import { contact } from "../../apicalls/user/user";

const Contact = () => {
    const [validate, setValidate] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [checkEmail, setCheckEmail] = useState(false);
    const [check, setCheck] = useState(false);
    const [loading, setLoading] = useState(false);


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
            if (validate.name.trim() == '' || validate.email.trim() == '' || validate.message.trim() == '') {
                setCheck(true);
            } else {
                if (!validate.email.includes("@gmail.com")) {
                    setCheckEmail(true);
                } else {
                    const data = {
                        name: validate.name,
                        email: validate.email,
                        message: validate.message,
                    }
                    const response = await contact(data);
                    if (!response.success) {
                        throw new Error(response.message);
                    }
                    successAlert(response);
                    setValidate({
                        message: '',
                        name: '',
                        email: ''
                    })
                }
            }
            setLoading(false);
        } catch (error) {
            errorAlert(error);
        }
    }

    useEffect(() => {
        setCheckEmail(false);
    }, [validate.email, validate.name, validate.message]);

    return (
        <div>
            <Starter title={"Contact"} />
            <div>
                <div className=" max-[400px]:px-12 max-[500px]:px-16 max-[900px]:px-20 my-20 p-10 px-40 shadow-md rounded-md">
                    <div className=" max-sm:flex-col flex gap-10">
                        <div className="w-full">
                            <input value={validate.name} onChange={(e) => setValidate({ ...validate, name: e.target.value })} className=" w-full border rounded-md outline-none py-3 px-4" type="text" placeholder="Name ..." name="" id="" />
                            {
                                (check && validate.name.trim() == '') && <span className=" text-red-500">
                                    Name field is required*
                                </span>
                            }
                        </div>
                        <div className="w-full">
                            <input value={validate.email} onChange={(e) => setValidate({ ...validate, email: e.target.value })} className=" w-full border rounded-md outline-none py-3 px-4" type="email" placeholder="Email ..." name="" id="" />
                            {
                                (check && validate.email.trim() == '') && <span className=" text-red-500">
                                    Email field is required*
                                </span>
                            }
                            {
                                checkEmail && <span className=" text-red-500">
                                    Email must be valid*
                                </span>
                            }
                        </div>
                    </div>
                    <div className=" pt-6">
                        <textarea value={validate.message} onChange={(e) => setValidate({ ...validate, message: e.target.value })} placeholder="Message ..." className=" resize-none border rounded-md outline-none py-3 px-4 w-full" rows={8} name="" id=""></textarea>
                        {
                            (check && validate.message.trim() == '') && <span className=" text-red-500">
                                Message field is required*
                            </span>
                        }
                    </div>
                    <div className=" pt-4">
                        <button disabled={loading} onClick={submitHandler} className=" text-lg font-semibold max-md:text-base max-sm:py-1 rounded-md bg-orange-500 text-white py-2 w-full">CONTACT</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact