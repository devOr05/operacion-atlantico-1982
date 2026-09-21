import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Plane, 
  Anchor, 
  User, 
  MapPin, 
  ChevronRight,
  Sparkles,
  Radio,
  Users,
  Trophy,
  History,
  Compass
} from 'lucide-react';
import { type MilitaryBranch, ARGENTINE_PROVINCES, RANKS_BY_BRANCH } from '../../core/story/militaryRanks';
import { getRankTierFromIndex, type RankTier } from '../../core/story/campaigns/campaignTypes';
import { HISTORICAL_MISSIONS, type HistoricalMission } from '../../core/story/campaigns/historicalMissions';
import { gameStore } from '../../core/state/gameStore';
import { soundFx } from '../../core/audio/soundEffects';
import { getGlobalCombatientesCount } from '../../services/supabase';

export const CharacterCreator: React.FC = () => {
  // Modo de alistamiento: estándar (campaña completa por escalafón) o misiones históricas reales
  const [enlistMode, setEnlistMode] = useState<'standard' | 'historical'>('standard');
  const [selectedMissionId, setSelectedMissionId] = useState<string>(HISTORICAL_MISSIONS[0].id);

  // Campos para modo estándar
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [province, setProvince] = useState(ARGENTINE_PROVINCES[0]);
  const [branch, setBranch] = useState<MilitaryBranch>('tierra');
  const [chosenRankIndex, setChosenRankIndex] = useState<number>(0);

  // Campos para modo histórico
  const [histCustomName, setHistCustomName] = useState('');
  const [histCustomNickname, setHistCustomNickname] = useState('');

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
    setChosenRankIndex(0);
  };

  const handleStartStandard = (e: React.FormEvent) => {
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

  const handleStartHistorical = (mission: HistoricalMission) => {
    soundFx.playCommandConfirm();
    gameStore.startNewGameWithHistoricalMission(
      mission.id,
      histCustomName.trim() || mission.protagonist,
      histCustomNickname.trim() || mission.nickname
    );
  };

  const availableRanks = RANKS_BY_BRANCH[branch];
  const currentRank = availableRanks[chosenRankIndex] || availableRanks[0];
  const rankTier: RankTier = getRankTierFromIndex(chosenRankIndex);
  const activeMission = HISTORICAL_MISSIONS.find(m => m.id === selectedMissionId) || HISTORICAL_MISSIONS[0];

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
        
        {/* Cabecera */}
        <div className="border-b border-[var(--crt-dim,#1f6b30)] pb-3 flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center mb-2.5">
            <img 
              src="/radar.svg" 
              alt="Logo Héroes del Atlántico 1982" 
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain mx-auto drop-shadow-[0_0_15px_var(--crt-glow)]" 
            />
          </div>
          <h1 className="text-xl sm:text-3xl font-bold font-chakra uppercase text-[var(--crt-primary,#55ff77)] glow-text text-center">
            HÉROES DEL ATLÁNTICO 1982
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5 text-center">
            Simulador Táctico y de Decisiones de la Guerra de Malvinas
          </p>
        </div>

        {/* CONTADOR GLOBAL DE COMBATIENTES EN VIVO (Click para ver Ranking) */}
        <div 
          onClick={() => gameStore.goToRanking()}
          title="Hacé click para ver el Cuadro de Honor y Ranking Global"
          className="flex flex-wrap items-center justify-between gap-2 p-2 rounded bg-black/85 border border-emerald-500/40 shadow-inner cursor-pointer hover:border-emerald-400 hover:bg-emerald-950/20 transition-all group select-none"
        >
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <div className="text-[11px] font-bold text-zinc-300 uppercase tracking-wide group-hover:text-emerald-300 transition-colors">
              ALISTADOS:
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
              <span>RANKING</span>
            </div>
          </div>
        </div>

        {/* SELECTOR DE MODALIDAD DE JUEGO */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
            Modalidad de Alistamiento:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-1.5 bg-black/90 rounded border border-[var(--crt-dim,#1f6b30)]">
            <button
              type="button"
              onClick={() => {
                soundFx.playSwitchClick();
                setEnlistMode('standard');
              }}
              className={`py-2.5 px-3 rounded text-xs sm:text-sm font-chakra font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all ${
                enlistMode === 'standard'
                  ? 'bg-[var(--crt-dim,#1f6b30)] text-[var(--crt-primary,#55ff77)] border border-[var(--crt-primary,#55ff77)] shadow-[0_0_10px_var(--crt-glow)]'
                  : 'text-zinc-400 hover:text-zinc-200 border border-transparent hover:bg-zinc-900/50'
              }`}
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>CAMPAÑA REGULAR</span>
            </button>
            <button
              type="button"
              onClick={() => {
                soundFx.playSwitchClick();
                setEnlistMode('historical');
              }}
              className={`py-2.5 px-3 rounded text-xs sm:text-sm font-chakra font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all ${
                enlistMode === 'historical'
                  ? 'bg-amber-950/80 text-amber-300 border border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                  : 'text-zinc-400 hover:text-zinc-200 border border-transparent hover:bg-zinc-900/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
              <span>MISIONES HISTÓRICAS (1982)</span>
            </button>
          </div>
        </div>

        {/* CONTENIDO SEGÚN MODO SELECCIONADO */}
        {enlistMode === 'historical' ? (
          /* ========================================================= */
          /* MODO MISIONES HISTÓRICAS (OPERACIONES REALES DE MALVINAS) */
          /* ========================================================= */
          <div className="space-y-4 text-xs sm:text-sm">
            
            {/* Explicación de la modalidad */}
            <div className="p-2.5 rounded bg-amber-950/20 border border-amber-500/40 text-xs text-amber-200 flex items-start gap-2">
              <History className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Reviví <b>hitos históricos reales</b> y toma de decisiones tácticas basadas directamente en testimonios en primera persona de veteranos y partes oficiales de combate.
              </p>
            </div>

            {/* Selector de Misión en Cuadrícula */}
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-2">
                Seleccioná una Operación Militar Histórica:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                {HISTORICAL_MISSIONS.map((m) => {
                  const isSelected = m.id === selectedMissionId;
                  return (
                    <div
                      key={m.id}
                      onClick={() => {
                        soundFx.playSwitchClick();
                        setSelectedMissionId(m.id);
                      }}
                      className={`p-2.5 rounded border text-left cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-amber-950/40 border-amber-500 text-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.25)]'
                          : 'bg-black/60 border-[var(--crt-dim,#1f6b30)] text-zinc-400 hover:border-zinc-500 hover:bg-zinc-950'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-base">{m.badge}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold uppercase ${
                          m.difficulty === 'HERÓICA' 
                            ? 'bg-red-950 text-red-300 border border-red-600/50' 
                            : m.difficulty === 'EXTREMA'
                            ? 'bg-amber-950 text-amber-300 border border-amber-600/50'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-600/50'
                        }`}>
                          {m.difficulty}
                        </span>
                      </div>
                      <div className="font-chakra font-bold text-xs sm:text-sm text-zinc-100 uppercase tracking-wide">
                        {m.title}
                      </div>
                      <div className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                        {m.subtitle}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ficha Detallada de la Operación Histórica Seleccionada */}
            <div className="p-3.5 rounded bg-black/85 border border-amber-500/50 space-y-3 shadow-inner">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-500/30 pb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{activeMission.badge}</span>
                    <h2 className="font-chakra font-bold text-base sm:text-lg text-amber-300 uppercase tracking-wider">
                      {activeMission.title}
                    </h2>
                  </div>
                  <p className="text-xs text-zinc-300 mt-0.5">{activeMission.subtitle}</p>
                </div>
                <div className="text-right text-[11px] text-zinc-400">
                  <div className="text-amber-400 font-bold">{activeMission.date}</div>
                  <div className="flex items-center gap-1 justify-end">
                    <MapPin className="w-3 h-3 text-zinc-500" />
                    <span>{activeMission.location}</span>
                  </div>
                </div>
              </div>

              {/* Cita Real del Veterano / Protagonista */}
              <div className="p-2.5 rounded bg-amber-950/20 border-l-2 border-amber-400 text-xs italic text-amber-200">
                "{activeMission.quote}"
                <div className="text-[10px] text-amber-400 font-bold not-italic mt-1 text-right">
                  — {activeMission.quoteAuthor}
                </div>
              </div>

              {/* Briefing de la Misión */}
              <div className="text-xs text-zinc-300 space-y-1">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" />
                  SITUACIÓN BÉLICA:
                </span>
                <p className="leading-relaxed bg-black/60 p-2 rounded border border-zinc-800">
                  {activeMission.briefing}
                </p>
              </div>

              {/* Fila: Combatiente / Personalización */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-zinc-800/80">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                    Combatiente (por defecto: el protagonista real)
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-500 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      placeholder={activeMission.protagonist}
                      value={histCustomName}
                      onChange={(e) => setHistCustomName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded bg-black/70 border border-amber-500/40 text-amber-300 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                    Apodo / Indicativo
                  </label>
                  <input
                    type="text"
                    placeholder={activeMission.nickname || 'El Héroe'}
                    value={histCustomNickname}
                    onChange={(e) => setHistCustomNickname(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-black/70 border border-amber-500/40 text-amber-300 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Botón de Inicio de Misión Histórica */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleStartHistorical(activeMission)}
                  className="w-full py-3 px-4 rounded font-chakra font-bold text-sm sm:text-base uppercase tracking-wider tactical-btn flex items-center justify-center gap-2 border-2 border-amber-500 text-amber-300 hover:bg-amber-500 hover:text-black shadow-[0_0_15px_rgba(245,158,11,0.35)]"
                >
                  <span>INICIAR OPERACIÓN • {activeMission.title.toUpperCase()}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* ========================================================= */
          /* MODO ESTÁNDAR (CAMPAÑA REGULAR POR ESCALAFÓN)             */
          /* ========================================================= */
          <form onSubmit={handleStartStandard} className="space-y-4 text-xs sm:text-sm">
            {/* Fila 1: Nombre y Apodo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Nombre y Apellido
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
                  Apodo / Indicativo
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
                Provincia de Origen
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-zinc-500 absolute left-2.5 top-2.5" />
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded bg-black/70 border border-[var(--crt-dim,#1f6b30)] text-[var(--crt-accent,#aaffbb)] focus:border-[var(--crt-primary,#55ff77)] focus:outline-none"
                >
                  {ARGENTINE_PROVINCES.map((prov) => (
                    <option key={prov} value={prov} className="bg-zinc-950 text-zinc-200">
                      {prov}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Fila 3: Rama de las Fuerzas Armadas */}
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                Fuerza Armada:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleBranchChange('tierra')}
                  className={`p-2.5 rounded border text-center transition-all ${
                    branch === 'tierra'
                      ? 'bg-[var(--crt-dim,#1f6b30)] border-[var(--crt-primary,#55ff77)] text-[var(--crt-primary,#55ff77)] shadow-[0_0_10px_var(--crt-glow)]'
                      : 'bg-black/60 border-[var(--crt-dim,#1f6b30)] text-zinc-400 hover:border-zinc-500'
                  }`}
                >
                  <Shield className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
                  <div className="font-chakra font-bold text-xs uppercase">TIERRA</div>
                  <div className="text-[10px] text-zinc-400">Ejército</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleBranchChange('aire')}
                  className={`p-2.5 rounded border text-center transition-all ${
                    branch === 'aire'
                      ? 'bg-[var(--crt-dim,#1f6b30)] border-[var(--crt-primary,#55ff77)] text-[var(--crt-primary,#55ff77)] shadow-[0_0_10px_var(--crt-glow)]'
                      : 'bg-black/60 border-[var(--crt-dim,#1f6b30)] text-zinc-400 hover:border-zinc-500'
                  }`}
                >
                  <Plane className="w-5 h-5 mx-auto mb-1 text-cyan-400" />
                  <div className="font-chakra font-bold text-xs uppercase">AIRE</div>
                  <div className="text-[10px] text-zinc-400">Fuerza Aérea</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleBranchChange('mar')}
                  className={`p-2.5 rounded border text-center transition-all ${
                    branch === 'mar'
                      ? 'bg-[var(--crt-dim,#1f6b30)] border-[var(--crt-primary,#55ff77)] text-[var(--crt-primary,#55ff77)] shadow-[0_0_10px_var(--crt-glow)]'
                      : 'bg-black/60 border-[var(--crt-dim,#1f6b30)] text-zinc-400 hover:border-zinc-500'
                  }`}
                >
                  <Anchor className="w-5 h-5 mx-auto mb-1 text-blue-400" />
                  <div className="font-chakra font-bold text-xs uppercase">MAR</div>
                  <div className="text-[10px] text-zinc-400">Armada</div>
                </button>
              </div>
            </div>

            {/* Fila 4: Escalafón y Rango */}
            <div className="space-y-2">
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                  Escalafón Militar:
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

              {/* Caja de Explicación del Rango */}
              <div className="p-3 rounded bg-zinc-950/90 border border-[var(--crt-dim,#1f6b30)] space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-[var(--crt-accent,#aaffbb)] font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                  <span>ROL • {currentRank.title.toUpperCase()}:</span>
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
                <span>ENTRAR EN COMBATE • {currentRank.title.toUpperCase()}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
