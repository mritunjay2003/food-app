import React, { useState, useEffect } from 'react';

const ProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        color: '',
        size: '',
        description: '',
        price: '',
        category: '',
        image: null,
        image_id: '',
        stock: ''
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories from API
        fetch('http://localhost:4000/api/v1/category')
            .then((response) => response.json())
            .then((data) => setCategories(data.category))
            .catch((error) => console.error('Error fetching categories:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({
                ...formData,
                image: files[0]
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formDataObj = new FormData();
        for (const key in formData) {
            formDataObj.append(key, formData[key]);
        }

        fetch('http://localhost:4000/api/v1/product', {
            method: 'POST',
            body: formDataObj
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-3xl font-bold mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit}>
                {[
                    { label: 'Name', name: 'name', type: 'text' },
                    { label: 'Color', name: 'color', type: 'text' },
                    { label: 'Size', name: 'size', type: 'text' },
                    { label: 'Description', name: 'description', type: 'textarea' },
                    { label: 'Price', name: 'price', type: 'number' },
                    { label: 'Stock', name: 'stock', type: 'number' }
                ].map(({ label, name, type }) => (
                    <div key={name} className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            {label}
                        </label>
                        {type === 'textarea' ? (
                            <textarea
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        ) : (
                            <input
                                type={type}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        )}
                    </div>
                ))}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Category
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category.title}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Image
                    </label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
