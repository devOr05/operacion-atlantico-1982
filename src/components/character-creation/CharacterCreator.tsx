import React, { useState } from 'react';
import { 
  Shield, 
  Plane, 
  Anchor, 
  User, 
  MapPin, 
  Medal, 
  Award, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { type MilitaryBranch, ARGENTINE_PROVINCES } from '../../core/story/militaryRanks';
import { gameStore } from '../../core/state/gameStore';
import { soundFx } from '../../core/audio/soundEffects';

export const CharacterCreator: React.FC = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [province, setProvince] = useState(ARGENTINE_PROVINCES[0]);
  const [branch, setBranch] = useState<MilitaryBranch>('tierra');
  const [startLevel, setStartLevel] = useState<'primera_linea' | 'alto_mando'>('primera_linea');

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playCommandConfirm();
    gameStore.startNewGameWithPlayer(
      name || 'Esteban Gómez',
      nickname || 'El Furia',
      province,
      branch,
      startLevel
    );
  };

  return (
    <div className="flex-1 flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-mono-military select-none">
      <div className="w-full max-w-2xl bg-[#030905] tactical-border rounded-lg shadow-2xl p-4 sm:p-6 space-y-5 border-2 border-[var(--crt-dim,#1f6b30)]">
        {/* Cabecera estilo Libreta de Enrolamiento 1982 */}
        <div className="border-b border-[var(--crt-dim,#1f6b30)] pb-3 text-center space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-zinc-950 border border-[var(--crt-dim,#1f6b30)] text-[10px] text-[var(--crt-accent,#aaffbb)] uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-yellow-400" />
            SIMULADOR DE CARRERA MILITAR Y DECISIONES 1982
          </div>
          <h1 className="text-lg sm:text-2xl font-bold font-chakra uppercase text-[var(--crt-primary,#55ff77)] glow-text">
            FORJÁ TU PROPIA LEYENDA EN MALVINAS
          </h1>
          <p className="text-xs text-[var(--crt-dim,#1f6b30)]">
            CREÁ A TU COMBATIENTE, ELEGÍ TU FUERZA Y DEFINÍ EL DESTINO DE LA GUERRA
          </p>
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
                Apodo o Indicativo:
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
              Elegí tu Fuerza Armada:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {/* Tierra */}
              <button
                type="button"
                onClick={() => {
                  soundFx.playSwitchClick();
                  setBranch('tierra');
                }}
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
                  Infantería en los montes, pozos de zorro en Longdon y choques nocturnos a bayoneta.
                </p>
              </button>

              {/* Aire */}
              <button
                type="button"
                onClick={() => {
                  soundFx.playSwitchClick();
                  setBranch('aire');
                }}
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
                  Cazas A-4 Skyhawk a 15m del agua, reabastecimiento en vuelo y Bomb Alley.
                </p>
              </button>

              {/* Mar */}
              <button
                type="button"
                onClick={() => {
                  soundFx.playSwitchClick();
                  setBranch('mar');
                }}
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
                  Super Étendard con Exocet, cacería de portaaviones y la Flota de Mar.
                </p>
              </button>
            </div>
          </div>

          {/* Fila 4: Nivel de Escalafón Inicial */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-2">
              Nivel de Mando Inicial:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  soundFx.playSwitchClick();
                  setStartLevel('primera_linea');
                }}
                className={`p-3 rounded border text-left flex items-start gap-2.5 transition-all ${
                  startLevel === 'primera_linea'
                    ? 'bg-zinc-900 border-[var(--crt-primary,#55ff77)] text-[var(--crt-accent,#aaffbb)]'
                    : 'bg-black/40 border-zinc-800 text-zinc-500'
                }`}
              >
                <Medal className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs">PRIMERA LÍNEA (Conscripto / Piloto)</div>
                  <div className="text-[10px] text-zinc-400">
                    Arrancás en el combate crudo y ganás ascensos en el campo de batalla según tu coraje.
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFx.playSwitchClick();
                  setStartLevel('alto_mando');
                }}
                className={`p-3 rounded border text-left flex items-start gap-2.5 transition-all ${
                  startLevel === 'alto_mando'
                    ? 'bg-zinc-900 border-[var(--crt-primary,#55ff77)] text-[var(--crt-accent,#aaffbb)]'
                    : 'bg-black/40 border-zinc-800 text-zinc-500'
                }`}
              >
                <Award className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs">ALTO MANDO (General / Brigadier / Almirante)</div>
                  <div className="text-[10px] text-zinc-400">
                    Iniciás con el rango máximo al frente de la estrategia general para ganar la guerra.
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Botón de Inicio */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded font-chakra font-bold text-sm sm:text-base uppercase tracking-wider tactical-btn flex items-center justify-center gap-2 border-2 border-[var(--crt-primary,#55ff77)] shadow-[0_0_15px_var(--crt-glow)]"
            >
              <span>JURAR LA BANDERA E INICIAR CAMPAÑA 1982</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
