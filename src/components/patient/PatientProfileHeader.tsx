import {
    Phone,
    Mail,
    Briefcase,
    MapPin,
    Calendar,
    Edit,
    Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface PatientProfileHeaderProps {
    patient: any; // We can improve type safety later if needed
}

const PatientProfileHeader = ({ patient }: PatientProfileHeaderProps) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Avatar */}
                <Avatar className="w-24 h-24 lg:w-32 lg:h-32 rounded-xl border-2 border-gray-50">
                    <AvatarImage src={patient.image} className="object-cover rounded-xl" />
                    <AvatarFallback className="rounded-xl text-2xl">{patient.name?.charAt(0)}</AvatarFallback>
                </Avatar>

                {/* Info Section */}
                <div className="flex-1">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                {patient.name}
                                <div className="flex gap-2">
                                    <Button variant="outline" size="icon" className="w-8 h-8 rounded-full bg-gray-50 border-gray-200 text-gray-500 hover:text-indigo-600">
                                        <Phone className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button variant="outline" size="icon" className="w-8 h-8 rounded-full bg-gray-50 border-gray-200 text-gray-500 hover:text-indigo-600">
                                        <Mail className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </h1>
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3 text-sm text-gray-500">
                                <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {patient.gender}</span>
                                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {patient.location}</span>
                                <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {patient.job}</span>
                                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {patient.dob} ({patient.age} years)</span>
                            </div>
                        </div>

                        <Button variant="outline" className="gap-2">
                            <Edit className="w-4 h-4" /> Edit
                        </Button>
                    </div>

                    {/* Vitals Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                        {/* BMI */}
                        <div className="bg-white p-4 rounded-xl border border-gray-100 hover:border-indigo-100 transition-colors shadow-sm">
                            <p className="text-2xl font-bold text-gray-900">{patient.vitals?.bmi?.value}</p>
                            <p className="text-xs text-gray-500 mt-1 flex items-center justify-between">
                                BMI
                                <span className="text-green-500 flex items-center gap-0.5 text-[10px] bg-green-50 px-1.5 py-0.5 rounded-full">
                                    ▼ {patient.vitals?.bmi?.trend === 'down' ? '10' : ''}
                                </span>
                            </p>
                        </div>
                        {/* Weight */}
                        <div className="bg-white p-4 rounded-xl border border-gray-100 hover:border-indigo-100 transition-colors shadow-sm">
                            <p className="text-2xl font-bold text-gray-900">{patient.vitals?.weight?.value} <span className="text-sm font-normal text-gray-400">kg</span></p>
                            <p className="text-xs text-gray-500 mt-1 flex items-center justify-between">
                                Weight
                                <span className="text-green-500 flex items-center gap-0.5 text-[10px] bg-green-50 px-1.5 py-0.5 rounded-full">
                                    ▼ 10 kg
                                </span>
                            </p>
                        </div>
                        {/* Height */}
                        <div className="bg-white p-4 rounded-xl border border-gray-100 hover:border-indigo-100 transition-colors shadow-sm">
                            <p className="text-2xl font-bold text-gray-900">{patient.vitals?.height?.value} <span className="text-sm font-normal text-gray-400">Cm</span></p>
                            <p className="text-xs text-gray-500 mt-1">Height</p>
                        </div>
                        {/* BP */}
                        <div className="bg-white p-4 rounded-xl border border-gray-100 hover:border-indigo-100 transition-colors shadow-sm">
                            <p className="text-2xl font-bold text-gray-900">{patient.vitals?.bp?.value}</p>
                            <p className="text-xs text-gray-500 mt-1 flex items-center justify-between">
                                Blood pressure
                                <span className="text-red-500 flex items-center gap-0.5 text-[10px] bg-red-50 px-1.5 py-0.5 rounded-full">
                                    ▲ 10
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side Tags (Diagnosis & Barriers) */}
                <div className="lg:w-64 flex flex-col gap-6 pt-2">
                    <div>
                        <p className="text-xs font-semibold text-gray-900 mb-2">Own diagnosis</p>
                        <div className="flex flex-wrap gap-2">
                            {patient.diagnosis?.map((d: string, i: number) => (
                                <Badge key={i} variant="secondary" className="bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-100 font-normal">
                                    {d}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-900 mb-2">Health barriers</p>
                        <div className="flex flex-wrap gap-2">
                            {patient.barriers?.map((b: string, i: number) => (
                                <Badge key={i} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100 font-normal">
                                    {b}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientProfileHeader;
