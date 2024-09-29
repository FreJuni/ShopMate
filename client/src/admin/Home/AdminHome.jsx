import { useEffect, useState } from "react";
import Card from "../Components/Admin/Card";
import Swal from "sweetalert2";
import { getOrders, getPendingProduct } from "../../apicalls/admin/order/order";
import { getUsers } from "../../apicalls/admin/list/list";
import { getTotalPrice } from "../../apicalls/admin/product/product";
import 'ldrs/ring'
import { dotSpinner } from 'ldrs'
import LineCart from "../Chart/LineCart";

const Index = () => {
    const [pending, setPending] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState();
    const [loading, setLoading] = useState(false);
    dotSpinner.register()

    const errorAlert = (response) => {
        Swal.fire({
            title: 'Error!',
            text: response.message,
            icon: 'error',
            confirmButtonText: 'Cool'
        })
    }

    const getPending = async () => {
        try {
            const response = await getPendingProduct();

            if (!response.success) {
                throw new Error(response.message);
            }

            setPending(response.pendingDoc);
        } catch (error) {
            errorAlert(error);
        }
    }

    const getAllOrders = async () => {
        setLoading(true);
        try {
            const response = await getOrders();

            if (!response.success) {
                throw new Error(response.message);
            }

            setOrders(response.payDoc);

        } catch (error) {
            errorAlert(error);
        }
        setLoading(false);
    }

    const getAllUsers = async () => {
        try {
            const response = await getUsers();

            if (!response.success) {
                throw new Error(response.message);
            }

            setUsers(response.userDoc);

        } catch (error) {
            errorAlert(error);
        }
    }

    const getAllTotalPrice = async () => {
        try {
            const response = await getTotalPrice();

            if (!response.success) {
                throw new Error(response.message);
            }

            setTotal(response.total);

        } catch (error) {
            errorAlert(error);
        }
    }


    useEffect(() => {
        getAllOrders();
        getPending();
        getAllUsers();
        getAllTotalPrice();
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
                </div> : <>
                    {
                        pending && users && orders && total && <div className=" w-full p-3">
                            <div className=" max-sm:grid-cols-1 max-lg:grid-cols-2 grid grid-cols-4 gap-8">
                                <Card title={"TODAY'S MONEY"} content={`${total} MMK`} icon={<i className="fa-solid fa-money-check-dollar text-lg"></i>} />
                                <Card title={"USER'S"} content={users.length} icon={<i className="fa-solid fa-users text-lg"></i>} />
                                <Card title={"ORDER'S"} content={orders.length} icon={<i className="fa-solid fa-cart-shopping text-xl"></i>} />
                                <Card title={"PENDING"} content={pending.length} icon={<i className="fa-regular fa-hourglass-half text-xl"></i>} />
                            </div>

                            <div className="  pt-10">
                                <LineCart />
                            </div>
                        </div>
                    }
                </>
            }
        </>

    )
}

export default Index;