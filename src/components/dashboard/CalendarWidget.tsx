import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CalendarWidget = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
        <Card className="shadow-sm border-none">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-gray-800">Calendar</CardTitle>
            </CardHeader>
            <CardContent>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border-none w-full flex justify-center p-0"
                    classNames={{
                        head_cell: "text-muted-foreground w-9 font-normal text-[0.8rem]",
                        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-blue-50 rounded-full",
                        day_selected: "bg-blue-600 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white",
                        caption: "flex justify-center pt-1 relative items-center text-sm font-medium mb-4",
                    }}
                />

                {/* Activities Section Placeholder */}
                <div className="mt-6">
                    <h4 className="text-sm font-semibold mb-3">Activities</h4>
                    <div className="flex gap-3 items-start border-l-2 border-green-500 pl-3 py-1">
                        <div>
                            <p className="text-sm font-medium">Morning Staff Meeting</p>
                            <p className="text-xs text-gray-500">08:00 - 09:00</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CalendarWidget;
