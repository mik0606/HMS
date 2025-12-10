import { useState } from 'react';
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
    Menu,
    X,
    LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const location = useLocation();
    const { logout, user } = useAuth();

    // Only show for Super Admin (double check requirement, usually valid)
    // But for now, we assume this component is conditionally rendered or used in a layout
    // that handles role checking for the *page* content, but better to be safe.
    // Requirement says: "The sidebar is only visible when the logged-in user has role = 'Super Admin'".
    // We will assume the parent layout handles the "visible" part (rendering),
    // but we can also return null here if not super_admin.

    if (user?.role !== 'super_admin') return null;

    const menuItems = [
        { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { title: 'Appointments', path: '/appointments', icon: Calendar },
        { title: 'Patients', path: '/patients', icon: Users },
        { title: 'Staff', path: '/staff', icon: Stethoscope },
        { title: 'Payroll', path: '/payroll', icon: CreditCard },
        { title: 'Pathology', path: '/pathology', icon: FlaskConical },
        { title: 'Pharmacy', path: '/pharmacy', icon: Pill },
        { title: 'Settings', path: '/settings', icon: Settings },
    ];

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
                    "fixed top-0 left-0 z-50 h-screen w-64 bg-[#F4F7FF] border-r border-[#4F46E5]/10 transition-transform duration-300 ease-in-out lg:translate-x-0 font-sans",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="h-16 flex items-center justify-between px-6 border-b border-[rgba(79,70,229,0.12)]">
                        <div className="flex items-center gap-2 font-bold text-xl text-[#1E293B]">
                            {/* Placeholder Icon/Logo - keeping existing logic but maybe tweaking style if needed? 
                                The user requested specific sidebar colors, but not necessarily logo change, 
                                but I will ensure it fits. */}
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#4F46E5]">
                                {/* Using a simple text or maintaining previous logic but stylistic tweak to fit theme */}
                                <span className="text-2xl">⚡</span>
                            </div>
                            <span className="truncate text-[#1E293B]">KARUR GASTRO</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="lg:hidden text-[#94A3B8] hover:text-[#1E293B]"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => window.innerWidth < 1024 && onClose()}
                                className={({ isActive }) =>
                                    cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium relative group",
                                        isActive
                                            ? "bg-[#4F46E5] text-white shadow-md shadow-indigo-200"
                                            : "text-[#1E293B] hover:bg-[#EEF2FF] hover:text-[#4F46E5]"
                                    )
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <div className={cn(
                                            "flex items-center justify-center w-6 h-6 rounded-full transition-colors",
                                            isActive ? "bg-white/20 text-white" : "text-[#94A3B8] group-hover:text-[#4F46E5]"
                                        )}>
                                            <item.icon className="w-4 h-4" />
                                        </div>
                                        <span>{item.title}</span>
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* User Profile / Logout */}
                    <div className="p-4 border-t border-[rgba(79,70,229,0.12)]">
                        <div className="flex items-center gap-3 mb-3 p-2 rounded-xl hover:bg-[#EEF2FF] transition-colors cursor-pointer">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-[#4F46E5] font-bold overflow-hidden border-2 border-white shadow-sm">
                                    {/* Placeholder avatar logic */}
                                    <img
                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                    <span className="absolute inset-0 flex items-center justify-center" style={{ display: 'none' }}>
                                        {user?.name?.charAt(0) || 'A'}
                                    </span>
                                </div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-[#1E293B] truncate">
                                    {user?.name || 'Alexia Taylor'}
                                </p>
                                <p className="text-xs text-[#94A3B8] truncate">
                                    Admin Administrator
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-[#94A3B8] hover:text-[#EF4444] hover:bg-red-50 gap-3 px-4"
                            onClick={logout}
                        >
                            <LogOut className="w-4 h-4" />
                            Log Out
                        </Button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
