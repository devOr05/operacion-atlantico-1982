import React from 'react';
import { CrtScreen } from './components/crt/CrtScreen';
import { CommandHeader } from './components/war-room/CommandHeader';
import { CharacterCreator } from './components/character-creation/CharacterCreator';
import { CoperoCard } from './components/gameplay/CoperoCard';
import { CareerSummary } from './components/gameplay/CareerSummary';
import { RankingScreen } from './components/ranking/RankingScreen';
import { DossierModal } from './components/teletype/DossierModal';
import { useGameStore } from './core/state/gameStore';

export const App: React.FC = () => {
  const { stage } = useGameStore();

  return (
    <CrtScreen>
      <div className="flex flex-col h-screen w-screen overflow-hidden">
        {/* Cabecera Superior con Reloj y Controles CRT */}
        <CommandHeader />

        {/* Contenedor Principal según Etapa */}
        <main className="flex-1 flex overflow-hidden min-h-0">
          {stage === 'creation' && <CharacterCreator />}
          {stage === 'playing' && <CoperoCard />}
          {stage === 'summary' && <CareerSummary />}
          {stage === 'ranking' && <RankingScreen />}
        </main>

        {/* Pie de página */}
        <footer className="py-1 px-3 bg-black/90 border-t border-[var(--crt-dim,#1f6b30)] flex items-center justify-between text-[11px] text-zinc-500 font-mono-military z-20 select-none">
          <span className="hidden sm:inline text-[10px] text-[var(--crt-dim,#1f6b30)]">HÉROES DEL ATLÁNTICO 1982</span>
          <span className="mx-auto sm:mx-0">
            Desarrollado por <a href="https://instagram.com/taller_it_" target="_blank" rel="noopener noreferrer" className="text-[var(--crt-primary,#55ff77)] font-bold hover:underline glow-text">@taller_it_</a>
          </span>
          <span className="hidden sm:inline text-[10px] text-[var(--crt-dim,#1f6b30)]">PWA 100% OFFLINE</span>
        </footer>

        {/* Modal de Dossier Histórico 1982 */}
        <DossierModal />
      </div>
    </CrtScreen>
  );
};

export default App;
