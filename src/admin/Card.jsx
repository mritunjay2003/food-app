import React from 'react';

const Card = ({ heading, count, action }) => {
    return (
        <div className="bg-white  w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
            <div className="px-4 my-6">
                <h3 className="text-lg font-semibold">{heading}</h3>
                <p className="mt-2 text-sm text-gray-400">
                    {count}
                </p>
                <button
                    type="button"
                    className="px-6 py-2 mt-4 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
                >
                    {action}
                </button>
            </div>
        </div>
    );
};

export default Card;
