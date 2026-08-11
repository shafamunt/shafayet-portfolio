# shafayet-portfolio

Portfolio for **Shafayet Muntasir**. Next.js App Router, TypeScript, Tailwind v4, Motion, MDX case studies. Production: **[https://shafam.dev](https://shafam.dev)** (Vercel; also [shafayet-portfolio.vercel.app](https://shafayet-portfolio.vercel.app)).

Same feature set as [faiyajr.dev](https://faiyajr.dev/) (hero rotator, C++ struct card, MDX case studies, etc.) with an engineering-blueprint colour system.

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

1. Push to `main` on GitHub.
2. Import the repo in [Vercel](https://vercel.com) (framework: Next.js).
3. Set env vars from [`.env.example`](.env.example) — at least `NEXT_PUBLIC_SITE_URL=https://shafam.dev` and `CONTACT_TO_EMAIL=shafam@umich.edu`.
4. Add domain `shafam.dev` (+ `www`) in Vercel → Domains and point DNS as instructed.

Contact form needs either `RESEND_API_KEY` or `FORMSPREE_ENDPOINT`; without either, the form validates but the API returns a clear “not configured” error.
