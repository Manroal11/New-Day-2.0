# Staff authentication and access setup

The admin sign-in uses Supabase Auth email/password sessions stored in SSR cookies. A valid Auth session alone does not provide dashboard access: the signed-in user's UUID must also have a row in `public.staff_members` with role `admin` or `staff`. There is no public registration route and no app-side role assignment flow.

## 1. Apply the migration

In the Supabase Dashboard for the New Day project, open **SQL Editor**, create a query, paste the contents of `supabase/migrations/20261016000000_create_staff_members.sql`, and run it using the project's trusted database owner context. Then run `supabase/migrations/20261018000000_add_staff_password_setup_state.sql` the same way. Confirm `public.staff_members` exists and RLS is enabled in the Table Editor.

The migrations allow authenticated users to select only their own membership row. They grant no application-user insert, update, or delete path. The password setup function can update only the caller's password setup timestamp after Supabase Auth has stored a password; it cannot assign or change a role. Role assignments are performed only by a trusted project administrator through the Supabase Dashboard/SQL Editor.

## 2. Disable public sign-ups

In the Supabase Dashboard, open **Authentication → Sign In / Providers → Email** and turn off **Allow new users to sign up** (the exact section label may vary slightly as the Dashboard evolves). Save the setting. Existing invited users can still sign in. Do not add a public sign-up form to this application.

## 3. Create the first staff account

1. In **Authentication → Users**, choose **Add user → Send invitation**.
2. Enter the staff member's approved work email and send the invitation.
3. The staff member should accept the invitation and finish setting a password using the Supabase email link.
4. In **Authentication → Users**, copy that user's UUID.
5. In **SQL Editor**, grant the initial administrator role by replacing the placeholder with that UUID:

   ```sql
   insert into public.staff_members (user_id, role)
   values ('<AUTH_USER_UUID>'::uuid, 'admin');
   ```

Run this as a trusted project administrator. Never grant a role based on a value submitted by a browser, user metadata, or a user-editable profile. The app has no role-changing operation.

To add another authorized staff member, invite that person through the Dashboard and insert their Auth UUID with role `'staff'`. Grant `'admin'` only to people explicitly approved for that role. To revoke dashboard access, delete the corresponding membership row; the app checks the membership on each protected request.

Inviting users and granting roles are privileged Dashboard operations. This application intentionally does not store a service-role/secret key and never exposes one to browser code.

## 4. Test access

- Before migration, `/admin` fails closed and shows a setup/access error through the sign-in page.
- A signed-out visitor to `/admin` is redirected to `/admin/login`.
- A valid invited Auth user without a membership row is denied and signed out.
- A user with an `admin` or `staff` membership and a completed password can open `/admin`; the dashboard displays the stored role. A membership with no password remains blocked until setup is complete.
- Sign out, then try a known non-staff Auth user to confirm denial. Do not use an administrator's credentials for this test.

Use a real invited test account and the applied migration to verify successful authorization. A successful build alone does not verify Supabase authentication or database policies.

## Session and cookie handling

`src/proxy.ts` uses the Next.js 16 Proxy convention and Supabase `auth.getClaims()` to refresh and validate cookie-backed sessions on admin routes. The dashboard independently calls `auth.getUser()` and performs an RLS-protected membership lookup on the server. Proxy redirects/session state are not used as the authorization boundary. Cookies use `SameSite=Lax`, root path, and `Secure` in production; browser access is required by the Supabase SSR client, so cookies are not marked `HttpOnly`.

Password setup and recovery have separate instructions in [password-setup-and-recovery.md](./password-setup-and-recovery.md). They require an app-owned callback allowlist and a server-only `PASSWORD_FLOW_COOKIE_SECRET`.

Keep `.env.local` private and Git-ignored. The application uses only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`; do not add a `service_role` or `sb_secret_` key to app environment variables.
