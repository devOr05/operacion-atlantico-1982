import React from 'react';
import { 
  ShieldAlert, 
  Heart, 
  Crosshair, 
  Users, 
  Flame, 
  Medal, 
  Send, 
  MapPin, 
  Sparkles 
} from 'lucide-react';
import { useGameStore, gameStore, getCurrentCampaign } from '../../core/state/gameStore';
import { RANKS_BY_BRANCH } from '../../core/story/militaryRanks';

export const CoperoCard: React.FC = () => {
  const state = useGameStore();
  const { player, currentStepIndex, lastReaction, lastStatChanges } = state;
  const campaign = getCurrentCampaign(player.branch);
  const currentStep = campaign[currentStepIndex];

  if (!currentStep) return null;

  const currentRank = RANKS_BY_BRANCH[player.branch][player.currentRankIndex];
  const progressPercent = Math.round(((currentStepIndex + 1) / campaign.length) * 100);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 overflow-y-auto font-mono-military select-none">
      <div className="w-full max-w-2xl bg-[#030a05] tactical-border rounded-lg shadow-2xl p-3 sm:p-5 flex flex-col gap-3 border border-[var(--crt-dim,#1f6b30)]">
        
        {/* Ficha del Combatiente al estilo Copero / El Ídolo */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded bg-black/70 border border-[var(--crt-dim,#1f6b30)] text-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base font-chakra text-[var(--crt-accent,#aaffbb)] uppercase">
                {player.name}
              </span>
              <span className="text-[11px] text-yellow-400 font-bold">"{player.nickname}"</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-zinc-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-zinc-500" />
                {player.province}
              </span>
              <span>•</span>
              <span className="text-emerald-400 uppercase font-bold">{player.branch}</span>
            </div>
          </div>

          {/* Rango militar actual con insignia */}
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">RANGO MILITAR:</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-950/40 border border-amber-500/50 text-amber-300 font-bold text-xs">
              <Medal className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
              <span>{currentRank.title.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Barra de Estadísticas estilo Copero */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-xs">
          {/* Coraje */}
          <div className="bg-black/60 p-1.5 rounded border border-[var(--crt-dim,#1f6b30)]/60 flex flex-col">
            <div className="flex items-center justify-between text-[10px] text-zinc-400">
              <span className="flex items-center gap-1"><ShieldAlert className="w-3 h-3 text-red-400" /> CORAJE</span>
              <span className="font-bold text-red-400">{player.stats.coraje}%</span>
            </div>
            <div className="w-full bg-zinc-900 h-1.5 rounded-full mt-1 overflow-hidden">
              <div className="bg-red-500 h-full transition-all" style={{ width: `${player.stats.coraje}%` }} />
            </div>
          </div>

          {/* Salud / Físico */}
          <div className="bg-black/60 p-1.5 rounded border border-[var(--crt-dim,#1f6b30)]/60 flex flex-col">
            <div className="flex items-center justify-between text-[10px] text-zinc-400">
              <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-emerald-400" /> SALUD</span>
              <span className="font-bold text-emerald-400">{player.stats.salud}%</span>
            </div>
            <div className="w-full bg-zinc-900 h-1.5 rounded-full mt-1 overflow-hidden">
              <div className="bg-emerald-500 h-full transition-all" style={{ width: `${player.stats.salud}%` }} />
            </div>
          </div>

          {/* Pericia Militar */}
          <div className="bg-black/60 p-1.5 rounded border border-[var(--crt-dim,#1f6b30)]/60 flex flex-col">
            <div className="flex items-center justify-between text-[10px] text-zinc-400">
              <span className="flex items-center gap-1"><Crosshair className="w-3 h-3 text-sky-400" /> PERICIA</span>
              <span className="font-bold text-sky-400">{player.stats.pericia}%</span>
            </div>
            <div className="w-full bg-zinc-900 h-1.5 rounded-full mt-1 overflow-hidden">
              <div className="bg-sky-500 h-full transition-all" style={{ width: `${player.stats.pericia}%` }} />
            </div>
          </div>

          {/* Liderazgo */}
          <div className="bg-black/60 p-1.5 rounded border border-[var(--crt-dim,#1f6b30)]/60 flex flex-col">
            <div className="flex items-center justify-between text-[10px] text-zinc-400">
              <span className="flex items-center gap-1"><Users className="w-3 h-3 text-amber-400" /> MANDO</span>
              <span className="font-bold text-amber-400">{player.stats.liderazgo}%</span>
            </div>
            <div className="w-full bg-zinc-900 h-1.5 rounded-full mt-1 overflow-hidden">
              <div className="bg-amber-500 h-full transition-all" style={{ width: `${player.stats.liderazgo}%` }} />
            </div>
          </div>

          {/* Impacto en la Guerra (Clave para ganar) */}
          <div className="col-span-2 sm:col-span-1 bg-black/60 p-1.5 rounded border border-[var(--crt-dim,#1f6b30)]/60 flex flex-col">
            <div className="flex items-center justify-between text-[10px] text-zinc-400">
              <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-yellow-400" /> IMPACTO</span>
              <span className="font-bold text-yellow-400">{player.stats.impactoGuerra}%</span>
            </div>
            <div className="w-full bg-zinc-900 h-1.5 rounded-full mt-1 overflow-hidden">
              <div className="bg-yellow-400 h-full transition-all shadow-[0_0_6px_yellow]" style={{ width: `${player.stats.impactoGuerra}%` }} />
            </div>
          </div>
        </div>

        {/* Indicador de Progreso */}
        <div className="flex items-center justify-between text-[10px] text-zinc-500">
          <span>EVENTO {currentStep.stepNumber} DE {campaign.length}</span>
          <span>{currentStep.date} • {currentStep.location}</span>
        </div>
        <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
          <div className="bg-[var(--crt-primary,#55ff77)] h-full transition-all" style={{ width: `${progressPercent}%` }} />
        </div>

        {/* Tarjeta de la Situación Actual */}
        <div className="bg-black/80 p-3 sm:p-4 rounded border border-[var(--crt-dim,#1f6b30)] space-y-2">
          <h2 className="text-sm sm:text-base font-bold font-chakra text-[var(--crt-primary,#55ff77)] uppercase glow-text">
            {currentStep.title}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
            {currentStep.situation}
          </p>

          {/* Feedback inmediato de la decisión previa si existe */}
          {lastReaction && (
            <div className="mt-2 p-2 rounded bg-emerald-950/30 border border-emerald-500/40 text-xs text-emerald-300 space-y-1 animate-fade-in">
              <div className="flex items-center gap-1.5 font-bold text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                CONSECUENCIA INMEDIATA:
              </div>
              <p className="italic">"{lastReaction}"</p>
              {lastStatChanges && (
                <div className="flex flex-wrap gap-2 text-[10px] text-zinc-400 pt-0.5">
                  {Object.entries(lastStatChanges).map(([stat, val]) => (
                    <span key={stat} className={Number(val) > 0 ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                      {stat.toUpperCase()}: {Number(val) > 0 ? `+${val}` : val}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Botones de Elección Rápida estilo Copero */}
        <div className="space-y-2 pt-1">
          <div className="text-[10px] font-bold text-zinc-500 uppercase">
            ¿QUÉ DECISIÓN TOMÁS?
          </div>
          {currentStep.choices.map((choice, idx) => (
            <button
              key={idx}
              onClick={() => gameStore.makeDecision(idx)}
              className="w-full p-2.5 sm:p-3 text-left rounded border tactical-btn flex items-start gap-2.5 text-xs sm:text-sm hover:shadow-[0_0_12px_var(--crt-glow)]"
            >
              <Send className="w-4 h-4 text-[var(--crt-primary,#55ff77)] shrink-0 mt-0.5" />
              <span className="leading-snug">{choice.label}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
