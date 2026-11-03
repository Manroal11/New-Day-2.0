-- Require a staff account to establish an Auth password before opening /admin.
alter table public.staff_members
  add column if not exists password_set_at timestamptz;

-- Existing Auth users who already have a password stay authorized after rollout.
update public.staff_members as staff
set password_set_at = coalesce(staff.password_set_at, auth_user.updated_at, now())
from auth.users as auth_user
where staff.user_id = auth_user.id
  and coalesce(auth_user.encrypted_password, '') <> ''
  and staff.password_set_at is null;

-- The caller can mark only their own staff row, and only after Supabase Auth
-- has stored a password for that same Auth user. No role fields are writable.
create or replace function public.complete_my_staff_password_setup()
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  updated_rows integer;
begin
  if auth.uid() is null then
    return false;
  end if;

  update public.staff_members as staff
  set password_set_at = now()
  where staff.user_id = auth.uid()
    and exists (
      select 1
      from auth.users as auth_user
      where auth_user.id = auth.uid()
        and coalesce(auth_user.encrypted_password, '') <> ''
    );

  get diagnostics updated_rows = row_count;
  return updated_rows = 1;
end;
$$;

revoke all on function public.complete_my_staff_password_setup() from public, anon;
grant execute on function public.complete_my_staff_password_setup() to authenticated;
