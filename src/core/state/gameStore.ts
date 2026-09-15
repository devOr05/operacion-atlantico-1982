import { useSyncExternalStore } from 'react';
import { type MilitaryBranch, RANKS_BY_BRANCH } from '../story/militaryRanks';
import { TIERRA_CAMPAIGN } from '../story/campaigns/tierraCampaign';
import { AIRE_CAMPAIGN } from '../story/campaigns/aireCampaign';
import { MAR_CAMPAIGN } from '../story/campaigns/marCampaign';
import { soundFx } from '../audio/soundEffects';

export interface PlayerStats {
  coraje: number;        // 0-100: Temple bajo fuego
  salud: number;         // 0-100: Resistencia física y frío (letal si llega a 0)
  pericia: number;       // 0-100: Puntería, destreza de vuelo o técnica
  liderazgo: number;     // 0-100: Respeto y moral de compañeros/tropa
  impactoGuerra: number; // 0-100: Impacto estratégico en el conflicto
}

export type GameStage = 'creation' | 'playing' | 'summary';
export type WarOutcome = 
  | 'victoria_total' 
  | 'armisticio_honroso' 
  | 'derrota_historica' 
  | 'caido_en_combate' 
  | 'evacuado_herido' 
  | 'prisionero_guerra' 
  | 'corte_marcial';

export interface DecisionLog {
  title: string;
  choice: string;
  reaction: string;
  date: string;
  rankAtTime: string;
}

export interface PlayerProfile {
  name: string;
  nickname: string;
  province: string;
  branch: MilitaryBranch;
  startLevel: 'primera_linea' | 'alto_mando';
  currentRankIndex: number;
  stats: PlayerStats;
  medals: string[];
  history: DecisionLog[];
}

export interface CoperoGameState {
  stage: GameStage;
  player: PlayerProfile;
  currentStepIndex: number;
  lastReaction: string | null;
  lastStatChanges: Record<string, number> | null;
  warOutcome: WarOutcome | null;
  casualtyReason: string | null;
  crtMode: 'green' | 'amber' | 'cyan';
  scanlinesEnabled: boolean;
  isMuted: boolean;
  dossierOpen: boolean;
}

const DEFAULT_PLAYER: PlayerProfile = {
  name: 'Martín Benítez',
  nickname: 'El Chaqueño',
  province: 'Chaco',
  branch: 'tierra',
  startLevel: 'primera_linea',
  currentRankIndex: 0,
  stats: {
    coraje: 55,
    salud: 50,
    pericia: 50,
    liderazgo: 45,
    impactoGuerra: 5
  },
  medals: [],
  history: []
};

const INITIAL_STATE: CoperoGameState = {
  stage: 'creation',
  player: { ...DEFAULT_PLAYER },
  currentStepIndex: 0,
  lastReaction: null,
  lastStatChanges: null,
  warOutcome: null,
  casualtyReason: null,
  crtMode: 'green',
  scanlinesEnabled: true,
  isMuted: false,
  dossierOpen: false
};

let state: CoperoGameState = { ...INITIAL_STATE };
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

export function getCurrentCampaign(branch: MilitaryBranch) {
  if (branch === 'aire') return AIRE_CAMPAIGN;
  if (branch === 'mar') return MAR_CAMPAIGN;
  return TIERRA_CAMPAIGN;
}

