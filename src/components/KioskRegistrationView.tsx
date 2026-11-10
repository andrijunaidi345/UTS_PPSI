'use client';

import React, { useState } from 'react';
import { useSmartHealth } from '@/context/SmartHealthContext';
import { ThermalTicketPreview } from './ThermalTicketPreview';

export const KioskRegistrationView: React.FC = () => {
  const { patient, queue, callQueueTicket, elderlyMode, setElderlyMode } = useSmartHealth();
  const [selectedLang, setSelectedLang] = useState('id');
  const [nikInput, setNikInput] = useState(patient.nik);
  const [bpjsInput, setBpjsInput] = useState(patient.bpjs);
  const [vclaimStatus, setVclaimStatus] = useState<string | null>("TERVERIFIKASI AKTIF (PBI)");

  const handleVerify = () => {
    setVclaimStatus("TERVERIFIKASI AKTIF (PBI) - SEP #SEP-20261112-09214 DITERBITKAN");
    alert("Verifikasi BPJS VClaim & Dukcapil Berhasil! Surat Eligibilitas Peserta (SEP) telah diterbitkan.");
  };

  const handleScanSimulation = () => {
    alert(`QR Code Booking ${patient.bookingCode} Valid! Pasien: ${patient.name}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Kiosk Header */}
      <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-[32px]">desktop_windows</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-headline-sm text-xl font-bold text-on-surface">
                Anjungan Mandiri (Kiosk 01) & Loket Registrasi
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-xs font-bold">
                ONLINE & TERHUBUNG
              </span>
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Lobi Utama Gedung Rawat Jalan RSUD Dr. H. Abdul Moeloek • Provinsi Lampung
            </p>
          </div>
        </div>

        {/* Kiosk Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setElderlyMode(!elderlyMode)}
            className={`px-3 py-2 rounded-xl font-label-md text-xs sm:text-sm flex items-center gap-2 border transition-all ${
              elderlyMode
                ? 'bg-primary text-on-primary border-primary'
                : 'bg-surface-container hover:bg-surface-container-high text-on-surface border-outline-variant/30'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">elderly</span>
            <span>{elderlyMode ? 'Mode Normal' : 'Mode Ramah Lansia (A+)'}</span>
          </button>
        </div>
      </div>

      {/* Telemetry Bar */}
      <div className="bg-inverse-surface text-inverse-on-surface rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between text-xs font-mono gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> EPSON Thermal Ready</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Scanner 2D QR Active</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Dukcapil & BPJS Bridging OK</span>
        </div>
        <div className="flex items-center gap-2 text-inverse-on-surface/75">
          <span>Terminal: KIOSK-LOBI-01</span>
          <span>•</span>
          <span>Server LPG-01</span>
        </div>
      </div>

      {/* 2-Column Workflow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Registration & Speech Console */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card 1: Check-in Online */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm">1</span>
                <h3 className="font-headline-sm text-base font-bold text-on-surface">Sudah Daftar Online (Scan Barcode / QR)</h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[11px] font-bold">OPSI CEPAT (10 DETIK)</span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 text-white text-center relative overflow-hidden">
              <div className="w-44 h-44 mx-auto border-2 border-dashed border-primary-fixed/80 rounded-2xl p-4 flex flex-col items-center justify-center relative">
                <div className="absolute left-2 right-2 h-0.5 bg-primary-fixed shadow-[0_0_8px_#89f5e7] animate-pulse"></div>
                <span className="material-symbols-outlined text-primary-fixed text-[44px] opacity-75">qr_code_scanner</span>
                <p className="text-[10px] font-mono text-slate-300 mt-2">Arahkan QR dari HP Pasien ke sensor pemindai</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleScanSimulation}
              className="w-full py-3 px-4 rounded-xl bg-primary text-on-primary font-label-md text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary-container shadow-xs"
            >
              <span className="material-symbols-outlined text-[20px]">camera</span>
              <span>Simulasi Scan QR Tiket Pasien Rayyan (#BK-0429)</span>
            </button>
          </div>

          {/* Card 2: Walk-In Dukcapil & VClaim */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-sm">2</span>
                <h3 className="font-headline-sm text-base font-bold text-on-surface">Verifikasi NIK KTP Dukcapil & BPJS VClaim</h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-[11px]">BRIDGING ONLINE</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-label-sm text-xs font-semibold text-on-surface-variant uppercase mb-1">
                  Nomor Induk Kependudukan (NIK)
                </label>
                <input
                  type="text"
                  value={nikInput}
                  onChange={(e) => setNikInput(e.target.value)}
                  className="w-full bg-surface-container-low px-3 py-2.5 rounded-xl font-mono text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary border-none"
                />
              </div>
              <div>
                <label className="block font-label-sm text-xs font-semibold text-on-surface-variant uppercase mb-1">
                  Nomor Kartu BPJS Kesehatan
                </label>
                <input
                  type="text"
                  value={bpjsInput}
                  onChange={(e) => setBpjsInput(e.target.value)}
                  className="w-full bg-surface-container-low px-3 py-2.5 rounded-xl font-mono text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary border-none"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleVerify}
              className="py-2.5 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-xs font-bold flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span>Cek Kelayakan VClaim & Dukcapil</span>
            </button>

            {vclaimStatus && (
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-on-surface">Hasil Verifikasi:</span>
                  <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-bold font-mono">STATUS: AKTIF (PBI)</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-on-surface-variant">
                  <div>Nama Pasien: <strong className="text-on-surface">{patient.name}</strong></div>
                  <div>No. Rujukan FKTP: <strong className="font-mono text-on-surface">{patient.referralNo}</strong></div>
                  <div>Faskes Asal: <strong className="text-on-surface">{patient.referralSource}</strong></div>
                  <div>Diagnosa Rujukan: <strong className="text-on-surface">Febris H-3 suspect DHF</strong></div>
                </div>
              </div>
            )}
          </div>

          {/* Card 3: Web Speech Voice Calling Console */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">campaign</span>
                <h3 className="font-headline-sm text-base font-bold text-on-surface">Konsol Pemanggilan Suara (Web Speech API)</h3>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">Loket 01 • Poli Anak</span>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-low flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-8 flex items-center gap-1 px-3 py-1 rounded-lg bg-surface-container-lowest border border-outline-variant/20">
                  <span className="wave-bar"></span>
                  <span className="wave-bar"></span>
                  <span className="wave-bar"></span>
                  <span className="wave-bar"></span>
                  <span className="wave-bar"></span>
                </div>
                <div>
                  <span className="font-label-sm text-xs font-bold text-on-surface block">Siap Memanggil</span>
                  <span className="text-[11px] text-on-surface-variant">Sintesis Suara Alami Peramban</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-on-surface-variant">Bahasa Panggilan:</label>
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="bg-surface-container-lowest px-3 py-1.5 rounded-lg text-xs font-bold text-primary border border-outline-variant/30"
                >
                  <option value="id">Bahasa Indonesia</option>
                  <option value="lp">Bahasa Lampung (Dialek Api/Nyo)</option>
                </select>
              </div>
            </div>

            {/* Hotkeys Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => callQueueTicket(queue.patientTicket, selectedLang)}
                className="p-3 rounded-xl bg-primary text-on-primary font-label-md text-xs flex flex-col items-center justify-center gap-1 hover:bg-primary-container shadow-xs"
              >
                <span className="material-symbols-outlined text-[20px]">record_voice_over</span>
                <span className="font-bold">Panggil Antrean [F2]</span>
                <span className="text-[10px] opacity-80 font-mono">Tiket {queue.patientTicket}</span>
              </button>

              <button
                type="button"
                onClick={() => callQueueTicket(queue.patientTicket, selectedLang)}
                className="p-3 rounded-xl bg-surface-container text-on-surface font-label-md text-xs flex flex-col items-center justify-center gap-1 hover:bg-surface-container-high border border-outline-variant/30"
              >
                <span className="material-symbols-outlined text-[20px]">replay</span>
                <span className="font-bold">Panggil Ulang [F3]</span>
                <span className="text-[10px] text-on-surface-variant font-mono">Panggilan ke-2</span>
              </button>

              <button
                type="button"
                onClick={() => alert(`Tiket ${queue.patientTicket} ditandai terlewat.`)}
                className="p-3 rounded-xl bg-surface-container text-error font-label-md text-xs flex flex-col items-center justify-center gap-1 hover:bg-error-container/40 border border-outline-variant/30"
              >
                <span className="material-symbols-outlined text-[20px]">skip_next</span>
                <span className="font-bold">Lewati Antrean [F4]</span>
                <span className="text-[10px] text-error/80 font-mono">Tandai Terlewat</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right: Thermal Print Preview */}
        <div className="lg:col-span-5">
          <ThermalTicketPreview
            queueCode={queue.patientTicket}
            patientName={patient.name}
            mrn={patient.mrn}
            doctorName="Dr. Agtari Ayu, Sp.A"
            clinicName="POLI ANAK • LT. 2"
            bookingCode={patient.bookingCode}
          />
        </div>

      </div>

    </div>
  );
};

