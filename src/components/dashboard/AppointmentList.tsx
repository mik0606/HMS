import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Appointment {
    id: number;
    name: string;
    doctor: string;
    time: string;
    status: string;
    avatar: string;
}

interface AppointmentListProps {
    appointments: Appointment[];
}

const AppointmentList = ({ appointments }: AppointmentListProps) => {
    return (
        <Card className="shadow-sm border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold text-gray-800">Upcoming Appointments</CardTitle>
                <Select defaultValue="all">
                    <SelectTrigger className="w-[100px] h-8 text-xs bg-gray-50 border-none">
                        <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                    {appointments.map((apt) => (
                        <div key={apt.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={apt.avatar} />
                                    <AvatarFallback>{apt.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{apt.name}</p>
                                    <p className="text-xs text-gray-500">{apt.doctor} • {apt.time}</p>
                                </div>
                            </div>
                            <Badge variant="secondary" className={cn(
                                "rounded-full font-normal",
                                apt.status === "Confirmed" && "bg-green-100 text-green-700 hover:bg-green-200",
                                apt.status === "Pending" && "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
                                apt.status === "Cancelled" && "bg-red-100 text-red-700 hover:bg-red-200",
                            )}>
                                {apt.status}
                            </Badge>
                        </div>
                    ))}
                    {appointments.length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-4">No upcoming appointments</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default AppointmentList;
