import React from 'react';

const Banner = () => {
  return (
    <div className="relative font-[sans-serif] before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-50 before:z-10">
      <img src="https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGZvb2QlMjBwaXp6YXxlbnwwfHwwfHx8MA%3D%3D" alt="Banner Image" className="absolute inset-0 w-full h-full object-cover" />
      <div className="min-h-[300px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6">
        <h2 className="sm:text-4xl text-2xl font-bold mb-6">Pizza|Burger|ColdDrink</h2>
        <p className="text-lg text-center text-gray-200"> ORDER YOUR DREAM FOOD FAST</p>
        <a href="javascript:void(0)"
          className="mt-8 bg-transparent text-white text-base font-semibold py-2.5 px-6 border-2 border-white rounded hover:bg-white hover:text-black transition duration-300 ease-in-out">
          Order Now
        </a>
      </div>
    </div>
  );
};

export default Banner;
