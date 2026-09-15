import { useSyncExternalStore } from 'react';
import { type MilitaryBranch, RANKS_BY_BRANCH } from '../story/militaryRanks';
import { getTierraCampaignByTier } from '../story/campaigns/tierraCampaign';
import { getAireCampaignByTier } from '../story/campaigns/aireCampaign';
import { getMarCampaignByTier } from '../story/campaigns/marCampaign';
import { getRankTierFromIndex } from '../story/campaigns/campaignTypes';
import { submitGlobalRanking, incrementGlobalCombatientes } from '../../services/supabase';
import { soundFx } from '../audio/soundEffects';

export interface PlayerStats {
  coraje: number;        // 0-100: Temple bajo fuego
  salud: number;         // 0-100: Resistencia física y frío (letal si llega a 0)
  pericia: number;       // 0-100: Puntería, destreza de vuelo o técnica
  liderazgo: number;     // 0-100: Respeto y moral de compañeros/tropa
  impactoGuerra: number; // 0-100: Impacto estratégico en el conflicto
}

export type GameStage = 'creation' | 'playing' | 'summary' | 'ranking';
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
  initialRankIndex: number;
  currentRankIndex: number;
  stats: PlayerStats;
  medals: string[];
  history: DecisionLog[];
}

export interface RankingEntry {
  id: string;
  name: string;
  nickname: string;
  province: string;
  branch: MilitaryBranch;
  rankTitle: string;
  warOutcome: WarOutcome;
  score: number;
  medalsCount: number;
  date: string;
}

const RANKING_STORAGE_KEY = 'heroes_atlantico_1982_rankings';

