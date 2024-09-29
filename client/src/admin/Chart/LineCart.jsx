/* eslint-disable react/prop-types */
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import { getOrder } from '../../apicalls/admin/order/order';
import Swal from 'sweetalert2';
import { format } from 'date-fns';


const LineCart = () => {
    const [order, setOrder] = useState([]);
    const [data, setData] = useState([]);

    const dataUpdate = () => {
        let currentDate = new Date();
        let lastWeek = new Date();
        lastWeek.setDate(currentDate.getDate() - 7);

        const orderDaily = {};

        {
            order && order.map((item) => {
                let orderDate = new Date(item.createdAt);

                if (orderDate >= lastWeek && orderDate <= currentDate) {
                    const formatDate = format(new Date(item.createdAt), 'MM/dd/yyyy');

                    if (!orderDaily[formatDate]) {
                        orderDaily[formatDate] = 0
                    }

                    orderDaily[formatDate] += 1;
                }
            })
        }

        const data = orderDaily && Object.keys(orderDaily).map((item) => (
            {
                name: item,
                Item: orderDaily[item],
            })
        );

        setData(data);
    }

    useEffect(() => {
        dataUpdate()
    }, [order])

    const errorAlert = (response) => {
        Swal.fire({
            title: 'Error!',
            text: response.message,
            icon: 'error',
            confirmButtonText: 'Cool'
        })
    }

    const getAllOrders = async () => {
        try {
            const response = await getOrder();

            if (!response.success) {
                throw new Error(response.message);
            }
            setOrder(response.orderDoc);

        } catch (error) {
            errorAlert(error);
        }
    }

    useEffect(() => {
        getAllOrders();
    }, []);

    return (
        <div>
            <h2 className=' max-sm:text-xl text-2xl text-gray-600 font-bold pb-10'>Order Product Daily</h2>
            <div className=' max-sm:h-[400px] max-lg:h-[450px] h-[500px]'>
                <ResponsiveContainer width='100%' height='100%'>
                    <BarChart width={600} height={300} data={data}>
                        <XAxis dataKey="name" stroke="#8884d8" />
                        <YAxis />
                        <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                        <Legend
                            width={100}
                            wrapperStyle={{
                                top: 40,
                                right: 20,
                                backgroundColor: '#f5f5f5',
                                border: '1px solid #d5d5d5',
                                borderRadius: 3,
                                lineHeight: '40px'
                            }} />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <Bar dataKey="Item" fill="#8884d8" barSize={70} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default LineCart