'use client';

import React from 'react';

interface CdssAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
  mrn: string;
  attemptedDrug?: string;
  allergen?: string;
}

export const CdssAlertModal: React.FC<CdssAlertModalProps> = ({
  isOpen,
  onClose,
  patientName,
  mrn,
  attemptedDrug = "Amoksisilin Forte Sirup 250mg/5ml",
  allergen = "Golongan Penisilin & Derivat Beta-Laktam"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl border-2 border-error space-y-4 animate-in fade-in duration-200">
        
        {/* Modal Header */}
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-error text-on-error flex items-center justify-center shrink-0 shadow-md">
            <span className="material-symbols-outlined text-[28px]">block</span>
          </div>
          <div>
            <span className="px-2 py-0.5 rounded-full bg-error text-on-error font-mono text-[10px] font-bold">
              CDSS HARD INTERVENTION (PERMENKES KESELAMATAN PASIEN)
            </span>
            <h3 className="font-headline-sm text-lg font-extrabold text-error mt-0.5">
              PERESEPAN DIBLOKIR: ALERGI BERAT PENISILIN!
            </h3>
          </div>
        </div>

        {/* Warning Content */}
        <div className="p-3.5 rounded-xl bg-error-container text-on-error-container text-xs space-y-2 leading-relaxed">
          <p>
            Dokter mencoba meresepkan: <strong className="underline font-mono">{attemptedDrug}</strong>.
          </p>
          <p>
            Sistem CDSS Guardian mendeteksi kecocokan profil risiko tinggi pada pasien <strong>{patientName}</strong> (No. RM: {mrn}):
          </p>
          <ul className="list-disc list-inside font-semibold space-y-1">
            <li>Alergen Terdaftar: <strong>{allergen}</strong></li>
            <li>Derajat Keparahan: <strong>Kritis (Risiko Syok Anafilaktik / Angioedema Akut)</strong></li>
            <li>Reaksi Masa Lalu: Erupsi makulopapular generalisata & pembengkakan bibir/laring</li>
          </ul>
        </div>

        {/* Clinical Safe Recommendation */}
        <div className="p-3 rounded-xl bg-surface-container-low text-xs text-on-surface-variant space-y-1 border border-outline-variant/30">
          <strong className="text-on-surface block flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[16px]">verified</span>
            Rekomendasi Alternatif Aman CDSS:
          </strong>
          <p>
            Gunakan antipiretik murni <span className="text-primary font-bold">Paracetamol Sirup (120 mg/5 ml)</span> dosis 10-15 mg/kgBB dan rehidrasi cairan (Oralit / IVFD RL) untuk penanganan Demam Berdarah Dengue (DBD) tanpa indikasi infeksi bakterial sekunder.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl bg-error text-on-error font-label-md text-xs font-bold hover:opacity-90 shadow-sm transition-all"
          >
            Batalkan Peresepan (Patuhi Intervensi CDSS)
          </button>
        </div>

      </div>
    </div>
  );
};

