'use client';

import React, { useState } from 'react';

interface SpriModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (bedName: string) => void;
  patientName: string;
  doctorName: string;
}

export const SpriModal: React.FC<SpriModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  patientName,
  doctorName
}) => {
  const [selectedBed, setSelectedBed] = useState('Ruang Melati Pediatrik — Bed 04');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-outline-variant/30 space-y-4 animate-in fade-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-error/10 text-error flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">bedroom_parent</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-base font-bold text-on-surface">Penerbitan SPRI Rawat Inap Online</h3>
              <p className="font-body-sm text-xs text-on-surface-variant font-mono">Bridging BPJS VClaim & Siranap Kemenkes</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="text-on-surface-variant hover:text-on-surface">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-xl bg-surface-container-low text-on-surface-variant space-y-1">
            <div>Pasien: <strong className="text-on-surface">{patientName}</strong></div>
            <div>Diagnosis: <strong className="text-on-surface font-mono">A97.0 Dengue Fever with Warning Signs (DBD Derajat I-II)</strong></div>
            <div>Indikasi Rawat: <strong>Trombosit 108.000 /µL, Hemokonsentrasi, Asupan Oral Sulit</strong></div>
          </div>

          <div>
            <label className="block font-label-sm text-xs font-semibold text-on-surface-variant uppercase mb-1">
              Pilihan Bangsal & Alokasi Tempat Tidur:
            </label>
            <select
              value={selectedBed}
              onChange={(e) => setSelectedBed(e.target.value)}
              className="w-full bg-surface-container-low p-2.5 rounded-xl font-bold text-xs text-on-surface border-none focus:ring-2 focus:ring-primary"
            >
              <option value="Ruang Melati Pediatrik — Bed 04">Ruang Melati Pediatrik — Bed 04 (Tersedia • Siap Pakai)</option>
              <option value="Ruang Melati Pediatrik — Bed 08">Ruang Melati Pediatrik — Bed 08 (Cadangan)</option>
              <option value="PICU / ICU Anak — Bed 02">PICU / ICU Anak — Bed 02 (Indikasi Syok)</option>
            </select>
          </div>

          <div>
            <label className="block font-label-sm text-xs font-semibold text-on-surface-variant uppercase mb-1">
              DPJP Penanggung Jawab:
            </label>
            <input
              type="text"
              readOnly
              value={doctorName}
              className="w-full bg-surface-container-low p-2.5 rounded-xl text-xs font-semibold text-on-surface border-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-outline-variant/20">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl bg-surface-container text-on-surface font-label-md text-xs font-bold hover:bg-surface-container-high"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => onConfirm(selectedBed)}
            className="py-2.5 px-4 rounded-xl bg-error text-on-error font-label-md text-xs font-bold hover:opacity-90 flex items-center gap-1.5 shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Terbitkan SPRI BPJS Online</span>
          </button>
        </div>

      </div>
    </div>
  );
};

