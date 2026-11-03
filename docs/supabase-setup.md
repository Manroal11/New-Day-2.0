# Supabase setup

This guide describes the environment configuration for the future New Day Supabase integration. No Supabase project, database, staff account, or credentials are created by this repository setup.

## Create a Supabase project

1. Sign in to the Supabase Dashboard and create a project in the organization approved for New Day.
2. Choose the project name, region, database password, and organization settings according to the organization's policies. Store the database password in an approved password manager; it is not an application environment variable for this setup.
3. After the project is ready, open the project's **Connect** dialog or **Settings → API Keys**.

## Find the URL and publishable key

Copy the **Project URL** and the **publishable key** (the key beginning with `sb_publishable_`) from the project dashboard. This app uses only those two values at this stage.

Do not use a service-role key or any secret key in a browser or any variable prefixed with `NEXT_PUBLIC_`. Publishable keys are designed to be visible in browser bundles; database access must be protected by Row Level Security policies before the app uses protected data.

## Configure `.env.local`

1. From the `new-day-v2` project root, copy `.env.example` to `.env.local`.
2. Replace the empty values with the Project URL and publishable key:

   ```dotenv
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_key
   ```

3. Save the file and restart the Next.js development server so it reads the new values.

`.env.local` is ignored by Git. Keep real values in that file only; never commit them, paste them into source files, or include them in screenshots or logs. `.env.example` is intentionally credential-free and can be shared with the project.

## Verify the project connection

The project URL and key can be checked without creating tables or staff accounts by calling Supabase Auth's health endpoint from a terminal. Substitute the values from `.env.local` locally; do not commit them:

```powershell
curl.exe -H "apikey: sb_publishable_your_key" "https://your-project-ref.supabase.co/auth/v1/health"
```

A JSON response containing the Auth service name and version confirms that the URL resolves and the publishable key is accepted. An HTTP error usually means the URL or key was copied incorrectly, or the project is not ready.

## Application integration status

The reusable clients are available under `src/lib/supabase/`:

- `client.ts` creates a browser client with `createBrowserClient`.
- `server.ts` creates a request-scoped server client with `createServerClient` and the asynchronous Next.js `cookies()` API.
- `env.ts` reads and validates the URL and publishable key only when a client is requested. Public routes that do not create a Supabase client continue to work without credentials.

The server client uses the current `getAll`/`setAll` cookie interface. Next.js Server Components cannot write response cookies; cookie write errors are therefore safely ignored there. When authentication is implemented, add the recommended Next.js Proxy session-refresh flow and use server actions or route handlers for cookie writes where needed.

Authentication, staff roles, protected routes, database tables, RLS policies, and Events/News CMS access are later implementation tasks. Do not treat a publishable key as authorization to read or write protected records.
