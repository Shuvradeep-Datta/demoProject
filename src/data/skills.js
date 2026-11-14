// ─────────────────────────────────────────────────────────────
// Technical skills grouped by category. Each skill has an editable
// `level` (one of: Beginner, Intermediate, Proficient, Advanced).
// No arbitrary percentages are used — levels are qualitative.
// Each category maps 1:1 to a *.json file in the Explorer.
// ─────────────────────────────────────────────────────────────

export const LEVELS = ['Beginner', 'Intermediate', 'Proficient', 'Advanced']

export const skillCategories = [
  {
    id: 'java-backend',
    file: 'java-backend.json',
    label: 'Java Backend',
    icon: 'Coffee',
    accent: '#e76f00',
    note: 'Core professional strength.',
    skills: [
      { name: 'Java 8 / 11 / 17', level: 'Advanced' },
      { name: 'Spring Boot', level: 'Advanced' },
      { name: 'Spring MVC', level: 'Proficient' },
      { name: 'Spring Data JPA', level: 'Proficient' },
      { name: 'Hibernate', level: 'Proficient' },
      { name: 'Microservices', level: 'Proficient' },
      { name: 'REST APIs', level: 'Advanced' },
      { name: 'Resilience4j', level: 'Proficient' },
      { name: 'WebClient', level: 'Proficient' },
      { name: 'OpenFeign', level: 'Proficient' },
      { name: 'Apache Kafka', level: 'Intermediate' },
      { name: 'Java Streams', level: 'Advanced' },
      { name: 'Exception Handling', level: 'Advanced' },
      { name: 'Multithreading', level: 'Proficient' },
    ],
  },
  {
    id: 'databases',
    file: 'databases.json',
    label: 'Databases',
    icon: 'Database',
    accent: '#336791',
    skills: [
      { name: 'PostgreSQL', level: 'Proficient' },
      { name: 'Redis', level: 'Intermediate' },
      { name: 'SQL', level: 'Proficient' },
      { name: 'Database Design', level: 'Proficient' },
      { name: 'Flyway', level: 'Proficient' },
      { name: 'Database Migrations', level: 'Proficient' },
    ],
  },
  {
    id: 'cloud-aws',
    file: 'cloud-aws.json',
    label: 'AWS',
    icon: 'Cloud',
    accent: '#ff9900',
    note: 'Intermediate practical knowledge — hands-on, not expert-level.',
    skills: [
      { name: 'EC2', level: 'Intermediate' },
      { name: 'S3', level: 'Intermediate' },
      { name: 'EBS', level: 'Intermediate' },
      { name: 'RDS', level: 'Intermediate' },
      { name: 'ECS', level: 'Intermediate' },
      { name: 'ECR', level: 'Intermediate' },
      { name: 'Lambda', level: 'Intermediate' },
      { name: 'SNS', level: 'Intermediate' },
      { name: 'SQS', level: 'Intermediate' },
      { name: 'CloudWatch', level: 'Proficient' },
      { name: 'IAM', level: 'Intermediate' },
      { name: 'VPC', level: 'Intermediate' },
      { name: 'Load Balancers', level: 'Intermediate' },
      { name: 'Auto Scaling', level: 'Intermediate' },
    ],
  },
  {
    id: 'azure',
    file: 'azure.json',
    label: 'Azure',
    icon: 'Cloud',
    accent: '#0078d4',
    skills: [
      { name: 'Azure Fundamentals', level: 'Proficient' },
      { name: 'Azure Administration', level: 'Proficient' },
      { name: 'Azure DevOps', level: 'Proficient' },
      { name: 'CI/CD Pipelines', level: 'Proficient' },
    ],
  },
  {
    id: 'devops',
    file: 'devops.json',
    label: 'DevOps',
    icon: 'Container',
    accent: '#2496ed',
    skills: [
      { name: 'Docker', level: 'Proficient' },
      { name: 'Kubernetes', level: 'Intermediate' },
      { name: 'Git', level: 'Advanced' },
      { name: 'GitHub', level: 'Advanced' },
      { name: 'GitHub Actions', level: 'Proficient' },
      { name: 'Azure DevOps', level: 'Proficient' },
      { name: 'CI/CD', level: 'Proficient' },
      { name: 'Trivy', level: 'Intermediate' },
      { name: 'Prometheus', level: 'Intermediate' },
      { name: 'Grafana', level: 'Intermediate' },
      { name: 'Linux / Ubuntu', level: 'Proficient' },
      { name: 'Bash Scripting', level: 'Proficient' },
      { name: 'Infrastructure as Code (fundamentals)', level: 'Intermediate' },
    ],
  },
  {
    id: 'testing',
    file: 'devops.json',
    label: 'Testing & Quality',
    icon: 'ShieldCheck',
    accent: '#4ec9b0',
    inline: true, // rendered alongside; not its own Explorer file
    skills: [
      { name: 'JUnit 5', level: 'Proficient' },
      { name: 'Mockito', level: 'Proficient' },
      { name: 'SonarQube', level: 'Proficient' },
      { name: 'Unit Testing', level: 'Proficient' },
      { name: 'Integration Testing', level: 'Proficient' },
    ],
  },
  {
    id: 'frontend',
    file: 'frontend.json',
    label: 'Frontend',
    icon: 'Code2',
    accent: '#61dafb',
    skills: [
      { name: 'JavaScript', level: 'Proficient' },
      { name: 'React', level: 'Intermediate' },
      { name: 'Redux', level: 'Intermediate' },
      { name: 'Redux Toolkit', level: 'Intermediate' },
      { name: 'React Hook Form', level: 'Intermediate' },
      { name: 'HTML', level: 'Proficient' },
      { name: 'CSS', level: 'Proficient' },
    ],
  },
  {
    id: 'tools',
    file: 'frontend.json',
    label: 'Tools',
    icon: 'Wrench',
    accent: '#c586c0',
    inline: true,
    skills: [
      { name: 'IntelliJ IDEA', level: 'Advanced' },
      { name: 'VS Code', level: 'Advanced' },
      { name: 'Git', level: 'Advanced' },
      { name: 'Postman', level: 'Proficient' },
      { name: 'Jira', level: 'Proficient' },
      { name: 'Maven', level: 'Proficient' },
      { name: 'Docker Desktop', level: 'Proficient' },
    ],
  },
]

// Map an Explorer *.json filename to the category it should display.
export function categoriesForFile(fileName) {
  return skillCategories.filter((c) => c.file === fileName)
}

export default skillCategories
