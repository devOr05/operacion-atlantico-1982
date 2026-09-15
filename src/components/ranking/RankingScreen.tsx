import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  RotateCcw, 
  MapPin, 
  Shield, 
  Plane, 
  Anchor,
  Globe,
  HardDrive,
  RefreshCw,
  Radio
} from 'lucide-react';
import { gameStore, getRankings, type RankingEntry } from '../../core/state/gameStore';
import { fetchGlobalRankings, isSupabaseConfigured } from '../../services/supabase';

export const RankingScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'global' | 'local'>('global');
  const [globalRankings, setGlobalRankings] = useState<RankingEntry[]>([]);
  const [loadingGlobal, setLoadingGlobal] = useState<boolean>(true);
  const localRankings = getRankings();

  const loadGlobal = async () => {
    setLoadingGlobal(true);
    const data = await fetchGlobalRankings();
    if (data && data.length > 0) {
      setGlobalRankings(data);
    } else {
      // Si no hay datos aún en Supabase o no está configurado, usar los récords locales y leyendas
      setGlobalRankings(localRankings);
    }
    setLoadingGlobal(false);
  };

  useEffect(() => {
    loadGlobal();
  }, []);

  const displayRankings = activeTab === 'global' ? globalRankings : localRankings;

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
            CLASIFICACIÓN EN VIVO DE LOS VETERANOS Y ESTRATEGAS DEL ATLÁNTICO SUR
          </p>
        </div>

        {/* Pestañas: Global Online vs Local */}
        <div className="flex items-center justify-between gap-2 border-b border-[var(--crt-dim,#1f6b30)] pb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('global')}
              className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'global'
                  ? 'bg-amber-950/60 border border-amber-500 text-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                  : 'bg-black/50 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>TOP 1000 GLOBAL (EN LÍNEA)</span>
            </button>

            <button
              onClick={() => setActiveTab('local')}
              className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'local'
                  ? 'bg-emerald-950/60 border border-emerald-500 text-emerald-300 shadow-[0_0_8px_rgba(85,255,119,0.3)]'
                  : 'bg-black/50 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
              <span>MIS RÉCORDS LOCALES</span>
            </button>
          </div>

          <button
            onClick={loadGlobal}
            title="Actualizar ranking"
            className="p-1.5 rounded bg-black/60 border border-[var(--crt-dim,#1f6b30)] hover:border-[var(--crt-primary,#55ff77)] text-zinc-300"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingGlobal ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Estado de conexión */}
        <div className="flex items-center justify-between text-[10px] text-zinc-500 px-1">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            {isSupabaseConfigured ? 'BASE DE DATOS SUPABASE CONECTADA' : 'RED GLOBAL ACTIVA • MODO PWA RESILIENTE'}
          </span>
          <span>{displayRankings.length} PARTIDAS REGISTRADAS</span>
        </div>

        {/* Tabla / Lista de Posiciones */}
        <div className="max-h-[380px] overflow-y-auto space-y-2 pr-1">
          {displayRankings.length === 0 ? (
            <div className="text-center py-10 text-zinc-500 text-xs italic">
              No hay partidas registradas aún. ¡Completá tu primera campaña!
            </div>
          ) : (
            displayRankings.map((entry: RankingEntry, idx: number) => {
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
            <span>JUGAR OTRA VEZ (NUEVO COMBATIENTE)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
