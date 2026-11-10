'use client';

import React, { useState } from 'react';
import { useSmartHealth } from '@/context/SmartHealthContext';

interface MobilePatientViewProps {
  onOpenQr: () => void;
}

export const MobilePatientView: React.FC<MobilePatientViewProps> = ({ onOpenQr }) => {
  const { patient, queue } = useSmartHealth();
  const [mobileFrame, setMobileFrame] = useState(true);
  const [showPushBanner, setShowPushBanner] = useState(true);
  const [medsTaken, setMedsTaken] = useState<{ [key: string]: boolean }>({
    ondansetron: true,
    paracetamol: false,
    oralit: false
  });

  const handleTakeMed = (drug: string) => {
    setMedsTaken(prev => ({ ...prev, [drug]: true }));
    alert(`Dosis ${drug} berhasil dicatat pada rekam medis elektronik.`);
  };

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center gap-8 animate-in fade-in duration-300">
      
      {/* Viewport Controls & Guide Sidebar */}
      <div className="w-full lg:w-80 shrink-0 flex flex-col gap-4">
        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined">smartphone</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-base font-bold text-on-surface">Aplikasi Mobile Pasien</h3>
              <p className="font-body-sm text-xs text-on-surface-variant">PWA Pasien & Wali Terintegrasi</p>
            </div>
          </div>

          <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed mb-4">
            Antarmuka digital bagi orang tua pasien <strong>Ananda Rayyan</strong> untuk melacak posisi antrean poli secara real-time, mendapatkan estimasi waktu panggil, pengingat jadwal obat, dan barcode e-karcis.
          </p>

          <div className="space-y-2 border-t border-outline-variant/20 pt-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-on-surface-variant">Model Tampilan:</span>
              <button
                type="button"
                onClick={() => setMobileFrame(!mobileFrame)}
                className="px-2.5 py-1 rounded-md bg-surface-container text-primary font-bold hover:bg-surface-container-high transition-colors"
              >
                {mobileFrame ? 'Frame HP (iPhone 16)' : 'Layar Penuh'}
              </button>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-on-surface-variant">Status Audio Chime:</span>
              <span className="text-tertiary font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-tertiary"></span> Aktif
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-on-surface-variant">Faskes Rujukan:</span>
              <span className="font-mono text-on-surface text-[11px]">Puskesmas Kedaton</span>
            </div>
          </div>
        </div>

        {/* Quick Testing Actions */}
        <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/30 space-y-2">
          <h4 className="font-label-md text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
            Aksi Pengujian Pasien
          </h4>
          <button
            type="button"
            onClick={onOpenQr}
            className="w-full py-2.5 px-3 rounded-xl bg-primary text-on-primary font-label-md text-xs flex items-center justify-center gap-2 shadow-xs hover:bg-primary-container"
          >
            <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
            <span>Buka QR Check-In Kiosk</span>
          </button>
          <button
            type="button"
            onClick={() => handleTakeMed('paracetamol')}
            className="w-full py-2.5 px-3 rounded-xl bg-surface-container-lowest text-on-surface font-label-md text-xs flex items-center justify-center gap-2 border border-outline-variant/30 hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-tertiary text-[16px]">check_circle</span>
            <span>Catat Obat Paracetamol Diminum</span>
          </button>
        </div>
      </div>

      {/* MOBILE DEVICE WRAPPER */}
      <div className={mobileFrame ? "w-full max-w-sm transition-all duration-300" : "w-full max-w-2xl transition-all duration-300"}>
        <div className="bg-surface rounded-[40px] shadow-2xl border-[10px] border-slate-900 overflow-hidden relative flex flex-col min-h-[820px]">
          
          {/* Status Bar */}
          <div className="bg-surface-container-lowest pt-2 px-6 pb-2 flex items-center justify-between text-xs font-semibold select-none border-b border-outline-variant/20">
            <span>09:36</span>
            <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <span className="material-symbols-outlined text-[14px]">signal_cellular_alt</span>
              <span className="material-symbols-outlined text-[14px]">wifi</span>
              <span className="material-symbols-outlined text-[14px]">battery_charging_full</span>
            </div>
          </div>

          {/* In-App Push Notification Toast for Pharmacy F-018 */}
          {showPushBanner && (
            <div className="m-3 p-3 bg-inverse-surface text-inverse-on-surface rounded-2xl shadow-xl flex items-start gap-3 border border-outline-variant/30 animate-bounce">
              <div className="w-8 h-8 rounded-xl bg-tertiary text-on-tertiary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">notifications_active</span>
              </div>
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-tertiary-fixed">Resep Farmasi Siap!</span>
                  <span className="text-[10px] opacity-75">Baru Saja</span>
                </div>
                <p className="mt-0.5 leading-snug">
                  Tiket <span className="font-bold font-mono text-tertiary-fixed">{queue.pharmacyTicket}</span> siap diambil di Loket Farmasi 2 RSUDAM. Silakan menuju apotek.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowPushBanner(false)}
                className="text-inverse-on-surface/60 hover:text-white"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          )}

          {/* Scrollable Mobile Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
            
            {/* Patient Header */}
            <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs border border-outline-variant/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold text-lg shadow-xs">
                  AR
                </div>
                <div>
                  <h2 className="font-headline-sm text-sm font-bold text-on-surface leading-tight">
                    {patient.name}
                  </h2>
                  <p className="font-body-sm text-xs text-on-surface-variant font-mono">
                    {patient.mrn} • {patient.ageStr} ({patient.weightKg} kg)
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed mt-1">
                    {patient.bpjsStatus}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenQr}
                className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary"
                title="Tampilkan Barcode Pasien"
              >
                <span className="material-symbols-outlined text-[24px]">qr_code_2</span>
              </button>
            </div>

            {/* Severe Allergy Warning Banner */}
            <div className="p-3 rounded-xl bg-error-container text-on-error-container flex items-start gap-2.5 border border-error/20">
              <span className="material-symbols-outlined text-error text-[20px] shrink-0">emergency</span>
              <div className="text-xs">
                <span className="font-bold uppercase tracking-wider text-error">Peringatan Alergi Berat</span>
                <p className="mt-0.5 leading-snug">
                  Riwayat alergi: <strong className="underline">{patient.allergy}</strong>.
                </p>
              </div>
            </div>

            {/* Live Queue Hero Card */}
            <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-md border-2 border-primary/20 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                  SEDANG BERLANGSUNG
                </span>
                <span className="font-mono text-xs text-on-surface-variant">Poli Anak Lt. 2</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-primary/10 rounded-xl p-3 text-center border border-primary/30">
                  <span className="font-label-sm text-[10px] uppercase tracking-wider text-primary font-bold">Nomor Anda</span>
                  <div className="font-display-queue-mobile text-display-queue-mobile text-primary font-extrabold">{queue.patientTicket}</div>
                  <span className="text-[11px] text-on-surface-variant">Booking #BK-0429</span>
                </div>

                <div className="bg-surface-container-high rounded-xl p-3 text-center">
                  <span className="font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">Sedang Dipanggil</span>
                  <div className="font-display-queue-mobile text-display-queue-mobile text-on-surface font-extrabold">{queue.currentlyCalled}</div>
                  <span className="text-[11px] text-tertiary font-bold">Sisa 1 Pasien Lagi!</span>
                </div>
              </div>

              <div className="p-3 bg-surface-container-low rounded-xl mb-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">schedule</span>
                  <div>
                    <span className="font-bold text-on-surface block">Estimasi Panggil: 09:30 WIB</span>
                    <span className="text-on-surface-variant text-[11px]">(~6 Menit lagi dari sekarang)</span>
                  </div>
                </div>
              </div>

              {/* 4-Stage Stepper Track */}
              <div className="space-y-2 border-t border-outline-variant/20 pt-3">
                <div className="font-label-sm text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                  Status Perjalanan Kunjungan
                </div>
                <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-bold text-xs mb-1">✓</div>
                    <span className="font-semibold text-tertiary">Check-in</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-bold text-xs mb-1">✓</div>
                    <span className="font-semibold text-tertiary">Ruang Tunggu</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs mb-1 animate-pulse">●</div>
                    <span className="font-bold text-primary">Pemeriksaan</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center font-bold text-xs mb-1">4</div>
                    <span className="text-on-surface-variant">Farmasi</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenQr}
                className="w-full mt-4 py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-xs flex items-center justify-center gap-2 hover:bg-primary-container"
              >
                <span className="material-symbols-outlined text-[16px]">qr_code</span>
                <span>Tampilkan Barcode Tiket & E-SEP</span>
              </button>
            </div>

            {/* Medication Schedule Card */}
            <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs border border-outline-variant/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">alarm</span>
                  <h3 className="font-headline-sm text-xs font-bold text-on-surface">Jadwal Pengingat Obat</h3>
                </div>
                <span className="text-[10px] font-mono font-bold text-tertiary px-2 py-0.5 rounded-full bg-tertiary-fixed">
                  3 Resep Aktif
                </span>
              </div>

              <div className="space-y-2">
                {/* Paracetamol */}
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-on-surface">Paracetamol Sirup 120mg/5ml</span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] bg-primary/10 text-primary font-bold">PRN</span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">Takaran: <strong>6.25 ml</strong> (Bila suhu &gt; 38.2°C)</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleTakeMed('paracetamol')}
                    className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold ${
                      medsTaken.paracetamol
                        ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                        : 'bg-primary text-on-primary hover:bg-primary-container'
                    }`}
                  >
                    {medsTaken.paracetamol ? '✓ Diminum' : 'Minum'}
                  </button>
                </div>

                {/* Ondansetron */}
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-on-surface">Ondansetron Sirup 4mg/5ml</span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] bg-secondary-container text-on-secondary-container font-bold">2 x 2.5 ml</span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">30 menit sebelum makan</p>
                  </div>
                  <span className="text-tertiary font-bold text-xs">✓ Selesai</span>
                </div>
              </div>
            </div>

            {/* Emergency Advice */}
            <div className="p-3 rounded-xl bg-surface-container text-on-surface-variant text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-error text-[20px]">e911_emergency</span>
              <p className="text-[11px]">
                Bila terjadi sesak napas akut, kejang, atau muntah terus menerus, segera bawa anak ke UGD 24 Jam RSUD Dr. H. Abdul Moeloek tanpa perlu antre di poli.
              </p>
            </div>

          </div>

          {/* Bottom Tabs */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-surface-container-lowest/95 backdrop-blur-md border-t border-outline-variant/30 px-4 flex items-center justify-around z-20">
            <button type="button" className="flex flex-col items-center gap-0.5 text-primary font-bold">
              <span className="material-symbols-outlined text-[20px]">local_hospital</span>
              <span className="text-[10px]">Antrean</span>
            </button>
            <button type="button" className="flex flex-col items-center gap-0.5 text-on-surface-variant hover:text-on-surface">
              <span className="material-symbols-outlined text-[20px]">clinical_notes</span>
              <span className="text-[10px]">Rujukan</span>
            </button>
            <button type="button" className="flex flex-col items-center gap-0.5 text-on-surface-variant hover:text-on-surface">
              <span className="material-symbols-outlined text-[20px]">calendar_month</span>
              <span className="text-[10px]">Poli & Jam</span>
            </button>
            <button type="button" className="flex flex-col items-center gap-0.5 text-on-surface-variant hover:text-on-surface">
              <span className="material-symbols-outlined text-[20px]">badge</span>
              <span className="text-[10px]">Profil</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

