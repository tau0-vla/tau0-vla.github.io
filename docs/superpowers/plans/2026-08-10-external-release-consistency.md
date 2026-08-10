# τ0-VLA External Release Consistency Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the Hugging Face model-card citation with the latest verified paper while leaving all shared-resource writes behind an explicit preview and confirmation gate.

**Architecture:** Read the authenticated Hugging Face identity without exposing credentials, download the current model card to a temporary directory, generate a one-line author-list patch, show the exact diff, and upload only after explicit confirmation.

**Tech Stack:** Hugging Face CLI/huggingface_hub, temporary filesystem, Git-style diff, public project-page/PDF links.

## Global Constraints

- Target only `sii-research/tau-0-vla` and only its `README.md` model card.
- Never print, request, store, or copy a Hugging Face token.
- Preserve all model documentation outside the citation author list.
- Use the author order from the latest verified Overleaf PDF.
- Do not upload without showing the exact diff and receiving explicit confirmation.

---

### Task 1: Verify authenticated access and fetch the current card

**Files:**
- Temporary: a directory created by `mktemp -d`.

**Interfaces:**
- Consumes: existing Hugging Face keychain/cache authentication.
- Produces: local current `README.md` snapshot and authenticated account name.

- [ ] **Step 1: Check CLI availability and identity**

Run:

```bash
command -v hf
hf auth whoami
```

Expected: authenticated identity with write access to `sii-research`. If absent,
stop and instruct the user to authenticate in their own terminal; never ask for
the token in chat.

- [ ] **Step 2: Download only the model card**

Run:

```bash
release_tmp=$(mktemp -d)
hf download sii-research/tau-0-vla README.md --local-dir "$release_tmp/current"
cp "$release_tmp/current/README.md" "$release_tmp/updated-README.md"
```

Validate that the file contains the τ0-VLA citation and currently lacks
`Pengfei Zhou` between `Xueyong Zhao` and `Yue Zhou`.

---

### Task 2: Prepare and review the exact citation patch

**Files:**
- Modify only: temporary `updated-README.md`.

**Interfaces:**
- Consumes: latest paper first-page author list.
- Produces: exact one-file diff for confirmation.

- [ ] **Step 1: Add the missing author in paper order**

Change only the final BibTeX author line from:

```bibtex
Xueyong Zhao and Yue Zhou},
```

to:

```bibtex
Xueyong Zhao and Pengfei Zhou and Yue Zhou},
```

This exact one-line change applies when the latest Overleaf author list differs
from the model card only by Pengfei Zhou, as in the current baseline. If the
latest verified paper has additional author changes, regenerate the complete
BibTeX author block from that paper and show the larger exact diff instead of
applying this baseline-specific edit.

- [ ] **Step 2: Verify the card is otherwise byte-for-byte unchanged**

Run:

```bash
diff -u "$release_tmp/current/README.md" "$release_tmp/updated-README.md"
```

Expected: exactly one changed author line and no metadata/body changes.

- [ ] **Step 3: Present the diff and wait for confirmation**

Do not upload in the same step. Ask for explicit approval to update
`sii-research/tau-0-vla/README.md`.

---

### Task 3: Upload and verify the shared-resource update

**Files:**
- External: `sii-research/tau-0-vla/README.md`.

**Interfaces:**
- Consumes: approved temporary model-card file.
- Produces: corrected public Hugging Face citation.

- [ ] **Step 1: Upload only README.md**

Run:

```bash
hf upload sii-research/tau-0-vla "$release_tmp/updated-README.md" README.md --commit-message "Fix complete paper author list"
```

- [ ] **Step 2: Download again and verify remote state**

Run:

```bash
hf download sii-research/tau-0-vla README.md --local-dir "$release_tmp/verified"
rg -F "Xueyong Zhao and Pengfei Zhou and Yue Zhou" "$release_tmp/verified/README.md"
```

Expected: the corrected author sequence is present remotely.

- [ ] **Step 3: Report the public result**

Return the Hugging Face model-card URL and its upload commit identifier. Keep
the website and paper Git branches local until separately approved for push.
