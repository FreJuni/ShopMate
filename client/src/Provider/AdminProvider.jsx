/* eslint-disable react/prop-types */
import { useEffect } from "react";
import Swal from "sweetalert2";
import { checkAdminOrNot } from "../apicalls/auth/auth";

const AdminProvider = ({ children }) => {
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
            const response = await checkAdminOrNot();

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

export default AdminProvider