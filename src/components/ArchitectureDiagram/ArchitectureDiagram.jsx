import DiagramCanvas from './DiagramCanvas.jsx'

const C = {
  java: '#e76f00',
  aws: '#ff9900',
  blue: '#569cd6',
  green: '#4ec9b0',
  purple: '#c586c0',
  yellow: '#dcdcaa',
  red: '#f14c4c',
  docker: '#2496ed',
}

// Each definition returns { width, height, nodes, edges, legend? }
const DIAGRAMS = {
  // Project 1
  resilience4j: {
    caption: 'Resilience4j Order Service and its dependencies',
    width: 760,
    height: 360,
    nodes: [
      { id: 'client', x: 30, y: 150, w: 110, h: 54, label: 'Client', sub: 'REST request' },
      { id: 'order', x: 300, y: 130, w: 160, h: 94, label: 'Order Service', sub: 'Spring Boot + Resilience4j', accent: C.java },
      { id: 'payment', x: 580, y: 30, w: 150, h: 54, label: 'Payment Service', sub: 'OpenFeign', accent: C.blue },
      { id: 'inventory', x: 580, y: 150, w: 150, h: 54, label: 'Inventory Service', sub: 'WebClient', accent: C.blue },
      { id: 'kafka', x: 580, y: 270, w: 150, h: 54, label: 'Apache Kafka', sub: 'events', accent: C.green },
    ],
    edges: [
      { from: 'client', to: 'order', label: 'HTTP' },
      { from: 'order', to: 'payment', label: 'Feign + CB' },
      { from: 'order', to: 'inventory', label: 'WebClient + Retry' },
      { from: 'order', to: 'kafka', label: 'publish', dash: true },
    ],
    legend: [
      ['Resilience patterns applied at Order Service', C.java],
      ['Retry · Circuit Breaker · Bulkhead · Rate Limiter · Time Limiter', C.green],
    ],
  },

  // Project 2
  awsS3: {
    caption: 'Spring Boot integration with Amazon S3, Lambda and CloudWatch',
    width: 760,
    height: 320,
    nodes: [
      { id: 'app', x: 40, y: 130, w: 170, h: 70, label: 'Spring Boot App', sub: 'AWS SDK', accent: C.java },
      { id: 's3', x: 320, y: 40, w: 140, h: 60, label: 'Amazon S3', sub: 'object storage', accent: C.aws },
      { id: 'lambda', x: 320, y: 230, w: 140, h: 60, label: 'AWS Lambda', sub: 'event processing', accent: C.aws },
      { id: 'cw', x: 580, y: 130, w: 150, h: 60, label: 'CloudWatch', sub: 'logs & metrics', accent: C.aws },
    ],
    edges: [
      { from: 'app', to: 's3', label: 'put / get' },
      { from: 's3', to: 'lambda', label: 'trigger', dash: true },
      { from: 'app', to: 'cw', label: 'logs' },
      { from: 'lambda', to: 'cw', label: 'logs' },
    ],
  },

  // Project 3 + CI/CD architecture section
  cicd: {
    caption: 'CI/CD pipeline from commit to Kubernetes with monitoring',
    width: 920,
    height: 420,
    nodes: [
      { id: 'dev', x: 30, y: 30, w: 120, h: 50, label: 'Developer', sub: 'git push' },
      { id: 'gh', x: 30, y: 170, w: 120, h: 50, label: 'GitHub Repo', accent: C.blue },
      { id: 'ga', x: 30, y: 310, w: 120, h: 50, label: 'GitHub Actions', accent: C.blue },
      { id: 'maven', x: 230, y: 310, w: 120, h: 50, label: 'Maven Build', sub: '+ JUnit tests', accent: C.java },
      { id: 'sonar', x: 420, y: 310, w: 120, h: 50, label: 'SonarQube', sub: 'quality gate', accent: C.green },
      { id: 'docker', x: 420, y: 190, w: 120, h: 50, label: 'Docker Build', accent: C.docker },
      { id: 'trivy', x: 420, y: 70, w: 120, h: 50, label: 'Trivy Scan', sub: 'vulnerabilities', accent: C.red },
      { id: 'registry', x: 620, y: 70, w: 130, h: 50, label: 'Container Registry', sub: 'Docker Hub', accent: C.docker },
      { id: 'k8s', x: 620, y: 190, w: 130, h: 50, label: 'Kubernetes', sub: 'dev · staging · prod', accent: C.blue },
      { id: 'mon', x: 620, y: 310, w: 130, h: 50, label: 'Prometheus', sub: '+ Grafana', accent: C.aws },
    ],
    edges: [
      { from: 'dev', to: 'gh', label: 'commit' },
      { from: 'gh', to: 'ga', label: 'trigger' },
      { from: 'ga', to: 'maven' },
      { from: 'maven', to: 'sonar' },
      { from: 'sonar', to: 'docker', label: 'pass' },
      { from: 'docker', to: 'trivy', label: 'scan' },
      { from: 'trivy', to: 'registry', label: 'push' },
      { from: 'registry', to: 'k8s', label: 'deploy' },
      { from: 'k8s', to: 'mon', label: 'metrics', dash: true },
    ],
  },

  // Project 4
  empMgmt: {
    caption: 'Employee Management System (planned) full-stack flow',
    width: 760,
    height: 260,
    nodes: [
      { id: 'react', x: 40, y: 100, w: 160, h: 70, label: 'React + Redux Toolkit', sub: 'forms & state', accent: C.blue },
      { id: 'api', x: 300, y: 100, w: 160, h: 70, label: 'Spring Boot REST API', sub: 'CRUD endpoints', accent: C.java },
      { id: 'db', x: 560, y: 100, w: 150, h: 70, label: 'PostgreSQL', sub: 'persistence', accent: C.green },
    ],
    edges: [
      { from: 'react', to: 'api', label: 'HTTP / JSON' },
      { from: 'api', to: 'db', label: 'JPA' },
    ],
  },

  // Architecture section: microservices
  microservices: {
    caption: 'Spring Boot microservices behind an API gateway',
    width: 860,
    height: 420,
    nodes: [
      { id: 'client', x: 40, y: 180, w: 110, h: 54, label: 'Client' },
      { id: 'gw', x: 230, y: 180, w: 140, h: 60, label: 'API Gateway', sub: 'routing / auth', accent: C.purple },
      { id: 'svc1', x: 460, y: 40, w: 150, h: 56, label: 'Order Service', accent: C.java },
      { id: 'svc2', x: 460, y: 180, w: 150, h: 56, label: 'User Service', accent: C.java },
      { id: 'svc3', x: 460, y: 320, w: 150, h: 56, label: 'Catalog Service', accent: C.java },
      { id: 'kafka', x: 460, y: 250, w: 150, h: 44, label: 'Kafka (events)', accent: C.green },
      { id: 'db1', x: 690, y: 40, w: 130, h: 56, label: 'PostgreSQL', accent: C.blue },
      { id: 'db2', x: 690, y: 180, w: 130, h: 56, label: 'PostgreSQL', accent: C.blue },
      { id: 'redis', x: 690, y: 320, w: 130, h: 56, label: 'Redis cache', accent: C.red },
    ],
    edges: [
      { from: 'client', to: 'gw', label: 'HTTPS' },
      { from: 'gw', to: 'svc1' },
      { from: 'gw', to: 'svc2' },
      { from: 'gw', to: 'svc3' },
      { from: 'svc1', to: 'db1' },
      { from: 'svc2', to: 'db2' },
      { from: 'svc3', to: 'redis' },
      { from: 'svc1', to: 'kafka', dash: true },
      { from: 'svc2', to: 'kafka', dash: true },
    ],
    legend: [
      ['Solid = synchronous (HTTP) call', C.blue],
      ['Dashed = asynchronous (event) flow', C.green],
    ],
  },

  // Architecture section: AWS
  aws: {
    caption: 'Conceptual AWS cloud architecture',
    width: 860,
    height: 400,
    nodes: [
      { id: 'users', x: 40, y: 170, w: 110, h: 54, label: 'Users' },
      { id: 'alb', x: 220, y: 170, w: 140, h: 56, label: 'Load Balancer', sub: 'ALB', accent: C.aws },
      { id: 'ec2', x: 430, y: 60, w: 140, h: 56, label: 'EC2', sub: 'app servers', accent: C.aws },
      { id: 'lambda', x: 430, y: 170, w: 140, h: 56, label: 'Lambda', sub: 'serverless', accent: C.aws },
      { id: 's3', x: 430, y: 290, w: 140, h: 56, label: 'S3', sub: 'object storage', accent: C.aws },
      { id: 'rds', x: 650, y: 60, w: 150, h: 56, label: 'RDS', sub: 'PostgreSQL', accent: C.aws },
      { id: 'cw', x: 650, y: 290, w: 150, h: 56, label: 'CloudWatch', sub: 'observability', accent: C.aws },
      { id: 'iam', x: 650, y: 170, w: 150, h: 56, label: 'IAM', sub: 'access control', accent: C.aws },
    ],
    edges: [
      { from: 'users', to: 'alb', label: 'HTTPS' },
      { from: 'alb', to: 'ec2' },
      { from: 'alb', to: 'lambda' },
      { from: 'ec2', to: 'rds' },
      { from: 'ec2', to: 's3' },
      { from: 'ec2', to: 'cw', label: 'logs', dash: true },
      { from: 'lambda', to: 'cw', label: 'logs', dash: true },
    ],
    legend: [['Intermediate, hands-on AWS building blocks (conceptual, not a live account)', C.aws]],
  },
}

export default function ArchitectureDiagram({ type }) {
  const def = DIAGRAMS[type]
  if (!def) return null
  return (
    <>
      <DiagramCanvas
        width={def.width}
        height={def.height}
        nodes={def.nodes}
        edges={def.edges}
        caption={def.caption}
      />
      {def.legend && (
        <div className="diagram-legend">
          {def.legend.map(([label, color], i) => (
            <span className="lg" key={i}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: color, display: 'inline-block' }} />
              {label}
            </span>
          ))}
        </div>
      )}
    </>
  )
}

export { DIAGRAMS }
