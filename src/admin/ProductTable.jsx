import React, { useState, useEffect } from 'react';

const ProductTable = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from API
        fetch('http://localhost:4000/api/v1/products') // Replace with your API endpoint
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    const handleEdit = (id) => {
        console.log(`Edit product with id: ${id}`);
        // Implement edit logic here, e.g., open an edit modal
    };

    const handleDelete = (id) => {
        // Delete product via API
        fetch(`http://localhost:4000/api/v1/products/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then(() => {
                // Remove deleted product from state
                setProducts(products.filter((product) => product.id !== id));
            })
            .catch((error) => console.error('Error deleting product:', error));
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Color</th>
                        <th className="py-2 px-4 border-b">Size</th>
                        <th className="py-2 px-4 border-b">Description</th>
                        <th className="py-2 px-4 border-b">Price</th>
                        <th className="py-2 px-4 border-b">Category</th>
                        <th className="py-2 px-4 border-b">Image URL</th>
                        <th className="py-2 px-4 border-b">Image ID</th>
                        <th className="py-2 px-4 border-b">Stock</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">{product.name}</td>
                            <td className="py-2 px-4 border-b">{product.color}</td>
                            <td className="py-2 px-4 border-b">{product.size}</td>
                            <td className="py-2 px-4 border-b">{product.description}</td>
                            <td className="py-2 px-4 border-b">${product.price}</td>
                            <td className="py-2 px-4 border-b">{product.category}</td>
                            <td className="py-2 px-4 border-b">{product.image}</td>
                            <td className="py-2 px-4 border-b">{product.image_id}</td>
                            <td className="py-2 px-4 border-b">{product.stock}</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => handleEdit(product.id)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
