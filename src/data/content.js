// ─────────────────────────────────────────────────────────────
// Prose content for markdown-style files, keyed by file id.
// Rendered by the lightweight Markdown component in the editor.
// Edit freely — this is where the written narrative lives.
// ─────────────────────────────────────────────────────────────

export const content = {
  'about-me': `# About Me

\`\`\`java
public class Developer {
    String name = "Shuvradeep Datta";
    String role = "Java Backend Developer";
    String[] focus = { "Cloud", "DevOps" };
}
\`\`\`

I am a software engineer specializing in **Java backend development**, Spring Boot,
REST APIs, microservices, cloud technologies and DevOps practices.

I have professional experience working on enterprise applications and **Cambridge
Assessment** projects at **Cognizant Technology Solutions**. I am interested in
scalable backend architectures, cloud infrastructure, automation, CI/CD and modern
software engineering practices.

## What I do

- Build and integrate **Spring Boot** services and **REST APIs**.
- Design and operate **microservices** with resilience in mind.
- Work across **AWS** and **Azure** cloud platforms.
- Automate delivery with **CI/CD**, **Docker** and **Kubernetes**.

## At a glance

- 📍 Kolkata, West Bengal, India
- 💼 4.5+ years of professional experience
- 🏢 Cognizant Technology Solutions (since December 2021)
- 🎓 B.Tech, 2021

> Open the **Explorer** on the left to browse my experience, skills, projects,
> architecture and certifications — or press \`Ctrl + Shift + P\` for the command palette.`,

  'career-journey': `# Career Journey

My path from graduation into enterprise backend engineering, and a steady expansion
into cloud and DevOps.

## 2021 — Foundations
Completed my **B.Tech** and began my software engineering career.

## December 2021 — Cognizant
Joined **Cognizant Technology Solutions** in Kolkata as a **Java Backend Developer**,
working on enterprise applications for **Cambridge Assessment**.

## 2021 → Present — Backend engineering
Hands-on delivery of Spring Boot services and REST APIs, microservices,
database migrations, CI/CD with Azure DevOps, and production support across
QA, UAT and production environments.

## 2026 — Cloud & DevOps certifications
Earned **AZ-104** (April 2026) and **AZ-400** (May 2026), formalizing cloud
administration and DevOps engineering skills.

> See \`EDUCATION/education.md\` for the full visual timeline.`,

  'career-goals': `# Career Goals

## Short term
- Deepen **microservices** and distributed-systems expertise.
- Strengthen hands-on **AWS** architecture skills (targeting SAA-C03).
- Grow **Kubernetes** operations and observability practice.

## Medium term
- Design and own **scalable backend architectures** end to end.
- Lead **CI/CD and platform** improvements across teams.
- Contribute to **infrastructure-as-code** and automation at scale.

## Guiding principles
- Favor **simple, observable, resilient** systems.
- Automate the repeatable; document the important.
- Keep learning in public and ship steadily.`,

  'architecture-microservices': `# Spring Boot Microservices Architecture

A reference view of how I structure Spring Boot microservices behind an API gateway,
with service-to-service communication and shared/isolated data stores.

**Legend** — solid lines are synchronous calls; dashed lines are asynchronous
(event) flows. The diagram below is an editable React/SVG visualization.`,

  'architecture-aws': `# AWS Cloud Architecture

A conceptual AWS deployment showing how compute, storage, database and serverless
services fit together, fronted by a load balancer and observed via CloudWatch.

> Represents **intermediate, hands-on** AWS knowledge. Items shown are standard,
> widely-used building blocks rather than a production account diagram.`,

  'architecture-cicd': `# CI/CD Pipeline

The end-to-end delivery pipeline used in the **SkillPulse DevOps Lab** — from a
developer commit through build, quality gates, security scanning, container
registry and Kubernetes deployment, with Prometheus/Grafana monitoring.`,

  readme: `# Shuvradeep Datta — Portfolio

\`\`\`
SHUVRADEEP-DATTA/
├── ABOUT/
├── EXPERIENCE/
├── TECHNICAL-SKILLS/
├── PROJECTS/
├── ARCHITECTURE/
├── CERTIFICATIONS/
├── EDUCATION/
└── CONTACT/
\`\`\`

Welcome 👋 — this portfolio is built as an interactive **VS Code workspace**.

## How to navigate
- **Explorer** (left): click any file to open it in a tab.
- **Command Palette**: \`Ctrl + Shift + P\`.
- **Terminal** (bottom): type \`help\` to list commands.
- **Theme**: toggle dark/light from the status bar or command palette.

## Who I am
**Java Backend Developer** with 4.5+ years of experience at Cognizant, working on
Cambridge Assessment projects. Focused on Spring Boot, microservices, REST APIs,
Kafka, and practical Cloud (AWS, Azure) and DevOps (Docker, Kubernetes, CI/CD).

## Tech behind this site
React + Vite · Lucide icons · hand-rolled VS Code UI · zero heavy dependencies.

> Tip: open \`PROJECTS/\` to see architecture diagrams for each project.`,
}

export default content
