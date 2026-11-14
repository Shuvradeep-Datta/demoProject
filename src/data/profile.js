// ─────────────────────────────────────────────────────────────
// Centralized profile data. Edit the values here to update the site.
// Fields marked `placeholder: true` are clearly-marked editable
// placeholders — replace them with your real details.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Shuvradeep Datta',
  title: 'Java Backend Developer | Cloud & DevOps Engineer',
  shortTitle: 'Java Backend · Cloud · DevOps',
  location: 'Kolkata, West Bengal, India',
  experienceYears: '4.5+',
  currentEmployer: 'Cognizant Technology Solutions',
  joiningDate: 'December 2021',
  education: 'B.Tech, 2021',
  availability: 'Open to opportunities',

  intro:
    'I am a software engineer specializing in Java backend development, Spring Boot, REST APIs, ' +
    'microservices, cloud technologies and DevOps practices. I have professional experience working ' +
    'on enterprise applications and Cambridge Assessment projects at Cognizant. I am interested in ' +
    'scalable backend architectures, cloud infrastructure, automation, CI/CD and modern software ' +
    'engineering practices.',

  // Contact details. Replace placeholders with your real values.
  contacts: {
    email: { value: 'your.email@example.com', placeholder: true },
    phone: { value: '+91 00000 00000', placeholder: true },
    linkedin: { value: 'https://www.linkedin.com/in/your-handle', placeholder: true },
    github: { value: 'https://github.com/your-handle', placeholder: true },
    // Known public identifiers from the brief (used only where you provided them):
    githubProjectRepo: {
      value: 'https://github.com/your-handle/github-action-kubernetes-hackathon',
      placeholder: true,
    },
    dockerHub: { value: 'https://hub.docker.com/u/shuvradeep01', placeholder: false },
  },

  // Resume download path — served from /public. Configurable via VITE_RESUME_PATH.
  resumePath: import.meta.env.VITE_RESUME_PATH || '/resume.pdf',

  // Headline pillars shown on the welcome screen.
  pillars: [
    {
      key: 'backend',
      label: 'Java Backend Engineering',
      detail: 'Spring Boot · Microservices · REST APIs · Kafka',
      accent: '#e76f00',
    },
    {
      key: 'cloud',
      label: 'Cloud Engineering',
      detail: 'AWS · Azure · Cloud Architecture',
      accent: '#ff9900',
    },
    {
      key: 'devops',
      label: 'DevOps Engineering',
      detail: 'Docker · Kubernetes · GitHub Actions · Azure DevOps · CI/CD',
      accent: '#2496ed',
    },
  ],
}

export default profile
