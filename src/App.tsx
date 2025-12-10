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
            <Route path="/patients" element={<ProtectedRoute allowedRoles={['super_admin']}> <DashboardLayout> <Patients /> </DashboardLayout> </ProtectedRoute>} />
            <Route path="/staff" element={<ProtectedRoute allowedRoles={['super_admin']}> <DashboardLayout> <Staff /> </DashboardLayout> </ProtectedRoute>} />
            <Route path="/payroll" element={<ProtectedRoute allowedRoles={['super_admin']}> <DashboardLayout> <Payroll /> </DashboardLayout> </ProtectedRoute>} />
            <Route path="/pathology" element={<ProtectedRoute allowedRoles={['super_admin']}> <DashboardLayout> <Pathology /> </DashboardLayout> </ProtectedRoute>} />
            <Route path="/pharmacy" element={<ProtectedRoute allowedRoles={['super_admin']}> <DashboardLayout> <Pharmacy /> </DashboardLayout> </ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute allowedRoles={['super_admin']}> <DashboardLayout> <Settings /> </DashboardLayout> </ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
