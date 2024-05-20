import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CartItem = ({ item, onQuantityChange, quantity, id, onRemove }) => {
    const { name, description, image, price, } = item;

    const descriptionWords = description.split(' ');

    // Take the first 20 words
    const shortenedDescription = descriptionWords.slice(0, 10).join(' ');
    return (
        <tr>

            <td className="py-6 px-4">
                <div className="flex items-center gap-4 w-max">
                    <div className="h-36 shrink-0">
                        <img src={item.image} alt={item.description} className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <p className="text-lg font-bold text-gray-800  ">{shortenedDescription}</p>
                    </div>
                </div>
            </td>
            <td className="py-6 px-4">
                <button type="button" className="bg-transparent border flex items-center justify-center w-11 h-10 font-semibold text-base">
                    {item.size}
                </button>
            </td>
            <td className="py-6 px-4">
                <div className="flex overflow-hidden border w-max">
                    <button type="button" className="bg-gray-100 flex items-center justify-center w-11 h-10 font-semibold" onClick={() => onQuantityChange(id, quantity - 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-current" viewBox="0 0 124 124">
                            <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                        </svg>
                    </button>
                    <button type="button" className="bg-transparent flex items-center justify-center w-11 h-10 font-semibold text-gray-800 text-base">
                        {quantity}
                    </button>
                    <button type="button" className="bg-gray-800 text-white flex items-center justify-center w-11 h-10 font-semibold" onClick={() => onQuantityChange(id, quantity + 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-current" viewBox="0 0 42 42">
                            <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
                        </svg>
                    </button>
                </div>
            </td>
            <td className="py-6 px-4">
                <button type="button" className="bg-transparent border flex items-center justify-center w-11 h-10 font-semibold" onClick={() => onRemove(item.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-red-500 inline cursor-pointer" viewBox="0 0 24 24">
                        <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" data-original="#000000"></path>
                        <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" data-original="#000000"></path>
                    </svg>
                </button>
            </td>
            <td className="py-6 px-4">
                <h4 className="text-lg font-bold text-gray-800">Rs {item.price.toFixed(2)}/-</h4>
            </td>
        </tr>
    );
};

const Cart = () => {
    const [cartItems, setCartItems] = useState([

    ]);


    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    const handleQuantityChange = async (id, quantity) => {
        const obj = {
            id: id,
            quantity: quantity
        };

        try {
            const response = await fetch(`http://localhost:4000/api/v1/cart`, {
                method: 'PUT',
                body: JSON.stringify(obj)
            });

            if (!response.ok) {
                throw new Error('Failed to update quantity');
            }

            getAllCartItems();
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const handleRemove = async (id) => {
        const userObj = { userId: user._id, itemId: id };
        console.log(userObj);

        try {
            const response = await fetch(`http://localhost:4000/api/v1/cart/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userObj)
            });

            if (!response.ok) {
                throw new Error('Failed to remove item from cart');
            }

            getAllCartItems();
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };



    async function getAllCartItems() {
        try {
            const response = await fetch(`http://localhost:4000/api/v1/cart/${user._id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch cart items');
            }
            const data = await response.json();
            setCartItems(data.updatedCartItem)
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    }

    useEffect(() => {
        getAllCartItems()
    }, [user])

    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shipping = 4.0;
    const tax = 4.0
    const total = subtotal + shipping + tax;

    return (
        <div className="font-sans bg-white max-w-6xl mx-auto p-4">
            <h2 className="text-3xl font-extrabold text-gray-800">Your Cart</h2>
            <div className="overflow-x-auto">
                <table className="mt-12 w-full border-collapse divide-y">
                    <thead className="whitespace-nowrap text-left">
                        <tr>
                            <th className="text-base text-gray-500 p-2">Description</th>
                            <th className="text-base text-gray-500 p-2">Size</th>
                            <th className="text-base text-gray-500 p-2">Quantity</th>
                            <th className="text-base text-gray-500 p-2">Remove</th>
                            <th className="text-base text-gray-500 p-2">Price</th>
                        </tr>
                    </thead>
                    <tbody className="whitespace-nowrap divide-y">
                        {cartItems.map(item => (
                            <CartItem
                                key={item._id}
                                item={item.product}
                                id={item._id}
                                quantity={item.quantity}
                                onQuantityChange={handleQuantityChange}
                                onRemove={handleRemove}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="max-w-xl ml-auto mt-4">
                <ul className="text-gray-800 divide-y">
                    <li className="flex flex-wrap gap-4 text-base py-3">Subtotal <span className="ml-auto font-bold">Rs {subtotal.toFixed(2)}/-</span></li>
                    <li className="flex flex-wrap gap-4 text-base py-3">Shipping <span className="ml-auto font-bold">Rs {shipping.toFixed(2)}/-</span></li>
                    <li className="flex flex-wrap gap-4 text-base py-3">Tax <span className="ml-auto font-bold">Rs {tax.toFixed(2)}/-</span></li>
                    <li className="flex flex-wrap gap-4 text-base py-3 font-bold">Total <span className="ml-auto">Rs {total.toFixed(2)}/-</span></li>
                </ul>
                <button onClick={() => {
                    navigate("/checkout")

                }} type="button" className="mt-6 text-base px-6 py-2 w-full bg-gray-800 hover:bg-gray-900 text-white rounded">Check out</button>
            </div>
        </div>
    );
};

export default Cart;
