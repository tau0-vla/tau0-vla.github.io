# Deploy τ0-VLA to GitHub Pages

The intended public address is:

```text
https://tau0-vla.github.io/
```

GitHub Pages derives this address from the account or organization name. To use
this exact address, first register a GitHub user or organization named
`tau0-vla`, then create its user-site repository:

```text
tau0-vla/tau0-vla.github.io
```

The repository must be named exactly `tau0-vla.github.io`. A repository named
only `tau0-vla` under another account would instead be published as a project
site under that account's URL.

## 1. Create the GitHub account or organization

Choose one:

- Register the GitHub username `tau0-vla`; or
- Create an organization named `tau0-vla` from an existing GitHub account.

GitHub confirms name availability during registration. An organization is
usually easier when several project members need administrative access.

## 2. Create the repository

While signed in as `tau0-vla`, create a new public repository named:

```text
tau0-vla.github.io
```

Do not initialize it with a README, `.gitignore`, or license because the source
package already contains the website files.

## 3. Push the source package

Unzip `tau0-vla-blog-source.zip`, open a terminal inside the extracted
folder, and run:

```bash
git init
git add .
git commit -m "Publish tau0-VLA research page"
git branch -M main
git remote add origin git@github.com:tau0-vla/tau0-vla.github.io.git
git push -u origin main
```

If the repository already contains a site, copy these files into the intended
repository carefully instead of running `git init`.

## 4. Enable Pages

In the GitHub repository:

1. Open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Open the **Actions** tab and wait for “Deploy project page” to finish.

The site will be available at:

```text
https://tau0-vla.github.io/
```

Future pushes to `main` automatically rebuild and redeploy the page.

## Local preview

```bash
npm ci
npm run build:pages
npm run preview:local
```

Then open `http://127.0.0.1:4173/`. Use the included preview command rather
than a basic static-file server so video timeline seeking works locally.

## Deploy the prebuilt static package

`tau0-vla-blog-github-pages.zip` contains the generated static files. It can
be served directly by any static host. The source-package workflow above is
preferred for GitHub Pages because it keeps future edits and deployments
reproducible.
