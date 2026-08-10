# τ0-VLA Latest Overleaf PDF Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pull the latest authoritative Overleaf paper, correct its PDF title metadata, compile and validate it, and update the project-page PDF without pushing changes to Overleaf.

**Architecture:** Treat the existing Overleaf Git repository as the bridge clone. Fetch and assess divergence first, create an isolated paper worktree from the latest fast-forwardable `origin/master`, compile with `latexmk`, then copy only the verified `main.pdf` into the website maintenance worktree.

**Tech Stack:** Overleaf Git bridge, Git worktrees, LaTeX/latexmk, pdflatex, BibTeX, Poppler PDF inspection, Next.js publication tests.

## Global Constraints

- Overleaf `origin/master` is authoritative for paper content.
- Never ask for or expose an Overleaf token; authentication must use macOS Keychain.
- Never auto-merge divergence, force-push, or overwrite collaborator edits.
- Do not push any metadata commit to Overleaf during this pass.
- Preserve the latest legitimate Overleaf page count and content.
- The website PDF must include Pengfei Zhou and the visible Robot Foundation Model title.

---

### Task 1: Assess and fast-forward to latest Overleaf state

**Files:**
- Inspect: `/Users/jrryzh/Documents/projects/Tau0/6a228032a27d57b58f49ca83`

**Interfaces:**
- Consumes: token-free Overleaf origin configured in the paper repository.
- Produces: verified latest remote SHA and an isolated paper worktree.

- [ ] **Step 1: Verify clean local state and token-free remote**

Run:

```bash
git status --short --branch
git remote -v
git config --get credential.helper
```

Expected: clean `master`; remote URL contains no `olp_` token. Do not print
credential contents.

- [ ] **Step 2: Fetch the Overleaf remote without prompting**

Run: `GIT_TERMINAL_PROMPT=0 git fetch origin`

Expected: fetch succeeds through Keychain. On authentication failure, stop and
instruct the user to re-establish the Overleaf Git bridge interactively; never
request the token in chat.

- [ ] **Step 3: Assess divergence**

Run:

```bash
git log --oneline HEAD..origin/master
git log --oneline origin/master..HEAD
git diff --stat HEAD..origin/master
git diff HEAD..origin/master -- '*.tex' '*.bib'
```

Expected: either equal or remote-only fast-forward commits. If both directions
contain commits, stop and present the divergence without resolving it. Review
every incoming paper hunk; if it changes numerical claims, citations, authors,
or section structure, flag that change before compiling and re-check the
corresponding project-page copy rather than blindly preserving stale text.

- [ ] **Step 4: Fast-forward master and create isolated paper worktree**

Run:

```bash
git merge --ff-only origin/master
git worktree add .worktrees/project-page-pdf-metadata -b codex/project-page-pdf-metadata
```

If `.worktrees/` is not ignored, add it to the paper repository's `.gitignore`
and commit that infrastructure change before creating the worktree.

---

### Task 2: Compile the untouched latest paper baseline

**Files:**
- Build in: paper metadata worktree.

**Interfaces:**
- Consumes: latest fetched Overleaf source.
- Produces: baseline `main.pdf` and compile diagnostics.

- [ ] **Step 1: Verify prerequisites**

Run: `which pdflatex && which latexmk && which bibtex && test -f main.tex && test -f references.bib`

Expected: every executable and required source file exists.

- [ ] **Step 2: Clean generated files and compile**

Run:

```bash
latexmk -C
latexmk -pdf -interaction=nonstopmode -halt-on-error main.tex
```

Expected: compilation succeeds within three diagnosis/fix attempts. Do not
change paper prose merely to silence non-fatal warnings.

- [ ] **Step 3: Inspect baseline output**

Run:

```bash
pdfinfo main.pdf
pdftotext -layout main.pdf - | sed -n '1,45p'
pdffonts main.pdf
rg -n "undefined|Citation.*undefined|Reference.*undefined" main.log || true
```

