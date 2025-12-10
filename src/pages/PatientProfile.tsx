import { useParams, useNavigate } from 'react-router-dom';
import {
    Phone,
    Mail,
    Briefcase,
    MapPin,
    Calendar,
    Edit,
    Activity,
    ArrowDown,
    ArrowUp,
    Stethoscope, // valid? maybe need to check lucide imports
    ScanLine,    // for scalpel/procedure
    Users,       // for family
    Pill,
    Droplets,    // for water
    Utensils,    // for fasting/food
    Cookie,      // for sugar
    MoreHorizontal,
    ChevronLeft,
    Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockAppointments, mockPatientsList } from '@/data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PatientProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find appointment/patient by ID or Patient ID. 
    // The link logic was `/appointments/patient/${apt.id}` so we look up appointment.
    // In reality, we might want to look up by patient ID, but for this mock, apt.id is unique key used.
    // First try to find by appointment ID (legacy support for Appointments page)
    const appointment = mockAppointments.find(a => a.id === id);
    let patient = appointment?.patient;

    // If not found in appointments, check the mockPatientsList (for Patients page support)
    if (!patient) {
        // We import it here or it should be imported at top. 
        // Need to ensure mockPatientsList is imported.
        // Assuming we update imports below.
        const foundPatient = mockPatientsList.find(p => p.id === id);
        if (foundPatient) {
            // Map the flat patient object to the nested structure used by Profile
            // Or just use it if compatible? 
            // The Profile expects structure: { name, image, ... vitals: {}, history: [] }
            // Our new mockPatientsList has most of these.
            // We'll create a compatible object.
            patient = {
                ...foundPatient,
                image: foundPatient.avatar,
                history: [],
                medications: [],
                diet: [],
                barriers: [],
                diagnosis: [foundPatient.diagnosis],
                vitals: {
                    bmi: {
                        value: foundPatient.vitals.bmi.value,
                        status: 'Normal',
                        trend: 'stable'
                    },
                    weight: {
                        value: foundPatient.vitals.weight.value,
                        unit: foundPatient.vitals.weight.unit,
                        trend: 'stable'
                    },
                    height: foundPatient.vitals.height,
                    bp: {
                        value: foundPatient.vitals.bp.value,
                        status: 'Normal',
                        trend: 'stable'
                    }
                }
            };
        }
    }

    if (!patient) {
        return <div className="p-6">Patient not found</div>;
    }

    return (
        <div className="h-full overflow-y-auto bg-gray-50 p-4 lg:p-6 space-y-6">
            {/* Back & Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <Button variant="ghost" size="sm" className="gap-1 pl-0 hover:bg-transparent hover:text-indigo-600" onClick={() => navigate(-1)}>
                    <ChevronLeft className="w-4 h-4" />
                    Back to Appointments
                </Button>
            </div>

            {/* Profile Header Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Avatar */}
                    <Avatar className="w-24 h-24 lg:w-32 lg:h-32 rounded-xl border-2 border-gray-50">
                        <AvatarImage src={patient.image} className="object-cover rounded-xl" />
                        <AvatarFallback className="rounded-xl text-2xl">{patient.name.charAt(0)}</AvatarFallback>
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
                                {patient.diagnosis?.map((d, i) => (
                                    <Badge key={i} variant="secondary" className="bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-100 font-normal">
                                        {d}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-900 mb-2">Health barriers</p>
                            <div className="flex flex-wrap gap-2">
                                {patient.barriers?.map((b, i) => (
                                    <Badge key={i} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100 font-normal">
                                        {b}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area: Tabs */}
            <div className="mt-8">
                <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="w-full justify-start h-12 bg-transparent border-b border-gray-100 rounded-none p-0 space-x-6">
                        {['Profile', 'Medical History', 'Prescription', 'Lab Result', 'Billings'].map((tab) => (
                            <TabsTrigger
                                key={tab}
                                value={tab.toLowerCase().replace(' ', '-')}
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 text-gray-400 font-medium px-0 pb-3 rounded-none bg-transparent hover:text-gray-600 transition-colors"
                            >
                                {tab}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {/* TAB 1: PROFILE */}
                    <TabsContent value="profile" className="mt-6 space-y-6">
                        {/* Address Section */}
                        <Card className="border-gray-100 shadow-sm">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base font-semibold flex items-center gap-2">
                                    📍 Address
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                                    <div className="flex justify-between border-b border-gray-50 pb-2">
                                        <span className="text-gray-500">HOUSE NO</span>
                                        <span className="font-medium text-gray-900">Not Provided</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-50 pb-2">
                                        <span className="text-gray-500">STREET</span>
                                        <span className="font-medium text-gray-900">Not Provided</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-50 pb-2">
                                        <span className="text-gray-500">CITY</span>
                                        <span className="font-medium text-gray-900">Consultation Room 1</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-50 pb-2">
                                        <span className="text-gray-500">STATE</span>
                                        <span className="font-medium text-gray-900">Not Provided</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-50 pb-2">
                                        <span className="text-gray-500">PINCODE</span>
                                        <span className="font-medium text-gray-900">Not Provided</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-50 pb-2">
                                        <span className="text-gray-500">COUNTRY</span>
                                        <span className="font-medium text-gray-900">India</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 pt-2">
                                    <Button variant="outline" size="sm">Copy</Button>
                                    <Button variant="outline" size="sm">Open in Maps</Button>
                                    <span className="text-xs text-gray-400 ml-auto">Updated: Recently</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Emergency Contact Section */}
                        <Card className="border-gray-100 shadow-sm">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base font-semibold flex items-center gap-2">
                                    👥 Emergency Contact
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                                    <div className="flex justify-between border-b border-gray-50 pb-2">
                                        <span className="text-gray-500">NAME</span>
                                        <span className="font-medium text-gray-900">No contact on file</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-50 pb-2">
                                        <span className="text-gray-500">PHONE</span>
                                        <span className="font-medium text-gray-900">No phone on file</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end pt-2">
                                    <span className="text-xs text-gray-400">Last Updated: Recently</span>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* TAB 2: MEDICAL HISTORY */}
                    <TabsContent value="medical-history" className="mt-6">
                        <Card className="border-gray-100 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-base font-semibold">MEDICAL HISTORY</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader className="bg-gray-50/50">
                                        <TableRow>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Notes</TableHead>
                                            <TableHead>Document</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow className="hover:bg-gray-50 transition-colors">
                                            <TableCell className="font-medium">Complete Medical History</TableCell>
                                            <TableCell className="text-gray-500">03 Dec 2025</TableCell>
                                            <TableCell><Badge variant="outline" className="font-normal text-gray-600">General</Badge></TableCell>
                                            <TableCell className="max-w-md">
                                                <div className="space-y-1 text-xs text-gray-600">
                                                    <p><strong>Conditions:</strong> Thyroid Disorder, Hypertension</p>
                                                    <p><strong>Past:</strong> Hypertension, Asthma</p>
                                                    <p><strong>Surgeries:</strong> Appendix Removal (2018)</p>
                                                    <p><strong>Allergies:</strong> Dust Allergy</p>
                                                    <p className="italic text-gray-500 mt-1">"Patient presents recurring abdominal discomfort and elevated BP levels."</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="sm" className="h-8 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                                                    PDF - View
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="outline" size="sm" className="h-8">View</Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <div className="p-4 border-t border-gray-100 flex justify-end">
                                    <span className="text-xs text-gray-500">Page 1 of 1</span>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* TAB 3: PRESCRIPTION */}
                    <TabsContent value="prescription" className="mt-6">
                        <Card className="border-gray-100 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-base font-semibold">PRESCRIPTIONS</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader className="bg-gray-50/50">
                                        <TableRow>
                                            <TableHead>Medicine</TableHead>
                                            <TableHead>Dosage</TableHead>
                                            <TableHead>Frequency</TableHead>
                                            <TableHead>Duration</TableHead>
                                            <TableHead>Instructions</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Document</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow className="hover:bg-gray-50 transition-colors">
                                            <TableCell className="font-medium flex items-center gap-2">
                                                <div className="bg-indigo-50 p-1.5 rounded text-indigo-600"><Pill className="w-4 h-4" /></div>
                                                Mebeverine
                                            </TableCell>
                                            <TableCell className="text-gray-500">1-0-0</TableCell>
                                            <TableCell className="text-gray-500">7 days</TableCell>
                                            <TableCell className="text-gray-500">—</TableCell>
                                            <TableCell className="text-xs text-gray-500 max-w-[200px]">Take on time. Drink plenty of water.</TableCell>
                                            <TableCell className="text-gray-500">22 Oct 2025</TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="sm" className="h-8 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                                                    PDF - View
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="outline" size="sm" className="h-8">View</Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <div className="p-4 border-t border-gray-100 flex justify-end">
                                    <span className="text-xs text-gray-500">Page 1 of 1</span>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* TAB 4: LAB RESULT */}
                    <TabsContent value="lab-result" className="mt-6">
                        <Card className="border-gray-100 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-base font-semibold">LAB RESULTS</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader className="bg-gray-50/50">
                                        <TableRow>
                                            <TableHead>Test Name</TableHead>
                                            <TableHead>Result</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow className="hover:bg-gray-50 transition-colors">
                                            <TableCell className="font-medium">H. Pylori Test</TableCell>
                                            <TableCell className="text-gray-500">2 parameters</TableCell>
                                            <TableCell className="text-gray-500">13 Sep 2025</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-100 font-normal">Completed</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="outline" size="sm" className="h-8">View</Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className="hover:bg-gray-50 transition-colors">
                                            <TableCell className="font-medium">Endoscopy</TableCell>
                                            <TableCell className="text-gray-500">2 parameters</TableCell>
                                            <TableCell className="text-gray-500">29 Aug 2025</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-100 font-normal">Completed</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="outline" size="sm" className="h-8">View</Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <div className="p-4 border-t border-gray-100 flex justify-end">
                                    <span className="text-xs text-gray-500">Page 1 of 1</span>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* TAB 5: BILLINGS */}
                    <TabsContent value="billings" className="mt-6">
                        <Card className="border-gray-100 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-base font-semibold">BILLINGS</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader className="bg-gray-50/50">
                                        <TableRow>
                                            <TableHead>Medication / Invoice No</TableHead>
                                            <TableHead>Dose / Date</TableHead>
                                            <TableHead>Route / Amount</TableHead>
                                            <TableHead>Frequency / Payment Method</TableHead>
                                            <TableHead>Start</TableHead>
                                            <TableHead>End</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow className="hover:bg-gray-50 transition-colors">
                                            <TableCell className="font-medium">INV-1000</TableCell>
                                            <TableCell className="text-gray-500">2025-08-10</TableCell>
                                            <TableCell className="text-gray-500 font-medium">₹500</TableCell>
                                            <TableCell className="text-gray-500">Credit Card</TableCell>
                                            <TableCell className="text-gray-500">2025-09-10</TableCell>
                                            <TableCell className="text-gray-500 text-xs">Billing for visit 1</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary" className="bg-red-50 text-red-700 hover:bg-red-100 border-red-100 font-normal">Unpaid</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="outline" size="sm" className="h-8 px-2">View</Button>
                                                    <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-500"><Edit className="w-3 h-3" /></Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className="hover:bg-gray-50 transition-colors">
                                            <TableCell className="font-medium">INV-1001</TableCell>
                                            <TableCell className="text-gray-500">2025-08-11</TableCell>
                                            <TableCell className="text-gray-500 font-medium">₹520</TableCell>
                                            <TableCell className="text-gray-500">Cash</TableCell>
                                            <TableCell className="text-gray-500">2025-09-11</TableCell>
                                            <TableCell className="text-gray-500 text-xs">Billing for visit 2</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-100 font-normal">Paid</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="outline" size="sm" className="h-8 px-2">View</Button>
                                                    <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-500"><Edit className="w-3 h-3" /></Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <div className="p-4 border-t border-gray-100 flex justify-end">
                                    <span className="text-xs text-gray-500">Page 1 of 2</span>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default PatientProfile;
