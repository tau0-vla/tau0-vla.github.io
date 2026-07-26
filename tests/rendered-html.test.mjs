import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

test("exports the τ0-VLA research note as the canonical page", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");

  assert.match(html, /<title>τ0-VLA/);
  assert.match(
    html,
    /a Hierarchical Robot Foundation Model with World-Model-Guided Test-Time Computation/,
  );
  assert.doesNotMatch(html, /Tau0 VLA Team · July 27, 2026/);
  assert.match(html, /July 27, 2026/);
  assert.match(html, /Read Paper/);
  assert.match(html, /Github/);
  assert.match(html, /Huggingface/);
  assert.match(html, /demo-full\.mp4/);
  assert.match(html, /One Instruction, Many Consequential Decisions/);
  assert.match(html, /Two Systems, Two Time Scales/);
  assert.match(html, /Long-Horizon Manipulation in the Real World/);
  assert.match(html, /More Compute, Better Decisions/);
  assert.match(html, /74\.0% next-subtask accuracy/);
  assert.match(html, /A Generalist VLA across Robot Embodiments/);
  assert.match(html, /fine-tuned separately for its target setting/);
  assert.doesNotMatch(
    html,
    /single policy to operate across diverse|same policy operating on distinct/,
  );
  assert.match(
    html,
    /Scaling Robot Intelligence Through Next-Subtask Prediction/,
  );
  assert.match(html, /The interface between them is the subtask/);
  assert.match(html, /paper-demo-tasks\.png/);
  assert.match(html, /Prepare Ingredients &amp; Clean Room/);
  assert.match(html, /14-step and 25-step tasks/);
  assert.match(html, /Prepare Ingredients/);
  assert.match(html, /Tomato and Egg Stir Fry/);
  assert.match(html, /Front view · 22 steps/);
  assert.match(html, /Rear view · 22 steps/);
  assert.match(html, /Collect Laundry/);
  assert.match(html, /ARX AC One · 5 steps/);
  assert.match(html, /Tidy Makeup Table/);
  assert.match(html, /Franka · Makeup Puff · 4 steps/);
  assert.doesNotMatch(html, /21-step mobile manipulation|Ingredient Prep|21 steps/);
  assert.doesNotMatch(html, /Video 0[1-4]|video placeholder/);
  assert.match(html, /rollout-clean-room\.mp4/);
  assert.match(html, /rollout-milk-tea\.mp4/);
  assert.match(html, /rollout-stir-fry-front\.mp4/);
  assert.match(html, /rollout-stir-fry-rear\.mp4/);
  assert.match(html, /rollout-collect-laundry\.mp4/);
  assert.match(html, /rollout-tidy-makeup-table\.mp4/);
  assert.doesNotMatch(html, />Long-horizon robot manipulation</);
  assert.match(html, /<details open/);
  assert.match(html, /Imagine asking a robot to make milk tea/);
  assert.match(html, /test-time computation improves next-subtask accuracy/);
  assert.match(html, /improves next-subtask accuracy by 11\.0 percentage points/);
  assert.match(html, /27\.5% for direct execution/);
  assert.match(html, /Plan Once achieves 45\.0% average success/);
  assert.match(html, /rollout row below covers all four tasks/);
  assert.match(html, /Prepare Ingredients and Clean Room are presented in one video/);
  assert.match(html, /ARX and Franka rollout videos appear later/);
  assert.match(html, /author  = \{Tau0 VLA Team\}/);
  assert.doesNotMatch(html, /Anonymous/);
  assert.doesNotMatch(html, /62\.5%|37\.5%/);
  assert.doesNotMatch(html, /blog-lead|blog-inline-result|<blockquote>/);
  assert.doesNotMatch(html, /What the failures reveal/);
  assert.doesNotMatch(html, /Project Page|Blog View|href="\/blog\//);
  assert.match(html, /demo-full\.mp4/);
  assert.match(html, /og:image/);
  assert.doesNotMatch(html, /codex-preview|starter project|your site is taking shape/i);
  assert.doesNotMatch(html, /agibot|finch/i);
});

test("does not publish the archived project-page route", async () => {
  await assert.rejects(
    access(new URL("../out/blog/index.html", import.meta.url)),
  );
});

