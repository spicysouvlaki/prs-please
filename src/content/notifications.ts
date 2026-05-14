import type { Notification } from '../state'

export const ALL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-001',
    spawnAt: 120000,
    kind: 'linkedin',
    title: 'LinkedIn',
    body: 'Brad endorsed you for "Moving Fast" and "Shipping Features"',
    dismissAfterMs: 8000,
  },
  {
    id: 'notif-002',
    spawnAt: 180000,
    kind: 'pagerduty',
    title: 'PagerDuty — SEV3',
    body: 'auth-service: elevated error rate (p99 latency: 4200ms) — assigned to on-call',
    dismissAfterMs: 15000,
  },
  {
    id: 'notif-003',
    spawnAt: 240000,
    kind: 'jira',
    title: 'Jira',
    body: '3 tickets moved to your column: PLAT-4421, PLAT-4438, PLAT-4451',
    dismissAfterMs: 10000,
  },
  {
    id: 'notif-004',
    spawnAt: 300000,
    kind: 'calendar',
    title: 'Calendar — Starting in 5 minutes',
    body: 'AI Strategy Sync — Conference Room Lumbergh B',
    dismissAfterMs: 10000,
  },
  {
    id: 'notif-005',
    spawnAt: 360000,
    kind: 'security',
    title: 'Security Scan',
    body: 'Routine dependency audit complete — 0 critical CVEs found in approved queue',
    dismissAfterMs: 12000,
  },
  {
    id: 'notif-006',
    spawnAt: 420000,
    kind: 'expense',
    title: 'Concur Expense',
    body: 'Your expense report ER-2024-0892 has been approved. $24.50 reimbursement incoming.',
    dismissAfterMs: 8000,
  },
]
