# τ0-VLA Project Page Maintenance Design

## Goal

Establish the MacBook Pro as the reproducible maintenance environment for the
τ0-VLA project page, remove stale migration assumptions, reduce active styling
risk, correct publication metadata, and preserve both the GitHub Pages
production path and the unused Sites/Cloudflare scaffold.

## Confirmed decisions

- Use repository-local Git identity `tauteamhq` with email
  `tauteamhq@users.noreply.github.com` in both the website and paper
  repositories.
- Keep the Vinext, Cloudflare, Drizzle, D1, Worker, and ChatGPT-auth scaffold.
- GitHub Pages remains the production deployment target.
- Do not push, deploy, or merge during this maintenance pass. Present verified
  local changes for review first.
- Keep the published site free of Agibot/Finch branding. References inside the
  linked paper remain part of the paper and are not website branding.

## Baseline

- Website baseline: `main` at `6ca079f`, plus local infrastructure commit
  `901c1fa` adding `/.worktrees/` to `.gitignore`.
- Maintenance branch: `codex/project-page-maintenance` in an isolated worktree.
- Paper baseline: `master` at `9f4d78a`.
- A clean `npm ci` followed by `npm test` succeeds on Node.js `24.19.0`:
  static export succeeds and all three existing tests pass.
- The initial dependency audit reports 21 advisories: 1 low, 4 moderate, and
  16 high. They include the direct Next.js production dependency and several
  retained Sites/Cloudflare development dependencies.

## Architecture and maintenance paths

The published site is a single Next.js App Router route. `app/page.tsx` owns
all narrative content and media mappings, `app/layout.tsx` owns public metadata
and Google Analytics, and `app/globals.css` owns the active visual system.
`next.config.ts` performs a static export into `out/`. A push to `main` runs the
GitHub Actions Pages workflow, which installs from `package-lock.json`, builds
the static export, uploads `out/`, and deploys it.

The Sites/Cloudflare path remains available through `vite.config.ts`,
`worker/`, `db/`, `.openai/hosting.json`, and the Vinext/Cloudflare scripts.
Documentation and script names must make clear that this is a retained
alternative path, not the current production path.

## Planned changes

### 1. Reproducible repository setup

- Retain repository-local `tauteamhq` identity in both repositories.
- Document Node.js 22+ and use `npm ci` for reproducible installation.
- Add an explicit Next.js local-development script while retaining the
  existing Sites/Vinext scripts.
- Document the exact GitHub Pages and optional Sites/Cloudflare commands.
- Record that Overleaf authentication must be established in the Pro keychain
  and verify it read-only before any paper push.

### 2. Content and publication consistency

- Replace the ambiguous task-figure phrase “shared low-level policy” with
  wording that says the ARX and Franka results use adapted, target-specific
  policies derived from the shared pretrained foundation.
- Preserve all existing numerical claims that match the paper source.
- Before changing publication metadata, fetch the Overleaf Git remote and use
  its latest fast-forwardable `master` state as the authoritative paper source.
  Review incoming diffs before compilation; do not auto-resolve divergence or
  overwrite unfinished collaborator edits.
- Update PDF metadata to the visible title “τ0-VLA: a Hierarchical Robot
  Foundation Model with World-Model-Guided Test-Time Computation”.
- Recompile the latest paper, confirm the author list includes Pengfei Zhou,
  report the resulting page count, and sync the verified PDF to
  `public/tau0-vla.pdf`. The current baseline is 18 pages, but a legitimate
  newer Overleaf revision is not forced back to that count.
- Update the Hugging Face model-card BibTeX to include Pengfei Zhou if the Pro
  has authenticated write access. If authentication is absent, prepare the
  exact patch and report the remaining external action.

### 3. Active CSS isolation

- Reduce `app/globals.css` to the reset, active variables, font declarations,
  reduced-motion rule, and final published blog styles.
- Move the reusable legacy project-page selectors alongside
  `archive/project-page-v1/` so the archived TSX remains understandable.
- Rely on Git history, rather than active cascade order, for intermediate blog
  style experiments.
- Preserve the current layout, responsive breakpoints, fonts, palette, media
  framing, table treatment, and horizontal video behavior.

### 4. Documentation refresh

- Rewrite `README.md` as a maintenance guide for an existing deployed site,
  not a repository-creation guide.
- Rewrite `DEPLOY.md` around the established `tau0-vla/tau0-vla.github.io`
  repository and normal update workflow.
- Mark GitHub and Hugging Face links as live. Do not invent a dataset link.
- Explain the source-of-truth locations for prose, media, metadata, PDF,
  styles, tests, and deployment.

### 5. Dependency security hardening

- Upgrade direct dependencies to current compatible patched releases, starting
  with Next.js, `react-server-dom-webpack`, Vite, Cloudflare's Vite plugin, and
  Wrangler.
- Refresh `package-lock.json` through npm rather than manual edits.
- Use targeted transitive overrides only when the upstream dependency range is
  compatible and both production and retained Sites builds verify successfully.
- Do not apply `npm audit fix --force` or silent major downgrades such as the
  audit-suggested Vinext or Drizzle reversions.
- Report any advisory that lacks a compatible upstream fix, including whether
  it is production reachable or confined to an unused local-development path.

### 6. Regression coverage

- Extend the publication test to impose the GitHub 100 MiB limit on every MP4,
  not only the teaser and combined rollout.
- Add assertions for the target-specific adaptation wording and current live
  project links.
- Add source checks that prevent stale repository-creation instructions and
  prevent the active stylesheet from regaining multiple historical layers.
- Keep the archived route unpublished and keep Agibot/Finch absent from the
  production page, layout, and active CSS.

## Test strategy

Behavioral changes and refactors follow red-green-refactor: add an assertion
that fails against the baseline, confirm the expected failure, implement the
minimum change, and confirm the full suite passes. Documentation and dependency
configuration are validated through source assertions, clean installation,
both build paths, and audit output.

Final local verification consists of:

1. clean `npm ci`;
2. `npm test` for the GitHub Pages static export and publication tests;
3. `npm run lint`;
4. `npm run build` for the retained Sites/Vinext path;
5. `npm audit` with remaining advisories classified;
6. PDF metadata, current page-count, author-list, and SHA-256 checks;
7. clean Git status review in both maintenance worktrees;
8. read-only remote comparison where credentials permit it.

## Failure handling and boundaries

- Do not overwrite unrelated or uncommitted work.
- Do not copy Air credentials, cookies, or tokens.
- Do not push website or paper commits without a separate explicit decision.
- If Overleaf or Hugging Face authentication is unavailable, stop at a verified
  local artifact and provide the exact remaining external step.
- If dependency upgrades break the retained Sites build, keep the production
  security fixes and document the incompatible scaffold dependency instead of
  weakening the GitHub Pages production path.

## Success criteria

- The production page builds and all regression tests pass from a clean install.
- The active stylesheet has one intentional visual layer and the rendered page
  remains behaviorally equivalent.
- README and deployment instructions describe the current repository and links.
- The published PDF artifact is compiled from the latest verified Overleaf
  revision and has the correct visible title, metadata title, complete author
  list, and reported page count.
- Production-reachable high-severity dependency advisories are resolved.
- Remaining scaffold-only advisories, if any, are explicitly documented with a
  reason they could not be safely fixed.
- No push or deployment occurs before user review.
