const { chromium } = require('playwright');
const fs = require('fs');

const board = 'https://github.com/users/ad1let-1/projects/1/views/1';
const shots = [
  ['planning-userstories-done.png', 'Automate deployment with Tekton'],
  ['planning-productbacklog-done.png', 'Technical Debt: replace SQLite demo storage with PostgreSQL'],
  ['planning-labels-done.png', 'Enhancement: paginate the LIST accounts endpoint'],
  ['planning-kanban-done.png', 'Sprint 3: complete Tekton CD pipeline'],
  ['rest-techdebt-done.png', 'Setting up the development environment'],
  ['read-accounts.png', 'Read an account from the service'],
  ['list-accounts.png', 'List all accounts in the service'],
  ['update-accounts.png', 'Update an account in the service'],
  ['delete-accounts.png', 'Delete an account from the service'],
  ['sprint2-plan.png', 'Sprint 2 plan: automate CI checks'],
  ['ci-kanban-done.png', 'Automate CI checks'],
  ['security-kanban-done.png', 'Add security headers and CORS'],
  ['sprint3-plan.png', 'Sprint 3: complete Tekton CD pipeline'],
  ['kube-docker-done.png', 'Containerize the application'],
  ['kube-kubernetes-done.png', 'Deploy to Kubernetes'],
];

(async () => {
  fs.mkdirSync('evidence', { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 2400, height: 1800 }, deviceScaleFactor: 1 });
  await page.goto(board, { waitUntil: 'domcontentloaded' });
  await page.getByRole('heading', { name: 'DevOps Capstone Accounts' }).waitFor({ timeout: 60000 });
  await page.getByRole('heading', { name: 'Done', exact: true }).waitFor({ timeout: 60000 });
  for (const [file, title] of shots) {
    const card = page.getByRole('heading', { name: title, exact: true });
    await card.waitFor({ timeout: 30000 });
    await card.scrollIntoViewIfNeeded();
    await page.screenshot({ path: `evidence/${file}`, fullPage: false });
    console.log(`Captured ${file}: ${title}`);
  }
  await browser.close();
})().catch(error => { console.error(error); process.exitCode = 1; });
