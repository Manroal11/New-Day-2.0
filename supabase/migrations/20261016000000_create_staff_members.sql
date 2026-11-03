-- Staff roles are granted by a trusted project administrator through the
-- Supabase SQL Editor. Authenticated users cannot insert or change roles.
create table if not exists public.staff_members (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null check (role in ('admin', 'staff')),
  created_at timestamptz not null default now()
);

alter table public.staff_members enable row level security;

revoke all on table public.staff_members from anon, authenticated;
grant select on table public.staff_members to authenticated;

drop policy if exists "Staff can read their own membership" on public.staff_members;
create policy "Staff can read their own membership"
  on public.staff_members
  for select
  to authenticated
  using ((select auth.uid()) = user_id);


-- There are deliberately no INSERT, UPDATE, or DELETE policies for app users.
