import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Clock,
    CalendarDays,
    User,
    CheckCircle2,
    MoreHorizontal
} from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import 'react-day-picker/dist/style.css'; // Ensure base styles are available or handle via classNames

// Mock Appointment Data
const appointments = {
    '2025-12-01': 1,
    '2025-12-08': 1,
    '2025-12-10': 1,
    '2025-12-11': 1,
    '2025-12-12': 1, // Today?
    '2025-12-15': 1, // Example
    '2025-12-16': 1,
};

const DoctorSchedule = () => {
    const [date, setDate] = useState<Date | undefined>(new Date(2025, 11, 1)); // Dec 1 2025

    // Custom Day Component to render appointment counts
    const footer = <div />;

    const modifiers = {
        hasAppointment: (date: Date) => {
            const dateStr = format(date, 'yyyy-MM-dd');
            return !!appointments[dateStr as keyof typeof appointments];
        }
    };

    const modifiersStyles = {
        hasAppointment: {
            // We will handle styling via classNames or custom render
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-theme(spacing.20))] gap-6 p-6 bg-[#FAFBFF] overflow-hidden font-sans">

            {/* Left Side - Calendar */}
            <div className="flex-1 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center">
                <div className="w-full flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#1E293B] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-slate-200">
                            <CalendarDays className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">Schedule Calendar</h1>
                    </div>
                    <div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" />
                        18 Total
                    </div>
                </div>

                <div className="w-full max-w-xl custom-calendar-wrapper">
                    <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        showOutsideDays
                        className="p-0"
                        classNames={{
                            months: "flex flex-col space-y-4",
                            month: "space-y-4 w-full",
                            caption: "flex justify-center pt-1 relative items-center mb-8",
                            caption_label: "text-xl font-bold text-slate-900",
                            nav: "space-x-1 flex items-center absolute w-full justify-between top-0 px-2",
                            nav_button: "h-9 w-9 bg-transparent p-0 text-indigo-600 hover:bg-slate-50 rounded-full flex items-center justify-center transition-colors",
                            nav_button_previous: "absolute left-0",
                            nav_button_next: "absolute right-0",
                            table: "w-full border-collapse",
                            head_row: "flex justify-between mb-4",
                            head_cell: "text-slate-400 rounded-md w-14 font-medium text-sm text-center",
                            row: "flex w-full mt-2 justify-between",
                            cell: "h-14 w-14 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
                            day: "h-14 w-14 p-0 font-medium text-slate-600 hover:bg-slate-50 rounded-2xl transition-all aria-selected:opacity-100 group flex items-center justify-center relative",
                            day_selected:
                                "bg-transparent text-slate-900", // We handle the circle manualy in FormatDay
                            day_today: "bg-slate-50 text-slate-900",
                            day_outside: "text-slate-300 opacity-50",
                            day_disabled: "text-slate-300 opacity-50",
                            day_hidden: "invisible",
                        }}
                        components={{
                            DayContent: (props) => {
                                const { date: dayDate, activeModifiers } = props;
                                const isSelected = date && dayDate.toDateString() === date.toDateString();
                                const dateStr = format(dayDate, 'yyyy-MM-dd');
                                const count = appointments[dateStr as keyof typeof appointments];

                                return (
                                    <div className={cn(
                                        "w-full h-full flex flex-col items-center justify-center rounded-2xl relative z-10",
                                        isSelected ? "bg-[#38bdf8] text-white shadow-lg shadow-sky-200" :
                                            count ? "" : ""
                                    )}>
                                        <span className={cn(
                                            "z-20",
                                            isSelected ? "text-white" : "text-slate-600"
                                        )}>{dayDate.getDate()}</span>

                                        {!isSelected && count && (
                                            <div className="absolute -bottom-1 w-6 h-6 bg-[#1e1b4b] rounded-full flex items-center justify-center border-2 border-white mt-1">
                                                <span className="text-[10px] font-bold text-white">{count}</span>
                                            </div>
                                        )}

                                        {/* For the selected day design pattern in screenshot 1: 
                                            The screenshot actually shows:
                                            - Selected day (Dec 1) has dark blue/indigo circle background with '1' inside it? 
                                            Wait, looking at screenshot 1:
                                            "Mon 1" is selected. It has a big indigo circle. Inside there's "1" (date) and below it "1" (badge).
                                            Wait, looks like the "1" badge is overlapping or inside.
                                            Actually, let's look closer. 
                                            Dec 8 has a date "8" and below it a blue circle with "1".
                                            Dec 1 (Selected) has a big dark blue circle. THE WHOLE CELL IS BLUE. And inside is "1" (date) and below "1" (small badge).
                                            
                                            My implementation:
                                            - If selected: Big Blue bg.
                                            - If count: Small badge below.
                                        */}
                                        {isSelected && count && (
                                            <div className="absolute -bottom-2 w-5 h-5 bg-white text-[#1e1b4b] rounded-full flex items-center justify-center shadow-sm">
                                                <span className="text-[10px] font-bold">{count}</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            },
                            IconLeft: ({ ..._props }) => <ChevronLeft className="h-6 w-6 text-indigo-500" />,
                            IconRight: ({ ..._props }) => <ChevronRight className="h-6 w-6 text-indigo-500" />,
                        }}
                    />

                    <div className="flex justify-end mt-4">
                        <div className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-xs font-semibold">
                            2 weeks
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Panel */}
            <div className="w-[400px] flex flex-col gap-6">
                {/* Appointments Section */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-slate-900">Appointments</h2>
                        <div className="w-8 h-8 rounded-full bg-[#1e1b4b] text-white flex items-center justify-center font-bold text-sm">1</div>
                    </div>

                    <p className="text-slate-500 font-medium mb-6">Monday, December 1, 2025</p>

                    {/* Patient Card */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm mb-6 relative overflow-hidden">
                        {/* Status Badge */}
                        <div className="absolute top-5 right-5">
                            <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1.5 rounded-full">Completed</span>
                        </div>

                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-14 h-14 rounded-full bg-pink-500 flex items-center justify-center text-white shadow-md shadow-pink-200">
                                {/* Gender Icon - Female */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-venus"><path d="M12 15v7" /><path d="M9 19h6" /><circle cx="12" cy="7" r="5" /></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Rahul Menon</h3>
                                <p className="text-slate-500 text-sm">70 years • </p>
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-6 mb-8 px-2">
                        <div className="flex items-start gap-3">
                            <Clock className="w-5 h-5 text-indigo-600 mt-0.5" />
                            <div>
                                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Time:</p>
                                <p className="text-slate-900 font-bold text-lg">13:10</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-5 h-5 flex items-center justify-center rounded bg-indigo-50 text-indigo-600 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></svg>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Reason:</p>
                                <p className="text-slate-900 font-bold">Loss of appetite</p>
                            </div>
                        </div>
                    </div>

                    <Button className="w-full bg-[#1e1b4b] hover:bg-[#2e2a6b] text-white rounded-xl h-12 text-sm font-semibold shadow-lg shadow-indigo-100 flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /></svg>
                        View Patient Details
                    </Button>
                </div>

                <div className="mt-auto flex justify-end">
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-1">
                            <img src="/path/to/logo-icon.png" alt="Ask Movi" className="w-8 h-8 object-contain" onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement!.innerText = 'AM';
                            }} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-900">Ask Movi</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorSchedule;