test("exports all publication assets", async () => {
  await Promise.all([
    access(new URL("../out/tau0-vla.pdf", import.meta.url)),
    access(new URL("../out/og.png", import.meta.url)),
    access(new URL("../out/media/demo-full.mp4", import.meta.url)),
    access(new URL("../out/media/demo-poster.jpg", import.meta.url)),
    access(new URL("../out/media/framework-latest.png", import.meta.url)),
    access(new URL("../out/media/demo-overview.jpg", import.meta.url)),
    access(new URL("../out/media/ttc-accuracy.png", import.meta.url)),
    access(new URL("../out/media/ttc-scaling.png", import.meta.url)),
    access(new URL("../out/media/paper-demo-tasks.png", import.meta.url)),
    access(new URL("../out/media/rollout-clean-room.mp4", import.meta.url)),
    access(new URL("../out/media/rollout-clean-room-poster.jpg", import.meta.url)),
    access(new URL("../out/media/rollout-milk-tea.mp4", import.meta.url)),
    access(new URL("../out/media/rollout-milk-tea-poster.jpg", import.meta.url)),
    access(new URL("../out/media/rollout-stir-fry-front.mp4", import.meta.url)),
    access(new URL("../out/media/rollout-stir-fry-front-poster.jpg", import.meta.url)),
    access(new URL("../out/media/rollout-stir-fry-rear.mp4", import.meta.url)),
    access(new URL("../out/media/rollout-stir-fry-rear-poster.jpg", import.meta.url)),
    access(new URL("../out/media/rollout-collect-laundry.mp4", import.meta.url)),
    access(new URL("../out/media/rollout-collect-laundry-poster.jpg", import.meta.url)),
    access(new URL("../out/media/rollout-tidy-makeup-table.mp4", import.meta.url)),
    access(new URL("../out/media/rollout-tidy-makeup-table-poster.jpg", import.meta.url)),
    access(new URL("../out/fonts/Satoshi-Regular.ttf", import.meta.url)),
    access(new URL("../out/fonts/Satoshi-Medium.ttf", import.meta.url)),
    access(new URL("../out/fonts/Satoshi-Bold.ttf", import.meta.url)),
    access(new URL("../out/fonts/DMSans-Regular.ttf", import.meta.url)),
    access(new URL("../out/fonts/DMSans-Medium.ttf", import.meta.url)),
    access(new URL("../out/fonts/DMSans-SemiBold.ttf", import.meta.url)),
  ]);

  const mainDemo = await stat(
    new URL("../out/media/demo-full.mp4", import.meta.url),
  );
  assert.ok(
    mainDemo.size < 100 * 1024 * 1024,
    "Main demo must remain below GitHub's 100 MiB per-file limit",
  );

  const [page, layout, css, workflow, previewServer] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../.github/workflows/pages.yml", import.meta.url), "utf8"),
    readFile(new URL("../scripts/serve-static.mjs", import.meta.url), "utf8"),
  ]);

  assert.match(page, /One Instruction, Many Consequential Decisions/);
  assert.match(
    page,
    /Scaling Robot Intelligence Through Next-Subtask Prediction/,
  );
  assert.match(layout, /summary_large_image/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /--text:\s*#181e25/);
  assert.match(css, /--background:\s*#f9f6f0/);
  assert.match(css, /--accent:\s*#292929/);
  assert.match(css, /--surface:\s*#efe8da/);
  assert.match(css, /font-family:\s*"Satoshi"/);
  assert.match(css, /font-family:\s*"DM Sans"/);
  assert.match(css, /ui-sans-serif,\s*system-ui/);
  assert.match(css, /\.blog-header h1\s*\{[\s\S]*?font-size:\s*48px/);
  assert.match(css, /\.blog-copy,[\s\S]*?width:\s*min\(768px/);
  assert.match(css, /\.blog-media\.blog-hero-video\s*\{[\s\S]*?width:\s*min\(960px/);
  assert.match(css, /\.blog-actions\s*\{[\s\S]*?gap:\s*16px/);
  assert.match(css, /\.blog-rollout-grid\s*\{[\s\S]*?overflow-x:\s*auto/);
  assert.match(css, /\.blog-video-card h3\s*\{[\s\S]*?font-size:\s*14px/);
  assert.match(css, /\.blog-result-grid figcaption\s*\{[\s\S]*?font-size:\s*13px/);
  assert.match(workflow, /actions\/configure-pages@v5/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(previewServer, /"Accept-Ranges": "bytes"/);
  assert.match(previewServer, /"Content-Range"/);
  assert.match(previewServer, /response\.writeHead\(206/);
  assert.doesNotMatch(`${page}\n${layout}\n${css}`, /agibot|finch/i);

  await access(new URL("next.config.ts", projectRoot));
});
