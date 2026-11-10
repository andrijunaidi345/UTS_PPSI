export type OperationalRole = 'mobile' | 'kiosk' | 'emr' | 'pharmacy' | 'command';

export interface Patient {
  id: string;
  name: string;
  gender: 'L' | 'P';
  ageStr: string;
  birthDate: string;
  weightKg: number;
  heightCm: number;
  mrn: string;
  nik: string;
  bpjs: string;
  bpjsStatus: string;
  guardian: string;
  allergy: string;
  bookingCode: string;
  referralNo: string;
  referralSource: string;
}

export interface QueueState {
  patientTicket: string;
  pharmacyTicket: string;
  currentlyCalled: string;
  status: 'checked-in' | 'waiting' | 'consulting' | 'pharmacy' | 'done';
  estimatedMinutes: number;
  stepIndex: number;
}

export interface EmrState {
  encounterId: string;
  doctor: string;
  sip: string;
  primaryIcd10: string;
  secondaryIcd10: string;
  snomedCode: string;
  spriIssued: boolean;
  spriCode: string | null;
  bedAllocated: string;
  rxCode: string;
  rxSentToPharmacy: boolean;
  vitals: {
    tempC: number;
    heartRateBpm: number;
    rrBpm: number;
    spo2Pct: number;
    weightKg: number;
    heightCm: number;
  };
  labLis: {
    thrombocyte: number;
    leukocyte: number;
    hematocrit: number;
    ns1Dengue: string;
  };
}

export interface PharmacyState {
  kanbanStatus: 'received' | 'preparing' | 'ready' | 'dispensed';
  pharmacist: string;
  sipa: string;
  reviewed: boolean;
  teachBackScore: number;
  signatureCaptured: boolean;
}

export interface AuditLogItem {
  id: string;
  time: string;
  actor: string;
  role: string;
  action: string;
  patientMrn: string;
  hash: string;
  ip: string;
  compliance: string;
}

