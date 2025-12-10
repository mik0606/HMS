import axios from 'axios';

// Create Axios instance with base URL
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', // Fallback to local
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for token handling
api.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem('currentUser');
        if (user) {
            const { token } = JSON.parse(user);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for global error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access (e.g., redirect to login)
            // window.location.href = '/login'; 
            // Commented out to prevent forcing redirect in dev without proper setup
            console.warn('Unauthorized access');
        }
        return Promise.reject(error);
    }
);

// Mock Data Generators (for development before backend is fully ready)
const mockStats = {
    totalInvoice: 1287,
    totalPatients: 965,
    appointments: 128,
    bedroom: 315,
    patientsDiff: 56,
    patientsDiffText: "more than yesterday",
    invoiceDiff: 56,
    appointmentDiff: 18,
    bedroomDiff: 56,
};

const mockAppointments = [
    { id: 1, name: "Arthur Morgan", doctor: "Dr. John", time: "10:00 AM - 10:30 AM", status: "Confirmed", avatar: "/avatars/arthur.jpg" },
    { id: 2, name: "Regina Mills", doctor: "Dr. Joel", time: "10:30 AM - 11:00 AM", status: "Confirmed", avatar: "/avatars/regina.jpg" },
    { id: 3, name: "David Warner", doctor: "Dr. Steve", time: "11:00 AM - 11:30 AM", status: "Pending", avatar: "/avatars/david.jpg" },
    { id: 4, name: "Sarah Connor", doctor: "Dr. Sarah", time: "11:30 AM - 12:00 PM", status: "Cancelled", avatar: "/avatars/sarah.jpg" },
];

const mockReports = [
    { id: 1, title: "Room Cleaning Needed", time: "1 min ago", icon: "broom" },
    { id: 2, title: "Equipment Maintenance", time: "3 min ago", icon: "wrench" },
    { id: 3, title: "Medicine Restock", time: "1 hour ago", icon: "pill" },
];

// API Methods
export const getDashboardStats = async () => {
    // return api.get('/admin/dashboard/stats');
    return new Promise((resolve) => setTimeout(() => resolve({ data: mockStats }), 500));
};

export const getAppointments = async () => {
    // return api.get('/appointments');
    return new Promise((resolve) => setTimeout(() => resolve({ data: mockAppointments }), 500));
};

export const getPatients = async () => {
    // return api.get('/patients');
    return new Promise((resolve) => setTimeout(() => resolve({ data: [] }), 500)); // Placeholder
};

export const getReports = async () => {
    return new Promise((resolve) => setTimeout(() => resolve({ data: mockReports }), 500));
};

export default api;
