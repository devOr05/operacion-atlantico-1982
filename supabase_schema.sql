-- =========================================================
-- ESQUEMA DE BASE DE DATOS PARA "HÉROES DEL ATLÁNTICO 1982"
-- Ejecutar este script en el Editor SQL de tu proyecto Supabase
-- =========================================================

-- 1. Tabla del Ranking Global
create table if not exists public.rankings (
  id text primary key,
  name text not null,
  nickname text not null,
  province text not null,
  branch text not null,
  rank_title text not null,
  war_outcome text not null,
  score integer not null,
  medals_count integer default 0,
  date text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Habilitar Row Level Security (RLS)
alter table public.rankings enable row level security;

-- Permitir lectura y guardado a cualquier jugador sin necesidad de registro
create policy "Lectura pública de ranking"
  on public.rankings for select
  using (true);

create policy "Inserción pública de partidas"
  on public.rankings for insert
  with check (true);

-- 2. Tabla del Contador Global de Combatientes
create table if not exists public.global_stats (
  id text primary key,
  enlisted_count integer default 1582
);

-- Insertar valor inicial
insert into public.global_stats (id, enlisted_count)
values ('toas_1982', 1582)
on conflict (id) do nothing;

alter table public.global_stats enable row level security;

create policy "Lectura pública de estadísticas"
  on public.global_stats for select
  using (true);

create policy "Actualización pública de estadísticas"
  on public.global_stats for all
  using (true)
  with check (true);