Expected: valid PDF over 100 KB, complete first-page author list including
Pengfei Zhou, embedded fonts, and no undefined citations/references.

---

### Task 3: Correct PDF metadata with a RED/GREEN check

**Files:**
- Modify: paper worktree `main.tex`

**Interfaces:**
- Consumes: `pdftitle` in the `hyperref` metadata block.
- Produces: compiled PDF with the current visible title represented in metadata.

- [ ] **Step 1: Verify the current metadata check fails**

Run:

```bash
pdfinfo main.pdf | rg -F "Title:           Tau0-VLA: a Hierarchical Robot Foundation Model with World-Model-Guided Test-Time Computation"
```

Expected: exit 1 because the baseline metadata says “Hierarchical VLA Foundation Model”.

- [ ] **Step 2: Apply the minimal source correction**

Set the `pdftitle` value in `main.tex` to:

```tex
pdftitle={Tau0-VLA: a Hierarchical Robot Foundation Model with World-Model-Guided Test-Time Computation},
```

Do not change the visible `\title{...}` or paper body unless the latest
Overleaf revision itself requires a compile fix.

- [ ] **Step 3: Recompile and verify GREEN**

Run:

```bash
latexmk -pdf -interaction=nonstopmode -halt-on-error main.tex
pdfinfo main.pdf | rg -F "Title:           Tau0-VLA: a Hierarchical Robot Foundation Model with World-Model-Guided Test-Time Computation"
```

Expected: both commands exit 0.

- [ ] **Step 4: Run submission-readiness checks**

Run:

```bash
pdfinfo main.pdf | rg "Pages|File size|PDF version|Encrypted"
pdftotext main.pdf - | rg -F "Pengfei Zhou"
pdftotext main.pdf - | rg "\?\?|\[\?\]|\[VERIFY\]" && exit 1 || true
pdffonts main.pdf | awk 'NR > 2 && $6 != "yes" { print; bad=1 } END { exit bad }'
shasum -a 256 main.pdf
```

Expected: complete author, no unresolved markers, all fonts embedded, and a
recorded page count/hash for the latest paper.

- [ ] **Step 5: Commit only the metadata source change on the paper branch**

```bash
git add main.tex
git commit -m "paper-compile: correct PDF title metadata"
```

Do not add generated LaTeX intermediates or push this commit.

---

### Task 4: Sync the verified latest PDF into the project page

**Files:**
- Modify: website worktree `public/tau0-vla.pdf`
- Modify: website `tests/rendered-html.test.mjs` only if latest PDF invariants require an updated assertion.

**Interfaces:**
- Consumes: verified paper worktree `main.pdf`.
- Produces: website publication artifact derived from latest Overleaf source.

- [ ] **Step 1: Replace the website PDF with the compiled artifact**

Copy `main.pdf` from the paper worktree to the website maintenance worktree as
`public/tau0-vla.pdf`, preserving no temporary build files.

- [ ] **Step 2: Verify byte identity and metadata**

Run:

```bash
cmp /Users/jrryzh/Documents/projects/Tau0/6a228032a27d57b58f49ca83/.worktrees/project-page-pdf-metadata/main.pdf public/tau0-vla.pdf
pdfinfo public/tau0-vla.pdf | rg -F "Hierarchical Robot Foundation Model"
pdftotext public/tau0-vla.pdf - | rg -F "Pengfei Zhou"
shasum -a 256 public/tau0-vla.pdf
```

Confirm the exact paper-worktree path with `git worktree list` before running
the command; do not use a broad glob.

- [ ] **Step 3: Re-run the complete website verification**

Run: `npm test && npm run lint`

Expected: static export and all project-page tests pass with the new PDF.

- [ ] **Step 4: Commit the website PDF update**

```bash
git add public/tau0-vla.pdf
git commit -m "docs: sync latest Overleaf paper PDF"
```

- [ ] **Step 5: Report synchronization provenance**

Record the Overleaf source SHA, paper metadata commit SHA, PDF SHA-256, page
count, and website commit SHA. Do not push either repository.
