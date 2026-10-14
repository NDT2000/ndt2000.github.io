# Nayan Taori — Personal Portfolio

My portfolio as a backend and full stack software engineer: the problems I've worked on, the engineering decisions behind my projects, and ways to connect.

**[Visit the portfolio](https://ndt2000.github.io/)** · **[Download my resume](./Nayan_Taori_Resume.pdf)** · **[LinkedIn](https://www.linkedin.com/in/nayan-taori/)**

## What's inside

- **Experience:** software development in banking and healthcare, plus open-source development infrastructure.
- **Projects:** problem-focused stories, expandable engineering notes, and links to source code and documented examples.
- **About:** engineering interests, background, and the kinds of roles I'm looking for.
- **Contact:** email, LinkedIn, GitHub, and resume download.

### Featured projects

| Project | Focus |
| --- | --- |
| [Personal Finance Tracker](https://github.com/NDT2000/Finance-Tracker) | Reliable CSV imports, currency-aware reporting, spending forecasts, and financial-planning scenarios. |
| [AI-Assisted Clinical Notes Workflow](https://github.com/NDT2000/AI-Assisted-Clinical-Notes-Workflow) | Offline edits, conflict resolution, review states, and authorization using a mock API and synthetic data. |
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

Google Fonts and Font Awesome load from external services. Internet access is needed for those fonts and icons; portfolio content and local assets are served from this repository.

## Repository structure

| File | Purpose |
| --- | --- |
| `index.html` | Page content, navigation, project stories, and links. |
| `styles.css` | Dark theme, responsive layouts, and animation styles. |
| `script.js` | Mobile navigation, smooth scrolling, scroll progress, and visual effects. |
| `Profile.jpeg` | Profile photograph. |
| `Nayan_Taori_Resume.pdf` | Resume used by all download links. |

## Updating the portfolio

Edit text and project links in `index.html`. Use the existing card and section classes to keep the presentation consistent. Project descriptions should explain the problem, contribution, and supporting evidence; distinguish mock data and development milestones from production deployments.

When updating the resume, replace `Nayan_Taori_Resume.pdf` or update every download link if the filename changes. Keep the location, contact details, page title, and meta description consistent with the visible content.

Before publishing:

- Check desktop and narrow mobile layouts.
- Open and close the mobile menu; follow the navigation and project links.
- Expand the engineering notes and confirm they remain readable.
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
