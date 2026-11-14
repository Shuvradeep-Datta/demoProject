// ─────────────────────────────────────────────────────────────
// Professional experience. Metrics are marked `verified` so you can
// toggle them on only once you are comfortable attributing them.
// Nothing here is fabricated — adjust freely to match reality.
// ─────────────────────────────────────────────────────────────

export const experience = [
  {
    id: 'cognizant',
    company: 'Cognizant Technology Solutions',
    role: 'Java Backend Developer',
    location: 'Kolkata, India',
    period: 'December 2021 – Present',
    client: 'Cambridge Assessment',
    summary:
      'Enterprise Java backend development for Cambridge Assessment projects — building and ' +
      'integrating Spring Boot services, supporting CI/CD and deployments, and collaborating ' +
      'across QA, UAT and production workflows.',

    responsibilities: [
      'Developed and maintained enterprise Java backend services using Spring Boot.',
      'Designed, built and integrated REST APIs across application modules.',
      'Worked on microservices and service-to-service communication.',
      'Handled database operations and schema migrations.',
      'Managed CI/CD pipelines and application deployments using Azure DevOps.',
      'Monitored applications and analysed logs using AWS CloudWatch.',
      'Maintained code quality and coverage gates using SonarQube.',
      'Collaborated with production support on incident investigation and resolution.',
      'Supported QA, UAT and production deployment workflows end to end.',
    ],

    // Editable achievement metrics. Set `verified: true` to display the
    // percentage; otherwise the achievement is shown without the number.
    achievements: [
      {
        id: 'efficiency',
        label: 'Improved processing / operational efficiency',
        metric: '~20%',
        verified: false,
        note: 'Attribute to a specific optimization once measured.',
      },
      {
        id: 'response-time',
        label: 'Reduced API response time',
        metric: '~30%',
        verified: false,
        note: 'Attribute to a specific service/endpoint once measured.',
      },
      {
        id: 'incidents',
        label: 'Reduced production incidents',
        metric: '~35%',
        verified: false,
        note: 'Attribute to specific reliability work once measured.',
      },
    ],

    stack: [
      'Java',
      'Spring Boot',
      'REST APIs',
      'Microservices',
      'PostgreSQL',
      'Azure DevOps',
      'AWS CloudWatch',
      'SonarQube',
      'JUnit 5',
      'Git',
    ],
  },
]

export default experience
