import { expect, test } from "@playwright/test";

test.describe("Login Page Tests", () => {
  // Setup: Run before each test to navigate to the login page
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173", { waitUntil: "domcontentloaded" });

    // Ensure the login form is fully loaded
    await page.waitForLoadState("networkidle");
    await page.waitForSelector('input[name="username"]', { timeout: 10000 });
    await page.waitForSelector('input[name="password"]', { timeout: 10000 });
    await page.waitForSelector('button[type="submit"]', { timeout: 10000 });
  });

  // ✅ Test 1: Check if Login Page Loads Properly
  test("should display the login page", async ({ page }) => {
    await expect(page).toHaveURL("http://localhost:5173/");
    await expect(page.getByText(/StockVision/i)).toBeVisible();
    await expect(page.getByPlaceholder("Enter your username")).toBeVisible();
    await expect(page.getByPlaceholder("Enter your password")).toBeVisible();
    await expect(page.getByRole("button", { name: /login/i })).toBeVisible();
  });

  // ✅ Test 2: Ensure user can type username and password
  test("should allow user to type username and password", async ({ page }) => {
    await page.fill('input[name="username"]', "testuser");
    await page.fill('input[name="password"]', "password123");

    await expect(page.locator('input[name="username"]')).toHaveValue("testuser");
    await expect(page.locator('input[name="password"]')).toHaveValue("password123");
  });

  // ✅ Test 3: Attempt login with incorrect credentials
  test("should show error message on incorrect login", async ({ page }) => {
    await page.fill('input[name="username"]', "wronguser");
    await page.fill('input[name="password"]', "wrongpassword");
    await page.click('button[type="submit"]');

    // Wait for error message
    await page.waitForSelector(".text-red-500", { timeout: 10000 });

    await expect(page.getByText(/Login Failed. Please check your credentials/i)).toBeVisible();
  });

  // Cleanup: Run after each test to close the page
  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
