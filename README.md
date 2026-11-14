# Shuvradeep Datta — Developer Portfolio

An interactive, **VS Code-inspired** personal portfolio built with **React + Vite**.
It looks and behaves like a real code editor: an activity bar, file explorer, editor
tabs, breadcrumbs, an integrated terminal, a command palette, search, and a status bar.

> **Java Backend Developer | Cloud & DevOps Engineer** — Spring Boot · Microservices ·
> REST APIs · Kafka · AWS · Azure · Docker · Kubernetes · CI/CD.

---

## ✨ Features

- 🧩 **Authentic VS Code UI** — activity bar, explorer, tabs, breadcrumbs, panel, status bar.
- 🗂️ **Clickable file tree** — every file opens in a real editor tab (multi-tab, closeable).
- 🎨 **Syntax-highlighted content** — Markdown rendering + JSON viewer with line gutter.
- 🖥️ **Interactive terminal** — `help`, `about`, `skills`, `projects`, `ls`, `clear`, … with command history.
- ⌨️ **Command palette** — `Ctrl + Shift + P`, fully keyboard navigable.
- 🔎 **Search** — full-text search across all portfolio content.
- 🌓 **Theme switching** — VS Code Dark+ / Light+ (persisted).
- 📐 **Architecture diagrams** — editable React/SVG visualizations (microservices, AWS, CI/CD).
- 🏅 **Certification dashboard** — status-aware cards (Passed / In Progress / Planned).
- 📱 **Responsive** — the desktop feels like an IDE; mobile adapts with a slide-in explorer.
- ♿ **Accessible** — keyboard navigation, ARIA roles, reduced-motion support.

---

## 🚀 Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build
npm run preview
```

Requires Node.js 18+.

---

## ⌨️ Keyboard shortcuts

| Shortcut              | Action              |
| --------------------- | ------------------- |
| `Ctrl + Shift + P`    | Command palette     |
| `Ctrl + P`            | Quick open          |
| `` Ctrl + ` ``        | Toggle terminal     |
| `Ctrl + B`            | Toggle sidebar      |
| `Ctrl + K` then `T`   | Toggle color theme  |
| `Esc`                 | Close palette       |

---

## 🧑‍💻 Editing your content

All personal content lives in **`src/data/`** — no component edits required:

| File                      | What it holds                                         |
| ------------------------- | ----------------------------------------------------- |
| `profile.js`              | Name, title, intro, contacts, resume path, pillars    |
| `experience.js`           | Roles, responsibilities, editable achievement metrics |
| `skills.js`               | Skill categories + qualitative proficiency levels     |
| `projects.js`             | Projects, status, tech, links, diagram keys           |
| `certifications.js`       | Certifications + status (never shown as earned early)  |
| `education.js`            | Education + career timeline                            |
| `content.js`              | Markdown prose for About / Architecture / README      |
| `fileTree.js`             | The Explorer file/folder structure                    |

> Fields marked `placeholder: true` are **clearly-marked editable placeholders**
> (email, phone, LinkedIn, GitHub, college name, credential IDs, etc.). Replace them
> with your real values — nothing is fabricated.

### Achievement metrics
The metrics in `experience.js` (`~20%`, `~30%`, `~35%`) are **hidden by default**
(`verified: false`). Set `verified: true` on an achievement only once you have
attributed it to a specific, measured result.

### Resume
Drop your résumé into `public/resume.pdf` (or change `VITE_RESUME_PATH`). The
**Download Resume** button in the Contact section links to it.

### Contact form
By default the form opens your mail client (no backend pretended). To enable real
submissions, set `VITE_CONTACT_ENDPOINT` to a form backend
(e.g. [Formspree](https://formspree.io), Getform, Basin) — see `.env.example`.

---

## ⚙️ Environment configuration

Copy `.env.example` → `.env`:

```bash
VITE_BASE=/                       # "/" for root, "/<repo>/" for GitHub project Pages
VITE_CONTACT_ENDPOINT=            # optional form backend URL
VITE_RESUME_PATH=/resume.pdf      # resume file served from /public
```

---

## 🌐 Deploy to GitHub Pages (free — no paid AWS required)

A ready-to-use workflow lives at **`.github/workflows/deploy.yml`**.

1. Push this project to a GitHub repository.
2. Go to **Settings → Pages → Build and deployment** and set **Source** to
   **GitHub Actions**.
3. Push to `main`. The workflow builds the site (setting `base` to `/<repo-name>/`
   automatically) and publishes it.
4. Your site will be live at `https://<username>.github.io/<repo-name>/`.

> Using a **user/organization site** (`<username>.github.io`) or a custom domain?
> Set `VITE_BASE=/` instead.

---

## 🐳 Optional: deploy with Docker

```bash
# Build the image (serves the static site via nginx)
docker build -t sd-portfolio .

# Run it
docker run --rm -p 8080:80 sd-portfolio
# open http://localhost:8080
```

---

## ☁️ Optional: deploy on AWS

The Docker image above can run anywhere. Common AWS options:

- **S3 + CloudFront** — upload `dist/` to an S3 bucket configured for static
  website hosting, front it with CloudFront for HTTPS + CDN. (Build with `VITE_BASE=/`.)
- **Amazon ECS / App Runner** — deploy the Docker image directly.
- **AWS Amplify Hosting** — connect the repo; build command `npm run build`,
  output directory `dist`.

> GitHub Pages is the recommended zero-cost path; AWS options are documented for
> completeness.

---

## 🏗️ Project structure

```
src/
  components/
    ActivityBar/      Explorer/        Search/
    Sidebar/          EditorTabs/      Editor/ (+ views/)
    Terminal/         StatusBar/       CommandPalette/
    WelcomeScreen/    CertificationCard/
    ArchitectureDiagram/   TitleBar/
  context/            WorkspaceContext.jsx  (tabs, theme, panels)
  data/               profile · experience · skills · projects · …
  hooks/              useKeyboardShortcuts · useMediaQuery
  utils/              icons · commands · searchIndex · terminalCommands
  styles/             theme.css · app.css
  App.jsx  main.jsx
```

---

## 📄 License

MIT — personal portfolio of Shuvradeep Datta.
