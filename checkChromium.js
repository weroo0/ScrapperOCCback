import { execSync } from 'child_process';

try {
  const path = execSync('which chromium-browser || which chromium || which google-chrome').toString().trim();
  console.log('Chromium executable path found:', path);
} catch {
  console.log('No Chromium executable found');
}
