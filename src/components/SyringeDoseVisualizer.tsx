'use client';

import React from 'react';

interface SyringeDoseVisualizerProps {
  value: number;
  onChange: (val: number) => void;
  max?: number;
}

export const SyringeDoseVisualizer: React.FC<SyringeDoseVisualizerProps> = ({
  value,
  onChange,
  max = 10
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const mgParacetamol = Math.round((value / 5) * 120);

  return (
    <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/30 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-label-sm text-xs font-bold text-on-surface uppercase block">
            Visualisasi Takaran Spuit Oral (Pediatrik)
          </span>
          <span className="text-[11px] text-on-surface-variant">
            Oral Dispensing Syringe Tanpa Jarum untuk Anak 14.2 kg
          </span>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-mono font-bold text-xs">
          {value.toFixed(2)} ml ({mgParacetamol} mg)
        </span>
      </div>

      {/* Visual Syringe Barrel & Plunger */}
      <div className="relative w-full max-w-md mx-auto h-20 flex items-center justify-center">
        {/* Nozzle tip */}
        <div className="w-4 h-6 bg-slate-600 rounded-l-md shrink-0"></div>

        {/* Syringe barrel */}
        <div className="flex-1 h-12 bg-white rounded-r-lg border-2 border-slate-700 relative overflow-hidden flex items-center shadow-inner">
          {/* Fluid fill with meniscus */}
          <div
            className="h-full bg-emerald-500/70 border-r-4 border-emerald-700 transition-all duration-200"
            style={{ width: `${percentage}%` }}
          ></div>

          {/* Calibrated graduation marks */}
          <div className="absolute inset-0 flex justify-between px-2 pointer-events-none text-[9px] font-mono font-bold text-slate-700 select-none">
            <div className="h-full border-r border-slate-400 pl-0.5 pt-0.5">0</div>
            <div className="h-full border-r border-slate-400 pl-0.5 pt-0.5">2.5</div>
            <div className="h-full border-r-2 border-error text-error pl-0.5 pt-0.5" title="Dosis 6.25ml">
              6.25
            </div>
            <div className="h-full border-r border-slate-400 pl-0.5 pt-0.5">8</div>
            <div className="h-full border-r border-slate-400 pl-0.5 pt-0.5">10 ml</div>
          </div>
        </div>

        {/* Plunger flange on right */}
        <div className="w-3 h-10 bg-slate-500 rounded-r-sm shrink-0"></div>
      </div>

      {/* Interactive slider control */}
      <div>
        <div className="flex justify-between text-xs font-semibold text-on-surface-variant mb-1">
          <span>Geser untuk Menyetel Takaran:</span>
          <span className="font-mono text-primary font-bold">{value.toFixed(2)} ml</span>
        </div>
        <input
          type="range"
          min="0.5"
          max={max}
          step="0.25"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full accent-primary h-2 bg-surface-container rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
          <span>0.5 ml</span>
          <button
            type="button"
            onClick={() => onChange(2.5)}
            className="hover:text-primary font-bold"
          >
            2.5 ml (Ondansetron)
          </button>
          <button
            type="button"
            onClick={() => onChange(6.25)}
            className="hover:text-primary text-primary font-bold underline"
          >
            6.25 ml (Paracetamol)
          </button>
          <span>10 ml</span>
        </div>
      </div>

      {/* Clinical Guidance for Parents */}
      <div className="p-3 rounded-xl bg-surface-container-lowest text-left text-xs border border-outline-variant/20 flex items-start gap-2">
        <span className="material-symbols-outlined text-primary text-[18px] shrink-0">info</span>
        <div>
          <strong className="text-on-surface">Panduan Edukasi Ibu Siti:</strong>
          <p className="text-on-surface-variant mt-0.5 leading-snug">
            "Tarik ujung karet hitam pengisap spuit tepat sejajar garis <strong>6.25 ml</strong> (setara 150 mg Paracetamol). Berikan secara perlahan di sudut pipi bagian dalam anak, bukan disemprotkan langsung ke pangkal lidah."
          </p>
        </div>
      </div>
    </div>
  );
};

