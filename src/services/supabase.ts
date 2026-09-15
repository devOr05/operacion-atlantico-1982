import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { RankingEntry } from '../core/state/gameStore';

// Variables de entorno de Supabase (configurables en .env o en el panel de Vercel)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://wifkmlsyckfmbpzvcazx.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_NESAvC3pdz-OPp7-4Db6uQ_ox-UPMoZ';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

/**
 * Obtiene el contador global real de combatientes alistados desde Supabase
 */
export async function getGlobalCombatientesCount(): Promise<number> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('global_stats')
        .select('enlisted_count')
        .eq('id', 'toas_1982')
        .single();

      if (!error && data && typeof data.enlisted_count === 'number') {
        return data.enlisted_count;
      }
    } catch (e) {
      console.error('Error al consultar contador real en Supabase:', e);
    }
  }

  return 0;
}

/**
 * Incrementa el contador global real en Supabase cuando un nuevo combatiente inicia su campaña
 */
export async function incrementGlobalCombatientes(): Promise<number> {
  if (supabase) {
    try {
      // Usar la función RPC o consultar y sumar 1 directamente en la tabla
      const current = await getGlobalCombatientesCount();
      const next = current + 1;
      
      const { data, error } = await supabase
        .from('global_stats')
        .upsert({ id: 'toas_1982', enlisted_count: next })
        .select('enlisted_count')
        .single();

      if (!error && data) {
        return data.enlisted_count;
      }
      return next;
    } catch (e) {
      console.error('Error incrementando contador real en Supabase:', e);
    }
  }

  return 0;
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
