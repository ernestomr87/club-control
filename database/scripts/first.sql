-- 1. Enum para niveles (Mejor control que texto libre)
create type player_level as enum (
  'initial_2_2.25', 'initial_2.25_2.5', 'intermediate_2.5_3.0', 
  'intermediate_adv_3.0_3.5', 'advanced_3.5_4.0', 'master_plus_4.0'
);

-- 2. Tabla Base de Perfiles (Extiende auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  birth_date date,
  address jsonb, -- Guardamos {street, zip, city} como JSON
  bank_account text,
  role text default 'student' check (role in ('admin', 'professor', 'student', 'guest')),
  created_at timestamptz default now()
);

-- 3. Tabla Específica de Jugadores (Alumnos/Afiliados)
create table public.player_profiles (
  user_id uuid references public.profiles(id) on delete cascade primary key,
  play_hand text check (play_hand in ('right', 'left')),
  level player_level default 'initial_2_2.25',
  is_affiliate boolean default false,
  affiliation_date date,
  
  -- Campo calculado para cuota (opcional, pero útil para reportes)
  affiliation_fee_year numeric default 35.00
);
