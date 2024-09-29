import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import { getContacts } from "../../apicalls/admin/contact/contact";
import 'ldrs/ring'
import { dotSpinner } from 'ldrs'

const Report = () => {
    const [contact, setContact] = useState([]);
    const [loading, setLoading] = useState(false);
    dotSpinner.register();

    const errorAlert = (response) => {
        Swal.fire({
            title: 'Error!',
            text: response.message,
            icon: 'error',
            confirmButtonText: 'Cool'
        })
    }

    const getAllContact = async () => {
        setLoading(true);
        try {
            const response = await getContacts();

            if (!response.success) {
                throw new Error(response.message);
            }

            setContact(response.contactDoc);
        } catch (error) {
            errorAlert(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        getAllContact();
    }, []);

    return (
        <>
            {
                loading ? <div className=" w-full h-[600px] grid place-items-center">
                    < l-dot-spinner
                        size="80"
                        speed="0.9"
                        color="#3B82F6"
                    ></l-dot-spinner >
                </div > : <div className=" mx-3">
                    <div className=" max-md:py-10">
                        {
                            contact && contact.map((item) => {
                                return <div key={item._id} className=" w-2/3 max-sm:w-full bg-gray-100 p-4 rounded-md mb-5">
                                    <p className="text-gray-600 pt-1">{item.message}</p>
                                    <div className=" pt-3 flex  justify-end">
                                        <p className=" max-sm:text-base text-lg font-semibold text-gray-600">{item.name}</p>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Report