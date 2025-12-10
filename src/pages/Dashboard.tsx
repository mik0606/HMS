import { useEffect, useState } from 'react';
import {
  FileText,
  Users,
  CalendarDays,
  BedDouble,
  MessageCircle
} from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import ChartCard from '@/components/dashboard/ChartCard';
import AppointmentList from '@/components/dashboard/AppointmentList';
import ReportList from '@/components/dashboard/ReportList';
import CalendarWidget from '@/components/dashboard/CalendarWidget';
import { getDashboardStats, getAppointments, getReports } from '@/services/api';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, aptRes, reportRes] = await Promise.all([
          getDashboardStats() as Promise<{ data: any }>,
          getAppointments() as Promise<{ data: any[] }>,
          getReports() as Promise<{ data: any[] }>
        ]);
        setStats(statsRes.data);
        setAppointments(aptRes.data);
        setReports(reportRes.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Mock data for graphs
  const patientOverviewData = [
    { name: '4 Jul', child: 30, adult: 60, elderly: 40 },
    { name: '5 Jul', child: 45, adult: 55, elderly: 20 },
    { name: '6 Jul', child: 20, adult: 85, elderly: 30 },
    { name: '7 Jul', child: 50, adult: 40, elderly: 50 },
    { name: '8 Jul', child: 35, adult: 70, elderly: 60 },
    { name: '9 Jul', child: 60, adult: 80, elderly: 40 },
    { name: '10 Jul', child: 40, adult: 60, elderly: 30 },
    { name: '11 Jul', child: 55, adult: 50, elderly: 45 },
  ];

  const revenueData = [
    { name: 'Sun', value: 400 },
    { name: 'Mon', value: 600 },
    { name: 'Tue', value: 750 },
    { name: 'Wed', value: 820 },
    { name: 'Thu', value: 780 },
    { name: 'Fri', value: 900 },
    { name: 'Sat', value: 850 },
  ];

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading dashboard...</div>;
  }

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-6 space-y-6">
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Invoice"
          value={stats?.totalInvoice || 0}
          subtext="56 more than yesterday"
          icon={FileText}
        />
        <StatsCard
          title="Total Patients"
          value={stats?.totalPatients || 0}
          subtext="45 more than yesterday"
          icon={Users}
        />
        <StatsCard
          title="Appointments"
          value={stats?.appointments || 0}
          subtext="18 less than yesterday"
          icon={CalendarDays}
        />
        <StatsCard
          title="Bedroom"
          value={stats?.bedroom || 0}
          subtext="56 more than yesterday"
          icon={BedDouble}
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartCard
              title="Patient Overview"
              type="bar"
              data={patientOverviewData}
              dataKey1="child"
              dataKey2="adult"
              dataKey3="elderly"
              colors={["#2563eb", "#10b981", "#ef4444"]}
            />
            <ChartCard
              title="Revenue"
              type="line"
              data={revenueData}
              dataKey1="value"
              colors={["#2563eb"]} // Dark blue line
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AppointmentList appointments={appointments} />
            <ReportList reports={reports} />
          </div>
        </div>

        {/* Right Column: Calendar & Assistant */}
        <div className="space-y-6">
          <CalendarWidget />

          {/* Ask Movi Floating Button/Card */}
          <div className="relative">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl p-4 text-white shadow-lg flex items-center justify-between cursor-pointer hover:shadow-xl transition-shadow">
              <div>
                <h4 className="font-bold text-lg">Ask Movi</h4>
                <p className="text-sm opacity-90">Your medical assistant</p>
              </div>
              <div className="bg-white/20 p-2 rounded-full">
                <MessageCircle className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
