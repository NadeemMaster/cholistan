# 13 — Invite Email Template & URL Configuration (Fix Guide)

> Status: Applies to the **user-invite flow** of Cholistan Tractors (Vercel + Supabase).
> Linked files: [`app/auth/callback/page.tsx`](../app/auth/callback/page.tsx), [`app/api/auth/confirm/route.ts`](../app/api/auth/confirm/route.ts), [`middleware.ts`](../middleware.ts).

## 1. Root cause: `@supabase/ssr` 0.1.0 vs `getAll`/`setAll` API mismatch

The codebase uses the **modern** `@supabase/ssr` cookie API (`getAll`/`setAll`) in the
middleware, server client, and confirm route — but [`package.json`](../package.json)
pinned `@supabase/ssr@^0.1.0`, and semver caret does **not** upgrade `0.x` minors
(`^0.1.0` resolves to exactly `0.1.0`; no lockfile was tracked).

In `@supabase/ssr@0.1.0`, `createServerClient` only understands `cookies.get`/`set`/`remove`.
When we pass `getAll`/`setAll`, that version **silently ignores them** (verified from the
0.1.0 runtime source on unpkg: `if (typeof cookies.get === "function") ... else // nothing`).

Result: even after a successful invite verification (browser session present in
`document.cookie`), the **server could never read or write session cookies**:

- middleware `supabase.auth.getUser()` → always `null`
- `/set-password` is guarded → user bounced to `/login` (no error shown)

**Fix applied (this repo):**

- `@supabase/ssr` upgraded to `^0.12.7`, `@supabase/supabase-js` to `^2.114.0`
- middleware, [`lib/supabase/server.ts`](../lib/supabase/server.ts), and
  [`app/api/auth/confirm/route.ts`](../app/api/auth/confirm/route.ts) updated to the
  current `setAll(cookiesToSet, headers)` signature (including the required
  no-cache response headers)

## 2. Required Supabase URL Configuration

Open **Supabase Dashboard → Authentication → URL Configuration** and set:

| Setting           | Value                                                |
| ----------------- | ---------------------------------------------------- |
| **Site URL**      | `https://cholistantractors.vercel.app`               |
| **Redirect URLs** | `https://cholistantractors.vercel.app/auth/callback` |

> ⚠️ Site URL **must NOT** contain a path or a double slash.
> Wrong value seen earlier: `https://cholistantractors.vercel.app//auth/callback`

## 3. Invite Email Template (HTML)

Use the template below in **Supabase Dashboard → Authentication → Email Templates → Invite user**.

The button links to `{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=invite`
so the callback page can verify the token in the browser.

```html
<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="background-color: #f4f7f6; padding: 40px 20px;"
>
  <tr>
    <td align="center">
      <table
        width="600"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);"
      >
        <!-- Header -->
        <tr>
          <td
            style="background-color: #0f172a; padding: 40px 0; text-align: center;"
          >
            <h1
              style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 1px;"
            >
              CHOLISTAN TRACTORS
            </h1>
          </td>
        </tr>

        <!-- Body Content -->
        <tr>
          <td style="padding: 40px 40px 30px;">
            <h2
              style="color: #1e293b; font-size: 24px; margin-top: 0; margin-bottom: 20px;"
            >
              You've been invited!
            </h2>

            <p
              style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 30px;"
            >
              Hello there,<br /><br />
              You have been exclusively invited to join the
              <strong>Cholistan Tractors</strong> portal. We are excited to have
              you on board! Please click the button below to accept your
              invitation and set up your account.
            </p>

            <!-- Call to Action Button -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center">
                  <a
                    href="{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=invite"
                    style="display: inline-block; padding: 14px 32px; background-color: #10b981; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.5px;"
                  >
                    Accept Invitation
                  </a>
                </td>
              </tr>
            </table>

            <p
              style="color: #94a3b8; font-size: 14px; line-height: 1.5; margin-top: 40px; margin-bottom: 0;"
            >
              If you're having trouble clicking the button, copy and paste the
              following URL into your web browser:<br />
              <a
                href="{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=invite"
                style="color: #3b82f6; word-break: break-all;"
                >{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash
                }}&type=invite</a
              >
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td
            style="background-color: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;"
          >
            <p style="color: #64748b; font-size: 13px; margin: 0;">
              &copy; 2026 Cholistan Tractors. All rights reserved.<br />
              This is an automated message, please do not reply to this email.
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
```

## 4. When inviting users programmatically

If invites are sent from a server (e.g. `supabase.auth.admin.inviteUserByEmail`), pass the
explicit callback so tokens always land on the handler page:

```ts
supabase.auth.admin.inviteUserByEmail(email, {
  redirectTo: `${origin}/auth/callback`,
});
```

This keeps the template's `{{ .SiteURL }}`/`{{ .RedirectTo }}` behaviour predictable.
