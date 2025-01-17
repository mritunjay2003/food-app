import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {


    const [order, setOrder] = useState([])
    const { user } = useSelector((state) => state.auth)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();



        console.log(formData);

        const orderObj = {
            ...formData,
            totalAmount: subtotal,
            totalItems: order.length,
            items: order,
            userId: user._id
        };

        console.log(orderObj);

        try {
            const response = await fetch(`http://localhost:4000/api/v1/order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderObj)
            });

            if (!response.ok) {
                throw new Error('Failed to create order');
            }

            const responseData = await response.json();
            console.log(responseData);

            navigate('/captcha');
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const navigate = useNavigate()


    async function getAllCartItems() {
        try {
            const response = await fetch(`http://localhost:4000/api/v1/cart/${user._id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch cart items');
            }
            const data = await response.json();
            setOrder(data.updatedCartItem)
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    }

    const subtotal = order.reduce((sum, item) => sum + item.product.price * item.quantity, 0);







    useEffect(() => {
        getAllCartItems()

    }, [])

    return (
        <div className="font-[sans-serif] bg-gray-50">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 h-full">
                <div className="bg-[#3f3f3f] lg:h-screen lg:sticky lg:top-0">
                    <div className="relative h-full">
                        <div className="p-8 lg:overflow-auto lg:h-[calc(100vh-60px)]">
                            <h2 className="text-2xl font-bold text-white">Order Summary</h2>
                            <div className="space-y-6 mt-10">

                                <div className="space-y-6 mt-10">
                                    {order.map((o) => (
                                        <div key={o._id} className="grid sm:grid-cols-2 items-start gap-6">


                                            <div className="px-4 py-6 shrink-0 bg-gray-50 rounded-md">
                                                <img src={o.product.image} className="w-full object-contain" alt={o.name} />
                                            </div>
                                            <div>
                                                <h3 className="text-base text-white">{o.product.name}</h3>
                                                <ul className="text-xs text-white space-y-3 mt-4">
                                                    <li>Size <span className="float-right">{o.product.size}</span></li>
                                                    <li>Quantity <span className="float-right">{o.quantity}</span></li>
                                                    <li>Total Price <span className="float-right">{`RS ${o.product.price * o.quantity} /-`}</span></li>
                                                </ul>
                                            </div>


                                        </div>
                                    ))}
                                </div>


                            </div>
                        </div>
                        <div className="absolute left-0 bottom-0 bg-[#444] w-full p-4">
                            <h4 className="flex flex-wrap gap-4 text-base text-white">Total <span className="ml-auto">Rs {subtotal} /-</span></h4>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-2 h-max rounded-md p-8 sticky top-0">
                    <h2 className="text-2xl font-bold text-[#333]">Complete your order</h2>
                    <form className="mt-10">
                        <div>
                            <h3 className="text-lg font-bold text-[#333] mb-6">Personal Details</h3>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="relative flex items-center">
                                    <input type="text" placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        name='firstName'
                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4"
                                        viewBox="0 0 24 24">
                                        <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                        <path
                                            d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                            data-original="#000000"></path>
                                    </svg>
                                </div>
                                <div className="relative flex items-center">
                                    <input type="text" placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        name='lastName'
                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4"
                                        viewBox="0 0 24 24">
                                        <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                        <path
                                            d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                            data-original="#000000"></path>
                                    </svg>
                                </div>
                                <div className="relative flex items-center">
                                    <input type="email" placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        name='email'
                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4"
                                        viewBox="0 0 682.667 682.667">
                                        <defs>
                                            <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                                <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                                            </clipPath>
                                        </defs>
                                        <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                            <path fill="none" stroke-miterlimit="10" stroke-width="40"
                                                d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                                                data-original="#000000"></path>
                                            <path
                                                d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                                                data-original="#000000"></path>
                                        </g>
                                    </svg>
                                </div>
                                <div className="relative flex items-center">
                                    <input type="number" placeholder="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        name='mobile'
                                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                                    <svg fill="#bbb" className="w-[18px] h-[18px] absolute right-4" viewBox="0 0 64 64">
                                        <path
                                            d="m52.148 42.678-6.479-4.527a5 5 0 0 0-6.963 1.238l-1.504 2.156c-2.52-1.69-5.333-4.05-8.014-6.732-2.68-2.68-5.04-5.493-6.73-8.013l2.154-1.504a4.96 4.96 0 0 0 2.064-3.225 4.98 4.98 0 0 0-.826-3.739l-4.525-6.478C20.378 10.5 18.85 9.69 17.24 9.69a4.69 4.69 0 0 0-1.628.291 8.97 8.97 0 0 0-1.685.828l-.895.63a6.782 6.782 0 0 0-.63.563c-1.092 1.09-1.866 2.472-2.303 4.104-1.865 6.99 2.754 17.561 11.495 26.301 7.34 7.34 16.157 11.9 23.011 11.9 1.175 0 2.281-.136 3.29-.406 1.633-.436 3.014-1.21 4.105-2.302.199-.199.388-.407.591-.67l.63-.899a9.007 9.007 0 0 0 .798-1.64c.763-2.06-.007-4.41-1.871-5.713z"
                                            data-original="#000000"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-lg font-bold text-[#333] mb-6">Shipping Address</h3>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <input type="text" placeholder="Address Line"
                                    value={formData.address}
                                    name='address'
                                    onChange={handleChange}
                                    className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                                <input type="text" placeholder="City"
                                    value={formData.city}
                                    onChange={handleChange}
                                    name='city'
                                    className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                                <input type="text" placeholder="State"
                                    value={formData.state}
                                    onChange={handleChange}
                                    name='state'
                                    className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                                <input type="text" placeholder="Zip Code"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    name='zipCode'
                                    className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                            </div>
                            <div className="flex gap-6 max-sm:flex-col mt-10">
                                <button type="button" className="rounded-md px-6 py-3 w-full text-sm font-semibold bg-transparent hover:bg-gray-100 border-2 text-[#333]">Cancel</button>
                                <button onClick={handleSubmit} type="button" className="rounded-md px-6 py-3 w-full text-sm font-semibold bg-[#333] text-white hover:bg-[#222]">Complete Purchase</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
