import { useState } from 'react';
import {
    Search,
    Filter,
    MoreHorizontal,
    Eye,
    Edit,
    Trash2,
    Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
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

// NOTE: Assuming you have a mock data file for staff
// Replacing mockPatientsList with a conceptual mockStaffList
const mockStaffList = [
    { id: 'EMP7935', name: 'Will Ben Chen', designation: 'Lab Technician', department: 'Support', contact: '+917752648992', status: 'Available' },
    { id: 'EMP4873', name: 'Arun Krishnan', designation: 'Lab Technician', department: 'Support', contact: '+917291691024', status: 'Available' },
    { id: 'ADM749', name: 'Banu Admin', designation: 'Hospital Admin', department: 'Administration', contact: '+919876543299', status: 'Available' },
    { id: 'EMP4446', name: 'Deepa Menon', designation: 'Medical Assistant', department: 'Laboratory', contact: '+919959265668', status: 'Available' },
    { id: 'DOC859', name: 'Doctor User', designation: 'Doctor', department: 'Medical', contact: 'N/A', status: 'Available' },
    { id: 'STF-003', name: 'Dr. Bruce Wayne', designation: 'Surgeon', department: 'Surgery', contact: '8795578624', status: 'On Call' },
    { id: 'DOC183', name: 'Dr. Sanjit Kumar', designation: 'Gastroenterology', department: 'Gastroenterology', contact: '+919876543210', status: 'Available' },
];

const Staff = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7; // Adjusted to show more staff at once

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            Available: "bg-green-50 text-green-600 border-green-100 hover:bg-green-50",
            'On Call': "bg-cyan-50 text-cyan-600 border-cyan-100 hover:bg-cyan-50",
            Default: "bg-gray-100 text-gray-600",
        };
        return styles[status] || styles.Default;
    };

    // Pagination Logic
    const totalPages = Math.ceil(mockStaffList.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentStaff = mockStaffList.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // ------------------------------------------------------------------
    // **Main Header Section**
    // ------------------------------------------------------------------
    const MainHeader = () => (
        <div className="flex-none p-4 border-b border-gray-100 bg-white">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">STAFF</h2>
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <Input
                            type="text"
                            placeholder="Search Staff..."
                            className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <Button variant="outline" size="icon" className="h-10 w-10 text-gray-600 border-gray-300 hover:bg-gray-100">
                        <Filter className="w-5 h-5" />
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                        <Plus className="w-5 h-5" /> Add New
                    </Button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="h-full bg-gray-50 p-6 flex flex-col space-y-0 overflow-hidden">

            {/* The main Staff Table Card */}
            <Card className="flex-1 flex flex-col min-h-0 border-none shadow-lg overflow-hidden rounded-xl">

                {/* 1. Custom Header (STAFF, Search, Add New) */}
                <MainHeader />

                {/* 2. Table Body - Fills remaining space */}
                <div className="flex-1 overflow-auto relative">
                    <Table>
                        <TableHeader className="bg-[#F8FAFC] sticky top-0 z-10">
                            <TableRow className="border-b-gray-100">
                                {/* Staff Code is new in this table */}
                                <TableHead className="font-semibold text-gray-600">STAFF CODE</TableHead>
                                <TableHead className="font-semibold text-gray-600">STAFF NAME</TableHead>
                                {/* These columns replace Age, DOB, Gender from Patient table */}
                                <TableHead className="font-semibold text-gray-600">DESIGNATION</TableHead>
                                <TableHead className="font-semibold text-gray-600">DEPARTMENT</TableHead>
                                <TableHead className="font-semibold text-gray-600">CONTACT</TableHead>
                                <TableHead className="font-semibold text-gray-600 text-center">STATUS</TableHead>
                                {/* The Actions column */}
                                <TableHead className="w-[50px] font-semibold text-gray-600 text-center">ACTIONS</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentStaff.map((staff) => (
                                <TableRow key={staff.id} className="hover:bg-gray-50 border-b-gray-50">
                                    <TableCell className="font-medium text-gray-900">{staff.id}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8 bg-gray-100">
                                                <AvatarFallback className="text-sm bg-gray-200 text-gray-600">{staff.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium text-gray-900">{staff.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-gray-500">{staff.designation}</TableCell>
                                    <TableCell className="text-gray-500">{staff.department}</TableCell>
                                    <TableCell className="text-gray-500">{staff.contact}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant="outline" className={`${getStatusBadge(staff.status)} font-normal px-2 py-0.5`}>
                                            {staff.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {/* Retaining the MoreHorizontal (Three-dot) Menu for Actions */}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100">
                                                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-[160px]">
                                                <DropdownMenuItem className="gap-2 text-gray-600 cursor-pointer">
                                                    <Eye className="w-4 h-4" /> View Profile
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="gap-2 text-gray-600 cursor-pointer">
                                                    <Edit className="w-4 h-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="gap-2 text-red-600 focus:text-red-600 cursor-pointer">
                                                    <Trash2 className="w-4 h-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* 3. Pagination (Fixed at bottom) - Reused from Patient Page */}
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
                            {/* Pagination numbers logic */}
                            {[...Array(Math.min(3, totalPages))].map((_, i) => (
                                <Button
                                    key={i + 1}
                                    variant={currentPage === i + 1 ? "secondary" : "ghost"}
                                    size="sm"
                                    className={`h-8 w-8 ${currentPage === i + 1 ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-600"}`}
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
                                    className={`h-8 w-8 ${currentPage === totalPages ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-600"}`}
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
                        <span>Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, mockStaffList.length)} of {mockStaffList.length} entries</span>
                        <Button variant="outline" size="sm" className="h-8">Show All</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Staff;