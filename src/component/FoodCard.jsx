import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slice/cartSlice';

const FoodCard = ({ image, title, description, price, id }) => {
  const dispatch = useDispatch();


  const { user } = useSelector((state) => state.auth)


  const addToCartHandler = async (e) => {
    e.preventDefault();
    const cartItem = { image, title, description, price, id };

    const obj = {
      ...cartItem,
      userId: user._id
    }



    try {
      const response = await fetch('http://localhost:4000/api/v1/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)

      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      const result = await response.json();

      if (result.success) {
        dispatch(addToCart(cartItem));
        console.log('Product added successfully');
      } else {
        console.log('Failed to add product');
      }
    } catch (error) {
      console.log('Failed to add product');
    }
  };

  return (
    <div className="relative font-[sans-serif] bg-white shadow-md rounded-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700 mb-4 truncate">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">RS {price}/-</span>
          <button
            onClick={addToCartHandler}
            className="bg-transparent text-black text-base font-semibold py-2 px-4 border-2 border-black rounded hover:bg-black hover:text-white transition duration-300 ease-in-out"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;