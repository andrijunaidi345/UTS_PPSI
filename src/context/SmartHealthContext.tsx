'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { OperationalRole, Patient, QueueState, EmrState, PharmacyState, AuditLogItem } from '@/types/smarthealth';

interface SmartHealthContextType {
  currentRole: OperationalRole;
  setCurrentRole: (role: OperationalRole) => void;
  elderlyMode: boolean;
  setElderlyMode: (mode: boolean) => void;
  patient: Patient;
  queue: QueueState;
  emr: EmrState;
  pharmacy: PharmacyState;
  auditLogs: AuditLogItem[];
  addAuditLog: (action: string, detail: string) => void;
  issueSpri: (bedName: string) => void;
  sendPrescription: () => void;
  completeReview: () => void;
  completeDispense: () => void;
  callQueueTicket: (ticket: string, lang?: string) => void;
}

const defaultPatient: Patient = {
  id: "P-10029481920",
  name: "Ananda Rayyan Pratama",
  gender: "L",
  ageStr: "3 th 2 bln",
  birthDate: "2023-09-10",
  weightKg: 14.2,
  heightCm: 94,
  mrn: "RM-2026-98124",
  nik: "1871011209230002",
  bpjs: "0001827391823",
  bpjsStatus: "Aktif (PBI)",
  guardian: "Ibu Siti Rahmawati (0812-9842-1102)",
  allergy: "Penisilin & Amoksisilin (Angioedema & Erupsi Makulopapular)",
  bookingCode: "#BK-20261112-0429",
  referralNo: "0142/RJK-KDT/XI/2026",
  referralSource: "Puskesmas Kedaton (Bandar Lampung)"
};

const SmartHealthContext = createContext<SmartHealthContextType | undefined>(undefined);

export const SmartHealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<OperationalRole>('mobile');
  const [elderlyMode, setElderlyMode] = useState<boolean>(false);
  const [patient] = useState<Patient>(defaultPatient);

  const [queue, setQueue] = useState<QueueState>({
    patientTicket: "A-025",
    pharmacyTicket: "F-018",
    currentlyCalled: "A-024",
    status: "waiting",
    estimatedMinutes: 6,
    stepIndex: 3
  });

  const [emr, setEmr] = useState<EmrState>({
    encounterId: "ENC-20261112-08992",
    doctor: "Dr. Agtari Ayu, Sp.A",
    sip: "446/102/SIP/2024",
    primaryIcd10: "A97.0 Dengue Fever with Warning Signs",
    secondaryIcd10: "E86.0 Dehidrasi Ringan-Sedang",
    snomedCode: "38362002",
    spriIssued: false,
    spriCode: null,
    bedAllocated: "Ruang Melati Bed 04",
    rxCode: "#RX-20261112-0042",
    rxSentToPharmacy: true,
    vitals: {
      tempC: 38.6,
      heartRateBpm: 122,
      rrBpm: 26,
      spo2Pct: 98,
      weightKg: 14.2,
      heightCm: 94
    },
    labLis: {
      thrombocyte: 108000,
      leukocyte: 3200,
      hematocrit: 41.2,
      ns1Dengue: "REAKTIF (+)"
    }
  });

  const [pharmacy, setPharmacy] = useState<PharmacyState>({
    kanbanStatus: "received",
    pharmacist: "apt. Fajar Nugroho, S.Farm",
    sipa: "19890412/SIPA_33.76/2023",
    reviewed: false,
    teachBackScore: 3,
    signatureCaptured: false
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([
    {
      id: "LOG-20261112-0945",
      time: "09:36:12 WIB",
      actor: "Dr. Agtari Ayu, Sp.A",
      role: "Dokter Spesialis Anak",
      action: "WRITE_SOAP_EMR",
      patientMrn: "RM-2026-98124",
      hash: "a8f9c1e74b29f03d15e9821cb7309d44",
      ip: "192.168.10.42 (LPG-POLI-03)",
      compliance: "UU PDP 27/2022 Verified"
    },
    {
      id: "LOG-20261112-0930",
      time: "09:30:05 WIB",
      actor: "Petugas Loket Dewi",
      role: "Perekam Medis Loket",
      action: "VERIFY_VCLAIM_SEP",
      patientMrn: "RM-2026-98124",
      hash: "4f28e6c7104b998d361ea23df1259c07",
      ip: "192.168.10.11 (KIOSK-LOBI-01)",
      compliance: "PMK 24/2022 Verified"
    }
  ]);

  const addAuditLog = (action: string, detail: string) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')} WIB`;
    const randomHash = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    const newLog: AuditLogItem = {
      id: `LOG-20261112-${Math.floor(1000 + Math.random() * 9000)}`,
      time: timeStr,
      actor: currentRole === 'emr' ? "Dr. Agtari Ayu, Sp.A" : (currentRole === 'pharmacy' ? "apt. Fajar Nugroho" : "Petugas Loket"),
      role: currentRole === 'emr' ? "Dokter Sp.A" : "Tenaga Kesehatan",
      action,
      patientMrn: patient.mrn,
      hash: randomHash,
      ip: "192.168.10.42 (LPG-NODE)",
      compliance: "UU PDP 27/2022 Verified"
    };

    setAuditLogs(prev => [newLog, ...prev]);
  };

  const issueSpri = (bedName: string) => {
    setEmr(prev => ({
      ...prev,
      spriIssued: true,
      spriCode: "#SPRI-20261112-0081",
      bedAllocated: bedName
    }));
    addAuditLog("ISSUE_SPRI_ADMISSION", `Penerbitan SPRI Rawat Inap ${bedName}`);
  };

  const sendPrescription = () => {
    setEmr(prev => ({ ...prev, rxSentToPharmacy: true }));
    setPharmacy(prev => ({ ...prev, kanbanStatus: "received" }));
    addAuditLog("SEND_E_PRESCRIPTION", "Kirim Resep #RX-20261112-0042 ke Farmasi");
  };

  const completeReview = () => {
    setPharmacy(prev => ({ ...prev, reviewed: true, kanbanStatus: "preparing" }));
    addAuditLog("PHARMACY_REVIEW_PASSED", "Persetujuan Telaah 3 Aspek Resep #RX-0042");
  };

  const completeDispense = () => {
    setPharmacy(prev => ({ ...prev, kanbanStatus: "dispensed", signatureCaptured: true }));
    setQueue(prev => ({ ...prev, status: "done", stepIndex: 4 }));
    addAuditLog("DISPENSE_COMPLETED", "Penyerahan Obat & KIO Selesai Tervalidasi");
  };

  const callQueueTicket = (ticket: string, lang: string = 'id') => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = lang === 'jv'
        ? `Nomer antrian, ${ticket}, sumangga tumuju Poli Anak Kamar tiga.`
        : `Nomor antrean, ${ticket}. Silakan menuju Poliklinik Anak Kamar nol tiga.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.92;
      window.speechSynthesis.speak(utterance);
    }
    addAuditLog("SPEECH_CALL_PATIENT", `Panggilan Suara: ${ticket}`);
  };

  return (
    <SmartHealthContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        elderlyMode,
        setElderlyMode,
        patient,
        queue,
        emr,
        pharmacy,
        auditLogs,
        addAuditLog,
        issueSpri,
        sendPrescription,
        completeReview,
        completeDispense,
        callQueueTicket
      }}
    >
      {children}
    </SmartHealthContext.Provider>
  );
};

export const useSmartHealth = () => {
  const context = useContext(SmartHealthContext);
  if (!context) {
    throw new Error('useSmartHealth must be used within a SmartHealthProvider');
  }
  return context;
};

