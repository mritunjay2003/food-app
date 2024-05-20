import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: "USER"
    });

    const navigate =  useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const loginObj = {
            ...formData
        };
    
        console.log(loginObj);
    
        fetch("http://localhost:4000/api/v1/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginObj)
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok ' + res.statusText);
            }
            return res.json();
        })
        .then((data) => {
            console.log('Success:', data);
            navigate("/login")
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle error, e.g., show an error message to the user
        });
    };
    

    return (
        <div className="max-w-4xl mx-auto font-[sans-serif] text-[#000] p-6">
            <div className="text-center mb-16">
                <a href="javascript:void(0)">
                <h1 className="text-center text-3xl font-extrabold"><b>F</b>ood <b>O</b>rdering</h1>
                </a>
                <h4 className="text-base font-semibold mt-3">Sign up into your account</h4>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-y-7 gap-x-12">
                    <div>
                        <label className="text-sm mb-2 block">First Name</label>
                        <input
                            name="firstName"
                            type="text"
                            className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-black-500"
                            placeholder="Enter name"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-sm mb-2 block">Last Name</label>
                        <input
                            name="lastName"
                            type="text"
                            className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                            placeholder="Enter last name"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-sm mb-2 block">Email Id</label>
                        <input
                            name="email"
                            type="email"
                            className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="text-sm mb-2 block">Password</label>
                        <input
                            name="password"
                            type="password"
                            className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-sm mb-2 block">Confirm Password</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                            placeholder="Enter confirm password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="!mt-10">
                    <button type="submit" className="min-w-[150px] py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none">
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
