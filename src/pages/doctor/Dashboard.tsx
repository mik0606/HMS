import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import {
    Stethoscope,
    AlertCircle,
    MessageSquare,
    MoreVertical,
    Calendar,
    Clock,
    User,
    ChevronRight,
    TrendingUp,
    Activity,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const DoctorDashboard = () => {
    // Mock Data
    const dailyVisitorsData = [
        { day: 'Mon', visitors: 45 },
        { day: 'Tue', visitors: 52 },
        { day: 'Wed', visitors: 38 },
        { day: 'Thu', visitors: 65 },
        { day: 'Fri', visitors: 48 },
        { day: 'Sat', visitors: 25 },
        { day: 'Sun', visitors: 15 },
    ];

    const pieData = [
        { name: 'Male', value: 450, color: '#4F46E5' },
        { name: 'Female', value: 850, color: '#EC4899' },
        { name: 'Child', value: 150, color: '#10B981' },
    ];

    const patients = [
        { id: 1, name: 'Philip', age: 63, date: '20.05.2025', diagnosis: 'Partial Paralysis', img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop' },
        { id: 2, name: 'Bernard', age: 22, date: '20.05.2025', diagnosis: 'Seizures', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' },
        { id: 3, name: 'Gregory', age: 56, date: '20.05.2025', diagnosis: 'Muscle Weakness', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop' },
        { id: 4, name: 'Mitchell', age: 70, date: '20.05.2025', diagnosis: 'Decreased Brain', img: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=100&h=100&fit=crop' },
        { id: 5, name: 'Florencia', age: 34, date: '20.05.2025', diagnosis: 'Loss of Sensation', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    ];

    const upcomingAppointments = [
        { id: 1, name: 'Lavern Laboy', diagnosis: 'Partial Paralysis', time: '10:00 am', date: 'Oct 17', type: 'Clinical', img: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop' },
        { id: 2, name: 'Geoffrey Mott', diagnosis: 'Muscle Weakness', time: '10:15 am', date: 'Oct 17', type: 'Checkup', img: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop' },
        { id: 3, name: 'Florencio Dorrance', diagnosis: 'Loss of Sensation', time: '10:30 am', date: 'Oct 17', type: 'Emergency', img: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=100&h=100&fit=crop' },
        { id: 4, name: 'Darron Kulikowski', diagnosis: 'Seizures', time: '10:45 am', date: 'Oct 17', type: 'Follow-up', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
        { id: 5, name: 'Merrill Kervin', diagnosis: 'Difficulty Reading', time: '11:00 am', date: 'Oct 17', type: 'Therapy', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
        { id: 6, name: 'Daryl Nehls', diagnosis: 'Muscle Weakness', time: '11:15 am', date: 'Oct 17', type: 'Clinical', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
    ];

    return (
        <div className="flex h-[calc(100vh-theme(spacing.16))] bg-[#FAFBFF] overflow-hidden font-sans">
            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 no-scrollbar">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-slate-900">Good Afternoon, Dr. Doctor <span className='text-3xl'>👋</span></h1>
                        <p className="text-slate-500 font-medium">Here is what's happening with your patients today.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button className="bg-[#4F46E5] hover:bg-[#4338ca] text-white shadow-lg shadow-indigo-200 rounded-xl px-6 h-12 flex items-center gap-2 transition-all">
                            <Stethoscope className="w-5 h-5" />
                            Start Consultation
                        </Button>
                        <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 rounded-xl px-6 h-12 flex items-center gap-2 transition-all">
                            <AlertCircle className="w-5 h-5" />
                            Emergency
                        </Button>
                        <Button variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl w-12 h-12 p-0 flex items-center justify-center transition-all">
                            <MessageSquare className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* Metrics Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Card 1: Total Patients */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow h-64">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-[#4F46E5]">
                                <User className="w-6 h-6" />
                            </div>
                            <button className="text-slate-400 hover:text-slate-600"><MoreVertical className="w-5 h-5" /></button>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold text-slate-900 mb-2">1,450</h3>
                            <p className="text-slate-500 font-medium text-sm">Total Patients</p>
                            <div className="flex items-center gap-2 mt-4 text-emerald-500 bg-emerald-50 w-fit px-2 py-1 rounded-lg text-xs font-bold">
                                <TrendingUp className="w-3 h-3" />
                                <span>+15% from last month</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Appointments */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow h-64">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <button className="text-slate-400 hover:text-slate-600"><MoreVertical className="w-5 h-5" /></button>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold text-slate-900 mb-2">1,971</h3>
                            <p className="text-slate-500 font-medium text-sm">Appointments</p>
                            <div className="flex items-center gap-2 mt-4 text-emerald-500 bg-emerald-50 w-fit px-2 py-1 rounded-lg text-xs font-bold">
                                <TrendingUp className="w-3 h-3" />
                                <span>+5% from last month</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Patient Overview */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow h-64 relative overflow-hidden">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold text-slate-900">Patient Overview</h3>
                            <button className="text-slate-400 hover:text-slate-600"><MoreVertical className="w-5 h-5" /></button>
                        </div>
                        <div className="flex-1 flex items-center justify-center relative">
                            <ResponsiveContainer width="100%" height={160}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={45}
                                        outerRadius={65}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                </PieChart>
                            </ResponsiveContainer>
                            {/* Center text for Donut */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-slate-900">1,450</span>
                                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Total</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center gap-4 text-xs font-medium text-slate-500">
                            {pieData.map((d) => (
                                <div key={d.name} className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></span>
                                    {d.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* My Patients Table */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-6 flex items-center justify-between border-b border-slate-50">
                        <h3 className="text-lg font-bold text-slate-900">My Patients</h3>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="text-slate-500">Most Recent <ChevronRight className="w-4 h-4 ml-1" /></Button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50/50 text-slate-500 font-medium">
                                <tr>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Age</th>
                                    <th className="px-6 py-4">Date & Time</th>
                                    <th className="px-6 py-4">Diagnosis</th>
                                    <th className="px-6 py-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {patients.map((patient) => (
                                    <tr key={patient.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={patient.img} alt={patient.name} className="w-10 h-10 rounded-full object-cover" />
                                                <span className="font-semibold text-slate-900">{patient.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">{patient.age}</td>
                                        <td className="px-6 py-4 text-slate-600 font-mono text-xs">{patient.date}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                                                {patient.diagnosis}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors">
                                                    <Activity className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Daily Visitors Line Chart */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-slate-900">Daily Visitors</h3>
                            <select className="bg-slate-50 border-none text-xs font-semibold text-slate-500 rounded-lg py-1 px-2 cursor-pointer outline-none">
                                <option>This Week</option>
                            </select>
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={dailyVisitorsData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1E293B', color: '#fff', borderRadius: '8px', border: 'none' }}
                                        itemStyle={{ color: '#fff' }}
                                        cursor={{ stroke: '#4F46E5', strokeWidth: 1, strokeDasharray: '4 4' }}
                                    />
                                    <Line type="monotone" dataKey="visitors" stroke="#4F46E5" strokeWidth={3} dot={{ r: 4, fill: '#4F46E5', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Appointment Stats Bar Chart */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-slate-900">Appointment Stats</h3>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                                    <span className="text-xs text-slate-500 font-medium">Online</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                                    <span className="text-xs text-slate-500 font-medium">Offline</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={dailyVisitorsData} barSize={12}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} dy={10} />
                                    <Tooltip
                                        cursor={{ fill: '#F8FAFC' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Bar dataKey="visitors" name="Online" fill="#4F46E5" radius={[4, 4, 0, 0]} stackId="a" />
                                    <Bar dataKey="visitors" name="Offline" fill="#FB923C" radius={[4, 4, 0, 0]} stackId="b" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

            </div>

            {/* Right Sidebar - Upcoming Appointments */}
            <div className="w-80 border-l border-slate-100 bg-white hidden xl:flex flex-col">
                <div className="p-6 border-b border-slate-50">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-900 text-lg">Appointments</h3>
                        <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-indigo-600">
                            <Calendar className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-slate-400 font-medium">May 2025</span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                    {/* Mini Calendar Strip (Visual only) */}
                    <div className="flex justify-between mt-6">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                            <div key={i} className={`flex flex-col items-center gap-2 text-xs font-medium ${i === 2 ? 'text-indigo-600' : 'text-slate-400'}`}>
                                <span>{d}</span>
                                <span className={`w-8 h-8 flex items-center justify-center rounded-full ${i === 2 ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'hover:bg-slate-50 cursor-pointer'}`}>{17 + i}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {upcomingAppointments.map((apt) => (
                        <div key={apt.id} className="group flex items-start gap-4 p-3 -mx-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer">
                            <img src={apt.img} alt={apt.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-slate-900 truncate">{apt.name}</h4>
                                <p className="text-xs text-slate-500 mt-0.5 truncate">{apt.diagnosis}</p>
                                <div className="flex items-center gap-3 mt-2">
                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-2 py-1 rounded-md shadow-sm">
                                        <Clock className="w-3 h-3 text-indigo-500" />
                                        {apt.time}
                                    </div>
                                </div>
                            </div>
                            <button className="text-slate-300 group-hover:text-indigo-600 transition-colors">
                                <MoreVertical className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="p-6 border-t border-slate-50">
                    <div className="bg-indigo-50 rounded-2xl p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-600 shrink-0 shadow-sm">
                            <MessageSquare className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-bold text-indigo-900">Need Help?</p>
                            <p className="text-[10px] text-indigo-700/80 mt-0.5 leading-tight">Contact support anytime for assistance.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
