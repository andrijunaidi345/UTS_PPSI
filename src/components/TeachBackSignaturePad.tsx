'use client';

import React, { useRef, useState, useEffect } from 'react';

interface TeachBackSignaturePadProps {
  onSignatureCapture?: (dataUrl: string) => void;
  pharmacistName: string;
  sipaNumber: string;
  onComplete: () => void;
}

export const TeachBackSignaturePad: React.FC<TeachBackSignaturePadProps> = ({
  onSignatureCapture,
  pharmacistName,
  sipaNumber,
  onComplete
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);
  const [checklist, setChecklist] = useState({
    doseSchedule: true,
    syringeReading: true,
    dangerSigns: true
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 360;
    canvas.height = 110;
    ctx.strokeStyle = '#00685f';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Pre-draw initial sample signature stroke
    ctx.beginPath();
    ctx.moveTo(30, 65);
    ctx.quadraticCurveTo(60, 20, 90, 70);
    ctx.quadraticCurveTo(120, 35, 160, 55);
    ctx.quadraticCurveTo(190, 75, 220, 40);
    ctx.stroke();
    setHasSigned(true);
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasSigned(true);
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDraw = () => {
    if (isDrawing && canvasRef.current && onSignatureCapture) {
      onSignatureCapture(canvasRef.current.toDataURL());
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
  };

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[24px]">draw</span>
          <h4 className="font-headline-sm text-base font-bold text-on-surface">
            Teach-Back & Tanda Tangan Digital KIO
          </h4>
        </div>
        <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-bold">
          Permenkes 73/2016
        </span>
      </div>

      {/* Teach-Back Checklist 3 Questions */}
      <div className="space-y-2 text-xs">
        <label className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
          <input
            type="checkbox"
            checked={checklist.doseSchedule}
            onChange={(e) => setChecklist({ ...checklist, doseSchedule: e.target.checked })}
            className="w-4 h-4 rounded text-primary focus:ring-primary"
          />
          <span>Ibu paham aturan minum obat demam: maksimal 4x sehari jeda minimal 4 jam (PRN)</span>
        </label>

        <label className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
          <input
            type="checkbox"
            checked={checklist.syringeReading}
            onChange={(e) => setChecklist({ ...checklist, syringeReading: e.target.checked })}
            className="w-4 h-4 rounded text-primary focus:ring-primary"
          />
          <span>Ibu mampu memperagakan penarikan takaran 6.25 ml pada spuit oral</span>
        </label>

        <label className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
          <input
            type="checkbox"
            checked={checklist.dangerSigns}
            onChange={(e) => setChecklist({ ...checklist, dangerSigns: e.target.checked })}
            className="w-4 h-4 rounded text-primary focus:ring-primary"
          />
          <span>Ibu memahami tanda bahaya demam berdarah (mimisan, perdarahan gusi, anak lemas dingin)</span>
        </label>
      </div>

      {/* HTML5 Canvas Signature Pad */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-label-sm text-xs font-bold text-on-surface-variant uppercase">
            Tanda Tangan Wali Pasien (Ibu Siti Rahmawati):
          </span>
          <button
            type="button"
            onClick={clearCanvas}
            className="text-xs text-primary font-bold hover:underline"
          >
            Bersihkan Goresan
          </button>
        </div>

        <div className="border-2 border-dashed border-outline-variant rounded-xl bg-surface-container-lowest overflow-hidden relative">
          <canvas
            ref={canvasRef}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={stopDraw}
            className="w-full h-28 cursor-crosshair block"
          />
          <span className="absolute bottom-2 right-2 text-[10px] font-mono text-slate-400 pointer-events-none select-none">
            Goreskan tanda tangan / sentuhan di area ini
          </span>
        </div>
      </div>

      {/* Pharmacist Digital Stamp Verification */}
      <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between text-xs border border-outline-variant/30">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary text-[20px]">verified</span>
          <div>
            <strong className="text-on-surface">Verifikasi Apoteker: {pharmacistName}</strong>
            <p className="text-[11px] text-on-surface-variant font-mono">SIPA {sipaNumber}</p>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-bold text-[10px]">
          TERVALIDASI
        </span>
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={onComplete}
        disabled={!hasSigned}
        className="w-full py-3 px-4 rounded-xl bg-primary text-on-primary font-label-md text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary-container shadow-xs transition-all disabled:opacity-50"
      >
        <span className="material-symbols-outlined text-[20px]">send_and_archive</span>
        <span>Selesaikan Penyerahan & Kirim Notif ke Mobile</span>
      </button>
    </div>
  );
};

