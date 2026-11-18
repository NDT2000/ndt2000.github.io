# Nayan Taori — Personal Portfolio

My software engineering portfolio, built around a vision: making complex workflows reliable. Explore the problems, decisions, and evidence behind my work.

**[Visit the portfolio](https://ndt2000.github.io/)** · **[Download my resume](./Nayan_Taori_Resume.pdf)** · **[LinkedIn](https://www.linkedin.com/in/nayan-taori/)**

## What's inside

- **Vision:** a focused introduction and an engineering lens spanning resilient collaboration, trustworthy data, and explicit decisions.
- **Selected work:** substantial clinical and finance case studies, followed by CareerLift, connecting architecture to the problems each project solves.
- **Approach:** the invariants, recovery paths, and observable outcomes behind reliable workflows.
- **About:** personal background, compact experience notes, resume, and opportunities.
- **Contact:** direct email and professional links.

The hero links to three engineering themes rather than promoting one application. Clinical Notes and Finance Tracker each have a substantial case study; diagrams explain architecture without connecting to a project backend.

### Featured projects

| Project | Focus |
| --- | --- |
| [Personal Finance Tracker](https://github.com/NDT2000/Finance-Tracker) | Reliable CSV imports, currency-aware reporting, spending forecasts, and financial-planning scenarios. |
| [AI-Assisted Clinical Notes Workflow](https://github.com/NDT2000/AI-Assisted-Clinical-Notes-Workflow) | Review lifecycle, persistent offline edits, immutable versions, real-time collaboration, and server-enforced permissions with React, FastAPI, PostgreSQL, and Redis. All data is synthetic; AI generation is planned. |
| [CareerLift](https://github.com/NDT2000/CareerLift) | AI career gap analysis with structured-response validation and retries. |
| Personal RAG Chatbot | Document retrieval and contextual answers using semantic search. |

This repository contains the portfolio website. The linked applications live in their own repositories; their services are not required to run this site.

## Run locally

The site uses plain HTML, CSS, and JavaScript. There is no package installation, build step, backend, or required environment configuration.

With Python 3 installed:

```bash
git clone https://github.com/NDT2000/ndt2000.github.io.git
cd ndt2000.github.io
python3 -m http.server 8000 --bind 127.0.0.1
```

Open the local server in your browser to inspect the site. Stop it with `Ctrl+C`. Changes appear after refreshing; the server does not provide automatic reload.

Manrope fonts are self-hosted in `assets/fonts/` with their Open Font License. Icons are inline SVG; no font CDN, icon library, or external runtime request is required.

## Repository structure

| File | Purpose |
| --- | --- |
| `index.html` | Vision, workflow illustration, case studies, background, and contact. |
| `styles.css` | Dark theme, responsive layouts, and animation styles. |
| `script.js` | Accessible mobile navigation, section navigation, section reveals, and word reveal. |
| `assets/fonts/` | Self-hosted Manrope weights and font license. |
| `favicon.svg` | Portfolio monogram. |
| `404.html` | Custom GitHub Pages missing-page response. |
| `site-notes.html` | Privacy information and site terms. |
| `Profile.jpeg` | Profile photograph. |
| `Nayan_Taori_Resume.pdf` | Resume used by all download links. |

## Updating the portfolio

Edit text and project links in `index.html`. Use the existing card and section classes to keep the presentation consistent. Project descriptions should explain the problem, contribution, and supporting evidence; distinguish mock data and development milestones from production deployments.

When updating the resume, replace `Nayan_Taori_Resume.pdf` or update every download link if the filename changes. Keep the location, contact details, page title, and meta description consistent with the visible content.

After editing `styles.css` or `script.js`, refresh their content-based cache keys:

```bash
python3 scripts/version-assets.py
```

This updates asset URLs in all HTML pages so browsers do not reuse a previous design’s CSS or JavaScript with new markup. It needs only Python 3 and does not build or install anything. Commit the updated HTML references together with the asset changes.

Before publishing:

- Check desktop and narrow mobile layouts.
- Open and close the mobile menu; follow the navigation and project links.
- Follow each engineering-lens link to its corresponding case study.
- Expand case study and experience notes; check keyboard focus and Escape in the mobile menu.
- Check reduced motion and JavaScript-disabled navigation.
- Verify the profile image and every resume download.
- Check the browser console for JavaScript errors.

If Node.js is available, check JavaScript syntax with:

```bash
node --check script.js
```

There is no automated test suite in this repository. The syntax check supplements browser checks; it does not validate layout or interactions.

## Deployment

The public site is hosted on GitHub Pages at **https://ndt2000.github.io/**.

Check **Settings → Pages** for the repository's active publishing source. For branch-based publishing, select `main` and `/ (root)`. No custom build command is needed for this static site. Changes become public after the configured Pages deployment finishes successfully; a Git push alone does not confirm deployment.

## Contact

For full-time backend and full stack opportunities, email **[nayantaori14@gmail.com](mailto:nayantaori14@gmail.com)**.
