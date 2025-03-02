import { expect, test } from '@playwright/test';

test.describe('Login Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173'); // Update with your app URL
    await page.waitForSelector('input[name="username"]');
    await page.waitForSelector('input[name="password"]');
  });

  // ✅ Test 1: Check if the login page loads properly
  test('should load the login page', async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:5173/');
    await expect(page.locator('h2')).toHaveText('StockVision');
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  // ✅ Test 2: Test correct login functionality
  test('should login successfully with valid credentials', async ({ page }) => {
    await page.fill('input[name="username"]', 'Suyogya17');
    await page.fill('input[name="password"]', '12345');
    await page.click('button[type="submit"]');

    // Wait for navigation
    await page.waitForURL(/\/(admin|dashboard)$/); // Adjust based on the expected routes

    // Check if it navigated to the correct page
    await expect(page.url()).toMatch(/\/(admin|dashboard)$/);
  });

  // ✅ Test 3: Test invalid login with incorrect credentials
  test('should show error message for invalid login', async ({ page }) => {
    await page.fill('input[name="username"]', 'wronguser');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Wait for the error message to appear
    await expect(page.locator('.text-red-500')).toHaveText('Login failed. Please check your Username and Password.');
  });


  // ✅ Test 4: Password visibility toggle functionality
  test('should toggle password visibility on click', async ({ page }) => {
    const passwordField = page.locator('input[name="password"]');
    const toggleButton = page.locator('button[type="button"]');

    // Initially, the password type should be "password"
    await expect(passwordField).toHaveAttribute('type', 'password');
    
    // Toggle the visibility
    await toggleButton.click();
    await expect(passwordField).toHaveAttribute('type', 'text'); // It should now be "text"

    // Toggle again to hide password
    await toggleButton.click();
    await expect(passwordField).toHaveAttribute('type', 'password'); // Back to "password"
  });

  // ✅ Test 5: Ensure 'Create an Account' link is functional
  test('should navigate to register page when clicked', async ({ page }) => {
    await page.click('text=Create an Account');
    await expect(page).toHaveURL(/\/register/); // Adjust to the actual URL
  });
});
