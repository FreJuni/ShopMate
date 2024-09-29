/* eslint-disable react/prop-types */

import Swal from 'sweetalert2';
import { checkUserOrNot } from '../apicalls/auth/auth';
import { useEffect } from 'react';

const UserProvider = ({ children }) => {
    // const navigate = useNavigate();

    const errorAlert = (response) => {
        Swal.fire({
            title: 'Error!',
            text: response.message,
            icon: 'error',
            confirmButtonText: 'Cool'
        })
    }

    const checkUser = async () => {
        try {
            const response = await checkUserOrNot();

            if (!response.success) {
                window.history.back();
            }

        } catch (error) {
            errorAlert(error);
        }
    }

    useEffect(() => {
        checkUser();
    }, []);

    return (
        <div>{children}</div>
    )
}

export default UserProvider