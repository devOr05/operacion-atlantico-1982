import React from 'react';
import { 
  Trophy, 
  RotateCcw, 
  MapPin, 
  Shield, 
  Plane, 
  Anchor 
} from 'lucide-react';
import { gameStore, getRankings, type RankingEntry } from '../../core/state/gameStore';

export const RankingScreen: React.FC = () => {
  const rankings = getRankings();

  const getBranchIcon = (branch: string) => {
    if (branch === 'aire') return <Plane className="w-3.5 h-3.5 text-sky-400" />;
    if (branch === 'mar') return <Anchor className="w-3.5 h-3.5 text-blue-400" />;
    return <Shield className="w-3.5 h-3.5 text-emerald-400" />;
  };

  const getOutcomeBadge = (outcome: string) => {
    if (outcome === 'victoria_total') {
      return <span className="px-2 py-0.5 rounded bg-yellow-950 text-yellow-300 border border-yellow-500 font-bold text-[10px]">VICTORIA TOTAL</span>;
    }
    if (outcome === 'armisticio_honroso') {
      return <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500 font-bold text-[10px]">ARMISTICIO</span>;
    }
    if (outcome === 'caido_en_combate') {
      return <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-500 font-bold text-[10px]">CAÍDO EN COMBATE</span>;
    }
    if (outcome === 'evacuado_herido') {
      return <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500 font-bold text-[10px]">EVACUADO HERIDO</span>;
    }
    if (outcome === 'prisionero_guerra') {
      return <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-700 font-bold text-[10px]">PRISIONERO (POW)</span>;
    }
    return <span className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-zinc-800 font-bold text-[10px]">DERROTA HISTÓRICA</span>;
  };

  return (
    <div className="flex-1 flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-mono-military select-none">
      <div className="w-full max-w-3xl bg-[#030905] tactical-border rounded-lg shadow-2xl p-4 sm:p-6 space-y-4 border-2 border-[var(--crt-dim,#1f6b30)]">
        
        {/* Cabecera del Ranking */}
        <div className="text-center border-b border-[var(--crt-dim,#1f6b30)] pb-3 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded bg-black border border-[var(--crt-dim,#1f6b30)] text-[11px] text-[var(--crt-accent,#aaffbb)] uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-yellow-400" />
            CUADRO DE HONOR Y SALÓN DE LA GLORIA 1982
          </div>
          <h1 className="text-lg sm:text-2xl font-bold font-chakra uppercase text-[var(--crt-primary,#55ff77)] glow-text">
            RANKING DE COMBATIENTES
          </h1>
          <p className="text-xs text-zinc-400">
            LOS MEJORES PUNTAJES Y LEYENDAS QUE MARCARON EL DESTINO EN LAS ISLAS
          </p>
        </div>

        {/* Tabla / Lista de Posiciones */}
        <div className="max-h-[380px] overflow-y-auto space-y-2 pr-1">
          {rankings.map((entry: RankingEntry, idx: number) => {
            const isTop3 = idx < 3;
            let rankBadge = `${idx + 1}°`;
            if (idx === 0) rankBadge = '🥇 #1';
            if (idx === 1) rankBadge = '🥈 #2';
            if (idx === 2) rankBadge = '🥉 #3';

            return (
              <div 
                key={entry.id}
                className={`p-3 rounded border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 transition-all ${
                  isTop3 
                    ? 'bg-black/80 border-amber-500/60 shadow-[0_0_10px_rgba(255,200,0,0.15)]' 
                    : 'bg-black/50 border-zinc-800 text-zinc-300'
                }`}
              >
                {/* Posición, Nombre, Apodo y Fuerza */}
                <div className="flex items-center gap-3">
                  <div className={`font-bold font-chakra text-sm sm:text-base w-12 shrink-0 ${
                    idx === 0 ? 'text-yellow-400' : idx === 1 ? 'text-zinc-300' : idx === 2 ? 'text-amber-500' : 'text-zinc-500'
                  }`}>
                    {rankBadge}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[var(--crt-accent,#aaffbb)]">
                        {entry.name}
                      </span>
                      <span className="text-yellow-400 text-xs font-bold">"{entry.nickname}"</span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        {getBranchIcon(entry.branch)}
                        <span className="uppercase font-bold text-zinc-300">{entry.branch}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-zinc-500" />
                        {entry.province}
                      </span>
                      <span>•</span>
                      <span className="text-amber-300 font-bold">{entry.rankTitle}</span>
                    </div>
                  </div>
                </div>

                {/* Resultado y Puntuación */}
                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div>{getOutcomeBadge(entry.warOutcome)}</div>
                  <div className="text-right">
                    <div className="text-[10px] text-zinc-500">PUNTOS</div>
                    <div className="font-bold font-vt323 text-lg text-yellow-400 leading-none">
                      {entry.score}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Botón de Nueva Partida */}
        <div className="pt-2 border-t border-[var(--crt-dim,#1f6b30)]/60">
          <button
            onClick={() => gameStore.restartGame()}
            className="w-full py-3 px-4 rounded font-chakra font-bold text-sm sm:text-base uppercase tracking-wider tactical-btn flex items-center justify-center gap-2 border-2 border-[var(--crt-primary,#55ff77)] shadow-[0_0_15px_var(--crt-glow)]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>JUGAR OTRA VEZ (NUEVO COMBATIENTE)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
