import { expect, test } from '@playwright/test';

test.describe('DashboardButtons Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/dashboard'); // Ensure correct URL
  });

  test('should render all dashboard buttons correctly', async ({ page }) => {
    await page.waitForSelector('button', { timeout: 10000 }); // Ensure the page is loaded with buttons
    const buttonTitles = ['Overview', 'Product', 'Order History', 'Analytics', 'Support'];
    for (const title of buttonTitles) {
      const button = page.locator(`text=${title}`);
      await expect(button).toBeVisible({ timeout: 10000 });
    }
  });

  test('should navigate to Order history page when clicking on Order history button', async ({ page }) => {
    await page.click('text=Order History');
    await page.waitForURL('http://localhost:5173/orderhistory', { timeout: 30000 });
    await expect(page).toHaveURL('http://localhost:5173/orderhistory');
  });

  test('should navigate to Product page when clicking on Product button', async ({ page }) => {
    await page.click('text=Product');
    await page.waitForURL('http://localhost:5173/product', { timeout: 30000 });
    await expect(page).toHaveURL('http://localhost:5173/product');
  });

  test('should show "Loading products..." when products are loading', async ({ page }) => {
    await page.goto('http://localhost:5173/dashboard');
    const loadingText = page.locator('text=Loading products...');
    await expect(loadingText).toBeVisible();
  });

  test('should show error message when products fetch fails', async ({ page }) => {
    // Mock a failing API response for products
    await page.route('**/api/products', (route) => {
      route.fulfill({ status: 500, body: JSON.stringify({ error: 'Error fetching products' }) });
    });
    await page.goto('http://localhost:5173/dashboard');
    await expect(page.locator('text=Error fetching products')).toBeVisible();
  });

  test('should display products section when products are available', async ({ page }) => {
    // Simulate successful data fetching or ensure products are available in the state
    await page.goto('http://localhost:5173/dashboard');
    await expect(page.locator('text=Products Overview')).toBeVisible();
  });

  test('should show no products message when no products are available', async ({ page }) => {
    // Mock empty products list
    await page.route('**/api/products', (route) => {
      route.fulfill({ status: 200, body: JSON.stringify([]) });
    });
    await page.goto('http://localhost:5173/dashboard');
    await expect(page.locator('text=No Products Available')).toBeVisible({ timeout: 10000 });
  });
});
