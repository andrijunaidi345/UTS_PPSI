'use client';

import React from 'react';
import { useSmartHealth } from '@/context/SmartHealthContext';
import { OperationalRole } from '@/types/smarthealth';

export const RoleSwitcher: React.FC = () => {
  const { currentRole, setCurrentRole } = useSmartHealth();

  const roles: { id: OperationalRole; label: string; icon: string; badge?: string }[] = [
    { id: 'mobile', label: '1. Pasien Mobile', icon: 'smartphone', badge: 'Tiket A-025' },
    { id: 'kiosk', label: '2. Kiosk & Loket', icon: 'confirmation_number', badge: 'F2/F3/F4' },
    { id: 'emr', label: '3. EMR Dokter Sp.A', icon: 'stethoscope', badge: 'CDSS Lock' },
    { id: 'pharmacy', label: '4. Farmasi & Apoteker', icon: 'medication', badge: 'Kanban & KIO' },
    { id: 'command', label: '5. Dinkes Command', icon: 'monitoring', badge: 'SPM & BOR' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Hospital Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-xs">
              <span className="material-symbols-outlined text-[24px]">local_hospital</span>
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="font-headline-sm font-extrabold text-primary tracking-tight">SmartHealth</span>
                <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-[11px] font-bold uppercase">
                  RSUD Dr. H. Abdul Moeloek
                </span>
              </div>
              <p className="font-label-sm text-on-surface-variant text-[11px]">
                Sistem Antrean & EMR Terpadu Provinsi Lampung • Server LPG-01
              </p>
            </div>
          </div>

          {/* Role Navigation */}
          <nav className="flex items-center p-1 bg-surface-container-low rounded-xl border border-outline-variant/30 overflow-x-auto max-w-2xl">
            {roles.map(role => {
              const isActive = currentRole === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setCurrentRole(role.id)}
                  className={`px-3 py-1.5 rounded-lg font-label-md text-xs sm:text-sm flex items-center gap-1.5 transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-primary text-on-primary shadow-xs font-bold'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">{role.icon}</span>
                  <span>{role.label}</span>
                </button>
              );
            })}
          </nav>

          {/* WebSocket & Status Badges */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-container border border-outline-variant/30 text-[11px] font-mono text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
              <span className="font-semibold text-tertiary">WS Live</span>
              <span>18ms</span>
            </div>
            <span className="hidden xl:inline-block px-2.5 py-1 rounded-full bg-surface-container-low text-[11px] font-semibold text-on-surface-variant border border-outline-variant/20">
              SatuSehat Live • Bridging BPJS OK
            </span>
          </div>

        </div>
      </div>
    </header>
  );
};
