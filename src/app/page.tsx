'use client';

import React, { useState } from 'react';
import { useSmartHealth } from '@/context/SmartHealthContext';
import { OperationalRole } from '@/types/smarthealth';

export default function SmartHealthPage() {
  const {
    currentRole,
    setCurrentRole,
    elderlyMode,
    setElderlyMode,
    patient,
    queue,
    emr,
    pharmacy,
    auditLogs,
    callQueueTicket,
    issueSpri,
    sendPrescription,
    completeReview,
    completeDispense
  } = useSmartHealth();

  const [mobileFrame, setMobileFrame] = useState(true);
  const [showCdssLock, setShowCdssLock] = useState(false);
  const [showSpriModal, setShowSpriModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [syringeVal, setSyringeVal] = useState(6.25);
  const [auditFilter, setAuditFilter] = useState('');

  const filteredLogs = auditLogs.filter(log =>
    log.actor.toLowerCase().includes(auditFilter.toLowerCase()) ||
    log.action.toLowerCase().includes(auditFilter.toLowerCase()) ||
    log.patientMrn.toLowerCase().includes(auditFilter.toLowerCase())
  );

  return (
    <div className={`min-h-screen flex flex-col ${elderlyMode ? 'mode-lansia' : ''}`}>
      {/* GLOBAL HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-outline-variant/30 shadow-xs px-4">
        {/* BARIS UTAMA LOGO INSTANSI (KANAN & KIRI) */}
        <div className="w-full flex justify-between items-center py-2 border-b border-gray-100 max-w-7xl mx-auto">
          <div>
            <img
              src="/LOGO_KOTA_BANDAR_LAMPUNG_BARU.png"
              alt="Logo Bandar Lampung"
              style={{ height: "40px", width: "auto", display: "block" }}
            />
          </div>
          <div>
            <img
              src="/UNIVERSITASTEKNOKRAT.png"
              alt="Logo Universitas Teknokrat"
              style={{ height: "40px", width: "auto", display: "block" }}
            />
          </div>
        </div>

        {/* BARIS MENU NAVIGASI BAWAAN (SMARTHEALTH) */}
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-xs">
                <span className="material-symbols-outlined text-[24px]">local_hospital</span>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm font-extrabold text-primary tracking-tight">SmartHealth</span>
                  <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-[11px] font-bold uppercase">RSUD Dr. H. Abdul Moeloek</span>
                </div>
                <p className="font-label-sm text-on-surface-variant text-[11px]">Sistem Antrean & EMR Terpadu Provinsi Lampung • Server LPG-01</p>
              </div>
            </div>

            {/* Role Switcher Nav */}
            <nav className="flex items-center p-1 bg-surface-container-low rounded-xl border border-outline-variant/30 overflow-x-auto max-w-2xl">
              {[
                { id: 'mobile', label: '1. Pasien Mobile', icon: 'smartphone' },
                { id: 'kiosk', label: '2. Kiosk & Loket', icon: 'confirmation_number' },
                { id: 'emr', label: '3. EMR Dokter Sp.A', icon: 'stethoscope' },
                { id: 'pharmacy', label: '4. Farmasi & Apoteker', icon: 'medication' },
                { id: 'command', label: '5. Dinkes Command', icon: 'monitoring' }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCurrentRole(tab.id as OperationalRole)}
                  className={`px-3 py-1.5 rounded-lg font-label-md text-xs sm:text-sm flex items-center gap-1.5 transition-all whitespace-nowrap ${currentRole === tab.id
                    ? 'bg-primary text-on-primary shadow-xs font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                >
                  <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-container border border-outline-variant/30 text-[11px] font-mono text-on-surface-variant">
                <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
                <span className="font-semibold text-tertiary">WS Live</span>
                <span>18ms</span>
              </div>
            </div>
          </div>
        </div>
      </header>


      {/* MAIN CONTENT AREA */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">

        {/* VIEW 1: PATIENT MOBILE APP */}
        {currentRole === 'mobile' && (
          <div className="flex flex-col lg:flex-row items-start justify-center gap-8">
            <div className="w-full lg:w-80 shrink-0 space-y-4">
              <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30">
                <h3 className="font-headline-sm text-base font-bold text-on-surface mb-2">Aplikasi Mobile Pasien</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                  Pelacakan antrean real-time Ananda Rayyan, estimasi waktu panggil, pengingat jadwal obat, dan notifikasi farmasi F-018.
                </p>
                <button
                  type="button"
                  onClick={() => setMobileFrame(!mobileFrame)}
                  className="w-full py-2 px-3 rounded-xl bg-surface-container text-primary font-bold text-xs"
                >
                  {mobileFrame ? 'Ganti ke Layar Penuh' : 'Ganti ke Frame HP'}
                </button>
              </div>
            </div>

            <div className={mobileFrame ? "w-full max-w-sm" : "w-full max-w-2xl"}>
              <div className="bg-surface rounded-[40px] shadow-2xl border-[10px] border-slate-900 overflow-hidden relative flex flex-col min-h-[750px]">
                {/* Mobile Bar */}
                <div className="bg-surface-container-lowest pt-2 px-6 pb-2 flex items-center justify-between text-xs font-semibold select-none border-b border-outline-variant/20">
                  <span>09:36</span>
                  <div className="w-20 h-4 bg-slate-900 rounded-full"></div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">wifi</span>
                    <span className="material-symbols-outlined text-[14px]">battery_full</span>
                  </div>
                </div>

                <div className="p-4 space-y-4 flex-1 overflow-y-auto pb-20">
                  {/* Patient Info */}
                  <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs border border-outline-variant/20 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-on-surface">{patient.name}</h4>
                      <p className="font-mono text-xs text-on-surface-variant">{patient.mrn} • {patient.ageStr} ({patient.weightKg} kg)</p>
                      <span className="inline-block px-1.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold mt-1">
                        {patient.bpjsStatus}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowQrModal(true)}
                      className="p-2 rounded-xl bg-surface-container text-primary"
                    >
                      <span className="material-symbols-outlined text-[24px]">qr_code_2</span>
                    </button>
                  </div>

                  {/* Allergy Alert */}
                  <div className="p-3 rounded-xl bg-error-container text-on-error-container flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-error text-[20px] shrink-0">emergency</span>
                    <div className="text-xs">
                      <span className="font-bold uppercase tracking-wider text-error">Peringatan Alergi Berat</span>
                      <p className="mt-0.5">{patient.allergy}</p>
                    </div>
                  </div>

                  {/* Queue Card */}
                  <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-md border-2 border-primary/20">
                    <div className="flex justify-between items-center mb-3">
                      <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                        SEDANG BERLANGSUNG
                      </span>
                      <span className="text-xs text-on-surface-variant">Poli Anak Lt. 2</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-primary/10 rounded-xl p-3 text-center border border-primary/30">
                        <span className="text-[10px] uppercase font-bold text-primary">Nomor Anda</span>
                        <div className="font-display-queue-mobile text-3xl font-extrabold text-primary">{queue.patientTicket}</div>
                        <span className="text-[11px] text-on-surface-variant">Booking #BK-0429</span>
                      </div>
                      <div className="bg-surface-container-high rounded-xl p-3 text-center">
                        <span className="text-[10px] uppercase font-bold text-on-surface-variant">Sedang Dipanggil</span>
                        <div className="font-display-queue-mobile text-3xl font-extrabold text-on-surface">{queue.currentlyCalled}</div>
                        <span className="text-[11px] text-tertiary font-bold">Sisa 1 Pasien Lagi!</span>
                      </div>
                    </div>

                    <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[18px]">schedule</span>
                        <div>
                          <span className="font-bold block">Estimasi: 09:30 WIB</span>
                          <span className="text-on-surface-variant text-[11px]">(~6 Menit lagi)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Medication Reminders */}
                  <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs border border-outline-variant/20 space-y-2">
                    <h5 className="font-bold text-xs text-on-surface">Jadwal Pengingat Obat</h5>
                    <div className="p-2.5 rounded-xl bg-surface-container-low text-xs flex justify-between items-center">
                      <div>
                        <strong>Paracetamol Sirup 120mg/5ml</strong>
                        <p className="text-[11px] text-on-surface-variant">Takaran: 6.25 ml (bila demam > 38.2°C)</p>
                      </div>
                      <span className="px-2 py-1 rounded bg-primary text-on-primary text-[10px] font-bold">PRN</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: KIOSK & REGISTRATION */}
        {currentRole === 'kiosk' && (
          <div className="space-y-6">
            <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 flex justify-between items-center">
              <div>
                <h3 className="font-headline-sm text-lg font-bold">Anjungan Mandiri (Kiosk 01) & Loket Registrasi</h3>
                <p className="text-xs text-on-surface-variant">Lobi Utama RSUD Dr. H. Abdul Moeloek • Provinsi Lampung</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setElderlyMode(!elderlyMode)}
                  className="px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">elderly</span>
                  <span>{elderlyMode ? 'Mode Normal' : 'Mode Ramah Lansia (A+)'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 space-y-4">
                  <h4 className="font-bold text-sm">Konsol Pemanggilan Suara (Web Speech API)</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => callQueueTicket('A-025', 'id')}
                      className="p-3 rounded-xl bg-primary text-on-primary text-xs flex flex-col items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[20px]">record_voice_over</span>
                      <span className="font-bold">Panggil [F2]</span>
                      <span className="text-[10px] opacity-80">Bahasa Indonesia</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => callQueueTicket('A-025', 'lp')}
                      className="p-3 rounded-xl bg-surface-container text-on-surface text-xs flex flex-col items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[20px]">volume_up</span>
                      <span className="font-bold">Basa Lampung [F3]</span>
                      <span className="text-[10px] opacity-80">Dialek Api / Nyo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => alert('Antrean A-025 ditandai terlewat.')}
                      className="p-3 rounded-xl bg-surface-container text-error text-xs flex flex-col items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[20px]">skip_next</span>
                      <span className="font-bold">Lewati [F4]</span>
                      <span className="text-[10px] opacity-80">Tandai Terlewat</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Thermal Ticket Preview */}
              <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 text-center">
                <div className="p-6 border-2 border-dashed border-outline-variant rounded-xl max-w-xs mx-auto font-mono text-xs space-y-3">
                  <div className="font-bold text-sm uppercase">RSUD DR. H. ABDUL MOELOEK</div>
                  <p className="text-[10px] text-slate-500">Jl. Dr. Rivai No. 47, Bandar Lampung</p>
                  <div className="font-display-queue text-4xl font-extrabold text-primary my-2">A - 025</div>
                  <div className="p-1 rounded bg-primary-container text-on-primary-container font-bold text-[10px]">POLI ANAK LT. 2</div>
                  <div className="text-left space-y-1 pt-2 border-t border-dashed border-slate-300">
                    <div>Pasien: <strong>Ananda Rayyan</strong></div>
                    <div>Dokter: <strong>Dr. Agtari Ayu, Sp.A</strong></div>
                    <div>Waktu: 12 Nov 2026 08:45 WIB</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="mt-4 py-2.5 px-4 rounded-xl bg-primary text-on-primary font-bold text-xs"
                >
                  Cetak Karcis Fisik (80mm)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: EMR DOKTER POLI ANAK */}
        {currentRole === 'emr' && (
          <div className="space-y-6">
            {/* CDSS Alert Banner */}
            <div className="p-4 rounded-2xl bg-error-container text-on-error-container border-2 border-error flex items-start gap-3">
              <span className="material-symbols-outlined text-error text-[28px] shrink-0">warning</span>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <strong className="text-error font-bold text-sm uppercase">Peringatan Alergi Berat (Obat) — CDSS Lock Aktif</strong>
                  <span className="px-2 py-0.5 rounded bg-error text-on-error text-[10px] font-bold">ANAFILAKSIS</span>
                </div>
                <p className="text-xs mt-1">
                  Pasien <strong>Ananda Rayyan Pratama</strong> alergi fatal terhadap <strong>Golongan Penisilin & Amoksisilin</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setShowCdssLock(true)}
                  className="mt-2 text-xs font-bold underline text-error"
                >
                  Uji Intervensi CDSS Kunci Resep
                </button>
              </div>
            </div>

            {/* Vital Signs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              <div className="p-3 rounded-xl bg-error-container/40 border border-error/30">
                <span className="text-[10px] font-bold text-error uppercase">Suhu Aksila</span>
                <div className="text-xl font-bold text-error">{emr.vitals.tempC} °C</div>
                <span className="text-[10px] text-error">Febris Tinggi</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase">Nadi (HR)</span>
                <div className="text-xl font-bold">{emr.vitals.heartRateBpm} x/mnt</div>
                <span className="text-[10px] text-on-surface-variant">Takikardia Ringan</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase">Laju Napas</span>
                <div className="text-xl font-bold">{emr.vitals.rrBpm} x/mnt</div>
                <span className="text-[10px] text-on-surface-variant">Eupnea</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase">SpO2</span>
                <div className="text-xl font-bold">{emr.vitals.spo2Pct} %</div>
                <span className="text-[10px] text-tertiary">Normal Udara</span>
              </div>
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/30">
                <span className="text-[10px] font-bold text-primary uppercase">Berat Badan</span>
                <div className="text-xl font-bold text-primary">{emr.vitals.weightKg} kg</div>
                <span className="text-[10px] text-primary">Pediatrik</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase">Tinggi Badan</span>
                <div className="text-xl font-bold">{emr.vitals.heightCm} cm</div>
                <span className="text-[10px] text-on-surface-variant">TB/U Normal</span>
              </div>
            </div>

            {/* SOAP Form & e-Resep */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-3">
                <h4 className="font-bold text-sm">Diagnosis ICD-10 & SOAP</h4>
                <div className="p-2.5 rounded-xl bg-error-container/20 border border-error/30 text-xs">
                  <span className="font-mono font-bold text-error">A97.0</span>
                  <span className="ml-2 font-bold">Dengue Fever with Warning Signs (DBD Derajat I-II)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSpriModal(true)}
                  className="py-2 px-3 rounded-xl bg-error text-on-error font-bold text-xs"
                >
                  Terbitkan SPRI Rawat Inap (Bed 04)
                </button>
              </div>

              <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-3">
                <h4 className="font-bold text-sm">e-Resep #{emr.rxCode}</h4>
                <div className="p-2.5 rounded-xl bg-surface-container-low text-xs border-l-4 border-primary">
                  <strong>R/ Paracetamol Sirup 120 mg / 5 ml</strong>
                  <p className="text-[11px] text-on-surface-variant">Signa: 3 x 6.25 ml prn (10.5 mg/kgBB untuk 14.2 kg)</p>
                </div>
                <button
                  type="button"
                  onClick={sendPrescription}
                  className="py-2.5 px-4 rounded-xl bg-primary text-on-primary font-bold text-xs"
                >
                  Kirim e-Resep ke Farmasi
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: PHARMACY & COUNSELING */}
        {currentRole === 'pharmacy' && (
          <div className="space-y-6">
            <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30">
              <h3 className="font-headline-sm text-lg font-bold">Instalasi Farmasi & Konseling KIO</h3>
              <p className="text-xs text-on-surface-variant">Apoteker: {pharmacy.pharmacist} • SIPA: {pharmacy.sipa}</p>
            </div>

            {/* Syringe Visualizer */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 space-y-4">
                <h4 className="font-bold text-sm">Visualisasi Takaran Spuit Oral</h4>
                <div className="p-4 bg-surface-container-low rounded-xl text-center">
                  <div className="h-10 bg-white rounded-lg border-2 border-slate-700 relative overflow-hidden flex items-center">
                    <div className="h-full bg-emerald-500/70 border-r-4 border-emerald-700 transition-all" style={{ width: `${(syringeVal / 10) * 100}%` }}></div>
                  </div>
                  <div className="mt-3 flex justify-between text-xs font-bold">
                    <span>Takaran:</span>
                    <span className="text-primary font-mono">{syringeVal.toFixed(2)} ml</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.25"
                    value={syringeVal}
                    onChange={(e) => setSyringeVal(parseFloat(e.target.value))}
                    className="w-full accent-primary mt-2"
                  />
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 space-y-4">
                <h4 className="font-bold text-sm">Teach-Back & Penyerahan</h4>
                <button
                  type="button"
                  onClick={completeDispense}
                  className="w-full py-3 px-4 rounded-xl bg-primary text-on-primary font-bold text-xs"
                >
                  Selesaikan Penyerahan & Kirim Notif ke Mobile
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: DINKES COMMAND CENTER */}
        {currentRole === 'command' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30">
                <span className="text-xs font-bold text-on-surface-variant uppercase">Waktu Tunggu SPM</span>
                <div className="text-3xl font-extrabold text-primary">23.4 <span className="text-base font-normal">mnt</span></div>
                <span className="text-xs text-tertiary font-bold">Target &lt; 30 mnt (Tercapai ✓)</span>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30">
                <span className="text-xs font-bold text-on-surface-variant uppercase">BOR Rawat Inap</span>
                <div className="text-3xl font-extrabold">76.8 %</div>
                <span className="text-xs text-tertiary font-bold">Optimal (60 - 85%)</span>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30">
                <span className="text-xs font-bold text-on-surface-variant uppercase">Total Pasien Hari Ini</span>
                <div className="text-3xl font-extrabold">1.428</div>
                <span className="text-xs text-on-surface-variant">Poli Anak: 142</span>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30">
                <span className="text-xs font-bold text-on-surface-variant uppercase">SatuSehat FHIR</span>
                <div className="text-3xl font-extrabold text-tertiary">100 %</div>
                <span className="text-xs text-on-surface-variant">1.428 Encounter</span>
              </div>
            </div>

            {/* Audit Log Table */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm">Audit Trail Berenkripsi AES-256 (UU PDP 27/2022)</h4>
                <input
                  type="text"
                  placeholder="Cari audit log..."
                  value={auditFilter}
                  onChange={(e) => setAuditFilter(e.target.value)}
                  className="bg-surface-container-low px-3 py-1.5 rounded-xl text-xs border-none"
                />
              </div>

              <div className="overflow-x-auto rounded-xl border border-outline-variant/30">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-surface-container text-on-surface-variant uppercase text-[11px]">
                    <tr>
                      <th className="p-3">Waktu</th>
                      <th className="p-3">Aktor</th>
                      <th className="p-3">Aksi</th>
                      <th className="p-3">Pasien</th>
                      <th className="p-3">Checksum AES-256</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {filteredLogs.map(log => (
                      <tr key={log.id}>
                        <td className="p-3">{log.time}</td>
                        <td className="p-3">{log.actor}</td>
                        <td className="p-3 font-bold text-primary">{log.action}</td>
                        <td className="p-3">{log.patientMrn}</td>
                        <td className="p-3 text-slate-500">{log.hash.slice(0, 16)}...</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ==================== 📝 FOOTER COPYRIGHT BARU ==================== */}
      <footer className="w-full text-center py-4 bg-white border-t border-gray-200 mt-auto select-none z-10">
        <p className="text-xs sm:text-sm text-gray-500 tracking-wide">
          Copyright © 2026 by M. Andri Junaidi dan Dr. Erliyan Redy Susanto, M.Kom
        </p>
      </footer>
      {/* =================================================================== */}


      {/* CDSS MODAL */}
      {showCdssLock && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl border-2 border-error space-y-4">
            <h3 className="font-bold text-lg text-error">⛔ CDSS LOCK: ALERGI BERAT PENISILIN!</h3>
            <p className="text-xs leading-relaxed">
              Resep Amoksisilin diblokir otomatis oleh sistem CDSS karena profil alergi berat anafilaksis Ananda Rayyan.
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowCdssLock(false)}
                className="py-2 px-4 rounded-xl bg-error text-on-error font-bold text-xs"
              >
                Patuhi Rekomendasi CDSS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SPRI MODAL */}
      {showSpriModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-outline-variant/30 space-y-4">
            <h3 className="font-bold text-base">Penerbitan SPRI Rawat Inap Ruang Melati</h3>
            <p className="text-xs text-on-surface-variant">Alokasi Bed 04 Pediatrik untuk Ananda Rayyan Pratama (DBD Derajat I-II).</p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowSpriModal(false)}
                className="py-2 px-4 rounded-xl bg-surface-container text-xs font-bold"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  issueSpri('Ruang Melati Bed 04');
                  setShowSpriModal(false);
                }}
                className="py-2 px-4 rounded-xl bg-error text-on-error text-xs font-bold"
              >
                Terbitkan SPRI
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR MODAL */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4">
            <h4 className="font-bold text-sm">QR Code Booking #BK-0429</h4>
            <div className="p-4 border rounded-xl inline-block font-mono text-xs">
              [Simulasi QR Code Pasien Rayyan]
            </div>
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="w-full py-2 rounded-xl bg-primary text-on-primary font-bold text-xs"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

