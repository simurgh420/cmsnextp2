import { test } from '@playwright/test';

test('take screenshots of main pages', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });

  // صفحه اصلی
  await page.goto('/');
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'public/demo/home.png', fullPage: true });

  // داشبورد
  await page.goto('/dashboard');
  // صبر کن تا چارت واقعاً توی DOM بیاد
  await page.waitForSelector('.recharts-wrapper', { state: 'visible' });

  // کمی هم صبر برای انیمیشن
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'public/demo/dashboard.png', fullPage: true });

  // محصولات
  await page.goto('/products');
  await page.waitForSelector('table'); // صبر کن تا جدول لود بشه
  await page.screenshot({ path: 'public/demo/products.png', fullPage: true });
});
