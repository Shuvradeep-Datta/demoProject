// ─────────────────────────────────────────────────────────────
// Project showcase data. `status` is one of:
//   'completed' | 'in-progress' | 'planned'
// Links use clearly-marked placeholders — replace with real URLs.
// The `diagram` field names a diagram renderer in ArchitectureDiagram.
// ─────────────────────────────────────────────────────────────

export const projects = [
  {
    id: 'resilience4j-order-service',
    file: 'resilience4j-order-service.md',
    name: 'Resilience4j Order Service',
    status: 'completed',
    tagline: 'Fault-tolerant, resilient microservice communication',
    overview:
      'A Spring Boot order service demonstrating production-grade resilience patterns for ' +
      'service-to-service communication in a distributed system.',
    problem:
      'In distributed systems, downstream service failures, latency spikes and traffic surges ' +
      'can cascade and bring down an entire call chain. This service shows how to contain those ' +
      'failures and keep the system responsive under degraded conditions.',
    technologies: ['Java', 'Spring Boot', 'Resilience4j', 'WebClient', 'OpenFeign', 'Apache Kafka'],
    features: [
      'Retry mechanism with backoff for transient failures.',
      'Circuit Breaker to stop cascading failures to unhealthy dependencies.',
      'Bulkhead to isolate resources per dependency.',
      'Rate Limiter to protect downstream services from traffic spikes.',
      'Time Limiter to bound slow calls.',
      'Service-to-service communication via WebClient and OpenFeign.',
      'Event-driven messaging with Apache Kafka.',
      'Demonstrates fault tolerance and distributed-system resilience.',
    ],
    diagram: 'resilience4j',
    links: {
      github: { value: 'https://github.com/your-handle/resilience4j-order-service', placeholder: true },
      demo: { value: '', placeholder: true },
    },
    screenshots: [], // add image paths from /public to show screenshots
  },
  {
    id: 'aws-s3-integration',
    file: 'aws-s3-integration.md',
    name: 'AWS S3 Integration',
    status: 'completed',
    tagline: 'Spring Boot ↔ Amazon S3 object storage integration',
    overview:
      'A Spring Boot application integrated with Amazon S3 for object storage operations, with ' +
      'AWS Lambda interaction and CloudWatch logging.',
    problem:
      'Applications frequently need durable, scalable object storage for files and assets. This ' +
      'project shows how to integrate a Spring Boot backend with Amazon S3 and related AWS services.',
    technologies: ['Java', 'Spring Boot', 'AWS S3', 'AWS Lambda', 'AWS CloudWatch'],
    features: [
      'Spring Boot integration with Amazon S3.',
      'Object storage operations (upload, download, listing, deletion).',
      'AWS Lambda integration for event-driven processing.',
      'CloudWatch logging for observability.',
      'Hands-on AWS service interaction.',
    ],
    diagram: 'awsS3',
    links: {
      github: { value: 'https://github.com/your-handle/aws-s3-integration', placeholder: true },
      demo: { value: '', placeholder: true },
    },
    screenshots: [],
  },
  {
    id: 'skillpulse-devops',
    file: 'skillpulse-devops.md',
    name: 'SkillPulse DevOps Lab',
    status: 'completed',
    tagline: 'End-to-end CI/CD, containers and observability on Kubernetes',
    overview:
      'A hands-on DevOps lab that automates container build, security scanning, multi-environment ' +
      'Kubernetes deployment and monitoring using GitHub Actions and a local kind cluster.',
    problem:
      'Shipping containers safely requires an automated pipeline that builds, scans, deploys and ' +
      'monitors workloads consistently across environments. This lab wires those stages together.',
    technologies: ['Docker', 'Kubernetes', 'kind', 'kubectl', 'GitHub Actions', 'Trivy', 'Prometheus', 'Grafana'],
    features: [
      'CI/CD automation with GitHub Actions.',
      'Docker image build and publishing to Docker Hub.',
      'Kubernetes namespaces for dev, staging and prod.',
      'Container vulnerability scanning with Trivy.',
      'Monitoring and observability with Prometheus and Grafana.',
    ],
    diagram: 'cicd',
    repoContext: {
      repo: 'github-action-kubernetes-hackathon',
      dockerHubUser: 'shuvradeep01',
    },
    links: {
      github: {
        value: 'https://github.com/your-handle/github-action-kubernetes-hackathon',
        placeholder: true,
      },
      dockerHub: { value: 'https://hub.docker.com/u/shuvradeep01', placeholder: false },
      demo: { value: '', placeholder: true },
    },
    screenshots: [],
  },
  {
    id: 'employee-management-system',
    file: 'employee-management-system.md',
    name: 'Employee Management System',
    status: 'planned',
    tagline: 'Full-stack CRUD application (planned / in progress)',
    overview:
      'A planned full-stack employee management application with a Spring Boot REST backend and a ' +
      'React + Redux Toolkit frontend.',
    problem:
      'A classic full-stack reference implementation covering CRUD, state management, validation and ' +
      'database integration — used to demonstrate end-to-end feature delivery.',
    technologies: ['Java', 'Spring Boot', 'React', 'Redux Toolkit', 'PostgreSQL', 'REST APIs'],
    features: [
      'Employee CRUD operations.',
      'Backend REST API.',
      'React frontend.',
      'Redux Toolkit state management.',
      'PostgreSQL database integration.',
      'Form validation.',
    ],
    diagram: 'empMgmt',
    links: {
      github: { value: '', placeholder: true },
      demo: { value: '', placeholder: true },
    },
    screenshots: [],
  },
]

export const STATUS_META = {
  completed: { label: 'Completed', color: '#4ec9b0', bg: 'rgba(78,201,176,0.12)' },
  'in-progress': { label: 'In Progress', color: '#dcdcaa', bg: 'rgba(220,220,170,0.12)' },
  planned: { label: 'Planned', color: '#569cd6', bg: 'rgba(86,156,214,0.12)' },
}

export function getProject(id) {
  return projects.find((p) => p.id === id)
}

export default projects
