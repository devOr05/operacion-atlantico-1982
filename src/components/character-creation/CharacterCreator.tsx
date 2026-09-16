import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Plane, 
  Anchor, 
  User, 
  MapPin, 
  Medal, 
  Award, 
  ChevronRight,
  Sparkles,
  Radio,
  Users,
  Crosshair,
  Flag,
  Trophy
} from 'lucide-react';
import { type MilitaryBranch, ARGENTINE_PROVINCES, RANKS_BY_BRANCH } from '../../core/story/militaryRanks';
import { getRankTierFromIndex, type RankTier } from '../../core/story/campaigns/campaignTypes';
import { gameStore } from '../../core/state/gameStore';
import { soundFx } from '../../core/audio/soundEffects';
import { getGlobalCombatientesCount } from '../../services/supabase';

export const CharacterCreator: React.FC = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [province, setProvince] = useState(ARGENTINE_PROVINCES[0]);
  const [branch, setBranch] = useState<MilitaryBranch>('tierra');
  const [chosenRankIndex, setChosenRankIndex] = useState<number>(0);
  const [enlistedCount, setEnlistedCount] = useState<number | null>(null);

  // Cargar contador global real de combatientes alistados directamente desde Supabase
  useEffect(() => {
    getGlobalCombatientesCount().then((count) => {
      setEnlistedCount(count);
    });
  }, []);

  // Al cambiar de fuerza armada, ajustar rango si queda fuera de índice
  const handleBranchChange = (newBranch: MilitaryBranch) => {
    soundFx.playSwitchClick();
    setBranch(newBranch);
    // Mantener la categoría relativa o reiniciar a conscripto
    setChosenRankIndex(0);
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playCommandConfirm();
    gameStore.startNewGameWithPlayer(
      name || 'Esteban Gómez',
      nickname || 'El Furia',
      province,
      branch,
      chosenRankIndex
    );
  };

  const availableRanks = RANKS_BY_BRANCH[branch];
  const currentRank = availableRanks[chosenRankIndex] || availableRanks[0];
  const rankTier: RankTier = getRankTierFromIndex(chosenRankIndex);

  // Descripciones históricas de la campaña según el rango
  const getRankStoryDescription = () => {
    if (rankTier === 'tropa') {
      if (branch === 'tierra') {
        return 'Vivirás la crudeza del pozo de zorro en Longdon: frío extremo, raciones escasas, fusil FAL y combate cuerpo a cuerpo nocturno a bayoneta.';
      }
      if (branch === 'aire') {
        return 'Defensa antiaérea con cañones Rheinmetall de 20mm en Darwin y armado de cohetes en aviones Pucará bajo fuego inglés.';
      }
      return 'Sala de máquinas del Crucero ARA Belgrano, rescate de camaradas tras torpedeo y supervivencia en balsas sobre olas gigantes.';
    }
    if (rankTier === 'suboficial') {
      if (branch === 'tierra') {
        return 'Liderazgo directo de pelotón con ametralladora pesada MAG 7.62mm, fuego de cobertura y contención de infiltraciones nocturnas del SAS.';
      }
      if (branch === 'aire') {
        return 'Suboficial armero y radarista: mantenimiento de aviónica bajo bombardeo y defensa perimetral de la pista de Puerto Argentino.';
      }
      return 'Suboficial de control de averías y estanqueidad en buques de combate y lanchas patrulleras en bahías interiores.';
    }
    if (rankTier === 'oficial') {
      if (branch === 'tierra') {
        return 'Comandante de compañía en Darwin y Tumbledown: reglar fuego de artillería de 105mm y liderar contraataques de infantería.';
      }
      if (branch === 'aire') {
        return 'Piloto de Caza (A-4 Skyhawk / Dagger) o Jefe de Escuadrilla: vuelos a 15m sobre el agua, bombas en San Carlos y reabastecimiento en vuelo.';
      }
      return 'Piloto aeronaval de Super Étendard con misiles AM-39 Exocet (ataques al Sheffield y Atlantic Conveyor) o submarino San Luis.';
    }
    // Alto Mando
    if (branch === 'tierra') {
      return 'Comandante de la Brigada X: mapas de situación del TOAS, defensa de Puerto Argentino, blindados Panhard y decisiones diplomáticas.';
    }
    if (branch === 'aire') {
      return 'Brigadier General y Comando de la FAS: planificación de olas masivas de bombardeo naval, puente aéreo nocturno y ataque al HMS Invincible.';
    }
    return 'Almirante de la Flota: Portaaviones ARA 25 de Mayo, repliegue a aguas poco profundas frente a submarinos nucleares y batería costera ITB Exocet.';
  };

  return (
    <div className="w-full flex items-start justify-center p-3 sm:p-6 font-mono-military select-none pt-6 sm:pt-8 pb-36 sm:pb-32 min-h-full">
      <div className="w-full max-w-3xl bg-[#030905] tactical-border rounded-lg shadow-2xl p-4 sm:p-6 space-y-4 border-2 border-[var(--crt-dim,#1f6b30)] mb-4">
        
        {/* Cabecera estilo Libreta de Enrolamiento 1982 */}
        <div className="border-b border-[var(--crt-dim,#1f6b30)] pb-2.5 text-center space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-zinc-950 border border-[var(--crt-dim,#1f6b30)] text-[10px] text-[var(--crt-accent,#aaffbb)] uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-yellow-400" />
            SIMULADOR DE GUERRA HISTÓRICO 1982 • MALVINAS
          </div>
          <h1 className="text-xl sm:text-3xl font-bold font-chakra uppercase text-[var(--crt-primary,#55ff77)] glow-text">
            HÉROES DEL ATLÁNTICO 1982
          </h1>
        </div>

        {/* CONTADOR GLOBAL DE COMBATIENTES EN VIVO (Click para ver Ranking) */}
        <div 
          onClick={() => gameStore.goToRanking()}
          title="Hacé click para ver el Cuadro de Honor y Ranking Global"
          className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded bg-black/85 border border-emerald-500/40 shadow-inner cursor-pointer hover:border-emerald-400 hover:bg-emerald-950/20 transition-all group select-none"
        >
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <div className="text-[11px] font-bold text-zinc-300 uppercase tracking-wide group-hover:text-emerald-300 transition-colors">
              COMBATIENTES ALISTADOS AL FRENTE:
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1 rounded bg-emerald-950/70 border border-emerald-500/60">
              <Users className="w-4 h-4 text-yellow-400" />
              <span className="font-chakra font-bold text-base sm:text-lg text-[var(--crt-primary,#55ff77)] glow-text tracking-widest">
                {enlistedCount !== null ? enlistedCount.toLocaleString('es-AR') : '...'}
              </span>
            </div>
            <div className="px-2.5 py-1 rounded bg-amber-950/50 border border-amber-500/60 text-amber-300 group-hover:bg-amber-900/60 text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_8px_rgba(245,158,11,0.2)]">
              <Trophy className="w-3.5 h-3.5 text-yellow-400" />
              <span>VER RANKING</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleStart} className="space-y-4 text-xs sm:text-sm">
          {/* Fila 1: Nombre y Apodo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                Nombre y Apellido:
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-500 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="Ej. Martín Benítez"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded bg-black/70 border border-[var(--crt-dim,#1f6b30)] text-[var(--crt-accent,#aaffbb)] focus:border-[var(--crt-primary,#55ff77)] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                Apodo o Indicativo de Combate:
              </label>
              <input
                type="text"
                placeholder="Ej. El Chaqueño / Cóndor"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full px-3 py-2 rounded bg-black/70 border border-[var(--crt-dim,#1f6b30)] text-[var(--crt-accent,#aaffbb)] focus:border-[var(--crt-primary,#55ff77)] focus:outline-none"
              />
            </div>
          </div>

          {/* Fila 2: Provincia de Origen */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
              Provincia de Origen (Distrito Militar):
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-zinc-500 absolute left-2.5 top-2.5" />
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded bg-black/70 border border-[var(--crt-dim,#1f6b30)] text-[var(--crt-accent,#aaffbb)] focus:border-[var(--crt-primary,#55ff77)] focus:outline-none"
              >
                {ARGENTINE_PROVINCES.map((p) => (
                  <option key={p} value={p} className="bg-zinc-950 text-zinc-200">
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Fila 3: Selección de la Fuerza Militar */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-2">
              1. Elegí tu Fuerza Armada:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {/* Tierra */}
              <button
                type="button"
                onClick={() => handleBranchChange('tierra')}
                className={`p-3 rounded border text-left flex flex-col gap-1.5 transition-all ${
                  branch === 'tierra'
                    ? 'bg-[rgba(85,255,119,0.15)] border-[var(--crt-primary,#55ff77)] text-[var(--crt-accent,#aaffbb)] shadow-[0_0_12px_var(--crt-glow)]'
                    : 'bg-black/50 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <span className="text-[10px] font-bold uppercase">EJÉRCITO</span>
                </div>
                <div className="font-bold text-xs">TIERRA</div>
                <p className="text-[10px] text-zinc-400 leading-tight">
                  Infantería en los montes, pozos de zorro y combate cuerpo a cuerpo.
                </p>
              </button>

              {/* Aire */}
              <button
                type="button"
                onClick={() => handleBranchChange('aire')}
                className={`p-3 rounded border text-left flex flex-col gap-1.5 transition-all ${
                  branch === 'aire'
                    ? 'bg-[rgba(85,255,119,0.15)] border-[var(--crt-primary,#55ff77)] text-[var(--crt-accent,#aaffbb)] shadow-[0_0_12px_var(--crt-glow)]'
                    : 'bg-black/50 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Plane className="w-5 h-5 text-sky-400" />
                  <span className="text-[10px] font-bold uppercase">FUERZA AÉREA</span>
                </div>
                <div className="font-bold text-xs">AIRE</div>
                <p className="text-[10px] text-zinc-400 leading-tight">
                  Cazas A-4 Skyhawk a 15m del agua, Bomb Alley y reabastecimiento en vuelo.
                </p>
              </button>

              {/* Mar */}
              <button
                type="button"
                onClick={() => handleBranchChange('mar')}
                className={`p-3 rounded border text-left flex flex-col gap-1.5 transition-all ${
                  branch === 'mar'
                    ? 'bg-[rgba(85,255,119,0.15)] border-[var(--crt-primary,#55ff77)] text-[var(--crt-accent,#aaffbb)] shadow-[0_0_12px_var(--crt-glow)]'
                    : 'bg-black/50 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Anchor className="w-5 h-5 text-blue-400" />
                  <span className="text-[10px] font-bold uppercase">ARMADA</span>
                </div>
                <div className="font-bold text-xs">MAR</div>
                <p className="text-[10px] text-zinc-400 leading-tight">
                  Super Étendard con Exocet, ARA Belgrano y el Portaaviones 25 de Mayo.
                </p>
              </button>
            </div>
          </div>

          {/* Fila 4: Jerarquía y Rango Militar Inicial (HISTORIA DIFERENTE POR RANGO) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-bold text-zinc-400 uppercase">
                2. Elegí tu Rango Militar de Inicio:
              </label>
              <span className="text-[10px] text-amber-400 font-bold uppercase">
                CATEGORÍA: {currentRank.category.toUpperCase()}
              </span>
            </div>

            {/* Accesos rápidos por jerarquía */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {/* Tropa */}
              <button
                type="button"
                onClick={() => {
                  soundFx.playSwitchClick();
                  setChosenRankIndex(0);
                }}
                className={`p-2 rounded border text-left flex flex-col gap-1 transition-all ${
                  rankTier === 'tropa'
                    ? 'bg-amber-950/40 border-amber-500 text-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                    : 'bg-black/40 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <Medal className="w-3.5 h-3.5 text-amber-400" />
                  <span>TROPA</span>
                </div>
                <span className="text-[10px] text-zinc-400 truncate">Conscripto / Marinero</span>
              </button>

              {/* Suboficial */}
              <button
                type="button"
                onClick={() => {
                  soundFx.playSwitchClick();
                  setChosenRankIndex(2); // Sargento / Cabo
                }}
                className={`p-2 rounded border text-left flex flex-col gap-1 transition-all ${
                  rankTier === 'suboficial'
                    ? 'bg-amber-950/40 border-amber-500 text-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                    : 'bg-black/40 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <Crosshair className="w-3.5 h-3.5 text-amber-400" />
                  <span>SUBOFICIAL</span>
                </div>
                <span className="text-[10px] text-zinc-400 truncate">Cabo / Sargento</span>
              </button>

              {/* Oficial */}
              <button
                type="button"
                onClick={() => {
                  soundFx.playSwitchClick();
                  setChosenRankIndex(4); // Teniente / Capitán
                }}
                className={`p-2 rounded border text-left flex flex-col gap-1 transition-all ${
                  rankTier === 'oficial'
                    ? 'bg-amber-950/40 border-amber-500 text-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                    : 'bg-black/40 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <Flag className="w-3.5 h-3.5 text-amber-400" />
                  <span>OFICIAL</span>
                </div>
                <span className="text-[10px] text-zinc-400 truncate">Teniente / Capitán</span>
              </button>

              {/* Alto Mando */}
              <button
                type="button"
                onClick={() => {
                  soundFx.playSwitchClick();
                  setChosenRankIndex(10); // General / Brigadier / Almirante
                }}
                className={`p-2 rounded border text-left flex flex-col gap-1 transition-all ${
                  rankTier === 'alto_mando'
                    ? 'bg-amber-950/40 border-amber-500 text-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                    : 'bg-black/40 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <Award className="w-3.5 h-3.5 text-yellow-400" />
                  <span>ALTO MANDO</span>
                </div>
                <span className="text-[10px] text-zinc-400 truncate">General / Almirante</span>
              </button>
            </div>

            {/* Selector fino del rango exacto */}
            <div className="pt-1">
              <label className="block text-[10px] text-zinc-400 uppercase mb-1">
                Ajustar rango específico del escalafón:
              </label>
              <select
                value={chosenRankIndex}
                onChange={(e) => {
                  soundFx.playSwitchClick();
                  setChosenRankIndex(parseInt(e.target.value, 10));
                }}
                className="w-full px-3 py-2 rounded bg-black/80 border border-amber-500/40 text-amber-300 font-bold focus:outline-none"
              >
                {availableRanks.map((r) => (
                  <option key={r.index} value={r.index} className="bg-zinc-950 text-zinc-200">
                    {r.title.toUpperCase()} ({r.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Caja de Explicación de la Historia del Rango */}
            <div className="p-3 rounded bg-zinc-950/90 border border-[var(--crt-dim,#1f6b30)] space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[var(--crt-accent,#aaffbb)] font-bold">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                <span>HISTORIA Y ROL DE {currentRank.title.toUpperCase()}:</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed italic">
                "{getRankStoryDescription()}"
              </p>
            </div>
          </div>

          {/* Botón de Inicio */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded font-chakra font-bold text-sm sm:text-base uppercase tracking-wider tactical-btn flex items-center justify-center gap-2 border-2 border-[var(--crt-primary,#55ff77)] shadow-[0_0_15px_var(--crt-glow)]"
            >
              <span>JURAR LA BANDERA COMO {currentRank.title.toUpperCase()}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
