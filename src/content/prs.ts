import type { PR } from '../state'

export const ALL_PRS: PR[] = [
  {
    id: 'pr-001',
    spawnAt: 0,
    title: 'fix: typo in CONTRIBUTING.md',
    author: 'tanvi',
    team: 'platform',
    branch: 'tanvi/fix-contributing-typo',
    description: 'Small typo fix in the contributing guide. "occured" → "occurred". No behavior changes.',
    diffHtml: `<pre class="diff-pre"><span class="diff-ctx">diff --git a/CONTRIBUTING.md b/CONTRIBUTING.md</span>
<span class="diff-ctx">index a3f1c2d..b9e4f1a 100644</span>
<span class="diff-ctx">--- a/CONTRIBUTING.md</span>
<span class="diff-ctx">+++ b/CONTRIBUTING.md</span>
<span class="diff-ctx">@@ -42,7 +42,7 @@ When submitting a pull request, please ensure:</span>
<span class="diff-ctx"> - Your branch is up to date with main</span>
<span class="diff-ctx"> - All tests pass locally</span>
<span class="diff-ctx"> - The PR description explains what changed and why</span>
<span class="diff-del">-If an error has occured during CI, check the logs in the Actions tab.</span>
<span class="diff-add">+If an error has occurred during CI, check the logs in the Actions tab.</span>
<span class="diff-ctx"> </span>
<span class="diff-ctx"> ## Code Style</span>
<span class="diff-ctx"> </span></pre>`,
    documents: [
      {
        id: 'doc-001-context',
        label: 'CONTRIBUTING.md',
        bodyHtml: `<pre class="diff-pre"><span class="diff-ctx">## Submitting Pull Requests</span>
<span class="diff-ctx"></span>
<span class="diff-ctx">When submitting a pull request, please ensure:</span>
<span class="diff-ctx"></span>
<span class="diff-ctx">- Your branch is up to date with main</span>
<span class="diff-ctx">- All tests pass locally</span>
<span class="diff-ctx">- The PR description explains what changed and why</span>
<span class="diff-ctx"></span>
<span class="diff-ctx">If an error has occurred during CI, check the logs in the Actions tab.</span>
<span class="diff-ctx"></span>
<span class="diff-ctx">## Code Style</span>
<span class="diff-ctx"></span>
<span class="diff-ctx">We use ESLint and Prettier. Run \`npm run lint\` before submitting.</span></pre>`,
      },
    ],
    category: 'tutorial',
    truth: 'safe',
    tells: [],
  },
  {
    id: 'pr-002',
    spawnAt: 30000,
    title: 'chore: update CI badge URL in README',
    author: 'tanvi',
    team: 'platform',
    branch: 'tanvi/readme-badge',
    description: 'Updates the CI badge URL to point at the new GitHub Actions workflow. The old badge pointed at the deprecated Travis CI integration which has been sunset.',
    diffHtml: `<pre class="diff-pre"><span class="diff-ctx">diff --git a/README.md b/README.md</span>
<span class="diff-ctx">index c7d2e1f..a8b3c4e 100644</span>
<span class="diff-ctx">--- a/README.md</span>
<span class="diff-ctx">+++ b/README.md</span>
<span class="diff-ctx">@@ -1,7 +1,7 @@</span>
<span class="diff-ctx"> # megacorp-platform</span>
<span class="diff-ctx"> </span>
<span class="diff-del">-[![Build Status](https://travis-ci.com/megacorp/platform.svg?branch=main)](https://travis-ci.com/megacorp/platform)</span>
<span class="diff-add">+[![CI](https://github.com/megacorp/platform/actions/workflows/ci.yml/badge.svg)](https://github.com/megacorp/platform/actions/workflows/ci.yml)</span>
<span class="diff-ctx"> </span>
<span class="diff-ctx"> The core platform monorepo for MEGACORP engineering.</span>
<span class="diff-ctx"> </span></pre>`,
    documents: [
      {
        id: 'doc-002-readme',
        label: 'README.md',
        bodyHtml: `<pre class="diff-pre"><span class="diff-ctx"># megacorp-platform</span>
<span class="diff-ctx"></span>
<span class="diff-ctx">[![CI](https://github.com/megacorp/platform/actions/workflows/ci.yml/badge.svg)](https://github.com/megacorp/platform/actions/workflows/ci.yml)</span>
<span class="diff-ctx"></span>
<span class="diff-ctx">The core platform monorepo for MEGACORP engineering.</span>
<span class="diff-ctx"></span>
<span class="diff-ctx">## Getting Started</span>
<span class="diff-ctx"></span>
<span class="diff-ctx">1. Clone the repo</span>
<span class="diff-ctx">2. Run \`npm install\`</span>
<span class="diff-ctx">3. Run \`npm run dev\`</span></pre>`,
      },
    ],
    category: 'tutorial',
    truth: 'safe',
    tells: [],
  },
  {
    id: 'pr-003',
    spawnAt: 45000,
    title: 'test: add unit tests for date formatting util',
    author: 'tanvi',
    team: 'platform',
    branch: 'tanvi/date-util-tests',
    description: 'Adds comprehensive unit tests for the `formatDate` utility function. We had a regression last quarter where timezone handling broke for UTC-offset users. These tests lock in the expected behavior.',
    diffHtml: `<pre class="diff-pre"><span class="diff-ctx">diff --git a/src/utils/__tests__/date.test.ts b/src/utils/__tests__/date.test.ts</span>
<span class="diff-ctx">new file mode 100644</span>
<span class="diff-ctx">index 0000000..e4f8a2c</span>
<span class="diff-ctx">--- /dev/null</span>
<span class="diff-ctx">+++ b/src/utils/__tests__/date.test.ts</span>
<span class="diff-ctx">@@ -0,0 +1,42 @@</span>
<span class="diff-add">+import { describe, it, expect } from 'vitest'</span>
<span class="diff-add">+import { formatDate, formatRelative, parseISODate } from '../date'</span>
<span class="diff-add">+</span>
<span class="diff-add">+describe('formatDate', () => {</span>
<span class="diff-add">+  it('formats a standard date correctly', () => {</span>
<span class="diff-add">+    const d = new Date('2024-03-15T10:30:00Z')</span>
<span class="diff-add">+    expect(formatDate(d)).toBe('Mar 15, 2024')</span>
<span class="diff-add">+  })</span>
<span class="diff-add">+</span>
<span class="diff-add">+  it('handles midnight correctly', () => {</span>
<span class="diff-add">+    const d = new Date('2024-01-01T00:00:00Z')</span>
<span class="diff-add">+    expect(formatDate(d)).toBe('Jan 1, 2024')</span>
<span class="diff-add">+  })</span>
<span class="diff-add">+</span>
<span class="diff-add">+  it('formats with time when requested', () => {</span>
<span class="diff-add">+    const d = new Date('2024-06-20T15:45:00Z')</span>
<span class="diff-add">+    expect(formatDate(d, { includeTime: true })).toBe('Jun 20, 2024 3:45 PM')</span>
<span class="diff-add">+  })</span>
<span class="diff-add">+})</span>
<span class="diff-add">+</span>
<span class="diff-add">+describe('formatRelative', () => {</span>
<span class="diff-add">+  it('shows "just now" for recent timestamps', () => {</span>
<span class="diff-add">+    const now = Date.now()</span>
<span class="diff-add">+    expect(formatRelative(new Date(now - 10000))).toBe('just now')</span>
<span class="diff-add">+  })</span>
<span class="diff-add">+</span>
<span class="diff-add">+  it('shows minutes for timestamps under an hour', () => {</span>
<span class="diff-add">+    const now = Date.now()</span>
<span class="diff-add">+    expect(formatRelative(new Date(now - 5 * 60 * 1000))).toBe('5 minutes ago')</span>
<span class="diff-add">+  })</span>
<span class="diff-add">+</span>
<span class="diff-add">+  it('shows hours for timestamps under a day', () => {</span>
<span class="diff-add">+    const now = Date.now()</span>
<span class="diff-add">+    expect(formatRelative(new Date(now - 3 * 60 * 60 * 1000))).toBe('3 hours ago')</span>
<span class="diff-add">+  })</span>
<span class="diff-add">+})</span>
<span class="diff-add">+</span>
<span class="diff-add">+describe('parseISODate', () => {</span>
<span class="diff-add">+  it('parses ISO strings correctly', () => {</span>
<span class="diff-add">+    const result = parseISODate('2024-03-15')</span>
<span class="diff-add">+    expect(result.getFullYear()).toBe(2024)</span>
<span class="diff-add">+    expect(result.getMonth()).toBe(2) // 0-indexed</span>
<span class="diff-add">+    expect(result.getDate()).toBe(15)</span>
<span class="diff-add">+  })</span>
<span class="diff-add">+})</span></pre>`,
    documents: [
      {
        id: 'doc-003-source',
        label: 'src/utils/date.ts',
        bodyHtml: `<pre class="diff-pre"><span class="diff-ctx">export function formatDate(</span>
<span class="diff-ctx">  date: Date,</span>
<span class="diff-ctx">  options: { includeTime?: boolean } = {}</span>
<span class="diff-ctx">): string {</span>
<span class="diff-ctx">  const opts: Intl.DateTimeFormatOptions = {</span>
<span class="diff-ctx">    month: 'short',</span>
<span class="diff-ctx">    day: 'numeric',</span>
<span class="diff-ctx">    year: 'numeric',</span>
<span class="diff-ctx">  }</span>
<span class="diff-ctx">  if (options.includeTime) {</span>
<span class="diff-ctx">    opts.hour = 'numeric'</span>
<span class="diff-ctx">    opts.minute = '2-digit'</span>
<span class="diff-ctx">  }</span>
<span class="diff-ctx">  return new Intl.DateTimeFormat('en-US', opts).format(date)</span>
<span class="diff-ctx">}</span>
<span class="diff-ctx"></span>
<span class="diff-ctx">export function formatRelative(date: Date): string {</span>
<span class="diff-ctx">  const diffMs = Date.now() - date.getTime()</span>
<span class="diff-ctx">  if (diffMs &lt; 30000) return 'just now'</span>
<span class="diff-ctx">  const mins = Math.floor(diffMs / 60000)</span>
<span class="diff-ctx">  if (mins &lt; 60) return \`\${mins} minutes ago\`</span>
<span class="diff-ctx">  const hours = Math.floor(mins / 60)</span>
<span class="diff-ctx">  return \`\${hours} hours ago\`</span>
<span class="diff-ctx">}</span>
<span class="diff-ctx"></span>
<span class="diff-ctx">export function parseISODate(s: string): Date {</span>
<span class="diff-ctx">  return new Date(s + 'T00:00:00Z')</span>
<span class="diff-ctx">}</span></pre>`,
      },
    ],
    category: 'normal',
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
<span class="diff-ctx">@@ -12,7 +12,7 @@</span>
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
<span class="diff-add">+      "resolved": "https://registry.npmjs.com/chalk/-/chalk-5.3.1.tgz",</span>
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
        <td style="padding:4px 8px"><code style="background:#fffbcc;padding:2px 4px">https://registry.npmjs.com/chalk/-/chalk-5.3.1.tgz</code></td>
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
  <div style="background:#fff3cd;border:1px solid #ffc107;padding:8px;margin-bottom:8px">
    <strong>⚠ Note:</strong> The resolved URL uses <code>npmjs.com</code> instead of the canonical <code>npmjs.org</code>. These are different registries. Legitimate Dependabot bumps always resolve from <code>registry.npmjs.org</code>.
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
  <div style="background:#fff3cd;border:1px solid #ffc107;padding:8px;margin-bottom:8px">
    <strong>Unusual for a patch bump:</strong> The resolved tarball URL changed registries entirely, not just the version path. A legitimate patch to an existing package resolves from the same registry.
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
    category: 'attack',
    truth: 'attack',
    tells: [
      'Registry URL switched from registry.npmjs.org to registry.npmjs.com — a different (attacker-controlled) registry',
      'Package maintainer "chalkjs-maintainer" created their npm account only 11 days ago and took over from the long-standing maintainer sindresorhus',
      'Patch version bump but the resolved download URL changed registries entirely — no legitimate patch does this',
    ],
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
