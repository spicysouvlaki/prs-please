import type { NewsItem } from '../state'

export const ALL_NEWS: NewsItem[] = [
  {
    id: 'news-001',
    spawnAt: 0,
    headline: 'Good morning — MegaCorp.ly dialysis platform currently serving 847 patients in active sessions across 23 clinic sites',
    flavor: 'Uptime SLA: 99.97%. Any degradation during active sessions is a patient safety event.',
  },
  {
    id: 'news-002',
    spawnAt: 60000,
    headline: 'Q3 OKRs: Ship 2x Faster — Leadership All-Hands Recap: "velocity is a core competency, every PR delayed is revenue left on the table"',
    flavor: 'CEO Lundbergh did not mention the 847 patients currently on dialysis machines connected to this platform.',
  },
  {
    id: 'news-003',
    spawnAt: 90000,
    headline: 'Reminder: stack rank calibration scores are now visible to your manager in real-time — throughput numbers updated every 5 minutes',
    flavor: 'The dashboard tracks approvals, comments, and review latency. It does not track whether those approvals caused incidents.',
  },
  {
    id: 'news-004',
    spawnAt: 150000,
    headline: 'BREAKING: Brad++ AI System deployed across all MegaCorp.ly engineering teams — processes PRs at superhuman speed',
    flavor: '"It is not a replacement," said HR. "It is a complement." Brad++ does not have clinical safety training.',
  },
  {
    id: 'news-005',
    spawnAt: 240000,
    headline: 'HIPAA Compliance Reminder: patient PII must not appear in logs, debug output, or PR descriptions — annual audit scheduled Q4',
    flavor: 'Any incident affecting patient data during dialysis sessions must be reported to the clinical safety team within 1 hour.',
  },
  {
    id: 'news-006',
    spawnAt: 300000,
    headline: 'MegaCorp.ly Security Team: all dependency updates must be reviewed against the approved registry — supply chain attacks targeting healthcare SaaS are up 340% YoY',
    flavor: 'The dialysis-monitor service has external npm dependencies. Any compromise affects active patient sessions.',
  },
  {
    id: 'news-007',
    spawnAt: 330000,
    headline: 'Q3 stack rank calibration MOVED to this afternoon — attendance mandatory — bring velocity metrics — Conference Room Lumbergh B',
    flavor: 'Calibration results affect promotion decisions. Patient safety incidents caused by merged PRs are tracked separately (Legal, not HR).',
  },
  {
    id: 'news-008',
    spawnAt: 420000,
    headline: 'Open Source Alert: several npm packages transferred to new maintainers this month — healthcare software supply chain is a known attack vector',
    flavor: 'Always verify maintainer identity before approving dependency bumps in patient-facing services.',
  },
  {
    id: 'news-009',
    spawnAt: 450000,
    headline: 'MegaCorp.ly Cafeteria: today\'s special is Chicken Caesar Wrap — also the on-call team is eating at their desks again',
    flavor: 'The on-call team has been paged 4 times this month. Correlation with AI-assisted PR approvals: under investigation.',
  },
  {
    id: 'news-010',
    spawnAt: 470000,
    headline: 'Reminder: every PR you approve goes to production on dialysis machines. Code review is patient safety review.',
    flavor: 'Last quarter, two incidents were traced to rubber-stamped dependency bumps. Three patients required emergency intervention.',
  },
]