export function getRankings(): RankingEntry[] {
  try {
    const raw = localStorage.getItem(RANKING_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return [
    {
      id: 'legend-1',
      name: 'Roberto Curilovic',
      nickname: 'Vasco',
      province: 'Buenos Aires',
      branch: 'mar',
      rankTitle: 'Capitán de Navío',
      warOutcome: 'victoria_total',
      score: 285,
      medalsCount: 3,
      date: '25/05/1982'
    },
    {
      id: 'legend-2',
      name: 'Juan Domingo Baldini',
      nickname: 'Cóndor-7',
      province: 'Buenos Aires',
      branch: 'tierra',
      rankTitle: 'Teniente Primero',
      warOutcome: 'caido_en_combate',
      score: 260,
      medalsCount: 2,
      date: '11/06/1982'
    },
    {
      id: 'legend-3',
      name: 'Owen Crippa',
      nickname: 'Lechuza',
      province: 'Santa Fe',
      branch: 'aire',
      rankTitle: 'Capitán de Caza',
      warOutcome: 'armisticio_honroso',
      score: 245,
      medalsCount: 2,
      date: '21/05/1982'
    }
  ];
}

export function saveRankingEntry(entry: RankingEntry) {
  try {
    const list = getRankings();
    // Reemplazar si existe el mismo ID
    const filtered = list.filter(r => r.id !== entry.id);
    filtered.push(entry);
    filtered.sort((a, b) => b.score - a.score);
    localStorage.setItem(RANKING_STORAGE_KEY, JSON.stringify(filtered.slice(0, 50)));
  } catch (e) {
    console.error(e);
  }

  // Enviar a Supabase / backend global en segundo plano
  submitGlobalRanking(entry).catch(err => {
    console.warn('Sync global ranking error:', err);
  });
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
  mapModalOpen: boolean;
}

const DEFAULT_PLAYER: PlayerProfile = {
  name: 'Martín Benítez',
  nickname: 'El Chaqueño',
  province: 'Chaco',
  branch: 'tierra',
  startLevel: 'primera_linea',
  initialRankIndex: 0,
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
  dossierOpen: false,
  mapModalOpen: false
};

let state: CoperoGameState = { ...INITIAL_STATE };
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

export function getCurrentCampaign(branch: MilitaryBranch, rankIndex: number = 0) {
  const tier = getRankTierFromIndex(rankIndex);
  if (branch === 'aire') return getAireCampaignByTier(tier);
  if (branch === 'mar') return getMarCampaignByTier(tier);
  return getTierraCampaignByTier(tier);
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
    chosenRankIndex: number = 0
  ) => {
    soundFx.playCommandConfirm();
    // Incrementar en segundo plano el contador global de combatientes alistados
    incrementGlobalCombatientes().catch(() => {});
    
    const initialRankIndex = Math.max(0, Math.min(10, chosenRankIndex));
    const tier = getRankTierFromIndex(initialRankIndex);

    let initialLeadership = 45;
    let initialImpact = 5;
    let initialPericia = 50;

    if (tier === 'alto_mando') {
      initialLeadership = 80;
      initialImpact = 30;
      initialPericia = 65;
    } else if (tier === 'oficial') {
      initialLeadership = 65;
      initialImpact = 15;
      initialPericia = 60;
    } else if (tier === 'suboficial') {
      initialLeadership = 55;
      initialImpact = 10;
      initialPericia = 55;
    }

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
        startLevel: tier === 'alto_mando' ? 'alto_mando' : 'primera_linea',
        initialRankIndex,
        currentRankIndex: initialRankIndex,
        stats: {
          coraje: 55,
          salud: 50,
          pericia: initialPericia,
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
    const campaign = getCurrentCampaign(state.player.branch, state.player.initialRankIndex);
    const step = campaign[state.currentStepIndex];
    if (!step) return;

    const choice = step.choices[choiceIndex];
    if (!choice) return;

    if (choice.soundEffect === 'alert') {
      soundFx.playRedAlert();
    } else if (choice.soundEffect === 'radio') {
      soundFx.playRadioBurst();
    } else {
      soundFx.playCommandConfirm();
    }

    const newStats: PlayerStats = {
      coraje: Math.max(0, Math.min(100, state.player.stats.coraje + (choice.changes.coraje || 0))),
      salud: Math.max(0, Math.min(100, state.player.stats.salud + (choice.changes.salud || 0))),
      pericia: Math.max(0, Math.min(100, state.player.stats.pericia + (choice.changes.pericia || 0))),
      liderazgo: Math.max(0, Math.min(100, state.player.stats.liderazgo + (choice.changes.liderazgo || 0))),
      impactoGuerra: Math.max(0, Math.min(100, state.player.stats.impactoGuerra + (choice.changes.impactoGuerra || 0)))
    };

    let newRankIndex = state.player.currentRankIndex;
    if (choice.promotedToRankIndex !== undefined && choice.promotedToRankIndex > newRankIndex) {
      newRankIndex = choice.promotedToRankIndex;
    } else if (newStats.coraje >= 80 && newStats.pericia >= 75 && newRankIndex < 10 && Math.random() > 0.5) {
      newRankIndex = Math.min(10, newRankIndex + 1);
    }

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

    let isGameOver = false;
    let outcome: WarOutcome | null = null;
    let casualtyMsg: string | null = null;

    if (newStats.salud <= 0) {
      isGameOver = true;
      outcome = 'caido_en_combate';
      casualtyMsg = (choice as any).fatalText || `Caíste en combate el ${step.date} en ${step.location} como consecuencia directa de las heridas recibidas en la acción.`;
    } else if (newStats.coraje <= 10) {
      isGameOver = true;
      outcome = 'corte_marcial';
      casualtyMsg = 'Relevado de tus funciones en el frente por quiebre de disciplina y deserción ante el fuego enemigo.';
    } else if (nextStepIndex >= campaign.length) {
      isGameOver = true;
      if (newStats.salud <= 20) {
        outcome = 'evacuado_herido';
      } else if (newStats.impactoGuerra >= 70 && newStats.pericia >= 70) {
        outcome = 'victoria_total';
      } else if (newStats.impactoGuerra >= 45) {
        outcome = 'armisticio_honroso';
      } else if (newStats.liderazgo <= 20) {
        outcome = 'prisionero_guerra';
      } else {
        outcome = 'derrota_historica';
      }
    }

    // Si terminó la partida, guardar en ranking
    if (isGameOver && outcome) {
      const totalScore = newStats.coraje + newStats.salud + newStats.pericia + newStats.liderazgo + (newStats.impactoGuerra * 2);
      saveRankingEntry({
        id: `run-${Date.now()}`,
        name: state.player.name,
        nickname: state.player.nickname,
        province: state.player.province,
        branch: state.player.branch,
        rankTitle: currentRank,
        warOutcome: outcome,
        score: totalScore,
        medalsCount: newMedals.length,
        date: new Date().toLocaleDateString('es-AR')
      });
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

  goToRanking: () => {
    soundFx.playCommandConfirm();
    state = { ...state, stage: 'ranking' };
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
  },

  setMapModalOpen: (open: boolean) => {
    soundFx.playSwitchClick();
    state = { ...state, mapModalOpen: open };
    emitChange();
  }
};

export function useGameStore(): CoperoGameState {
  return useSyncExternalStore(gameStore.subscribe, gameStore.getState);
}
