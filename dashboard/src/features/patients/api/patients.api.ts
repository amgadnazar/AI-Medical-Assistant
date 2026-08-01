import api from "@/lib/api";

export interface CreatePatientPayload {
  phone_number: string;
  name: string;
  age?: number | null;
  gender?: string | null;
  blood_type?: string | null;
  allergies?: string | null;
  chronic_diseases?: string | null;
  medications?: string | null;
  height?: number | null;
  weight?: number | null;
}

// ======================================
// Get All Patients
// ======================================

export const getPatients = async () => {
  const { data } = await api.get("/patients");
  return data;
};

// ======================================
// Create Patient
// ======================================

export const createPatient = async (
  patient: CreatePatientPayload
) => {
  const { data } = await api.post(
    "/patients",
    patient
  );

  return data;
};