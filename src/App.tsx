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

        {/* Modal de Dossier Histórico 1982 */}
        <DossierModal />
      </div>
    </CrtScreen>
  );
};

export default App;
