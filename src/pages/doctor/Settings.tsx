import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { LogOut } from 'lucide-react';

const DoctorSettings = () => {
    return (
        <div className="p-6 lg:p-8 bg-[#FAFBFF] min-h-[calc(100vh-theme(spacing.16))] font-sans">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 gap-2">
                    <LogOut className="w-4 h-4" />
                    Logout
                </Button>
            </div>

            <div className="space-y-6">
                {/* Professional Profile Card */}
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-8">Professional Profile</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="fullName" className="text-slate-500 font-medium">Full Name</Label>
                            <div className="relative">
                                <Input
                                    id="fullName"
                                    defaultValue="Sriram I"
                                    className="h-12 bg-transparent border-0 border-b border-slate-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-indigo-500 text-lg font-semibold text-slate-700 placeholder:text-slate-300"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="specialty" className="text-slate-500 font-medium">Specialty</Label>
                            <div className="relative">
                                <Input
                                    id="specialty"
                                    defaultValue="General Physician"
                                    className="h-12 bg-transparent border-0 border-b border-slate-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-indigo-500 text-lg font-semibold text-slate-700 placeholder:text-slate-300"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="department" className="text-slate-500 font-medium">Department</Label>
                            <div className="relative">
                                <Input
                                    id="department"
                                    defaultValue="Cardiology"
                                    className="h-12 bg-transparent border-0 border-b border-slate-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-indigo-500 text-lg font-semibold text-slate-700 placeholder:text-slate-300"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="license" className="text-slate-500 font-medium">License Number</Label>
                            <div className="relative">
                                <Input
                                    id="license"
                                    defaultValue="DOC-789456123"
                                    className="h-12 bg-transparent border-0 border-b border-slate-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-indigo-500 text-lg font-semibold text-slate-700 placeholder:text-slate-300"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* My Status Card */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-center">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">My Status</h2>
                        <Select defaultValue="available">
                            <SelectTrigger className="w-full h-12 border-slate-200 rounded-xl bg-slate-50/50 focus:ring-indigo-500">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="available">Available</SelectItem>
                                <SelectItem value="busy">Busy</SelectItem>
                                <SelectItem value="offline">Offline</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Notification Preferences Card */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Notification Preferences</h2>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-slate-700">Email Notifications</span>
                                <Switch defaultChecked className="data-[state=checked]:bg-red-400" />
                            </div>
                            <div className="bg-slate-50 h-px w-full" />
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-slate-700">Push Notifications</span>
                                <Switch defaultChecked className="data-[state=checked]:bg-red-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ask Movi Badge */}
            <div className="fixed bottom-6 right-6 flex flex-col items-center z-50 pointer-events-none">
                <div className="w-14 h-14 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center mb-1 pointer-events-auto cursor-pointer hover:scale-105 transition-transform">
                    <img src="/path/to/logo-icon.png" alt="Ask Movi" className="w-10 h-10 object-contain" onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerText = 'AM';
                    }} />
                </div>
                <span className="text-[10px] font-bold text-slate-900">Ask Movi</span>
            </div>
        </div>
    );
};

export default DoctorSettings;
