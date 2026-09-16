import React from 'react';
import { X, Compass, Radio } from 'lucide-react';
import { useGameStore, gameStore } from '../../core/state/gameStore';
import { TacticalMap } from './TacticalMap';

export const TacticalMapModal: React.FC = () => {
  const { mapModalOpen, player } = useGameStore();

  if (!mapModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm select-none font-mono-military animate-fade-in">
      <div className="w-full max-w-4xl bg-[#030905] tactical-border rounded-lg shadow-2xl flex flex-col max-h-[95vh] overflow-hidden border-2 border-[var(--crt-primary,#55ff77)] glow-border">
        
        {/* Cabecera del Modal */}
        <div className="shrink-0 flex items-center justify-between px-3 py-2 bg-black/90 border-b border-[var(--crt-dim,#1f6b30)]">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[var(--crt-primary,#55ff77)] animate-spin" style={{ animationDuration: '10s' }} />
            <span className="font-chakra font-bold text-xs sm:text-sm text-[var(--crt-primary,#55ff77)] uppercase glow-text">
              TEATRO DE OPERACIONES ATLÁNTICO SUR • RADAR TPS-43 BARRIDO COMPLETO
            </span>
          </div>

          <button
            onClick={() => gameStore.setMapModalOpen(false)}
            className="p-1 rounded hover:bg-red-950 text-zinc-400 hover:text-red-400 border border-transparent hover:border-red-600 transition-all"
            title="Cerrar Mapa Radar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Contenido del Mapa con Inteligencia Táctica */}
        <div className="flex-1 w-full min-h-0 flex flex-col p-1 sm:p-2 bg-black/95 overflow-hidden">
          <TacticalMap 
            currentLocationName="PUERTO ARGENTINO / TOAS"
            stepNumber={1}
            branch={player.branch}
          />
        </div>

        {/* Pie con indicaciones siempre visible */}
        <div className="shrink-0 flex items-center justify-between px-3 py-1.5 bg-black/90 border-t border-[var(--crt-dim,#1f6b30)] text-[10px] text-zinc-400">
          <span className="flex items-center gap-1 text-[var(--crt-accent,#aaffbb)]">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            HACÉ CLICK EN CUALQUIER NODO DEL MAPA PARA VER SU INTELIGENCIA Y ESTADO
          </span>
          <button
            onClick={() => gameStore.setMapModalOpen(false)}
            className="px-3 py-1 rounded tactical-btn font-bold text-[10px] uppercase"
          >
            VOLVER AL PANEL
          </button>
        </div>

      </div>
    </div>
  );
};
