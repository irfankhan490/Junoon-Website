# Deploying Junoon Tea

This project is a static single-page app (Vite + React + React Router) with **no
backend and no environment variables required**. That makes it deployable on any
static host that supports SPA fallback routing.

## Recommended: Cloudflare Pages (free)

1. Push this project to a GitHub repository.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**,
   select the repo.
3. Build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy. Cloudflare Pages reads `public/_redirects` (already included in this
   project) automatically, so client-side routes like `/shop` and `/checkout`
   resolve correctly on refresh/direct link.
5. Add your custom domain under **Custom domains** — Cloudflare issues free SSL
   automatically.

## Alternative: deploy without Git (CLI, still free)

```bash
npm install
npm run build
npx wrangler pages deploy dist --project-name=junoon-tea
```

`wrangler` will prompt you to log in to Cloudflare on first run (opens a browser).

## Alternative hosts

The same `npm run build` → `dist/` folder works on Netlify (drag-and-drop at
app.netlify.com/drop, or connect Git the same way) and GitHub Pages (note: GitHub
Pages has no built-in SPA fallback — either add a redirecting `404.html` or switch
`BrowserRouter` to `HashRouter` in `src/main.jsx` first).

Avoid Vercel's free **Hobby** plan for this site — its terms restrict Hobby to
non-commercial personal projects; a paid Pro plan would be required for a real
business.

## Troubleshooting a failed Cloudflare Pages build

- **Most common cause: Node version.** Vite 5 needs Node 18+. This project now
  pins Node via `.nvmrc` / `.node-version` (both set to `20`) and
  `"engines": { "node": ">=18.0.0" }` in `package.json`, which Cloudflare Pages
  reads automatically. If a build still fails on an old-Node error, set it
  explicitly under **Pages project → Settings → Environment variables** by
  adding `NODE_VERSION` = `20`, then retry the deployment.
- **Framework preset mismatch:** if the preset wasn't set to "Vite", the build
  output directory can end up wrong. Re-check build settings: command
  `npm run build`, output directory `dist`.
- **Read the actual error text** in the failed build's log (Pages project →
  the failed deployment → "View build log") — the first red `ERROR` line
  tells you exactly what failed (missing dependency, syntax error, wrong
  command, etc.) and is the fastest way to pinpoint the real cause if the
  above two don't resolve it.
