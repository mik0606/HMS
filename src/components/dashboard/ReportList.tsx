import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronRight, Clipboard, Wrench, Pill } from "lucide-react";

interface Report {
    id: number;
    title: string;
    time: string;
    icon: string;
}

interface ReportListProps {
    reports: Report[];
}

const ReportList = ({ reports }: ReportListProps) => {
    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'broom': return <Clipboard className="w-5 h-5 text-blue-500" />;
            case 'wrench': return <Wrench className="w-5 h-5 text-orange-500" />;
            case 'pill': return <Pill className="w-5 h-5 text-red-500" />;
            default: return <Clipboard className="w-5 h-5 text-gray-500" />;
        }
    };

    return (
        <Card className="shadow-sm border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold text-gray-800">Report</CardTitle>
                <Select defaultValue="all">
                    <SelectTrigger className="w-[100px] h-8 text-xs bg-gray-50 border-none">
                        <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {reports.map((report) => (
                        <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                                    {getIcon(report.icon)}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{report.title}</p>
                                    <p className="text-xs text-gray-500">{report.time}</p>
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                        </div>
                    ))}
                    {reports.length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-4">No reports</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default ReportList;
