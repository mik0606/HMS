import { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  LayoutGrid,
  List,
  MoreHorizontal,
  Eye,
  Edit,
  FileText,
  Trash2,
  Users,
  Activity,
  HeartPulse,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Stats Configuration
  const stats = [
    {
      label: "Total Patients",
      value: "352",
      icon: Users,
      color: "text-gray-900 border-l-4 border-gray-900",
      iconBg: "bg-gray-100"
    },
    {
      label: "Mild Patients",
      value: "180",
      icon: Activity,
      color: "text-green-600 border-l-4 border-green-500",
      iconBg: "bg-green-100"
    },
    {
      label: "Stable Patients",
      value: "150",
      icon: HeartPulse,
      color: "text-blue-600 border-l-4 border-blue-500",
      iconBg: "bg-blue-100"
    },
    {
      label: "Critical Patients",
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

  return (
    <div className="h-full bg-gray-50 p-6 space-y-6 overflow-y-auto">

      {/* 2. Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* 3. Patient Table */}
      <Card className="border-none shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#F8FAFC]">
              <TableRow className="border-b-gray-100">
                <TableHead className="w-[50px]"></TableHead>
                <TableHead className="font-semibold text-gray-600">Name</TableHead>
                <TableHead className="font-semibold text-gray-600">Last appointment</TableHead>
                <TableHead className="font-semibold text-gray-600">Age</TableHead>
                <TableHead className="font-semibold text-gray-600">Date of birth</TableHead>
                <TableHead className="font-semibold text-gray-600">Gender</TableHead>
                <TableHead className="font-semibold text-gray-600">Diagnosis</TableHead>
                <TableHead className="font-semibold text-gray-600 text-center">Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPatientsList.map((patient) => (
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
                      <span className="font-medium text-gray-900">{patient.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-500">{patient.lastAppointment}</TableCell>
                  <TableCell className="text-gray-500">{patient.age}</TableCell>
                  <TableCell className="text-gray-500">{patient.dob}</TableCell>
                  <TableCell className="text-gray-500">{patient.gender}</TableCell>
                  <TableCell className="text-gray-900 font-medium">{patient.diagnosis}</TableCell>
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
                          onClick={() => navigate(`/appointments/patient/${patient.id}`)}
                        >
                          <Eye className="w-4 h-4" /> View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-gray-600 cursor-pointer">
                          <Edit className="w-4 h-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-gray-600 cursor-pointer">
                          <FileText className="w-4 h-4" /> Download Report
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

        {/* 4. Pagination (Static for UI) */}
        <div className="flex items-center justify-between px-4 py-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-gray-500" disabled>
              &lt; Previous
            </Button>
            <div className="flex items-center gap-1">
              <Button variant="secondary" size="sm" className="bg-[#0EA5E9] text-white hover:bg-[#0284C7] h-8 w-8">1</Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 text-gray-600">2</Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 text-gray-600">3</Button>
              <span className="text-gray-400">...</span>
              <Button variant="ghost" size="sm" className="h-8 w-8 text-gray-600">32</Button>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-600">
              Next &gt;
            </Button>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Showing 1 to 15 of 352 entries</span>
            <Button variant="outline" size="sm" className="h-8">Show All</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Patients;
