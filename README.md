# Gracy’s Biblical Echoes — YouTube Shorts AI Production Studio

A high-performance production workspace for generating daily 30 AD historical biblical bilingual (Tamil & English) YouTube Shorts for the channel **Gracy’s Biblical Echoes** (`@GracysBiblicalEchoes`).

---

## 🚀 GitHub Pages Deployment via GitHub Actions

This repository includes a pre-configured GitHub Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

### Quick Setup Steps:

1. **Push your repository to GitHub**:
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```

2. **Enable GitHub Actions for Pages**:
   - In your GitHub repository, navigate to **Settings** > **Pages** (under "Code and automation" in the left sidebar).
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.

3. **Automatic Deployment**:
   - Every push to `main` (or `master`) automatically runs `.github/workflows/deploy.yml`.
   - The workflow uses **Node.js 22**, installs dependencies using `npm ci` via `package-lock.json`, builds static assets into `dist/`, and publishes to GitHub Pages.
   - You can also manually trigger a deployment at any time from the **Actions** tab using the **Run workflow** button.

---

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript + Vite 6
- **Styling**: Tailwind CSS v4
- **Runtime**: Node.js 22 LTS
- **Build Output**: Static SPA configured with relative base path (`./`) in `vite.config.ts` for clean multi-level GitHub Pages URLs.
- **Workflow**: `.github/workflows/deploy.yml` with automated 404 SPA fallback handling.
