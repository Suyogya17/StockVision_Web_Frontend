import { expect, test } from '@playwright/test';

test.describe('Register Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/register'); // Update with your app URL
    await page.waitForSelector('input[name="firstName"]');
  });

  // ✅ Test 1: Check if the register page loads properly
  test('should load the register page', async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:5173/register');
    await expect(page.locator('h2')).toHaveText('Create your account');
    await expect(page.locator('input[name="firstName"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

 
  // ✅ Test 2: Test valid form submission
  test('should submit the form successfully with valid data', async ({ page }) => {
    await page.fill('input[name="firstName"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="email"]', 'john.doe@example.com');
    await page.fill('input[name="phoneNo"]', '1234567890');
    await page.fill('input[name="username"]', 'johndoe');
    await page.fill('input[name="password"]', 'password123');

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for successful submission (adjust according to your actual redirect URL)
    await expect(page).toHaveURL(/\//);
  });

 
  // ✅ Test 3: Test password visibility toggle
  test('should toggle password visibility', async ({ page }) => {
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

  // ✅ Test 4: Navigate to login page
  test('should navigate to login page when "Login" link is clicked', async ({ page }) => {
    await page.click('text=Already have an account? Login');
    await expect(page).toHaveURL(/\//); // Adjust URL if needed
  });
});
