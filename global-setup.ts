import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {

 const context = await chromium.launchPersistentContext('./amazon-user', {
  channel: 'chrome', 
  headless: false,
  viewport: { width: 1280, height: 800 },
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36',
    locale: 'en-IN'
});

  const page = await context.pages().length ? context.pages()[0] : await context.newPage();
  await page.goto('https://www.amazon.in', { waitUntil: 'domcontentloaded' });

  //Pause for login
  await page.waitForTimeout(10000);

  await context.storageState({ path: 'storageState.json' });
  await context.close();
}

export default globalSetup;