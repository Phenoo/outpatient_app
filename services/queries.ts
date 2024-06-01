import { supabase } from "@/config/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Appointment, Patient, Premise, Provider } from '@/typings';
import axios from 'axios';

export const useGetProfile = (userId?: string) => {
    return useQuery({
        queryKey: ['patients', userId],
        queryFn: async () => {
            const { data, error } = await supabase
            .from('patients')
            .select('*')
            .eq('user_id', userId)
            .single();

            if (error) throw new Error(error.message);
            return data;
        }
    })
}

export const useGetAppointment = (userId?: string) => {
  return useQuery({
      queryKey: ['appointment', userId],
      queryFn: async () => {
          const { data, error } = await supabase
          .from('appointment')
          .select('*')
          .eq('user_id', userId);
          if (error) throw new Error(error.message);
          return data;
      }
  })
}

export const useProvidersByPremise = (premiseId: number) => {
  return useQuery({
    queryKey: ['providers', premiseId],
    queryFn:  () =>
      apiClient.get(`/providers?premiseId=${premiseId}`).then((res) => res.data)
  },
  );
};

export const useDrugsById = (premiseId: string) => {
  return useQuery({
    queryKey: ['drugsId', premiseId],
    queryFn:  () =>
      apiClientLab.get(`/drugs/${premiseId}`).then((res) => res.data)
  },
  );
};

export const useGetLabs = () => {
  return useQuery({
    queryKey: ['labs'],
    queryFn:  () =>
      apiClientLab.get(`/labs`).then((res) => res.data)
  },
  );
};

export const useGetDrugs = () => {
  return useQuery({
    queryKey: ['drugs'],
    queryFn:  () =>
      apiClientLab.get(`/drugs`).then((res) => res.data)
  },
  );
};

const apiClient = axios.create({
    baseURL: 'https://www.britelink.io/api/v1/appointments',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer secret_699038a1-a1de-4f70-8e63-308f2c8caf48`, // Replace with your actual API key
    },
  });

  const apiClientLab = axios.create({
    baseURL: 'https://www.britelink.io/api/v1/',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer secret_699038a1-a1de-4f70-8e63-308f2c8caf48`, // Replace with your actual API key
    },
  });
  
  export const fetchLabs = () =>
    apiClient.get<any[]>('/labs').then((res) => res.data);
  
  // Fetch all patients
  export const fetchPatients = () =>
    apiClient.get<Patient[]>('/patients').then((res) => res.data);
  
  // Create a new patient with optional internal DB usage
  export const createPatient = (data: Patient, useInternalDb: boolean = false) =>
    apiClient.post<Patient>(`/patients?useInternalDb=${useInternalDb}`, data);
  
  // Update existing patient data
  export const updatePatient = async (id: number, patientData: Patient) => {
    try {
      const response = await apiClient.put('/patients', { id, patientData });
      if (response.status !== 200) {
        throw new Error(`Failed to update patient: ${response.statusText}`);
      }
      return response.data;
    } catch (error) {
      console.error('Error updating patient:', error);
      return null;
    }
  };
  
  // Delete a patient by ID
  export const deletePatient = async (id: number) => {
    try {
      const response = await apiClient.delete('/patients', { data: { id } });
      if (response.status !== 204) {
        throw new Error(`Failed to delete patient: ${response.statusText}`);
      }
      return 'Patient deleted successfully';
    } catch (error) {
      console.error('Error deleting patient:', error);
      return null;
    }
  };
  
  // Fetch all premises
  export const fetchPremises = () =>
    apiClient.get<Premise[]>('/premises').then((res) => res.data);
  
  // Create a new premise with optional internal DB usage
  export const createPremise = (data: Premise, useInternalDb: boolean = false) =>
    apiClient.post<Premise>(`/premises?useInternalDb=${useInternalDb}`, data);
  
  // Update existing premise data
  export const updatePremise = async (id: number, premiseData: Premise) => {
    try {
      const response = await apiClient.put('/premises', { id, premiseData });
      if (response.status !== 200) {
        throw new Error(`Failed to update premise: ${response.statusText}`);
      }
      return response.data;
    } catch (error) {
      console.error('Error updating premise:', error);
      return null;
    }
  };
  
  // Delete a premise by ID
  export const deletePremise = async (id: number) => {
    try {
      const response = await apiClient.delete('/premises', { data: { id } });
      if (response.status !== 204) {
        throw new Error(`Failed to delete premise: ${response.statusText}`);
      }
      return 'Premise deleted successfully';
    } catch (error) {
      console.error('Error deleting premise:', error);
      return null;
    }
  };
  
  // Fetch all providers
  export const fetchProviders = () =>
    apiClient.get<Provider[]>('/providers').then((res) => res.data);
  
  // Create a new provider with optional internal DB usage
  export const createProvider = (
    data: Provider,
    useInternalDb: boolean = false,
  ) =>
    apiClient.post<Provider>(`/providers?useInternalDb=${useInternalDb}`, data);
  
  // Update existing provider data
  export const updateProvider = async (id: number, providerData: Provider) => {
    try {
      const response = await apiClient.put('/providers', { id, providerData });
      if (response.status !== 200) {
        throw new Error(`Failed to update provider: ${response.statusText}`);
      }
      return response.data;
    } catch (error) {
      console.error('Error updating provider:', error);
      return null;
    }
  };
  
  // Delete a provider by ID
  export const deleteProvider = async (id: number) => {
    try {
      const response = await apiClient.delete(`/providers`, { data: { id } });
      if (response.status !== 204) {
        throw new Error(`Failed to delete provider: ${response.statusText}`);
      }
      return 'Provider deleted successfully';
    } catch (error) {
      console.error('Error deleting provider:', error);
      return null;
    }
  };
  
  // Fetch providers by premise ID
  export const fetchProvidersByPremise = (premiseId: number) =>
    apiClient
      .get<Provider[]>(`/providers?premiseId=${premiseId}`)
      .then((res) => res.data);
  

  // Fetch a specific provider by ID
  export const fetchProvider = async (id: number) => {
    return apiClient
      .get<Provider | Provider[]>(`/providers?id=${id}`)
      .then((res) => res.data);
  };
  
  // Fetch all appointments
  export const fetchAppointments = () =>
    apiClient.get<Appointment[]>('/').then((res) => res.data);
  
  // Create an appointment with optional internal DB usage
  export const createAppointment = (
    data: Appointment,
    useInternalDb: boolean = false,
  ) =>
    apiClient.post<Appointment>(
      `/appointments?useInternalDb=${useInternalDb}`,
      data,
    );
  
  // Update existing appointment data
  export const updateAppointment = async (id: number, appointmentData: any) => {
    try {
      const response = await apiClient.put(`/appointments`, {
        id,
        appointmentData,
      });
      if (response.status !== 200) {
        throw new Error(`Failed to update appointment: ${response.statusText}`);
      }
      return response.data;
    } catch (error) {
      console.error('Error updating appointment:', error);
      return null;
    }
  };
  
  // Delete an appointment by ID
  export const deleteAppointment = async (id: number) => {
    try {
      const response = await apiClient.delete('/appointments', { data: { id } });
      if (response.status !== 204) {
        throw new Error(`Failed to delete appointment: ${response.statusText}`);
      }
      return 'Appointment successfully deleted';
    } catch (error) {
      console.error('Error deleting appointment:', error);
      return null;
    }
  };
  
  export default apiClient;