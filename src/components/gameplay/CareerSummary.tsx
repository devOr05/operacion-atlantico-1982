import React from 'react';
import { 
  Medal, 
  Award, 
  RotateCcw, 
  MapPin 
} from 'lucide-react';
import { useGameStore, gameStore } from '../../core/state/gameStore';
import { RANKS_BY_BRANCH } from '../../core/story/militaryRanks';

export const CareerSummary: React.FC = () => {
  const { player, warOutcome } = useGameStore();
  const currentRank = RANKS_BY_BRANCH[player.branch][player.currentRankIndex];

  let title = 'DEFENSA CON HONOR';
  let description = 'Luchaste con honor y temple hasta agotar los últimos recursos en las islas.';

  if (warOutcome === 'victoria_total') {
    title = '🏆 ¡VICTORIA TOTAL EN LA GUERRA! 🏆';
    description = 'Tus decisiones estratégicas y tu coraje en combate infligieron daños críticos a la Fuerza de Tareas británica. Gran Bretaña se vio obligada a retirar la flota y aceptar una resolución vinculante en la ONU con reconocimiento de la soberanía argentina.';
  } else if (warOutcome === 'armisticio_honroso') {
    title = '🎖️ ARMISTICIO CON HONOR Y HEROÍSMO 🎖️';
    description = 'La tenacidad de tus operaciones quebró la voluntad ofensiva enemiga y forzó un cese del fuego negociado ante el Consejo de Seguridad, salvaguardando la vida de los combatientes y sentando un precedente imborrable.';
  } else if (warOutcome === 'caido_en_combate') {
    title = '⚰️ GLORIA ETERNA: CAÍDO EN COMBATE';
    description = 'Entregaste tu vida por la patria y por tus camaradas en el cumplimiento del deber. Tu nombre ha quedado grabado en letras de bronce en el Cenotafio de Malvinas y en la memoria del pueblo argentino.';
  }

  return (
    <div className="flex-1 flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-mono-military select-none">
      <div className="w-full max-w-2xl bg-[#030905] tactical-border rounded-lg shadow-2xl p-4 sm:p-6 space-y-5 border-2 border-[var(--crt-dim,#1f6b30)]">
        
        {/* Cabecera de la Credencial */}
        <div className="text-center border-b border-[var(--crt-dim,#1f6b30)] pb-3 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded bg-black border border-[var(--crt-dim,#1f6b30)] text-[11px] text-[var(--crt-accent,#aaffbb)] uppercase tracking-wider">
            ESTADO MAYOR CONJUNTO • HOJA DE SERVICIOS 1982
          </div>
          <h1 className="text-lg sm:text-2xl font-bold font-chakra uppercase text-[var(--crt-primary,#55ff77)] glow-text">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl mx-auto">
            {description}
          </p>
        </div>

        {/* Tarjeta de Identidad Militar estilo Copero */}
        <div className="bg-black/70 p-4 rounded border border-[var(--crt-dim,#1f6b30)] space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--crt-dim,#1f6b30)]/60 pb-3">
            <div>
              <div className="text-xs text-zinc-500 uppercase">COMBATIENTE:</div>
              <div className="text-base sm:text-xl font-bold font-chakra text-[var(--crt-accent,#aaffbb)]">
                {player.name} <span className="text-yellow-400 font-bold">"{player.nickname}"</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  {player.province}
                </span>
                <span>•</span>
                <span className="text-emerald-400 font-bold uppercase">{player.branch}</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-zinc-500 uppercase">MÁXIMO RANGO ALCANZADO:</div>
              <div className="px-3 py-1 rounded bg-amber-950/60 border border-amber-500 text-amber-300 font-bold text-sm sm:text-base inline-flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-400" />
                {currentRank.title.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Estadísticas Finales */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
            <div className="bg-zinc-950 p-2 rounded border border-zinc-800">
              <span className="text-zinc-500 block text-[10px]">CORAJE:</span>
              <span className="text-base font-bold text-red-400">{player.stats.coraje}%</span>
            </div>
            <div className="bg-zinc-950 p-2 rounded border border-zinc-800">
              <span className="text-zinc-500 block text-[10px]">SALUD / FÍSICO:</span>
              <span className="text-base font-bold text-emerald-400">{player.stats.salud}%</span>
            </div>
            <div className="bg-zinc-950 p-2 rounded border border-zinc-800">
              <span className="text-zinc-500 block text-[10px]">PERICIA:</span>
              <span className="text-base font-bold text-sky-400">{player.stats.pericia}%</span>
            </div>
            <div className="bg-zinc-950 p-2 rounded border border-zinc-800">
              <span className="text-zinc-500 block text-[10px]">IMPACTO BÉLICO:</span>
              <span className="text-base font-bold text-yellow-400">{player.stats.impactoGuerra}%</span>
            </div>
          </div>

          {/* Medallas y Condecoraciones */}
          {player.medals.length > 0 && (
            <div className="pt-2 border-t border-[var(--crt-dim,#1f6b30)]/40">
              <div className="text-[11px] font-bold text-zinc-400 uppercase mb-1.5 flex items-center gap-1.5">
                <Medal className="w-3.5 h-3.5 text-yellow-400" />
                CONDECORACIONES OBTENIDAS:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {player.medals.map((m, idx) => (
                  <span 
                    key={idx} 
                    className="px-2 py-0.5 rounded bg-yellow-950/40 border border-yellow-500/40 text-yellow-300 text-[11px] font-bold"
                  >
                    ★ {m}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Historial de Hazañas en la Campaña */}
          <div className="pt-2 border-t border-[var(--crt-dim,#1f6b30)]/40 max-h-48 overflow-y-auto space-y-1.5 pr-1">
            <div className="text-[11px] font-bold text-zinc-500 uppercase mb-1">
              REGISTRO DE DECISIONES EN LAS ISLAS ({player.history.length}):
            </div>
            {player.history.map((h, i) => (
              <div key={i} className="text-[11px] bg-black/40 p-1.5 rounded border border-zinc-800 text-zinc-300">
                <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-0.5">
                  <span className="font-bold text-[var(--crt-accent,#aaffbb)]">{h.title}</span>
                  <span>{h.date}</span>
                </div>
                <div className="text-zinc-400">Orden: "{h.choice}"</div>
                <div className="text-emerald-400/90 italic">› {h.reaction}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Botón para Reiniciar y Jugar con otra Fuerza / Rango */}
        <div className="pt-2">
          <button
            onClick={() => gameStore.restartGame()}
            className="w-full py-3 px-4 rounded font-chakra font-bold text-sm sm:text-base uppercase tracking-wider tactical-btn flex items-center justify-center gap-2 border-2 border-[var(--crt-primary,#55ff77)] shadow-[0_0_15px_var(--crt-glow)]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>JUGAR OTRA CARRERA CON OTRA FUERZA Y OTRO RANGO</span>
          </button>
        </div>

      </div>
    </div>
  );
};
