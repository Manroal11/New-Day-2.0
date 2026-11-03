# Staff password setup and recovery

This app supports invited staff password setup and password recovery through Supabase Auth. Public registration remains disabled and unavailable in the app. Recovery requests always show the same success response whether or not Supabase has an account for the submitted email.

## App environment

Add these values to `.env.local` and restart the Next.js server:

```dotenv
APP_BASE_URL=http://localhost:3000
PASSWORD_FLOW_COOKIE_SECRET=<random-secret>
```

Use the deployed site's HTTPS origin for `APP_BASE_URL` in production. Generate a unique secret of at least 32 bytes, for example:

```powershell
node -e "process.stdout.write(require('node:crypto').randomBytes(32).toString('base64url'))"
```

Keep the generated value only in `.env.local` and the hosting provider's server environment settings. Do not prefix it with `NEXT_PUBLIC_`, commit it, or paste it into support requests. The application uses it to sign a short-lived, HttpOnly password-flow cookie after a valid email link is verified. Without this secret, password setup and recovery fail closed.

Apply `supabase/migrations/20261018000000_add_staff_password_setup_state.sql` after the existing staff-membership migration. It marks already-passworded staff as complete, keeps memberships with no Auth password in setup-required state, and adds a narrowly scoped function that marks only the caller's own membership after Supabase Auth has stored a password. `/admin` remains unavailable until that state is set. The function cannot change a staff role.

## Supabase URL configuration

In **Authentication → URL Configuration**:

1. Set **Site URL** to the application origin, without a path (for example `http://localhost:3000` locally, or the production HTTPS origin).
2. Add the callback URL to **Redirect URLs** for each environment. Include the callback with `flow=recovery`, for example:
   - `http://localhost:3000/auth/callback?flow=recovery`
   - `http://127.0.0.1:3000/auth/callback?flow=recovery` if using that host locally
   - `https://your-production-host.example/auth/callback?flow=recovery`
3. If the Dashboard or an email template redirects invitation links through a callback URL, allow that exact callback too. Avoid broad wildcards in production.

Use the same origin in `APP_BASE_URL` and the Dashboard Site URL. Do not use a user-provided redirect parameter; the callback only redirects to fixed application routes.

## Email templates and invitations

The application sends recovery requests from the browser Supabase client with Supabase's PKCE redirect URL pointing to `/auth/callback?flow=recovery`. The browser persists the verifier in a same-origin cookie before requesting the email. The browser and server clients share the same Supabase project-derived storage key and cookie settings, so the callback's server client can read that verifier. Supabase's default Password Recovery template using `{{ .ConfirmationURL }}` is compatible: it verifies the one-time email token at Supabase, then redirects to the allow-listed `redirectTo` URL with the PKCE authorization code. Keep the same browser profile and exact hostname (for example, use `localhost` for both the request and callback); PKCE depends on the verifier cookie.

Email security scanners and link-preview services may open one-time confirmation links before the recipient. If that happens, the link may already be consumed when clicked. Request a new email and open its link promptly from the same browser profile. The callback emits a server-side diagnostic stage and safe Supabase error name/status/code when available; it never logs query values, tokens, cookies, email addresses, passwords, secrets, or raw error messages. Check the terminal running `npm run dev` if the generic invalid-link message appears.

For Dashboard-issued invitations, configure **Authentication → Email Templates → Invite user** to send invitation token hashes directly to the app callback, for example:

```html
<a href="{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&amp;type=invite">
  Accept your New Day staff invitation
</a>
```

Keep `{{ .SiteURL }}` set to the approved application origin. Supabase verifies this one-time invite token through `verifyOtp`; the callback then creates a short-lived signed flow cookie before showing the password form. If the Dashboard provides an invitation redirect URL, use the same app-owned callback and test it with a new invitation after changing the template/settings.

The callback handles both PKCE `code` exchanges and one-time token-hash verification for `invite` and `recovery` types. It ignores arbitrary `next` or redirect destinations. Expired, invalid, or reused links go to a fixed sign-in error page. Tokens are not logged; after the callback exchanges/verifies a link, the browser is redirected to `/admin/reset-password` so the token is removed from the address bar.

## Send an email

- **Recovery:** use `/admin/forgot-password` or, for an existing user, **Authentication → Users → Send password recovery**. To use the app callback, prefer the app form because it supplies the configured PKCE `redirectTo`.
- **Invitation:** use **Authentication → Users → Add user → Send invitation**. Ensure the Invite user template and Site URL above are configured first. After the user is created, add their Auth UUID to `public.staff_members` with the approved role, following [staff-authentication.md](./staff-authentication.md).

Supabase's built-in email sender is rate-limited and intended for evaluation; configure approved SMTP delivery for production. Do not create invitation or recovery links with a service-role key in the browser.

## Verify behavior

1. Visit `/admin/forgot-password`, submit an email, and confirm the same generic success message appears for an unknown address and a real account.
2. Open the email link in the same browser that requested it for PKCE, or open the invitation link in the browser that will complete setup.
3. Confirm the callback moves to `/admin/reset-password` without leaving the one-time link in the address bar.
4. Try a password shorter than 12 characters, a mismatched confirmation, and a valid 12+ character password. The first two must be rejected without calling `updateUser`.
5. After success, follow the provided link. Only users with a valid `staff_members` record can reach `/admin`.
6. Open `/admin/reset-password` directly in a private window, and replay a used link. Both must be rejected.

For a clean recovery test on localhost, restart the development server after confirming `.env.local` has `APP_BASE_URL=http://localhost:3000` and a `PASSWORD_FLOW_COOKIE_SECRET` of at least 32 bytes. Open `http://localhost:3000/admin/forgot-password` in a normal browser window, request a fresh email, then open the newest link in that same browser profile without switching to `127.0.0.1`, another browser, or a different port. The expected path is `/auth/v1/verify` at Supabase → `/auth/callback?flow=recovery&code=…` on localhost → `/admin/reset-password`. Never share or paste the full email link or callback URL because it contains a one-time credential.

Live email delivery and completed password updates require the Dashboard URL/template configuration and a real Supabase account. A local build or route render does not verify Supabase email, callback exchange, or account authorization.
