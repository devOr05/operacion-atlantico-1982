import React from 'react';
import { 
  Radio, 
  Volume2, 
  VolumeX, 
  Music,
  BookOpen, 
  Compass 
} from 'lucide-react';
import { useGameStore, gameStore } from '../../core/state/gameStore';

export const CommandHeader: React.FC = () => {
  const state = useGameStore();
  const { dossierOpen } = state;

  return (
    <header className="h-11 sm:h-12 min-h-[44px] border-b border-[var(--crt-dim,#1f6b30)] bg-[rgba(3,10,5,0.95)] px-2 sm:px-3 flex items-center justify-between gap-1 sm:gap-2 select-none font-mono-military shrink-0 z-30">
      {/* Título y estado de la consola */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
        <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded border border-[var(--crt-primary,#55ff77)] bg-[rgba(85,255,119,0.1)] glow-border shrink-0">
          <Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--crt-primary,#55ff77)] animate-pulse" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h1 className="text-xs sm:text-base font-bold tracking-wider uppercase font-chakra text-[var(--crt-primary,#55ff77)] glow-text truncate">
              <span className="hidden sm:inline">HÉROES DEL ATLÁNTICO 1982</span>
              <span className="sm:hidden">HÉROES '82</span>
            </h1>
          </div>
          <div className="hidden sm:flex text-[10px] text-[var(--crt-dim,#1f6b30)] items-center gap-1.5">
            <span>TIERRA • AIRE • MAR</span>
            <span>•</span>
            <span className="text-[var(--crt-accent,#aaffbb)]">1982</span>
          </div>
        </div>
      </div>

      {/* Controles de hardware de la consola */}
      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
        {/* Selector de fósforo CRT (visible en sm+) */}
        <div className="hidden sm:flex items-center bg-black/60 p-0.5 rounded border border-[var(--crt-dim,#1f6b30)]">
          <button
            onClick={() => gameStore.setCrtMode('green')}
            title="Fósforo Verde P1"
            className={`px-1 py-0.5 text-[9px] rounded transition-all ${
              state.crtMode === 'green' 
                ? 'bg-[#55ff77]/20 text-[#55ff77] font-bold border border-[#55ff77]' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            P1
          </button>
          <button
            onClick={() => gameStore.setCrtMode('amber')}
            title="Fósforo Ámbar P3"
            className={`px-1 py-0.5 text-[9px] rounded transition-all ${
              state.crtMode === 'amber' 
                ? 'bg-[#ffb833]/20 text-[#ffb833] font-bold border border-[#ffb833]' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            P3
          </button>
          <button
            onClick={() => gameStore.setCrtMode('cyan')}
            title="Fósforo Azul Cobalto"
            className={`px-1 py-0.5 text-[9px] rounded transition-all ${
              state.crtMode === 'cyan' 
                ? 'bg-[#4deeea]/20 text-[#4deeea] font-bold border border-[#4deeea]' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            P4
          </button>
        </div>

        {/* Audio Mute */}
        <button
          onClick={() => gameStore.toggleMute()}
          title={state.isMuted ? 'Activar Sonido' : 'Silenciar'}
          className={`p-1 sm:p-1.5 rounded border transition-all ${
            !state.isMuted 
              ? 'border-[var(--crt-primary,#55ff77)] bg-[var(--crt-dim,#1f6b30)]/40 text-[var(--crt-primary,#55ff77)]' 
              : 'border-red-900/60 bg-red-950/40 text-red-400'
          }`}
        >
          {state.isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
        </button>

        {/* Música de Fondo: Marcha de las Malvinas */}
        <button
          onClick={() => gameStore.toggleMusic()}
          title={state.isMusicPlaying && !state.isMuted ? 'Pausar Marcha de las Malvinas' : 'Reproducir Marcha de las Malvinas'}
          className={`flex items-center gap-1 px-1.5 sm:px-2 py-1 text-[10px] sm:text-xs rounded border transition-all ${
            state.isMusicPlaying && !state.isMuted
              ? 'border-yellow-400/80 bg-yellow-950/40 text-yellow-300 shadow-[0_0_10px_rgba(250,204,21,0.35)]'
              : 'border-zinc-800 bg-black/60 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600'
          }`}
        >
          <Music className={`w-3 h-3 ${state.isMusicPlaying && !state.isMuted ? 'animate-bounce text-yellow-400' : ''}`} />
          <span className="hidden md:inline font-bold">MÚSICA</span>
        </button>

        {/* Botón de Mapa Radar TOAS */}
        <button
          onClick={() => gameStore.setMapModalOpen(!state.mapModalOpen)}
          className="flex items-center gap-1 px-2 py-1 text-[10px] sm:text-xs tactical-btn rounded border border-amber-500/80 bg-amber-950/40 text-amber-300 hover:text-amber-200 shadow-[0_0_8px_rgba(245,158,11,0.25)]"
          title="Ver Mapa Táctico del Teatro de Operaciones"
        >
          <Compass className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '10s' }} />
          <span className="font-bold">RADAR</span>
        </button>

        {/* Botón de Dossier de Inteligencia */}
        <button
          onClick={() => gameStore.setDossierOpen(!dossierOpen)}
          className="flex items-center gap-1 px-2 py-1 text-[10px] sm:text-xs tactical-btn rounded border border-[var(--crt-primary,#55ff77)]"
        >
          <BookOpen className="w-3 h-3 text-[var(--crt-primary,#55ff77)]" />
          <span className="hidden sm:inline font-bold">DOSSIER</span>
        </button>
      </div>
    </header>
  );
};
