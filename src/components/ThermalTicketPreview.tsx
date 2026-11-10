'use client';

import React, { useState } from 'react';

interface ThermalTicketPreviewProps {
  queueCode: string;
  patientName: string;
  mrn: string;
  doctorName: string;
  clinicName: string;
  printTime?: string;
  bookingCode?: string;
  onPrint?: () => void;
}

export const ThermalTicketPreview: React.FC<ThermalTicketPreviewProps> = ({
  queueCode,
  patientName,
  mrn,
  doctorName,
  clinicName,
  printTime = "12/11/2026 08:45 WIB",
  bookingCode = "#BK-20261112-0429",
  onPrint
}) => {
  const [printing, setPrinting] = useState(false);

  const handlePrint = () => {
    setPrinting(true);
    setTimeout(() => {
      setPrinting(false);
      if (onPrint) onPrint();
      window.print();
    }, 800);
  };

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 text-center space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-headline-sm text-base font-bold text-on-surface">Pratinjau Karcis Thermal</h4>
        <span className="px-2 py-0.5 rounded bg-surface-container font-mono text-[11px] text-on-surface-variant">
          Lebar 80mm
        </span>
      </div>

      {/* Realistic 80mm Thermal Receipt */}
      <div
        id="thermal-ticket-container"
        className="bg-surface-container-lowest p-6 rounded-xl border-2 border-dashed border-outline-variant/80 shadow-md text-center max-w-xs mx-auto relative font-mono text-slate-900"
      >
        {/* Header */}
        <div className="pb-3 border-b border-dashed border-slate-400">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="material-symbols-outlined text-[20px] text-primary">local_hospital</span>
            <span className="font-bold text-sm tracking-wider uppercase">RSUD DR. H. ABDUL MOELOEK</span>
          </div>
          <p className="text-[10px] text-slate-600">Jl. Dr. Rivai No. 47, Penengahan, Bandar Lampung</p>
          <p className="text-[9px] text-slate-500">Telp: (0721) 703312 • www.rsudam.lampungprov.go.id</p>
        </div>

        {/* Hero Queue Number */}
        <div className="py-4">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-600 block">
            Nomor Antrean Poliklinik
          </span>
          <div className="font-display-queue text-5xl font-extrabold text-primary my-2">
            {queueCode}
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-bold text-xs uppercase tracking-wide">
            {clinicName}
          </span>
        </div>

        {/* Details Table */}
        <div className="py-3 border-y border-dashed border-slate-400 text-left text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-500">Nama Pasien:</span>
            <span className="font-bold">{patientName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">No. Rekam Medis:</span>
            <span className="font-bold font-mono">{mrn}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Dokter Spesialis:</span>
            <span className="font-bold">{doctorName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Waktu Cetak:</span>
            <span className="font-mono text-[11px]">{printTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Antrean Depan:</span>
            <span className="font-bold text-emerald-700">1 Pasien</span>
          </div>
        </div>

        {/* QR Code Simulation */}
        <div className="pt-3 flex flex-col items-center">
          <svg className="w-20 h-20 my-1 text-slate-900" viewBox="0 0 100 100" fill="currentColor">
            <path d="M10 10h30v30h-30zM15 15h20v20h-20zM60 10h30v30h-30zM65 15h20v20h-20zM10 60h30v30h-30zM15 65h20v20h-20zM45 10h10v20h-10zM10 45h20v10h-20zM60 45h15v15h-15zM45 60h10v30h-10zM60 65h10v10h-10zM80 60h10v30h-10zM60 80h20v10h-20z" />
            <circle cx="25" cy="25" r="4" />
            <circle cx="75" cy="25" r="4" />
            <circle cx="25" cy="75" r="4" />
          </svg>
          <p className="text-[9px] text-slate-500 tracking-wider font-mono">{bookingCode}</p>
          <p className="text-[9px] text-slate-600 mt-2 italic">
            Harap perhatikan layar monitor dan pemanggilan audio poli.
          </p>
        </div>
      </div>

      {/* Print Action Button */}
      <button
        type="button"
        onClick={handlePrint}
        disabled={printing}
        className="w-full py-3 px-4 rounded-xl bg-primary text-on-primary font-label-md text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary-container shadow-sm transition-all"
      >
        <span className={`material-symbols-outlined text-[20px] ${printing ? 'animate-spin' : ''}`}>
          {printing ? 'sync' : 'print'}
        </span>
        <span>{printing ? 'Mencetak Karcis...' : 'Cetak Karcis Fisik (EPSON 80mm)'}</span>
      </button>
    </div>
  );
};
