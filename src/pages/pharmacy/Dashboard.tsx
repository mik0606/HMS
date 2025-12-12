import React from 'react';

const PharmacyDashboard = () => {
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Pharmacy Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <h3 className="text-lg font-semibold text-gray-700">Orders Today</h3>
                    <p className="text-3xl font-bold text-emerald-600 mt-2">45</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <h3 className="text-lg font-semibold text-gray-700">Low Stock Items</h3>
                    <p className="text-3xl font-bold text-red-500 mt-2">8</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
                    <p className="text-3xl font-bold text-emerald-600 mt-2">$2,400</p>
                </div>
            </div>
        </div>
    );
};

export default PharmacyDashboard;