export const gameStore = {
  getState: () => state,
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  startNewGameWithPlayer: (
    name: string,
    nickname: string,
    province: string,
    branch: MilitaryBranch,
    startLevel: 'primera_linea' | 'alto_mando'
  ) => {
    soundFx.playCommandConfirm();
    
    // Si elige Alto Mando, arranca como General de Brigada / Brigadier / Contraalmirante (index 9)
    const initialRankIndex = startLevel === 'alto_mando' ? 9 : 0;
    const initialImpact = startLevel === 'alto_mando' ? 25 : 5;
    const initialLeadership = startLevel === 'alto_mando' ? 75 : 45;

    state = {
      ...state,
      stage: 'playing',
      currentStepIndex: 0,
      lastReaction: null,
      lastStatChanges: null,
      warOutcome: null,
      casualtyReason: null,
      player: {
        name: name.trim() || 'Esteban Gómez',
        nickname: nickname.trim() || 'El Furia',
        province: province || 'Buenos Aires',
        branch,
        startLevel,
        currentRankIndex: initialRankIndex,
        stats: {
          coraje: 55,
          salud: 50, // Salud balanceada, no inflada
          pericia: 50,
          liderazgo: initialLeadership,
          impactoGuerra: initialImpact
        },
        medals: [],
        history: []
      }
    };
    emitChange();
  },

  makeDecision: (choiceIndex: number) => {
    const campaign = getCurrentCampaign(state.player.branch);
    const step = campaign[state.currentStepIndex];
    if (!step) return;

    const choice = step.choices[choiceIndex];
    if (!choice) return;

    // Sonido según el peligro del evento
    if (choice.soundEffect === 'alert') {
      soundFx.playRedAlert();
    } else if (choice.soundEffect === 'radio') {
      soundFx.playRadioBurst();
    } else {
      soundFx.playCommandConfirm();
    }

    // Actualizar estadísticas con límites (0 - 100)
    const newStats: PlayerStats = {
      coraje: Math.max(0, Math.min(100, state.player.stats.coraje + (choice.changes.coraje || 0))),
      salud: Math.max(0, Math.min(100, state.player.stats.salud + (choice.changes.salud || 0))),
      pericia: Math.max(0, Math.min(100, state.player.stats.pericia + (choice.changes.pericia || 0))),
      liderazgo: Math.max(0, Math.min(100, state.player.stats.liderazgo + (choice.changes.liderazgo || 0))),
      impactoGuerra: Math.max(0, Math.min(100, state.player.stats.impactoGuerra + (choice.changes.impactoGuerra || 0)))
    };

    // Ascenso de rango militar si corresponde
    let newRankIndex = state.player.currentRankIndex;
    if (choice.promotedToRankIndex !== undefined && choice.promotedToRankIndex > newRankIndex) {
      newRankIndex = choice.promotedToRankIndex;
    } else if (newStats.coraje >= 80 && newStats.pericia >= 75 && newRankIndex < 10 && Math.random() > 0.5) {
      newRankIndex = Math.min(10, newRankIndex + 1);
    }

    // Nuevas medallas si se ganaron
    const newMedals = [...state.player.medals];
    if (choice.medalAwarded && !newMedals.includes(choice.medalAwarded)) {
      newMedals.push(choice.medalAwarded);
    }

    const currentRank = RANKS_BY_BRANCH[state.player.branch][newRankIndex].title;

    const logEntry: DecisionLog = {
      title: step.title,
      choice: choice.label,
      reaction: choice.reaction,
      date: step.date,
      rankAtTime: currentRank
    };

    const nextStepIndex = state.currentStepIndex + 1;

    // EVALUACIÓN DE CONDICIONES DE FIN DE PARTIDA Y MUERTE INMEDIATA:
    let isGameOver = false;
    let outcome: WarOutcome | null = null;
    let casualtyMsg: string | null = null;

    // 1. Muerte Inmediata por Agotamiento de Salud (en cualquier momento)
    if (newStats.salud <= 0) {
      isGameOver = true;
      outcome = 'caido_en_combate';
      casualtyMsg = (choice as any).fatalText || `Caíste en combate el ${step.date} en ${step.location} como consecuencia directa de las heridas recibidas en la acción.`;
    } 
    // 2. Destitución por Cobardía Extrema
    else if (newStats.coraje <= 10) {
      isGameOver = true;
      outcome = 'corte_marcial';
      casualtyMsg = 'Relevado de tus funciones en el frente por quiebre de disciplina y deserción ante el fuego enemigo.';
    }
    // 3. Fin Natural de la Campaña
    else if (nextStepIndex >= campaign.length) {
      isGameOver = true;
      if (newStats.salud <= 20) {
        outcome = 'evacuado_herido';
      } else if (newStats.impactoGuerra >= 70 && newStats.pericia >= 70) {
        outcome = 'victoria_total'; // Exclusivo y difícil
      } else if (newStats.impactoGuerra >= 45) {
        outcome = 'armisticio_honroso';
      } else if (newStats.liderazgo <= 20) {
        outcome = 'prisionero_guerra';
      } else {
        outcome = 'derrota_historica'; // El final real del 14 de junio si se juega de forma común
      }
    }

    state = {
      ...state,
      currentStepIndex: nextStepIndex,
      lastReaction: choice.reaction,
      lastStatChanges: choice.changes,
      stage: isGameOver ? 'summary' : 'playing',
      warOutcome: outcome,
      casualtyReason: casualtyMsg,
      player: {
        ...state.player,
        currentRankIndex: newRankIndex,
        stats: newStats,
        medals: newMedals,
        history: [...state.player.history, logEntry]
      }
    };

    emitChange();
  },

  restartGame: () => {
    soundFx.playSwitchClick();
    state = { ...INITIAL_STATE, isMuted: soundFx.getIsMuted() };
    emitChange();
  },

  setCrtMode: (mode: 'green' | 'amber' | 'cyan') => {
    soundFx.playSwitchClick();
    state = { ...state, crtMode: mode };
    emitChange();
  },

  toggleScanlines: () => {
    soundFx.playSwitchClick();
    state = { ...state, scanlinesEnabled: !state.scanlinesEnabled };
    emitChange();
  },

  toggleMute: () => {
    const isMuted = soundFx.toggleMute();
    state = { ...state, isMuted };
    emitChange();
  },

  setDossierOpen: (open: boolean) => {
    soundFx.playSwitchClick();
    state = { ...state, dossierOpen: open };
    emitChange();
  }
};

export function useGameStore(): CoperoGameState {
  return useSyncExternalStore(gameStore.subscribe, gameStore.getState);
}
