import { useState } from 'react';
import {
    Users,
    Activity,
    HeartPulse,
    AlertCircle,
    User,
    MoreHorizontal,
    Eye,
    Edit,
    FileText,
    Trash2,
    Calendar,
    ArrowUpDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockPatientsList } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

const Patients = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    // Stats Configuration
    const stats = [
        {
            label: "Total",
            value: "352",
            icon: Users,
            color: "text-gray-900 border-l-4 border-gray-900",
            iconBg: "bg-gray-100"
        },
        {
            label: "Male",
            value: "180",
            icon: User,
            color: "text-green-600 border-l-4 border-green-500",
            iconBg: "bg-green-100"
        },
        {
            label: "Female",
            value: "150",
            icon: User,
            color: "text-blue-600 border-l-4 border-blue-500",
            iconBg: "bg-blue-100"
        },
        {
            label: "Today",
            value: "22",
            icon: AlertCircle,
            color: "text-red-600 border-l-4 border-red-500",
            iconBg: "bg-red-100"
        }
    ];

    const getStatusBadge = (status: string) => {
        const styles = {
            Stable: "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-50",
            Mild: "bg-green-50 text-green-600 border-green-100 hover:bg-green-50",
            Critical: "bg-red-50 text-red-600 border-red-100 hover:bg-red-50"
        };
        return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-600";
    };

    // Pagination Logic
    const totalPages = Math.ceil(mockPatientsList.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPatients = mockPatientsList.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="h-full bg-gray-50 p-6 flex flex-col space-y-6 overflow-hidden">

            {/* Stats Cards */}
            <div className="flex-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <Card key={idx} className="border-none shadow-sm">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className={`${stat.color} pl-4`}>
                                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                            </div>
                            <div className={`p-2 rounded-full ${stat.iconBg}`}>
                                <stat.icon className={`w-5 h-5 ${stat.color.split(' ')[0]}`} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Patient Table */}
            <Card className="flex-1 flex flex-col min-h-0 border-none shadow-sm overflow-hidden">
                <div className="flex-1 overflow-hidden relative">
                    <Table>
                        <TableHeader className="bg-[#F8FAFC] sticky top-0 z-10">
                            <TableRow className="border-b-gray-100">
                                <TableHead className="w-[50px]">
                                    <input type="checkbox" className="rounded border-gray-300" />
                                </TableHead>
                                <TableHead className="font-semibold text-gray-600">Patient Name</TableHead>
                                <TableHead className="font-semibold text-gray-600">Age</TableHead>
                                <TableHead className="font-semibold text-gray-600">Gender</TableHead>
                                <TableHead className="font-semibold text-gray-600">Phone</TableHead>
                                <TableHead className="font-semibold text-gray-600">Last Visit</TableHead>
                                <TableHead className="font-semibold text-gray-600 text-center">Status</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentPatients.map((patient) => (
                                <TableRow key={patient.id} className="hover:bg-gray-50 border-b-gray-50">
                                    <TableCell>
                                        <input type="checkbox" className="rounded border-gray-300" />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={patient.avatar} className="object-cover" />
                                                <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <span className="font-medium text-gray-900 block">{patient.name}</span>
                                                <span className="text-xs text-gray-500">{patient.id}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-gray-500">{patient.age}</TableCell>
                                    <TableCell className="text-gray-500">{patient.gender}</TableCell>
                                    <TableCell className="text-gray-500">+1 555-0123</TableCell> {/* Placeholder as mock data is missing phone */}
                                    <TableCell className="text-gray-500">{patient.lastAppointment}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant="outline" className={`${getStatusBadge(patient.status)} font-normal px-2 py-0.5`}>
                                            {patient.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100">
                                                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-[160px]">
                                                <DropdownMenuItem
                                                    className="gap-2 text-gray-600 cursor-pointer"
                                                    onClick={() => navigate(`/doctor/patient/profile?id=${patient.id}`)}
                                                >
                                                    <Eye className="w-4 h-4" /> View Profile
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="gap-2 text-gray-600 cursor-pointer">
                                                    <Activity className="w-4 h-4" /> Follow Up
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="flex-none flex items-center justify-between px-4 py-4 border-t border-gray-100 bg-white">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            &lt; Previous
                        </Button>
                        <div className="flex items-center gap-1">
                            {[...Array(Math.min(3, totalPages))].map((_, i) => (
                                <Button
                                    key={i + 1}
                                    variant={currentPage === i + 1 ? "secondary" : "ghost"}
                                    size="sm"
                                    className={`h-8 w-8 ${currentPage === i + 1 ? "bg-[#0EA5E9] text-white hover:bg-[#0284C7]" : "text-gray-600"}`}
                                    onClick={() => handlePageChange(i + 1)}
                                >
                                    {i + 1}
                                </Button>
                            ))}
                            {totalPages > 3 && <span className="text-gray-400">...</span>}
                            {totalPages > 3 && (
                                <Button
                                    variant={currentPage === totalPages ? "secondary" : "ghost"}
                                    size="sm"
                                    className={`h-8 w-8 ${currentPage === totalPages ? "bg-[#0EA5E9] text-white hover:bg-[#0284C7]" : "text-gray-600"}`}
                                    onClick={() => handlePageChange(totalPages)}
                                >
                                    {totalPages}
                                </Button>
                            )}
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-600"
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next &gt;
                        </Button>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, mockPatientsList.length)} of {mockPatientsList.length} entries</span>
                        <Button variant="outline" size="sm" className="h-8">Show All</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Patients;
