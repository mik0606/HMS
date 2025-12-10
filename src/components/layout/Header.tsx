import { Menu, Bell, Search, Plus, Filter, Download, LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
    onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const isAppointmentsPage = location.pathname.includes("appointments");
    const isPatientsPage = location.pathname.includes("patients");

    const getPageTitle = () => {
        const path = location.pathname.split('/')[1];
        if (!path) return 'Dashboard';
        return path.charAt(0).toUpperCase() + path.slice(1);
    };

    return (
        <header className="h-16 bg-white border-b px-4 lg:px-6 flex items-center justify-between sticky top-0 z-30">

            {/* LEFT SIDE */}
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={onMenuClick}
                >
                    <Menu className="w-6 h-6" />
                </Button>

                <h1 className="text-xl font-semibold text-gray-800">
                    {getPageTitle()}
                </h1>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-4">

                {/* ===========================
                    PATIENT PAGE HEADER COMPONENTS
                ============================ */}
                {isPatientsPage && (
                    <div className="flex items-center gap-3">

                        {/* Search */}
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                placeholder="Search patient..."
                                className="pl-9 w-64 bg-white border-gray-200 rounded-lg h-10 text-sm focus:ring-blue-500"
                            />
                        </div>

                        {/* Filter */}
                        <Button variant="outline" className="gap-2 bg-white border-gray-200 text-gray-600">
                            <Filter className="w-4 h-4" /> Filter
                        </Button>

                        {/* Export Button */}
                        <Button className="gap-2 bg-[#0EA5E9] hover:bg-[#0284C7] text-white">
                            <Download className="w-4 h-4" /> Export
                        </Button>

                        {/* View Mode Toggle */}

                    </div>
                )}

                {/* ===========================
                    APPOINTMENT PAGE HEADER UI
                ============================ */}
                {isAppointmentsPage && (
                    <div className="flex items-center gap-3">

                        {/* Search */}
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                placeholder="Search Appointments..."
                                className="pl-9 w-64 bg-white border-gray-200 rounded-lg h-10 text-sm focus:ring-indigo-500"
                            />
                        </div>

                        {/* New Appointment */}
                        <Button className="bg-[#4F46E5] hover:bg-[#4338ca] text-white rounded-lg gap-2">
                            <Plus className="w-4 h-4" /> New Appointment
                        </Button>
                    </div>
                )}

                {/* ===========================
                    DEFAULT SEARCH (OTHER PAGES)
                ============================ */}
                {!isPatientsPage && !isAppointmentsPage && (
                    <div className="hidden md:flex relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-9 pr-4 py-2 border rounded-full text-sm focus:ring-blue-500 w-64"
                        />
                    </div>
                )}

                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 rounded-full overflow-hidden border">
                            <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-600 font-bold">
                                {user?.name?.charAt(0) || 'A'}
                            </div>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{user?.name}</p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {user?.email}
                                </p>
                            </div>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={logout}>
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default Header;
