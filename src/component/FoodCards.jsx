import React from 'react';
import FoodCard from './FoodCard';

const FoodCards = ({ products }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
            {products.map((product) => (
                <FoodCard
                    key={product._id}
                    image={product.image}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    id={product._id}
                />
            ))}
        </div>
    );
};

export default FoodCards;
