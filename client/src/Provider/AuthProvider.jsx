/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { checkLoginOrNot } from "../apicalls/auth/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userAction } from "../store/userSlice";

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const errorAlert = (response) => {
        Swal.fire({
            title: 'Error!',
            text: response.message,
            icon: 'error',
            confirmButtonText: 'Cool'
        })
    }

    const checkAuth = async () => {
        try {
            const response = await checkLoginOrNot();

            if (!response.success) {
                localStorage.removeItem('token');
                localStorage.removeItem('nav');
                localStorage.removeItem('hover');
                dispatch(userAction.setToken(''))
                dispatch(userAction.setUser([]))
                navigate('/auth/login');
                return;
            }

        } catch (error) {
            errorAlert(error);
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <div>
            {children}
        </div>
    )
}

export default AuthProvider