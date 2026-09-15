import React, { type ReactNode } from 'react';
import { useGameStore } from '../../core/state/gameStore';

interface CrtScreenProps {
  children: ReactNode;
}

export const CrtScreen: React.FC<CrtScreenProps> = ({ children }) => {
  const { crtMode, scanlinesEnabled } = useGameStore();

  const modeClass = crtMode === 'amber' 
    ? 'crt-amber' 
    : crtMode === 'cyan' 
      ? 'crt-cyan' 
      : 'crt-green';

  return (
    <div className={`relative w-full h-[100dvh] min-h-[100dvh] max-h-[100dvh] overflow-hidden ${modeClass} bg-[var(--crt-bg,#050e07)] text-[var(--crt-primary,#55ff77)] font-mono-military`}>
      {/* Marco diegético del monitor militar de los 80 */}
      <div className="relative w-full h-full flex flex-col crt-bezel crt-flicker overflow-hidden">
        {/* Scanlines opcionales de pantalla analógica */}
        {scanlinesEnabled && (
          <div className="absolute inset-0 pointer-events-none z-50 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_60%,rgba(0,0,0,0.6)_100%)] scanlines" />
        )}

        {/* Reflejo de tubo de vidrio curvado */}
        <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none z-40 bg-gradient-to-b from-white/5 to-transparent" />

        {/* Contenido principal */}
        <div className="relative z-10 flex flex-col flex-1 h-full min-h-0 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};
