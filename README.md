# Olamide Olaitan — AI & Machine Learning Engineering Portfolio

A static, multipage, responsive AI/ML engineering portfolio built with **HTML, CSS and JavaScript** and designed for **free Cloudflare Pages hosting**. The site uses the original dark graphite, seafoam and coral visual language with oversized interactive cards, brisk geometric motion and reduced-motion support. No framework, npm install or runtime backend is required.

## Pages and navigation

| Page | Route | Purpose |
| --- | --- | --- |
| Landing | `/` | Only the animated four-card bento layout; no long single-page sections |
| The Work | `/projects/` | Three project overviews, metrics, screenshots and live-demo links |
| The Toolkit | `/expertise.html` | Technical capabilities and engineering process |
| About Me | `/about.html` | Education and software engineering background; résumé download |
| Contact | `/contact.html` | Email, LinkedIn, GitHub, résumé download |
| Individual projects | `/projects/supportsense.html`, `/projects/ragassist.html`, `/projects/modelops.html` | Technical case studies |

Each image/visual on `/projects/` is now itself a link to the corresponding case study. The four landing cards have **different destinations**. All case-study back links return to `/projects/`.

## Run locally in VS Code

1. Open the folder containing `index.html` in VS Code.
2. Select **Terminal → New Terminal**.
3. Run:

   ```bash
   python3 -m http.server 8000
   ```

   On Windows, `py -m http.server 8000` may work instead.
4. Open `http://localhost:8000/`.
5. Save changes and refresh the browser. Stop the server with Ctrl+C.

**Do not open `index.html` using `file://`**; the pages use root-relative assets and routes.

## Contact details and résumé

- Public email: `OlamideOlaitan111@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/olamide-olaitan/`
- GitHub: `https://github.com/DarkL19ht`
- Current PDF: `assets/Olamide_Olaitan_AI_ML_Resume.pdf`

**Important:** The included PDF is a **portfolio-focused résumé draft**, prepared using previously supplied education, engineering background and documented project evidence. It does **not** contain a complete, verified employment history with employers, dates and achievements. **Review and replace it with your final, accurate CV before sharing with recruiters.** Keep the same filename so that existing download buttons continue to work.

Public contact configuration is at the top of `assets/main.js`; contact page links also appear directly in `contact.html` for reliability without JavaScript.

## Background project warm-up

`assets/main.js` fires a low-priority GET once per project per page visit, after rendering, for three deployed demos:

- SupportSense: `https://supportsense-ml.onrender.com/`
- RAGAssist: `https://ragassist-lly4.onrender.com/health` (backend of `https://ragassist-workbench.darkl19hts.workers.dev/`)
- ModelOps: `https://modelops.streamlit.app/` (verify its public sharing configuration)

This best-effort request can encourage a sleeping service to start, but **does not prove service readiness**, cannot guarantee startup by click time and may be blocked by browser privacy settings. No cookies, secrets, credentials, periodic keepalive or paid infrastructure are involved. Monitor your free-tier quotas.

## Customise

- Edit layout content in `index.html`, `projects/index.html`, `about.html`, `expertise.html`, `contact.html` and `projects/*.html`.
- Change site design, shape movement and hover interactions in `assets/styles.css`. The last section contains **V2** overrides for the multipage design.
- Change public project URLs or contact information in `assets/main.js`.
- Change the PDF contents by replacing `assets/Olamide_Olaitan_AI_ML_Resume.pdf` with your final CV, keeping the filename.

## Free hosting and domain

Deploy the repository to Cloudflare Pages as a static site (no framework, no build command, output directory `.`). The resulting `*.pages.dev` address has no sleeping web server. If you want a free custom developer subdomain, you can request `olamideolaitan.is-a.dev`, subject to the `is-a.dev` project's rules, approval and availability; ownership of `olaitan.dev` would be required for `olamide.olaitan.dev`.

After deployment, confirm each demo URL, email, LinkedIn and résumé button on a separate browser/device and verify the site on desktop and mobile. External project backends can still be slow on free hosting.
