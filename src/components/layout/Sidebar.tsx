import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    Calendar,
    Users,
    Stethoscope,
    CreditCard,
    FlaskConical,
    Pill,
    Settings,
    FileText,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/types';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    isCollapsed: boolean;
    toggleCollapse: () => void;
}

const Sidebar = ({ isOpen, onClose, isCollapsed, toggleCollapse }: SidebarProps) => {
    const { logout, user } = useAuth();

    // Define menus for each role
    const roleMenus: Partial<Record<UserRole, { title: string; path: string; icon: any }[]>> = {
        super_admin: [
            { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
            { title: 'Appointments', path: '/appointments', icon: Calendar },
            { title: 'Patients', path: '/patients', icon: Users },
            { title: 'Staff', path: '/staff', icon: Stethoscope },
            { title: 'Payroll', path: '/payroll', icon: CreditCard },
            { title: 'Pathology', path: '/pathology', icon: FlaskConical },
            { title: 'Pharmacy', path: '/pharmacy', icon: Pill },
            { title: 'Settings', path: '/settings', icon: Settings },
        ],
        doctor: [
            { title: 'Dashboard', path: '/doctor/dashboard', icon: LayoutDashboard },
            { title: 'Patient', path: '/doctor/patient', icon: Users },
            { title: 'Appointment', path: '/doctor/appointment', icon: Users },
            { title: 'My Schedule', path: '/doctor/schedule', icon: Calendar },
            { title: 'Settings', path: '/doctor/settings', icon: Settings },

        ],
        pharmacy: [
            { title: 'Dashboard', path: '/pharmacy/dashboard', icon: LayoutDashboard },
            { title: 'Medicine', path: '/pharmacy/medicine', icon: Pill },
            { title: 'Prescription', path: '/pharmacy/prescription', icon: FileText },
            { title: 'Settings', path: '/pharmacy/settings', icon: Settings },
        ],
        pathologist: [
            { title: 'Dashboard', path: '/pathologist/dashboard', icon: LayoutDashboard },
            { title: 'Test Reports', path: '/pathologist/reports', icon: FlaskConical },
            { title: 'Patients', path: '/pathologist/patients', icon: Users },
            { title: 'Settings', path: '/pathologist/settings', icon: Settings },
        ],
    };

    // Fallback menu or empty if role not found
    const menuItems = roleMenus[user?.role as UserRole] || [];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed top-0 left-0 z-50 h-screen overflow-hidden bg-[#F4F7FF] border-r border-[#4F46E5]/10 transition-all duration-300 ease-in-out font-sans",
                    isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
                    isCollapsed ? "lg:w-20" : "lg:w-64",
                    "w-64" // Mobile always full width
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className={cn(
                        "h-16 flex items-center border-b border-[rgba(79,70,229,0.12)] transition-all duration-300",
                        isCollapsed ? "justify-center px-0 flex-col gap-1" : "justify-between px-4"
                    )}>
                        <div className={cn("flex items-center transition-all duration-300", isCollapsed ? "flex-col gap-2" : "gap-3")}>
                            {/* Collapse Trigger - Desktop Only */}
                            <button
                                onClick={toggleCollapse}
                                className={cn(
                                    "hidden lg:flex items-center justify-center text-[#94A3B8] hover:text-[#4F46E5] transition-colors rounded-lg p-1",
                                    isCollapsed ? "w-8 h-8" : "w-8 h-8"
                                )}
                                title={isCollapsed ? "Expand" : "Collapse"}
                            >
                                <Menu className="w-6 h-6" />
                            </button>

                            <div className={cn(
                                "flex items-center gap-2 font-bold text-xl text-[#1E293B] transition-all duration-300",
                                isCollapsed ? "flex-col" : ""
                            )}>
                                <div className={cn(
                                    "rounded-lg flex items-center justify-center text-[#4F46E5] shrink-0 transition-all duration-300",
                                    isCollapsed ? "w-6 h-6" : "w-8 h-8"
                                )}>
                                    <span className={cn("transition-all duration-300", isCollapsed ? "text-lg" : "text-2xl")}>⚡</span>
                                </div>
                                {!isCollapsed && (
                                    <span className="truncate text-[#1E293B] transition-opacity duration-300">KARUR GASTRO</span>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="lg:hidden text-[#94A3B8] hover:text-[#1E293B]"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 py-6 px-3 space-y-2 overflow-hidden">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => window.innerWidth < 1024 && onClose()}
                                className={({ isActive }) =>
                                    cn(
                                        "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-sm font-medium relative group",
                                        isActive
                                            ? "bg-[#4F46E5] text-white shadow-md shadow-indigo-200"
                                            : "text-[#1E293B] hover:bg-[#EEF2FF] hover:text-[#4F46E5]",
                                        isCollapsed && "justify-center px-0"
                                    )
                                }
                                title={isCollapsed ? item.title : undefined}
                            >
                                {({ isActive }) => (
                                    <>
                                        <div className={cn(
                                            "flex items-center justify-center w-6 h-6 shrink-0 transition-colors",
                                            isActive && !isCollapsed ? "text-white" : "",
                                            isActive && isCollapsed ? "text-white" : "text-[#94A3B8] group-hover:text-[#4F46E5]"
                                        )}>
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        {!isCollapsed && (
                                            <span className="truncate">{item.title}</span>
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* User Profile / Logout */}
                    <div className="p-4 border-t border-[rgba(79,70,229,0.12)]">
                        {!isCollapsed ? (
                            <div className="flex items-center gap-3 mb-3 p-2 rounded-xl hover:bg-[#EEF2FF] transition-colors cursor-pointer">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-[#4F46E5] font-bold overflow-hidden border-2 border-white shadow-sm">
                                        <img
                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                        <span className="absolute inset-0 flex items-center justify-center">
                                            {user?.name?.charAt(0) || 'U'}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-[#1E293B] truncate">
                                        {user?.name || 'User'}
                                    </p>
                                    <p className="text-xs text-[#94A3B8] truncate capitalize">
                                        {user?.role?.replace('_', ' ') || 'Role'}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-center mb-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-[#4F46E5] font-bold overflow-hidden border-2 border-white shadow-sm">
                                    {user?.name?.charAt(0) || 'U'}
                                </div>
                            </div>
                        )}

                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full text-[#94A3B8] hover:text-[#EF4444] hover:bg-red-50",
                                isCollapsed ? "justify-center px-0" : "justify-start gap-3 px-4"
                            )}
                            onClick={logout}
                            title="Log Out"
                        >
                            <LogOut className="w-4 h-4" />
                            {!isCollapsed && "Log Out"}
                        </Button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
