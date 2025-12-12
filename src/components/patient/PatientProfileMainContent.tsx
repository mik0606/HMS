import {
    Pill,
    Edit,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PatientProfileMainContentProps {
    patient: any; // Ideally we use a proper interface here
}

const PatientProfileMainContent = ({ patient }: PatientProfileMainContentProps) => {
    return (
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
    );
};

export default PatientProfileMainContent;
