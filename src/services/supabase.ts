import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { RankingEntry } from '../core/state/gameStore';

// Variables de entorno de Supabase (configurables en .env o en el panel de Vercel)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

const LOCAL_STORAGE_VISITS = 'heroes_1982_combatientes_count';
const BASELINE_COUNT = 1582; // Número base de combatientes movilizados al TOAS

/**
 * Obtiene el contador global de combatientes alistados
 */
export async function getGlobalCombatientesCount(): Promise<number> {
  // 1. Si Supabase está conectado
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('global_stats')
        .select('enlisted_count')
        .eq('id', 'toas_1982')
        .single();

      if (!error && data) {
        localStorage.setItem(LOCAL_STORAGE_VISITS, data.enlisted_count.toString());
        return data.enlisted_count;
      }
    } catch (e) {
      console.warn('Fallo al consultar contador en Supabase, usando respaldo:', e);
    }
  }

  // 2. Intentar contador público en la nube (CounterAPI)
  try {
    const res = await fetch('https://api.counterapi.dev/v1/heroes-atlantico-1982/combatientes');
    if (res.ok) {
      const json = await res.json();
      if (json && typeof json.count === 'number') {
        const total = BASELINE_COUNT + json.count;
        localStorage.setItem(LOCAL_STORAGE_VISITS, total.toString());
        return total;
      }
    }
  } catch {
    // Si no hay red, usar valor guardado
  }

  // 3. Respaldo local
  const saved = localStorage.getItem(LOCAL_STORAGE_VISITS);
  return saved ? parseInt(saved, 10) : BASELINE_COUNT;
}

/**
 * Incrementa el contador global cuando un nuevo combatiente inicia su campaña
 */
export async function incrementGlobalCombatientes(): Promise<number> {
  // 1. Si Supabase está conectado
  if (supabase) {
    try {
      const current = await getGlobalCombatientesCount();
      const next = current + 1;
      await supabase
        .from('global_stats')
        .upsert({ id: 'toas_1982', enlisted_count: next });
      localStorage.setItem(LOCAL_STORAGE_VISITS, next.toString());
      return next;
    } catch (e) {
      console.warn('Error incrementando en Supabase:', e);
    }
  }

  // 2. Incrementar en CounterAPI
  try {
    const res = await fetch('https://api.counterapi.dev/v1/heroes-atlantico-1982/combatientes/up');
    if (res.ok) {
      const json = await res.json();
      if (json && typeof json.count === 'number') {
        const total = BASELINE_COUNT + json.count;
        localStorage.setItem(LOCAL_STORAGE_VISITS, total.toString());
        return total;
      }
    }
  } catch {
    // Silencioso
  }

  // 3. Respaldo local incrementado
  const current = parseInt(localStorage.getItem(LOCAL_STORAGE_VISITS) || `${BASELINE_COUNT}`, 10);
  const updated = current + 1;
  localStorage.setItem(LOCAL_STORAGE_VISITS, updated.toString());
  return updated;
}

/**
 * Consulta las 1000 mejores partidas globales desde Supabase
 */
export async function fetchGlobalRankings(): Promise<RankingEntry[] | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('rankings')
      .select('*')
      .order('score', { ascending: false })
      .limit(1000);

    if (error) {
      console.warn('Error leyendo rankings de Supabase:', error);
      return null;
    }

    return (data || []).map((row: any) => ({
      id: row.id,
      name: row.name,
      nickname: row.nickname,
      province: row.province,
      branch: row.branch,
      rankTitle: row.rank_title,
      warOutcome: row.war_outcome,
      score: row.score,
      medalsCount: row.medals_count || 0,
      date: row.date
    }));
  } catch (e) {
    console.warn('Fallo de conexión con Supabase rankings:', e);
    return null;
  }
}

/**
 * Envía una nueva partida al ranking global en Supabase
 */
export async function submitGlobalRanking(entry: RankingEntry): Promise<boolean> {
  if (!supabase) return false;

  try {
    const { error } = await supabase.from('rankings').insert([
      {
        id: entry.id,
        name: entry.name,
        nickname: entry.nickname,
        province: entry.province,
        branch: entry.branch,
        rank_title: entry.rankTitle,
        war_outcome: entry.warOutcome,
        score: entry.score,
        medals_count: entry.medalsCount,
        date: entry.date
      }
    ]);

    if (error) {
      console.error('Error insertando en Supabase rankings:', error);
      return false;
    }
    return true;
  } catch (e) {
    console.error('Error al contactar Supabase:', e);
    return false;
  }
}
