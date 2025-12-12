import { useSearchParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockAppointments, mockPatientsList } from '@/data/mockData';
import PatientProfileHeader from '@/components/patient/PatientProfileHeader';
import PatientProfileMainContent from '@/components/patient/PatientProfileMainContent';

const DoctorPatientProfile = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const navigate = useNavigate();

    // Reusing the logic to find patient
    const appointment = mockAppointments.find(a => a.id === id);
    let patient: any = appointment?.patient;

    if (!patient) {
        const foundPatient = mockPatientsList.find(p => p.id === id);
        if (foundPatient) {
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
            {/* Doctor Local Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="hover:bg-gray-100 rounded-full">
                        <ChevronLeft className="w-5 h-5 text-gray-500" />
                    </Button>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Patient Profile</h1>
                        <p className="text-sm text-gray-500">View and manage patient details</p>
                    </div>
                </div>
            </div>

            {/* Shared Components */}
            <PatientProfileHeader patient={patient} />
            <PatientProfileMainContent patient={patient} />
        </div>
    );
};

export default DoctorPatientProfile;
