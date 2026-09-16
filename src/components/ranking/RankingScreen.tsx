import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  RotateCcw, 
  MapPin, 
  Shield, 
  Plane, 
  Anchor,
  Globe,
  RefreshCw,
  Radio
} from 'lucide-react';
import { gameStore, getRankings, isTestRanking, type RankingEntry } from '../../core/state/gameStore';
import { fetchGlobalRankings } from '../../services/supabase';

export const RankingScreen: React.FC = () => {
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadGlobal = async () => {
    setLoading(true);
    const data = await fetchGlobalRankings();
    if (data && data.length > 0) {
      setRankings(data.filter(r => !isTestRanking(r)));
    } else {
      // Si no hay respuesta remota aún, mostrar lista inicial limpia
      setRankings(getRankings().filter(r => !isTestRanking(r)));
    }
    setLoading(false);
  };

  useEffect(() => {
    loadGlobal();
  }, []);

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
    <div className="w-full flex items-start justify-center p-3 sm:p-6 font-mono-military select-none pt-6 sm:pt-8 pb-36 sm:pb-32 min-h-full">
      <div className="w-full max-w-3xl bg-[#030905] tactical-border rounded-lg shadow-2xl p-4 sm:p-6 space-y-4 border-2 border-[var(--crt-dim,#1f6b30)] mb-4">
        
        {/* Cabecera del Ranking */}
        <div className="text-center border-b border-[var(--crt-dim,#1f6b30)] pb-2.5 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded bg-black border border-[var(--crt-dim,#1f6b30)] text-[11px] text-[var(--crt-accent,#aaffbb)] uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-yellow-400" />
            CUADRO DE HONOR 1982
          </div>
          <h1 className="text-xl sm:text-3xl font-bold font-chakra uppercase text-[var(--crt-primary,#55ff77)] glow-text">
            TOP 1.000 GLOBAL ONLINE
          </h1>
        </div>

        {/* Barra de control y estado de red */}
        <div className="flex items-center justify-between gap-2 border-b border-[var(--crt-dim,#1f6b30)] pb-2.5">
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-amber-950/50 border border-amber-500/70 text-amber-300 font-bold">
              <Globe className="w-4 h-4 text-amber-400" />
              <span>TOP 1.000</span>
            </div>
            <span className="text-[10px] text-zinc-500 hidden sm:inline">
              • {rankings.length} REGISTRADOS
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-[10px] text-emerald-400">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span className="hidden md:inline">ONLINE</span>
            </span>

            <button
              onClick={loadGlobal}
              title="Actualizar ranking online"
              className="px-2.5 py-1 rounded bg-black/60 border border-[var(--crt-dim,#1f6b30)] hover:border-[var(--crt-primary,#55ff77)] text-zinc-300 flex items-center gap-1.5 text-xs transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-yellow-400' : ''}`} />
              <span className="hidden sm:inline font-bold">ACTUALIZAR</span>
            </button>
          </div>
        </div>

        {/* Tabla / Lista de Posiciones */}
        <div className="max-h-[400px] overflow-y-auto space-y-2 pr-1">
          {loading ? (
            <div className="text-center py-12 text-zinc-400 text-xs italic flex flex-col items-center gap-2">
              <RefreshCw className="w-5 h-5 animate-spin text-emerald-400" />
              <span>Sincronizando servidor central...</span>
            </div>
          ) : rankings.length === 0 ? (
            <div className="text-center py-10 text-zinc-500 text-xs italic">
              Sin registros aún.
            </div>
          ) : (
            rankings.map((entry: RankingEntry, idx: number) => {
              const isTop3 = idx < 3;
              let rankBadge = `${idx + 1}°`;
              if (idx === 0) rankBadge = '🥇 #1';
              if (idx === 1) rankBadge = '🥈 #2';
              if (idx === 2) rankBadge = '🥉 #3';

              return (
                <div 
                  key={entry.id || idx}
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

                  {/* Estado Bélico y Puntaje Final */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-zinc-800">
                    <div>
                      {getOutcomeBadge(entry.warOutcome)}
                    </div>

                    <div className="text-right">
                      <div className="font-chakra font-bold text-sm sm:text-base text-yellow-400">
                        {entry.score} <span className="text-[10px] text-zinc-500 font-normal">PTS</span>
                      </div>
                      <div className="text-[9px] text-zinc-500">
                        {entry.date}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Botón de reinicio */}
        <div className="pt-2 border-t border-[var(--crt-dim,#1f6b30)] flex justify-center">
          <button
            onClick={() => gameStore.restartGame()}
            className="w-full sm:w-auto py-2.5 px-6 rounded border tactical-btn flex items-center justify-center gap-2 text-xs sm:text-sm font-bold uppercase hover:shadow-[0_0_12px_var(--crt-glow)]"
          >
            <RotateCcw className="w-4 h-4 text-[var(--crt-primary,#55ff77)]" />
            <span>NUEVO COMBATIENTE</span>
          </button>
        </div>

      </div>
    </div>
  );
};
