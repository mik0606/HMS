import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '@/contexts/AuthContext';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { user } = useAuth();

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const showGlobalHeader = user?.role === 'super_admin';

    return (
        <div className="h-screen bg-gray-50 flex overflow-hidden">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                isCollapsed={isCollapsed}
                toggleCollapse={toggleCollapse}
            />

            <div className={`flex-1 flex flex-col h-full overflow-hidden transition-all duration-300 ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
                {showGlobalHeader ? (
                    <Header
                        onMenuClick={() => setSidebarOpen(true)}
                        toggleSidebar={toggleCollapse}
                        isCollapsed={isCollapsed}
                    />
                ) : (
                    /* Mobile Toggle for Non-SuperAdmin */
                    <div className="lg:hidden p-4 flex items-center bg-white border-b sticky top-0 z-30">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </Button>
                        <span className="font-semibold text-lg ml-2 capitalize">{user?.role} Portal</span>
                    </div>
                )}

                <main className="flex-1 overflow-hidden relative">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
