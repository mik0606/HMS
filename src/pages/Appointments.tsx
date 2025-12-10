import { useState } from 'react';
import {
    Search,
    Filter,
    Plus,
    MoreVertical,
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Phone,
    Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { mockAppointments as appointments } from '@/data/mockData';

// Mock Data
const localAppointments = [
    {
        id: "2352",
        patient: { name: "Olivia Patterson", email: "olivia@email.com", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150" },
        contact: { phone: "+1 555 678 901", email: "olivia@email.com" },
        doctor: "Dr. Miller",
        department: "Oncology",
        visitType: "Consultation",
        time: { time: "9:00 AM", date: "03/10" },
        insurance: "N/A",
        status: "Completed"
    },
    {
        id: "2351",
        patient: { name: "Brian Foster", email: "brian@email.com", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150&h=150" },
        contact: { phone: "+1 444 567 890", email: "brian@email.com" },
        doctor: "Dr. Davis",
        department: "Surgery",
        visitType: "Post-op",
        time: { time: "9:30 AM", date: "03/10" },
        insurance: "Medicaid",
        status: "Completed"
    },
    {
        id: "2350",
        patient: { name: "Nathan Reed", email: "nathan@email.com", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150" },
        contact: { phone: "+1 753 951 357", email: "nathan@email.com" },
        doctor: "Dr. Harper",
        department: "Anesthesiology",
        visitType: "Consultation",
        time: { time: "9:45 AM", date: "03/10" },
        insurance: "Medicaid",
        status: "Completed"
    },
    {
        id: "2349",
        patient: { name: "Benjamin Carter", email: "ben@email.com", image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=150&h=150" },
        contact: { phone: "+1 951 753 852", email: "ben@email.com" },
        doctor: "Dr. Wilson",
        department: "Cardiology",
        visitType: "Follow-up",
        time: { time: "10:00 AM", date: "03/10" },
        insurance: "Medicare",
        status: "Completed"
    },
    {
        id: "2348",
        patient: { name: "Mark Johnson", email: "mark@email.com", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=150&h=150" },
        contact: { phone: "+1 555 678 901", email: "mark@email.com" },
        doctor: "Dr. Carter",
        department: "Dermatology",
        visitType: "Skin Check",
        time: { time: "10:00 AM", date: "03/10" },
        insurance: "Medicaid",
        status: "Canceled"
    },
    {
        id: "2347",
        patient: { name: "Sophie Lawson", email: "sophie@email.com", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150" },
        contact: { phone: "+1 999 012 345", email: "sophie@email.com" },
        doctor: "Dr. Lee",
        department: "Psychiatrist",
        visitType: "Therapy",
        time: { time: "10:00 AM", date: "03/10" },
        insurance: "Medicare",
        status: "Completed"
    },
    {
        id: "2346",
        patient: { name: "Jessica Hall", email: "jessica@email.com", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150" },
        contact: { phone: "+1 111 234 567", email: "jessica@email.com" },
        doctor: "Dr. Miller",
        department: "Oncology",
        visitType: "Check-up",
        time: { time: "10:30 AM", date: "03/10" },
        insurance: "N/A",
        status: "Completed"
    },
    {
        id: "2345",
        patient: { name: "Samuel Evans", email: "samuel@email.com", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150" },
        contact: { phone: "+1 258 147 369", email: "samuel@email.com" },
        doctor: "Dr. Wilson",
        department: "Cardiology",
        visitType: "Consultation",
        time: { time: "11:00 AM", date: "03/10" },
        insurance: "N/A",
        status: "Active"
    },
    {
        id: "2334",
        patient: { name: "Daniel Scott", email: "daniel@email.com", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150" },
        contact: { phone: "+1 888 901 234", email: "daniel@email.com" },
        doctor: "Dr. Parker",
        department: "Oncology",
        visitType: "Consultation",
        time: { time: "11:00 AM", date: "03/10" },
        insurance: "Medicare",
        status: "Active"
    },
    {
        id: "2333",
        patient: { name: "Michael Chen", email: "michael@email.com", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150" },
        contact: { phone: "+1 777 890 123", email: "michael@email.com" },
        doctor: "Dr. Lee",
        department: "Psychiatrist",
        visitType: "Therapy",
        time: { time: "11:00 AM", date: "03/10" },
        insurance: "N/A",
        status: "Canceled"
    },
    {
        id: "2332",
        patient: { name: "Hannah White", email: "hannah@email.com", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150" },
        contact: { phone: "+1 789 123 456", email: "hannah@email.com" },
        doctor: "Dr. Davis",
        department: "Surgery",
        visitType: "Post-op",
        time: { time: "12:00 AM", date: "03/10" },
        insurance: "Medicare",
        status: "Upcoming"
    },
];

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'active':
            return 'bg-green-100 text-green-700 border-green-200';
        case 'completed':
            return 'bg-indigo-100 text-indigo-700 border-indigo-200';
        case 'canceled':
            return 'bg-red-100 text-red-700 border-red-200';
        case 'upcoming':
            return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        default:
            return 'bg-gray-100 text-gray-700 border-gray-200';
    }
};

const Appointments = () => {
    const navigate = useNavigate();
    return (
        <div className="h-full flex flex-col font-sans bg-gray-50">
            {/* Main Content Card */}
            <div className="bg-white shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden">
                {/* Card Header (Filter/Date Range) */}
                <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Date Range Picker Placeholder */}
                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="border-gray-200 text-gray-700 rounded-lg gap-2 font-normal hover:bg-gray-50">
                            <CalendarIcon className="w-4 h-4 text-gray-500" />
                            <span>01/15/25 - 03/10/25</span>
                            <span className="ml-2 text-gray-400">▼</span>
                        </Button>
                    </div>

                    {/* Table Filters */}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                placeholder="Search"
                                className="pl-9 w-48 border-gray-200 rounded-lg h-9 text-sm"
                            />
                        </div>
                        <Button variant="outline" className="border-gray-200 text-gray-600 h-9 gap-2 rounded-lg hover:bg-gray-50">
                            <Filter className="w-4 h-4" />
                            Filter
                        </Button>
                        <Button variant="outline" className="border-gray-200 text-gray-600 h-9 w-9 p-0 rounded-lg hover:bg-gray-50">
                            <div className="grid grid-cols-2 gap-0.5">
                                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                            </div>
                        </Button>
                    </div>
                </div>

                {/* Table Section */}
                <div className="flex-1 overflow-auto">
                    <Table>
                        <TableHeader className="bg-gray-50/50">
                            <TableRow className="hover:bg-transparent border-gray-100">
                                <TableHead className="w-[50px]">
                                    <Checkbox className="border-gray-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600" />
                                </TableHead>
                                <TableHead className="font-semibold text-gray-600">ID</TableHead>
                                <TableHead className="font-semibold text-gray-600">Patient</TableHead>
                                <TableHead className="font-semibold text-gray-600">Contacts</TableHead>
                                <TableHead className="font-semibold text-gray-600">Doctor</TableHead>
                                <TableHead className="font-semibold text-gray-600">Department</TableHead>
                                <TableHead className="font-semibold text-gray-600">Visit Type</TableHead>
                                <TableHead className="font-semibold text-gray-600">Time</TableHead>
                                <TableHead className="font-semibold text-gray-600">Insurance</TableHead>
                                <TableHead className="font-semibold text-gray-600">Status</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {appointments.map((apt) => (
                                <TableRow
                                    key={apt.id}
                                    className="hover:bg-gray-50/50 border-gray-100 group cursor-pointer"
                                    onClick={() => navigate(`/appointments/patient/${apt.id}`)}
                                >
                                    <TableCell onClick={(e) => e.stopPropagation()}>
                                        <Checkbox className="border-gray-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600" />
                                    </TableCell>
                                    <TableCell className="font-medium text-gray-600">#{apt.id}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="w-9 h-9 border border-gray-100">
                                                <AvatarImage src={apt.patient.image} />
                                                <AvatarFallback>{apt.patient.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-sm text-gray-900">{apt.patient.name}</span>
                                                <span className="text-xs text-gray-500">{apt.patient.email}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1 text-xs text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Phone className="w-3 h-3" /> {apt.contact.phone}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Mail className="w-3 h-3" /> {apt.contact.email}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-700">{apt.doctor}</TableCell>
                                    <TableCell className="text-sm text-gray-700">{apt.department}</TableCell>
                                    <TableCell className="text-sm text-gray-700">{apt.visitType}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col text-sm">
                                            <span className="text-gray-900 font-medium">{apt.time.time}</span>
                                            <span className="text-xs text-gray-500">{apt.time.date}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-700">{apt.insurance}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={`rounded-full px-3 py-0.5 font-normal ${getStatusColor(apt.status)} border shadow-sm`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${apt.status === 'Active' ? 'bg-green-500' :
                                                apt.status === 'Completed' ? 'bg-indigo-500' :
                                                    apt.status === 'Canceled' ? 'bg-red-500' :
                                                        'bg-yellow-500'
                                                }`}></span>
                                            {apt.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Footer / Pagination */}
                <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                    <p>Showing 15-28 of 154 appointments</p>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600">
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" className="h-8 w-8 p-0 font-medium text-gray-900 bg-gray-50">1</Button>
                        <Button variant="ghost" className="h-8 w-8 p-0 font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50">2</Button>
                        <Button variant="ghost" className="h-8 w-8 p-0 font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50">3</Button>
                        <span className="px-1 text-gray-400">...</span>
                        <Button variant="ghost" className="h-8 w-8 p-0 font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50">11</Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600">
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appointments;

