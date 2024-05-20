import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Card from './Card'

const Dashboard = () => {
    return (
        <div className="p-6">
            <div className='mb-4'>
                <Navbar />

            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: "2fr 10fr"
            }}>
                <div>
                    <Sidebar />
                </div>

                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                    <div className='shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] h-52'>
                        <Card heading={"Total users"} count="100" action="view" />
                    </div>
                    <div className='shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] h-52'>
                        <Card heading={"Total products"} count="500" action="view" />
                    </div>
                    <div className='shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] h-52'>
                        <Card heading={"Total Sales"} count="1000" action="view" />
                    </div>
                    <div className='shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] h-52'>
                        <Card heading={"Total Orders"} count="500" action="view" />
                    </div>


                </div>
            </div>





        </div>
    );
};

export default Dashboard;
