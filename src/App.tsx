import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Patients from "./pages/Patients";
import Staff from "./pages/Staff";
import Payroll from "./pages/Payroll";
import Pathology from "./pages/Pathology";
import Pharmacy from "./pages/Pharmacy";
import PatientProfile from "./pages/PatientProfile";
import Settings from "./pages/Settings";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import DoctorDashboard from "./pages/doctor/Dashboard";
import DoctorAppointment from "./pages/doctor/Appointment";
import DoctorPatient from "./pages/doctor/Patient";
import DoctorSchedule from "./pages/doctor/Schedule";
import DoctorSettings from "./pages/doctor/Settings";
import PharmacyDashboard from "./pages/pharmacy/Dashboard";
import PharmacyMedicine from "./pages/pharmacy/Medicine";
import PharmacyPrescription from "./pages/pharmacy/Prescription";
import PharmacySettings from "./pages/pharmacy/Settings";
import PathologistDashboard from "./pages/pathologist/Dashboard";
import PathologistTestReports from "./pages/pathologist/TestReports";
import PathologistPatients from "./pages/pathologist/Patients";
import PathologistSettings from "./pages/pathologist/Settings";
import DoctorPatientProfile from "./pages/doctor/PatientProfile";
import PharmacyPatientProfile from "./pages/pharmacy/PatientProfile";
import PathologistPatientProfile from "./pages/pathologist/PatientProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected Routes with Layout */}
            <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['super_admin']}> <DashboardLayout> <Dashboard /> </DashboardLayout> </ProtectedRoute>} />
            <Route path="/appointments" element={<ProtectedRoute allowedRoles={['super_admin']}> <DashboardLayout> <Appointments /> </DashboardLayout> </ProtectedRoute>} />
            <Route path="/appointments/patient/:id" element={<ProtectedRoute allowedRoles={['super_admin']}> <DashboardLayout> <PatientProfile /> </DashboardLayout> </ProtectedRoute>} />
            <Route path="/superadmin/patient/profile" element={<ProtectedRoute allowedRoles={['super_admin']}> <DashboardLayout> <PatientProfile /> </DashboardLayout> </ProtectedRoute>} />
            <Route path="/patients" element={<ProtectedRoute allowedRoles={['super_admin']}> <DashboardLayout> <Patients /> </DashboardLayout> </ProtectedRoute>} />
            <Route path="/staff" element={<ProtectedRoute allowedRoles={['super_admin']}> <DashboardLayout> <Staff /> </DashboardLayout> </ProtectedRoute>} />
            <Route path="/payroll" element={<ProtectedRoute allowedRoles={['super_admin']}> <DashboardLayout> <Payroll /> </DashboardLayout> </ProtectedRoute>} />
            <Route path="/pathology" element={<ProtectedRoute allowedRoles={['super_admin']}> <DashboardLayout> <Pathology /> </DashboardLayout> </ProtectedRoute>} />
            <Route path="/pharmacy" element={<ProtectedRoute allowedRoles={['super_admin']}> <DashboardLayout> <Pharmacy /> </DashboardLayout> </ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute allowedRoles={['super_admin']}> <DashboardLayout> <Settings /> </DashboardLayout> </ProtectedRoute>} />

            {/* Doctor Routes */}
            <Route path="/doctor/dashboard" element={<ProtectedRoute allowedRoles={['doctor']}> <DashboardLayout> <DoctorDashboard /> </DashboardLayout> </ProtectedRoute>} />
            <Route path="/doctor/appointment" element={<ProtectedRoute allowedRoles={['doctor']}> <DashboardLayout> <DoctorAppointment /> </DashboardLayout> </ProtectedRoute>} />
            <Route path="/doctor/schedule" element={<ProtectedRoute allowedRoles={['doctor']}> <DashboardLayout> <DoctorSchedule /> </DashboardLayout> </ProtectedRoute>} />
            <Route path="/doctor/settings" element={<ProtectedRoute allowedRoles={['doctor']}> <DashboardLayout> <DoctorSettings /> </DashboardLayout> </ProtectedRoute>} />
            <Route path="/doctor/patient" element={<ProtectedRoute allowedRoles={['doctor']}> <DashboardLayout> <DoctorPatient /> </DashboardLayout> </ProtectedRoute>} />
            <Route path="/doctor/patient/profile" element={<ProtectedRoute allowedRoles={['doctor']}> <DashboardLayout> <DoctorPatientProfile /> </DashboardLayout> </ProtectedRoute>} />

            {/* Pharmacy Routes */}
            <Route path="/pharmacy/dashboard" element={<ProtectedRoute allowedRoles={['pharmacy']}> <DashboardLayout> <PharmacyDashboard /> </DashboardLayout> </ProtectedRoute>} />
            <Route path="/pharmacy/medicine" element={<ProtectedRoute allowedRoles={['pharmacy']}> <DashboardLayout> <PharmacyMedicine /> </DashboardLayout> </ProtectedRoute>} />
            <Route path="/pharmacy/prescription" element={<ProtectedRoute allowedRoles={['pharmacy']}> <DashboardLayout> <PharmacyPrescription /> </DashboardLayout> </ProtectedRoute>} />
            <Route path="/pharmacy/settings" element={<ProtectedRoute allowedRoles={['pharmacy']}> <DashboardLayout> <PharmacySettings /> </DashboardLayout> </ProtectedRoute>} />
            <Route path="/pharmacy/patient/profile" element={<ProtectedRoute allowedRoles={['pharmacy']}> <DashboardLayout> <PharmacyPatientProfile /> </DashboardLayout> </ProtectedRoute>} />

            {/* Pathologist Routes */}
            <Route path="/pathologist/dashboard" element={<ProtectedRoute allowedRoles={['pathologist']}> <DashboardLayout> <PathologistDashboard /> </DashboardLayout> </ProtectedRoute>} />
            <Route path="/pathologist/reports" element={<ProtectedRoute allowedRoles={['pathologist']}> <DashboardLayout> <PathologistTestReports /> </DashboardLayout> </ProtectedRoute>} />
            <Route path="/pathologist/patients" element={<ProtectedRoute allowedRoles={['pathologist']}> <DashboardLayout> <PathologistPatients /> </DashboardLayout> </ProtectedRoute>} />
            <Route path="/pathologist/settings" element={<ProtectedRoute allowedRoles={['pathologist']}> <DashboardLayout> <PathologistSettings /> </DashboardLayout> </ProtectedRoute>} />
            <Route path="/pathologist/patient/profile" element={<ProtectedRoute allowedRoles={['pathologist']}> <DashboardLayout> <PathologistPatientProfile /> </DashboardLayout> </ProtectedRoute>} />


            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
