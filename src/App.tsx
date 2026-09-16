import React from 'react';
import { CrtScreen } from './components/crt/CrtScreen';
import { CommandHeader } from './components/war-room/CommandHeader';
import { CharacterCreator } from './components/character-creation/CharacterCreator';
import { CoperoCard } from './components/gameplay/CoperoCard';
import { CareerSummary } from './components/gameplay/CareerSummary';
import { RankingScreen } from './components/ranking/RankingScreen';
import { DossierModal } from './components/teletype/DossierModal';
import { TacticalMapModal } from './components/map/TacticalMapModal';
import { useGameStore, gameStore } from './core/state/gameStore';
import { malvinasBgm } from './core/audio/malvinasBgm';

export const App: React.FC = () => {
  const { stage } = useGameStore();

  // Gestión de audio según la pantalla:
  // - Bienvenida ('creation') y Ranking final ('ranking') -> Marcha de las Malvinas
  // - Partida de combate táctico ('playing') -> Dron Táctico Dark Synth 1982
  React.useEffect(() => {
    if (stage === 'creation' || stage === 'ranking' || stage === 'summary') {
      malvinasBgm.setTrack('marcha');
    } else if (stage === 'playing') {
      malvinasBgm.setTrack('dron');
    }
  }, [stage]);

  React.useEffect(() => {
    let started = false;
    const handleFirstInteraction = () => {
      if (started) return;
      started = true;
      gameStore.startMusic();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  return (
    <CrtScreen>
      <div className="flex flex-col h-full w-full overflow-hidden">
        {/* Cabecera Superior con Reloj y Controles CRT */}
        <CommandHeader />

        {/* Contenedor Principal según Etapa */}
        <main className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden min-h-0 relative">
          {stage === 'creation' && <CharacterCreator />}
          {stage === 'playing' && <CoperoCard />}
          {stage === 'summary' && <CareerSummary />}
          {stage === 'ranking' && <RankingScreen />}
        </main>

        {/* Pie de página */}
        <footer className="py-1 px-3 bg-black/90 border-t border-[var(--crt-dim,#1f6b30)] flex items-center justify-between text-[11px] text-zinc-500 font-mono-military z-20 select-none shrink-0">
          <span className="hidden sm:inline text-[10px] text-[var(--crt-dim,#1f6b30)]">HÉROES DEL ATLÁNTICO 1982</span>
          <span className="mx-auto sm:mx-0">
            Desarrollado por <a href="https://instagram.com/taller_it_" target="_blank" rel="noopener noreferrer" className="text-[var(--crt-primary,#55ff77)] font-bold hover:underline glow-text">@taller_it_</a>
          </span>
          <span className="hidden sm:inline text-[10px] text-[var(--crt-dim,#1f6b30)]">PWA 100% OFFLINE</span>
        </footer>

        {/* Modal de Dossier Histórico 1982 */}
        <DossierModal />

        {/* Modal de Mapa Táctico Radar 1982 */}
        <TacticalMapModal />
      </div>
    </CrtScreen>
  );
};

export default App;
