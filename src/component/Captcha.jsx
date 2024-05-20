import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Captcha = () => {
    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [userInput, setUserInput] = useState('');
    const [verificationResult, setVerificationResult] = useState('');

    const { user } = useSelector((state) => state.auth)

    function generateCaptcha() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            captcha += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return captcha;
    }

    function refreshCaptcha() {
        setCaptcha(generateCaptcha());
        setVerificationResult('');
        setUserInput('');
    }

    async function handleVerify() {
        if (userInput === captcha) {
            try {
                // Remove items from the cart
                const removeCartResponse = await fetch(`http://localhost:4000/api/v1/cart/remove`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!removeCartResponse.ok) {
                    throw new Error('Failed to remove items from cart');
                }

                const cartData = await removeCartResponse.json();
                console.log(cartData);

                // Update the order status
                const updateOrderResponse = await fetch(`http://localhost:4000/api/v1/order/${user._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!updateOrderResponse.ok) {
                    throw new Error('Failed to update order');
                }

                const orderData = await updateOrderResponse.json();
                console.log(orderData);

                setVerificationResult('Verification successful!');
            } catch (error) {
                console.error('Error during verification:', error);
                setVerificationResult('Verification failed. Please try again.');
            }
        } else {
            setVerificationResult('Verification failed. Please try again.');
        }
    }


    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-gray-200 p-8 rounded-lg shadow-md">
                <label htmlFor="captcha" className="block text-lg font-semibold mb-2">Enter the text you see below:</label>
                <input
                    type="text"
                    id="captcha"
                    name="captcha"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="border border-gray-400 rounded-md py-2 px-4 w-full mb-4"
                    required
                />
                <div className="flex items-center justify-center mb-4">
                    <span className="mr-2">{captcha}</span>
                    <button type="button" onClick={refreshCaptcha} className="text-sm text-gray-600 hover:text-gray-800 focus:outline-none">Refresh</button>
                </div>
                <button onClick={handleVerify} className="bg-blue-500 text-white py-2 px-4 rounded-md focus:outline-none">Verify</button>
                {verificationResult && <p className="text-sm mt-2">{verificationResult}</p>}
            </div>
        </div>
    );
};

export default Captcha;
