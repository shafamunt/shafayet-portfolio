# shafayet-portfolio

Portfolio for **Shafayet Muntasir**. Next.js App Router, TypeScript, Tailwind v4, Motion, MDX case studies. Production: **[https://shafam.dev](https://shafam.dev)** on Vercel (also [shafayet-portfolio.vercel.app](https://shafayet-portfolio.vercel.app)). Static preview: [shafam.pages.dev](https://shafam.pages.dev).

Warm oxide / copper visual system — Syne + Outfit, instrument-line background, dark-first.

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |

## Edit content

| What | Where |
| --- | --- |
| Name, bio, socials, hero struct | [`src/lib/site.ts`](src/lib/site.ts) |
| Experience, education, skills | [`src/lib/resume.ts`](src/lib/resume.ts) |
| About interests | [`src/lib/about.ts`](src/lib/about.ts) |
| Projects | [`content/projects/*.mdx`](content/projects/) |
| Resume PDF | [`public/resume/shafayet-muntasir-resume.pdf`](public/resume/shafayet-muntasir-resume.pdf) |

Copy [`content/projects/_TEMPLATE.mdx`](content/projects/_TEMPLATE.mdx) to add a project. `featured: true` puts it on the home page. Cover images (optional) go in `public/images/projects/<slug>/`.

## Deploy

### Vercel (production — `shafam.dev`)

Full Next.js app with contact API, Spotify API, and image optimization.

1. Push to `main` on GitHub (auto-deploys via the linked Vercel project).
2. Env vars (see [`.env.example`](.env.example)): set `NEXT_PUBLIC_SITE_URL=https://shafam.dev` and `CONTACT_TO_EMAIL=shafam@umich.edu` in Vercel → Project → Settings → Environment Variables.
3. Contact form needs either `RESEND_API_KEY` or `FORMSPREE_ENDPOINT`; without either, the form validates but the API returns a clear “not configured” error.

DNS for `shafam.dev` is on Cloudflare (nameservers at Porkbun). Apex and `www` point at Vercel (DNS-only / grey cloud).

### Cloudflare Pages (static preview)

```bash
npm run deploy:pages
```

→ **https://shafam.pages.dev**

Static export only — API routes (`/api/contact`, `/api/spotify`) are not available on Pages.
