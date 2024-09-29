import { useEffect, useRef, useState } from "react";
import defaultProfile from '../../../public/defaultProfile/defaultProfile.jpg';
import Swal from 'sweetalert2'
import { getUserInformation, updateProfile } from "../../apicalls/admin/profile/profile";
import { useSelector } from "react-redux";

const Profile = () => {
    const [loading, setLoading] = useState(false);
    const [condition, setCondition] = useState(true);
    const [checkEmail, setCheckEmail] = useState(false);
    const elementRef = useRef();
    const [image, setImage] = useState([]);
    const [user, setUser] = useState([]);
    const id = useSelector((state) => state.reducer.userInfo.user.userId);
    const imageConRef = useRef();

    const [dataInfo, setDataInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

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
            title: 'Success!',
            text: response.message,
            icon: 'success',
            confirmButtonText: 'Cool'
        })
    }

    const getUserInfo = async () => {
        try {
            const response = await getUserInformation(id);

            if (!response.success) {
                throw new Error(response.message);
            }

            setDataInfo({ name: response.userDoc[0].name, email: response.userDoc[0].email, phone: response.userDoc[0].phone == undefined ? "" : response.userDoc[0].phone, address: response.userDoc[0].address == undefined ? "" : response.userDoc[0].address })
            setUser(response.userDoc);
        } catch (error) {
            errorAlert(error);
        }
    }

    useEffect(() => {
        getUserInfo();
    }, [])


    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (dataInfo.name.trim() == '' || dataInfo.email.trim() == '' || dataInfo.phone.trim() == '' || dataInfo.address.trim() == '') {
            setCondition(false);
        } else {
            if (!dataInfo.email.includes('@gmail.com')) {
                setCheckEmail(true);
            } else {
                setCondition(true);

                const formData = new FormData();

                formData.append('name', dataInfo.name);
                formData.append('email', dataInfo.email);
                formData.append('phone', dataInfo.phone);
                formData.append('address', dataInfo.address);
                formData.append('userId', id);
                formData.append('image', image);

                try {
                    const response = await updateProfile(formData);

                    if (!response.success) {
                        throw new Error(response.message);
                    }

                    getUserInfo();
                    successAlert(response);
                } catch (error) {
                    errorAlert(error);
                }
            }

        }
        setLoading(false);
    }

    useEffect(() => {
        setCheckEmail(false);
    }, [
        dataInfo.email,
    ])

    const onChangeHandler = (e) => {
        const imageToShow = e.target.files;
        setImage(imageToShow[0]);
        imageConRef.current.src = URL.createObjectURL(imageToShow[0]);
    }

    return (
        <form className=' max-xl:my-10 max-sm:p-5 shadow-md p-10 rounded-sm w-5/5  mx-5 ' encType='multipart/form-data'>
            <h2 className=' font-bold text-xl text-gray-500'>Profile</h2>
            <div className='max-lg:grid-cols-1 max-sm:gap-3 grid gap-6 grid-cols-[330px_minmax(0,1fr)]  '>
                <div className=' pt-6 '>
                    <div className='relative'>
                        {
                            user.length > 0 && (
                                user[0].image == null ? <img ref={imageConRef} id='image' className='max-lg:!h-72 max-sm:!h-60 w-full object-cover border-[6px] border-gray-300 rounded-md ' style={{ height: '370px' }} src={defaultProfile} alt="" /> : <img ref={imageConRef} id='image' className='max-lg:!h-72 max-sm:!h-60 w-full object-cover border-[6px] border-gray-300 rounded-md ' style={{ height: '370px' }} src={user[0].image} alt="" />
                            )
                        }
                        <div className='absolute bottom-9 right-48 max-lg:inset-0 max-lg:relative'>
                            <div
                                onClick={() => {
                                    elementRef.current.click();
                                }}
                                className='absolute max-lg:relative max-lg:left-1/2 max-lg:top-1/2 max-lg:transform max-lg:-translate-x-1/2 max-lg:-translate-y-1/2 p-8 rounded-full w-10 h-10 text-center bg-blue-500 text-white cursor-pointer select-none'
                            >
                                <span className='absolute top-2 right-0 text-sm'>
                                    Add photo
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <input name='image' onChange={(event) => onChangeHandler(event)} ref={elementRef} type="file" hidden />
                <div className=''>
                    <div className='grid max-sm:grid-cols-1 grid-cols-2 gap-x-10 gap-y-3'>
                        <div className=''>
                            <label htmlFor="Name" className=' font-semibold text-gray-500 pb-4'>Name</label>
                            <input type="text" name='name' value={dataInfo.name} onChange={(e) => setDataInfo({ ...dataInfo, name: e.target.value })} className=" w-full py-2 px-3 outline-none border-2 rounded-md" placeholder="Name ..." />
                            {
                                (condition == false && dataInfo.name.trim() == '') && <span className='  text-red-500 pb-2'>Name field is required*</span>
                            }

                        </div>
                        <div className=' '>
                            <label htmlFor="Email" className=' font-semibold text-gray-500 pb-4'>Email</label>
                            <input type="text" value={dataInfo.email} onChange={(e) => setDataInfo({ ...dataInfo, email: e.target.value })} className=" w-full py-2 px-3 outline-none border-2 rounded-md" name="Email" id="" placeholder="Email ..." />
                            {
                                (condition == false && dataInfo.email.trim() == '') && <span className='  text-red-500 pb-2'>Email field is required*</span>
                            }
                            {
                                checkEmail == true && <span className='  text-red-500 pb-2'>Email must be valid*</span>
                            }

                        </div>

                        <div className=' '>
                            <label htmlFor="Phone" className=' font-semibold text-gray-500 pb-4'>Phone</label>
                            <input type="text" value={dataInfo.phone} onChange={(e) => setDataInfo({ ...dataInfo, phone: e.target.value })} className=" w-full py-2 px-3 outline-none border-2 rounded-md" name="Phone" id="" placeholder="Phone ..." />
                            {
                                (condition == false && dataInfo.phone.trim() == '') && <span className='  text-red-500 pb-2'>Phone field is required*</span>
                            }

                        </div>

                        <div className=' '>
                            <label htmlFor="Address" className=' font-semibold text-gray-500 '>Address</label>
                            <input type="text" value={dataInfo.address} onChange={(e) => setDataInfo({ ...dataInfo, address: e.target.value })} className=" w-full py-2 px-3 outline-none border-2 rounded-md" name="Address" id="" placeholder="Address ..." />
                            {
                                (condition == false && dataInfo.address.trim() == '') && <span className='  text-red-500 pb-2'>Address field is required*</span>
                            }

                        </div>
                    </div>
                    <div className=' pt-3'>
                        <button type='submit' onClick={submitHandler} className=' mt-2 rounded-md  cursor-pointer  max-sm:p-1 hover:shadow-sm duration-75 bg-blue-500 text-white w-full p-2 font-semibold text-lg'>{loading ? "Loading ..." : 'Update'}</button>

                    </div>
                </div>
            </div>
        </form >
    )
}

export default Profile