# Deploy τ0-VLA to GitHub Pages

The production site is `https://tau0-vla.github.io/`, backed by the existing
public repository `tau0-vla/tau0-vla.github.io`.

GitHub Pages is the production deployment path. The workflow in
`.github/workflows/pages.yml` builds the Next.js static export and deploys it
after an approved change reaches `main`.

## Update workflow

1. Start from an up-to-date branch or isolated worktree based on `main`.
2. Make the smallest source or publication-asset change needed.
3. Run the full local checks:

   ```bash
   npm ci
   npm test
   npm run lint
   ```

4. If shared dependencies or the alternative hosting scaffold changed, also
   run `npm run build`.
5. Review `git diff --check`, the generated page, and every changed public link
   or publication asset.
6. Commit the verified change. Push or merge only through the team's normal
   review process.

## Production verification

After a change reaches `main`:

1. Open the GitHub Actions run named **Deploy project page** and confirm the
   build and deploy jobs succeed.
2. Visit `https://tau0-vla.github.io/` in a fresh browser session.
3. Check the title, paper download, GitHub and Hugging Face links, figures, and
   representative video seeking.
4. Confirm the deployed commit matches the reviewed `main` commit.

Do not commit `out/`; GitHub Actions produces that directory from source.

## Revert workflow

If production is incorrect, revert the offending commit with a new Git commit,
run `npm test` and `npm run lint`, then send that revert through the same review
and `main` deployment path. Avoid rewriting shared history or manually editing
the generated Pages artifact.

## Alternative scaffold

The repository deliberately retains Vinext/Vite/Cloudflare/Drizzle/D1 and
ChatGPT hosting files. Use `npm run dev`, `npm run build`, and `npm run start`
only to maintain or evaluate that alternative path. It does not replace the
GitHub Pages production workflow unless the team explicitly changes hosting.
