# τ0-VLA Research Page

The public research page for **τ0-VLA: a Hierarchical Robot Foundation Model
with World-Model-Guided Test-Time Computation**.

GitHub Pages is the production deployment path. The Vinext, Vite, Cloudflare,
Drizzle, D1, and ChatGPT hosting files remain in the repository as an
alternative scaffold; they are not the source of the production site.

## Repository map

- `app/`: the single published Next.js route, layout, and active stylesheet.
- `public/`: paper PDF, Open Graph image, fonts, figures, and seven MP4 videos.
- `tests/`: static-export, page-content, deployment, and publication-asset gates.
- `.github/workflows/pages.yml`: production GitHub Pages build and deployment.
- `archive/project-page-v1/`: reference-only first-generation page source.
- `worker/`, `db/`, `vite.config.ts`, `.openai/hosting.json`: retained alternative
  Sites/Cloudflare scaffold.

## Local maintenance

Use Node.js 22 or newer and install the exact lockfile:

```bash
npm ci
```

For live edits through the production Next.js path:

```bash
npm run dev:pages
```

For a production-equivalent static preview:

```bash
npm test
npm run preview:local
```

Open `http://127.0.0.1:4173/`. The preview server supports byte-range requests,
so video timelines remain seekable.

Before committing a page update, run:

```bash
npm test
npm run lint
```

Run `npm run build` as an additional compatibility check when changing the
retained Vinext/Cloudflare scaffold or shared dependencies.

## Publication assets

`public/tau0-vla.pdf` is the downloadable paper. It should be replaced only by
a verified build from the current Overleaf paper source. The seven MP4 files in
`public/media/` must each remain below GitHub's 100 MiB per-file limit; the test
suite enforces that constraint.

The public project links are maintained in `app/page.tsx`:

- Code: `https://github.com/sii-research/tau-0-vla`
- Models: `https://huggingface.co/sii-research/tau-0-vla`

No public dataset link is currently claimed.

See `DEPLOY.md` for the established update, verification, deployment, and
revert workflow.
