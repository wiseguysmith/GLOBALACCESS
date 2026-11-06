# Turning on the forms with Resend (email)

The Request an Invitation and Contact forms send each submission as an email via
[Resend](https://resend.com). Until the steps below are complete, the forms show an
"opening soon" notice and accept nothing.

## 1. Create a Resend account and API key
1. Sign up at resend.com.
2. **API Keys → Create API key**, with **Sending access** only. Copy the key (it starts with `re_`).

## 2. Verify the sending domain
1. **Domains → Add domain**. Enter `globalaccess.live`.
2. Resend shows the DNS records to add, usually:
   - a **TXT** record for DKIM (`resend._domainkey`)
   - an **MX** record and a **TXT** (SPF) record on the `send` subdomain
3. Add these records where the domain's DNS is managed: Netlify DNS if the nameservers point to
   Netlify, otherwise Namecheap.
4. Click **Verify** in Resend. This usually takes a few minutes, occasionally longer.

These records use the `send.` and `resend._domainkey` subdomains, so they do **not** change the
main `globalaccess.live` MX records used for any inbox such as Google Workspace. Review them
before adding, and leave existing MX records untouched.

## 3. Add environment variables in Netlify
**Site configuration → Environment variables → Add a variable**:

| Key | Example value |
| --- | --- |
| `RESEND_API_KEY` | `re_...` |
| `SUBMISSIONS_NOTIFY_TO` | The inbox that should receive submissions. Comma-separate multiple addresses. |
| `SUBMISSIONS_NOTIFY_FROM` | `GLOBAL <notifications@globalaccess.live>` |

The `from` address must use the verified domain.

## 4. Redeploy
**Deploys → Trigger deploy → Deploy site**. Pages are prebuilt, so the forms switch from
"opening soon" to live only after a new deploy.

## 5. Test
Submit the Contact form on the live site. You should receive an email within a minute, with the
sender's address set as Reply-To so you can answer directly.

### Notes
- Email-only delivery keeps a copy in the inbox but not in a database. You can add Supabase or a
  webhook later (see `.env.example`); every configured destination receives each submission.
- If an email fails to send, the visitor sees an error and is asked to try again. Nothing is
  silently discarded.
