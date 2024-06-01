// Enum for FacilityType
export enum FacilityType {
    HOSPITAL = 'HOSPITAL',
    CLINIC = 'CLINIC',
    DIAGNOSTIC_CENTER = 'DIAGNOSTIC_CENTER',
    PHARMACY = 'PHARMACY',
    SURGERY_CENTER = 'SURGERY_CENTER',
  }
  export interface Premise {
    id: number;
    licenceNo?: string;
    premisesName?: string;
    licensee?: string;
    address?: string;
    premisesTypes?: string;
    town?: string;
    expiryDate?: string; //  DateTime translates to string in JSON
    supervisorsName?: string;
    facilityType?: FacilityType;
    tenantId?: string;
    // Relationships might not need to be defined here if they are not included in the typical API responses
  }
  export interface Service {
    id: number;
    name: string;
    description: string;
    providerId: number;
    // `provider` is omitted here because it represents a relation in Prisma and may not be necessary in the type itself.
    // If you need to include the Provider object, you should define it as `provider?: Provider;`
    tenantId?: string;
  }
  
  // Enum for HealthcareProviderRole
  export enum HealthcareProviderRole {
    DOCTOR = 'DOCTOR',
    NURSE = 'NURSE',
    PHARMACIST = 'PHARMACIST',
    THERAPIST = 'THERAPIST',
    SURGEON = 'SURGEON',
    DENTIST = 'DENTIST',
    PSYCHIATRIST = 'PSYCHIATRIST',
    PEDIATRICIAN = 'PEDIATRICIAN',
    OPTOMETRIST = 'OPTOMETRIST',
    CHIROPRACTOR = 'CHIROPRACTOR',
  }
  export enum DayOfWeek {
    SUNDAY = 0, // JavaScript's `Date` object treats Sunday as 0
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6,
  }
  
  export interface AvailabilitySchedule {
    id: number;
    providerId: number;
    dayOfWeek: keyof typeof DayOfWeek;
    startTime: string; // HH:MM format
    endTime: string; // HH:MM format
    tenantId?: string;
  }
  
  // Interface for Provider
  export interface Provider {
    id: number;
    name: string;
    specialization: HealthcareProviderRole;
    qualifications?: string;
    timeZone?: string;
    phone?: string;
    email?: string;
    premiseId?: number;
    tenantId?: string;
    createdAt: string;
    premise?: Premise;
    services?: Service[];
    availabilitySchedules?: AvailabilitySchedule[]; // Array of availability schedules
  }
  export interface MedicalRecord {
    id: number;
    patientId: number;
    recordType?: string;
    description?: string;
    documentUrl?: string;
    createdAt: Date;
    updatedAt: Date;
    tenantId?: string;
  }
  
  // Enum for Gender
  export enum Gender {
    MALE = 'Male',
    FEMALE = 'Female',
  }
  
  // Interface for Patient
  export interface Patient {
    id: number;
    name: string;
    gender?: Gender;
    tenantId?: string;
    birthDate?: string; // DateTime translates to string in JSON
    contactInfo?: string;
    emergencyContact?: string;
  }
  // Enum for AppointmentStatus
  export enum AppointmentStatus {
    REQUESTED = 'REQUESTED',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED',
  }
  // Interface for Appointment
  export interface Appointment {
    id: number;
    date?: string; //  DateTime translates to string in JSON
    status: AppointmentStatus;
    patientId: number;
    providerId?: number;
    premiseId?: number;
    reason?: string;
    isVirtual: boolean;
    isEmergency: boolean;
    createdAt?: string;
    updatedAt?: string;
  }