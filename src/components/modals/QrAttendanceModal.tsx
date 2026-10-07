import React, { useState } from 'react';
import { X, QrCode, CheckCircle2, Camera, RefreshCw, UserCheck, ShieldCheck } from 'lucide-react';
import { useClub } from '../../context/ClubContext';
import { sfx } from '../../utils/audio';

interface QrAttendanceModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const QrAttendanceModal: React.FC<QrAttendanceModalProps> = ({ isOpen: propsIsOpen, onClose: propsOnClose }) => {
  const { isQrModalOpen, setIsQrModalOpen, currentUser } = useClub();
  const [activeTab, setActiveTab] = useState<'generate' | 'scan'>('generate');
  const [scanSuccess, setScanSuccess] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const isOpen = propsIsOpen !== undefined ? propsIsOpen : isQrModalOpen;
  const handleClose = () => {
    if (propsOnClose) propsOnClose();
    setIsQrModalOpen(false);
  };

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanSuccess(true);
      sfx.playClapper();
      setTimeout(() => {
        setScanSuccess(false);
        handleClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#0e0e13] border border-zinc-700/80 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-red-950/80 via-zinc-900 to-black border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-800/60 flex items-center justify-center">
              <QrCode className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-heading font-black text-white">
                Club Attendance Terminal
              </h3>
              <p className="text-[10px] font-mono text-zinc-400">
                Weekly Meeting & Shoot Check-in
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="p-3 bg-zinc-950 border-b border-zinc-800 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('generate')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'generate' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            My Member QR Pass
          </button>
          <button
            onClick={() => setActiveTab('scan')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'scan' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Scan Meeting QR
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 text-center">
          {activeTab === 'generate' ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white mx-auto w-48 h-48 flex flex-col items-center justify-center shadow-lg border border-zinc-300">
                {/* Visual QR Code Pattern */}
                <div className="w-full h-full border-4 border-black p-2 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div className="w-8 h-8 bg-black p-1"><div className="w-full h-full bg-white p-1"><div className="w-full h-full bg-black"/></div></div>
                    <div className="w-8 h-8 bg-black p-1"><div className="w-full h-full bg-white p-1"><div className="w-full h-full bg-black"/></div></div>
                  </div>
                  <div className="text-center font-mono text-[9px] font-black text-black tracking-widest uppercase">
                    CaSR-PASS
                    <br />
                    {currentUser.registrationNumber}
                  </div>
                  <div className="flex justify-between">
                    <div className="w-8 h-8 bg-black p-1"><div className="w-full h-full bg-white p-1"><div className="w-full h-full bg-black"/></div></div>
                    <div className="w-4 h-4 bg-black"/>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-white">{currentUser.name}</p>
                <p className="text-xs font-mono text-zinc-400">{currentUser.registrationNumber} • {currentUser.primaryZone.replace('zone-', '')}</p>
                <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/40 text-emerald-300 text-[10px] font-mono">
                  <ShieldCheck className="w-3 h-3" /> VERIFIED BADGE
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-full h-48 rounded-2xl bg-zinc-950 border-2 border-dashed border-zinc-700 flex flex-col items-center justify-center relative overflow-hidden">
                {isScanning && (
                  <div className="absolute inset-0 bg-red-950/30 flex items-center justify-center">
                    <div className="w-full h-1 bg-red-500 animate-pulse shadow-lg shadow-red-500" />
                  </div>
                )}

                {scanSuccess ? (
                  <div className="space-y-2 animate-in zoom-in-90 duration-150">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                    <p className="text-xs font-bold font-mono text-emerald-400">ATTENDANCE LOGGED!</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Camera className="w-8 h-8 text-zinc-500 mx-auto" />
                    <p className="text-xs text-zinc-400">Align Meeting QR Code in frame</p>
                  </div>
                )}
              </div>

              <button
                onClick={handleSimulateScan}
                disabled={isScanning || scanSuccess}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs font-mono flex items-center justify-center gap-2"
              >
                {isScanning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <QrCode className="w-4 h-4" />}
                <span>{isScanning ? 'Verifying QR Code...' : 'Simulate Camera Scan'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-zinc-950 border-t border-zinc-800 text-[11px] font-mono text-zinc-500 text-center">
          Geo-fenced attendance valid for 60 minutes
        </div>

      </div>
    </div>
  );
};
