export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'doctor'
  | 'pharmacy'
  | 'pathologist'
  | 'dispatcher'
  | 'hospital_staff'
  | 'medical_team'
  | 'airline_coordinator'
  | 'billing'
  | 'patient_family';

export type BookingStatus =
  | 'requested'
  | 'clinical_review'
  | 'dispatch_review'
  | 'airline_confirmed'
  | 'crew_assigned'
  | 'in_transit'
  | 'completed'
  | 'cancelled';

export type AcuityLevel = 'critical' | 'urgent' | 'stable';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  hospitalId?: string;
  airlineId?: string;
}

export interface Patient {
  id: string;
  name: string;
  dob: string;
  gender: 'male' | 'female' | 'other';
  weight: number;
  allergies?: string;
  diagnosis: string;
  acuityLevel: AcuityLevel;
  vitals?: string;
  specialEquipment?: string[];
  insuranceDetails?: string;
  nextOfKin?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  contactPerson: string;
  phone: string;
  email: string;
  levelOfCare: string;
  icuCapacity: number;
  preferredPickupLocation?: string;
}

export interface Aircraft {
  id: string;
  airlineId: string;
  airlineName: string;
  type: string;
  registration: string;
  range: number;
  speed: number;
  cabinConfig: string;
  maxPayload: number;
  medicalEquipment: string[];
  baseLocation: string;
  status: 'available' | 'in_flight' | 'maintenance';
}

export interface Booking {
  id: string;
  patientId: string;
  patient?: Patient;
  originHospitalId: string;
  originHospital?: Hospital;
  destinationHospitalId: string;
  destinationHospital?: Hospital;
  status: BookingStatus;
  urgency: 'routine' | 'urgent' | 'emergency';
  preferredPickupWindow: string;
  requiredEquipment: string[];
  estimatedFlightTime?: number;
  estimatedCost?: number;
  aircraftId?: string;
  aircraft?: Aircraft;
  crewAssigned?: string[];
  requestedBy: string;
  requestedAt: string;
  approvals: Approval[];
  timeline: TimelineEvent[];
  documents?: Document[];
}

export interface Approval {
  id: string;
  type: 'clinical' | 'dispatch' | 'airline' | 'receiving_hospital';
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: string;
  notes?: string;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  event: string;
  user: string;
  details?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  uploadedBy: string;
  url: string;
}
