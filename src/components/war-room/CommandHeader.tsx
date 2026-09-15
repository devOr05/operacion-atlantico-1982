import React from 'react';
import { 
  Radio, 
  Volume2, 
  VolumeX, 
  Tv, 
  BookOpen, 
  Medal,
  Compass 
} from 'lucide-react';
import { useGameStore, gameStore } from '../../core/state/gameStore';
import { RANKS_BY_BRANCH } from '../../core/story/militaryRanks';

export const CommandHeader: React.FC = () => {
  const state = useGameStore();
  const { player, stage, dossierOpen } = state;
  const currentRank = RANKS_BY_BRANCH[player.branch]?.[player.currentRankIndex];

  return (
    <header className="border-b border-[var(--crt-dim,#1f6b30)] bg-[rgba(3,10,5,0.92)] px-3 py-2 flex flex-wrap items-center justify-between gap-2 select-none font-mono-military">
      {/* Título y estado de la consola */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded border border-[var(--crt-primary,#55ff77)] bg-[rgba(85,255,119,0.1)] glow-border">
          <Radio className="w-5 h-5 text-[var(--crt-primary,#55ff77)] animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm md:text-base font-bold tracking-wider uppercase font-chakra text-[var(--crt-primary,#55ff77)] glow-text">
              HÉROES DEL ATLÁNTICO 1982
            </h1>
            <span className="hidden sm:inline-block px-1.5 py-0.2 text-[10px] font-bold uppercase rounded bg-red-950/80 border border-red-500 text-red-400 animate-pulse">
              CONVERTITE EN LEYENDA
            </span>
          </div>
          <div className="text-[11px] text-[var(--crt-dim,#1f6b30)] flex items-center gap-2">
            <span>TIERRA • AIRE • MAR</span>
            <span>•</span>
            <span className="text-[var(--crt-accent,#aaffbb)]">HASTA GENERAL / ALMIRANTE</span>
          </div>
        </div>
      </div>

      {/* Rango del combatiente en partida */}
      {stage !== 'creation' && currentRank && (
        <div className="hidden md:flex items-center gap-2 bg-black/50 px-2.5 py-1 rounded border border-amber-500/40 text-xs">
          <Medal className="w-3.5 h-3.5 text-yellow-400" />
          <span className="text-zinc-400 uppercase">{player.name}:</span>
          <span className="font-bold text-amber-300 uppercase">{currentRank.title}</span>
        </div>
      )}

      {/* Controles de hardware de la consola de los 80 */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Selector de fósforo CRT */}
        <div className="flex items-center bg-black/50 p-0.5 rounded border border-[var(--crt-dim,#1f6b30)]">
          <button
            onClick={() => gameStore.setCrtMode('green')}
            title="Fósforo Verde P1"
            className={`px-1.5 py-0.5 text-[10px] rounded transition-all ${
              state.crtMode === 'green' 
                ? 'bg-[#55ff77]/20 text-[#55ff77] font-bold border border-[#55ff77]' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            P1-VRD
          </button>
          <button
            onClick={() => gameStore.setCrtMode('amber')}
            title="Fósforo Ámbar P3"
            className={`px-1.5 py-0.5 text-[10px] rounded transition-all ${
              state.crtMode === 'amber' 
                ? 'bg-[#ffb833]/20 text-[#ffb833] font-bold border border-[#ffb833]' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            P3-AMB
          </button>
          <button
            onClick={() => gameStore.setCrtMode('cyan')}
            title="Fósforo Azul Cobalto"
            className={`px-1.5 py-0.5 text-[10px] rounded transition-all ${
              state.crtMode === 'cyan' 
                ? 'bg-[#4deeea]/20 text-[#4deeea] font-bold border border-[#4deeea]' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            P4-CYN
          </button>
        </div>

        {/* Interruptor de Scanlines */}
        <button
          onClick={() => gameStore.toggleScanlines()}
          title="Alternar Scanlines CRT"
          className={`p-1.5 rounded border transition-all ${
            state.scanlinesEnabled 
              ? 'border-[var(--crt-primary,#55ff77)] bg-[var(--crt-dim,#1f6b30)]/40 text-[var(--crt-primary,#55ff77)]' 
              : 'border-zinc-800 text-zinc-600'
          }`}
        >
          <Tv className="w-3.5 h-3.5" />
        </button>

        {/* Audio Mute */}
        <button
          onClick={() => gameStore.toggleMute()}
          title={state.isMuted ? 'Activar Sonido Procedural' : 'Silenciar'}
          className={`p-1.5 rounded border transition-all ${
            !state.isMuted 
              ? 'border-[var(--crt-primary,#55ff77)] bg-[var(--crt-dim,#1f6b30)]/40 text-[var(--crt-primary,#55ff77)]' 
              : 'border-red-900/60 bg-red-950/40 text-red-400'
          }`}
        >
          {state.isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>

        {/* Botón de Mapa Radar TOAS */}
        <button
          onClick={() => gameStore.setMapModalOpen(!state.mapModalOpen)}
          className="flex items-center gap-1 px-2.5 py-1 text-xs tactical-btn rounded border border-amber-500/80 bg-amber-950/30 text-amber-300 hover:text-amber-200 shadow-[0_0_8px_rgba(245,158,11,0.25)]"
          title="Ver Mapa Táctico del Teatro de Operaciones"
        >
          <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '10s' }} />
          <span className="font-bold">RADAR TOAS</span>
        </button>

        {/* Botón de Dossier de Inteligencia */}
        <button
          onClick={() => gameStore.setDossierOpen(!dossierOpen)}
          className="flex items-center gap-1 px-2 py-1 text-xs tactical-btn rounded border border-[var(--crt-primary,#55ff77)]"
        >
          <BookOpen className="w-3.5 h-3.5 text-[var(--crt-primary,#55ff77)]" />
          <span className="hidden sm:inline font-bold">DOSSIER</span>
        </button>
      </div>
    </header>
  );
};
