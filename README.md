# τ0-VLA Research Page

Continuous research-note page for **τ0-VLA: a Hierarchical Robot Foundation Model with World-Model-Guided Test-Time Computation**.

The earlier modular project-page version is preserved under
`archive/project-page-v1/` for reference and is not published.

## Preview locally

Use Node.js 22 or newer.

```bash
npm install
npm run build:pages
npm run preview:local
```

Open `http://127.0.0.1:4173/`. The included preview server supports byte-range
requests, so the video timelines remain seekable during local review.

## Publish on GitHub Pages

1. Register the GitHub user or organization `tau0-vla`.
2. Create the public repository `tau0-vla/tau0-vla.github.io`.
3. Place the contents of this folder at the repository root.
4. Push to the `main` branch.
5. In **Settings → Pages**, set **Source** to **GitHub Actions**.
6. The included workflow builds and publishes the site automatically at
   `https://tau0-vla.github.io/`.

See `DEPLOY.md` for copy-paste commands.

## Media assets

The full system demo, six rollout videos, posters, and paper figures are
included under `public/media/`. The MP4 files are prepared for progressive
playback and seeking.

## Project links

The paper link serves `public/tau0-vla.pdf`. Add GitHub, model, and dataset
links to the header when their public URLs are finalized.
