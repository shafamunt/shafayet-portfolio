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

### Cloudflare Pages (free short URL)

Same method as [tajulharamain.pages.dev](https://tajulharamain.pages.dev):

```bash
npm run deploy:pages
```

→ **https://shafam.pages.dev**

That is a free `*.pages.dev` subdomain (Cloudflare Pages), not a purchased `shafam.dev` domain.

### Vercel (full app: contact API, etc.)

1. Push to `main` on GitHub.
2. Import the repo in [Vercel](https://vercel.com) (framework: Next.js).
3. Set env vars from [`.env.example`](.env.example) — at least `NEXT_PUBLIC_SITE_URL=https://shafam.pages.dev` (or your custom domain) and `CONTACT_TO_EMAIL=shafam@umich.edu`.
4. Optional: buy a real `.dev` apex (`shafam.dev`) and attach DNS in Vercel/Cloudflare.

Contact form needs either `RESEND_API_KEY` or `FORMSPREE_ENDPOINT`; without either, the form validates but the API returns a clear “not configured” error.
