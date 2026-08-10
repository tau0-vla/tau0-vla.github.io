# τ0-VLA Project Page Core Maintenance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the existing project-page repository reproducible, current, safer to maintain, and explicit about its GitHub Pages production path while preserving the Sites/Cloudflare scaffold.

**Architecture:** Keep the single-route Next.js static-export architecture. Consolidate the published visual layer in `app/globals.css`, preserve reusable v1 styles beside the archived page, strengthen source-level regression tests, and update direct dependencies without deleting the retained Vinext/Cloudflare/Drizzle files.

**Tech Stack:** Next.js 16, React 19, TypeScript, Node test runner, GitHub Pages Actions, Vinext/Vite/Cloudflare scaffold.

## Global Constraints

- GitHub Pages remains the production deployment path.
- Retain `.openai/hosting.json`, `vite.config.ts`, `worker/`, `db/`, Drizzle, Vinext, Wrangler, and Cloudflare dependencies.
- Keep `G-0BJRE5LEFZ`, all validated numerical claims, media files, and live GitHub/Hugging Face links.
- Do not add Agibot/Finch branding to production source.
- Do not push, deploy, merge, or use `npm audit fix --force`.
- Work only on branch `codex/project-page-maintenance` in the isolated worktree.

---

### Task 1: Deliver wording and maintenance-documentation corrections

**Files:**
- Modify: `tests/rendered-html.test.mjs`
- Modify: `app/page.tsx`
- Modify: `README.md`
- Modify: `DEPLOY.md`
- Modify: `package.json`

**Interfaces:**
- Consumes: static export under `out/` and repository source files.
- Produces: regression assertions, unambiguous public copy, and current maintenance documentation.

- [ ] **Step 1: Add a failing target-specific-policy assertion**

Add this assertion near the existing embodiment-copy checks:

```js
assert.doesNotMatch(
  html,
  /evaluate the shared low-level policy on mobile ARX and fixed-base Franka/,
);
assert.match(html, /adapted, target-specific policies/);
```

- [ ] **Step 2: Run the suite and verify the expected RED state**

Run: `npm test`

Expected: the canonical-page test fails because the existing caption contains
“shared low-level policy” and does not contain “adapted, target-specific policies”.

- [ ] **Step 3: Add source-maintenance assertions**

Extend the final test to read `README.md`, `DEPLOY.md`, and `package.json`, then
assert:

```js
assert.doesNotMatch(readme, /Register the GitHub user or organization/);
assert.doesNotMatch(deploy, /Create the GitHub account or organization/);
assert.match(readme, /GitHub Pages is the production deployment path/);
assert.match(deploy, /tau0-vla\/tau0-vla\.github\.io/);
assert.equal(packageJson.scripts["dev:pages"], "next dev");
```

- [ ] **Step 4: Extend the asset guard to every MP4**

Import `readdir` and replace the two hard-coded MP4 size checks with:

