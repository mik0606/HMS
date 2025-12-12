import React from 'react';

const DoctorDashboard = () => {
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Doctor Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <h3 className="text-lg font-semibold text-gray-700">Today's Appointments</h3>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">12</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <h3 className="text-lg font-semibold text-gray-700">Pending Reports</h3>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">5</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <h3 className="text-lg font-semibold text-gray-700">Total Patients</h3>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">1,240</p>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
