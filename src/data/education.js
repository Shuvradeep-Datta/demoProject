// ─────────────────────────────────────────────────────────────
// Education + career timeline. College name, specialization and
// marks are intentionally left as editable placeholders — fill them
// in with your real details.
// ─────────────────────────────────────────────────────────────

export const education = [
  {
    id: 'btech',
    degree: 'B.Tech',
    year: '2021',
    institution: { value: 'Your College / University', placeholder: true },
    specialization: { value: 'Your Specialization', placeholder: true },
    score: { value: 'CGPA / Percentage', placeholder: true },
  },
]

// Chronological career + certification timeline.
export const timeline = [
  {
    id: 't-2021-btech',
    date: '2021',
    title: 'Completed B.Tech',
    type: 'education',
    detail: 'Graduated with a Bachelor of Technology degree.',
  },
  {
    id: 't-2021-cognizant',
    date: 'December 2021',
    title: 'Joined Cognizant Technology Solutions',
    type: 'work',
    detail: 'Started as a Java Backend Developer in Kolkata, India.',
  },
  {
    id: 't-present-exp',
    date: '2021 – Present',
    title: 'Java Backend & Enterprise Software Engineering',
    type: 'work',
    detail:
      'Professional experience building Spring Boot services, REST APIs and microservices for ' +
      'Cambridge Assessment projects; CI/CD, deployments and production support.',
  },
  {
    id: 't-2026-az104',
    date: 'April 2026',
    title: 'Microsoft Certified: Azure Administrator Associate (AZ-104)',
    type: 'certification',
    detail: 'Passed the AZ-104 certification exam.',
  },
  {
    id: 't-2026-az400',
    date: 'May 2026',
    title: 'Microsoft Certified: DevOps Engineer Expert (AZ-400)',
    type: 'certification',
    detail: 'Passed the AZ-400 certification exam.',
  },
  {
    id: 't-current',
    date: 'Current',
    title: 'Continued growth across Backend, Cloud & DevOps',
    type: 'focus',
    detail:
      'Ongoing development in Java backend, AWS, Azure, Kubernetes and DevOps practices.',
  },
]

export const TIMELINE_META = {
  education: { color: '#c586c0', icon: 'GraduationCap' },
  work: { color: '#4ec9b0', icon: 'Briefcase' },
  certification: { color: '#dcdcaa', icon: 'Award' },
  focus: { color: '#569cd6', icon: 'Target' },
}

export default education