```js
const mediaDir = new URL("../out/media/", import.meta.url);
const mp4Files = (await readdir(mediaDir)).filter((name) => name.endsWith(".mp4"));
assert.equal(mp4Files.length, 7);
for (const name of mp4Files) {
  const mediaStat = await stat(new URL(name, mediaDir));
  assert.ok(mediaStat.size < 100 * 1024 * 1024, `${name} exceeds GitHub's 100 MiB limit`);
}
```

- [ ] **Step 5: Apply the minimal wording, script, and documentation changes**

In `app/page.tsx`, replace the caption sentence with:

```tsx
Panels (a)–(d) show the four long-horizon tasks; panels (e)–(f)
show adapted, target-specific policies derived from the shared pretrained
foundation on mobile ARX and fixed-base Franka platforms.
```

Add `"dev:pages": "next dev"` to `package.json`. Rewrite `README.md` as the
current maintenance map and `DEPLOY.md` as the established GitHub Pages update,
verification, and revert workflow. Keep the alternative Sites commands
documented and do not invent a dataset link.

- [ ] **Step 6: Verify GREEN**

Run: `npm test`

Expected: all canonical page, documentation, script, asset, and existing
publication assertions pass.

- [ ] **Step 7: Commit the complete red-green cycle**

Run:

```bash
git add tests/rendered-html.test.mjs app/page.tsx README.md DEPLOY.md package.json
git commit -m "docs: refresh project page maintenance workflow"
```

---

### Task 2: Isolate the active stylesheet

**Files:**
- Modify: `app/globals.css`
- Create: `archive/project-page-v1/globals.css`
- Modify: `archive/project-page-v1/README.md`

**Interfaces:**
- Consumes: exact rendered behavior guarded by `tests/rendered-html.test.mjs`.
- Produces: one active visual layer and a self-contained v1 style reference.

- [ ] **Step 1: Add and verify failing CSS-isolation assertions**

Add to the final source test:

```js
assert.equal((css.match(/:root\s*\{/g) ?? []).length, 1);
assert.doesNotMatch(css, /Continuous research-note view|Minimal editorial layout/);
```

Run `npm test` and confirm failure because the baseline active stylesheet has
multiple `:root` blocks and both historical layer comments.

- [ ] **Step 2: Preserve v1 selectors with the archived page**

Copy the original reset and reusable `.site-*`, `.paper-*`, `.method-*`,
`.mechanism-*`, `.rollout-*`, `.results-*`, `.executor-*`, `.citation-*`, and
responsive rules needed by `archive/project-page-v1/page.tsx` into
`archive/project-page-v1/globals.css`. Update the archive README to identify
this stylesheet as reference-only and not imported by the published route.

- [ ] **Step 3: Rebuild active globals from intentional pieces**

Keep in `app/globals.css` only:

```css
@import "tailwindcss";

:root {
  --text: #181e25;
  --muted: #6e6a62;
  --border: #d8d1c5;
  --soft-border: #e6dfd4;
  --background: #f9f6f0;
  --surface: #efe8da;
  --surface-2: #f7f3eb;
  --accent: #292929;
  --accent-soft: #eee8dc;
  --dark: #0a0a0a;
}
```

Then retain the reset, reduced-motion rule, six `@font-face` declarations, and
the final published blog styles currently beginning at the
“Reference-aligned editorial system” section. Remove intermediate editorial and
blog experiment layers from the active file.

- [ ] **Step 4: Verify static output and CSS gates**

Run: `npm test`

Expected: all tests pass, including exactly one `:root`, preserved palette,
fonts, responsive CSS, and production content.

- [ ] **Step 5: Run lint after the refactor**

Run: `npm run lint`

Expected: exit 0 with no errors.

- [ ] **Step 6: Commit stylesheet isolation**

```bash
git add tests/rendered-html.test.mjs app/globals.css archive/project-page-v1/globals.css archive/project-page-v1/README.md
git commit -m "refactor: isolate active project page styles"
```

---

### Task 3: Patch direct dependency advisories without removing scaffolding

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Consumes: npm registry releases verified on 2026-08-10.
- Produces: patched production dependencies and updated retained build tooling.

- [ ] **Step 1: Capture the pre-upgrade audit summary**

Run: `npm audit --json > /tmp/tau0-audit-before.json`

Expected metadata: 21 total advisories, including 16 high.

- [ ] **Step 2: Upgrade exact compatible direct versions**

Run:

```bash
npm install next@16.3.0 react@19.2.8 react-dom@19.2.8
npm install --save-dev react-server-dom-webpack@19.2.8 @cloudflare/vite-plugin@1.51.1 vite@8.2.1 wrangler@4.120.0
```

Do not change Vinext `0.0.50` or Drizzle Kit `0.31.10` in this step because the
audit's proposed fixes are incompatible downgrades; assess their remaining
transitive advisories after the safe upgrades.

- [ ] **Step 3: Verify the GitHub Pages path**

Run: `npm test && npm run lint`

Expected: static build, all publication tests, and lint pass.

- [ ] **Step 4: Verify the retained Sites path**

Run: `npm run build`

Expected: Vinext/Vite/Cloudflare build exits 0. If it fails because a retained
tool has not yet declared compatibility with Vite 8.2.1, revert only that
tooling version and document the remaining dev-path advisory.

- [ ] **Step 5: Re-audit and classify remaining advisories**

Run:

```bash
npm audit --json > /tmp/tau0-audit-after.json
npm audit --omit=dev
```

Require zero production-reachable high advisories. Record Vinext/image-size and
Drizzle/esbuild-kit findings as scaffold-only only if `npm ls` confirms they are
not in the Next.js production tree and no compatible fixed release exists.

- [ ] **Step 6: Commit dependency hardening**

```bash
git add package.json package-lock.json
git commit -m "chore: patch project page dependencies"
```

---

### Task 4: Core maintenance verification

**Files:**
- Verify only; no new production files.

**Interfaces:**
- Consumes: Tasks 1–3.
- Produces: evidence for publication/PDF synchronization.

- [ ] **Step 1: Verify from a clean dependency install**

Run:

```bash
npm ci
npm test
npm run lint
npm run build
```

Expected: all commands exit 0.

- [ ] **Step 2: Verify repository state and no accidental branding**

Run:

```bash
git diff --check
rg -n -i "agibot|finch|/Users/zhangjinyu|MacBook-Air" app README.md DEPLOY.md tests
git status --short --branch
```

Expected: `rg` returns no matches and status contains only intentional committed
history.

- [ ] **Step 3: Record the core checkpoint**

Run: `git log --oneline --decorate -8`

Use this verified commit as the website base for the publication PDF sync plan.
