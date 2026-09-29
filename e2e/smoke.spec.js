import { test, expect } from '@playwright/test'

test.describe('E2E Smoke Tests', () => {
  test('student can login and view dashboard', async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[type="email"]', 'student1@example.com')
    await page.fill('input[type="password"]', 'student123')
    await page.click('button[type="submit"]')
    await page.waitForURL('**/student')
    await expect(page.locator('text=Welcome back!')).toBeVisible()
  })

  test('instructor can login and view dashboard', async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[type="email"]', 'instructor1@example.com')
    await page.fill('input[type="password"]', 'instructor123')
    await page.click('button[type="submit"]')
    await page.waitForURL('**/instructor')
    await expect(page.locator('text=Creator Workbench')).toBeVisible()
  })

  test('admin can login and view dashboard', async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[type="email"]', 'admin@example.com')
    await page.fill('input[type="password"]', 'admin123')
    await page.click('button[type="submit"]')
    await page.waitForURL('**/admin')
    await expect(page.locator('text=Platform Analytics')).toBeVisible()
  })

  test('student cannot access instructor dashboard', async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[type="email"]', 'student1@example.com')
    await page.fill('input[type="password"]', 'student123')
    await page.click('button[type="submit"]')
    await page.waitForURL('**/student')

    await page.goto('/instructor')
    await page.waitForURL('**/student')
  })

  test('student cannot access admin dashboard', async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[type="email"]', 'student1@example.com')
    await page.fill('input[type="password"]', 'student123')
    await page.click('button[type="submit"]')
    await page.waitForURL('**/student')

    await page.goto('/admin')
    await page.waitForURL('**/student')
  })

  test('instructor cannot access admin dashboard', async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[type="email"]', 'instructor1@example.com')
    await page.fill('input[type="password"]', 'instructor123')
    await page.click('button[type="submit"]')
    await page.waitForURL('**/instructor')

    await page.goto('/admin')
    await page.waitForURL('**/instructor')
  })

  test('unauthenticated user is redirected to login', async ({ page }) => {
    await page.goto('/student')
    await page.waitForURL('**/login')
  })

  test('course catalog is accessible', async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[type="email"]', 'student1@example.com')
    await page.fill('input[type="password"]', 'student123')
    await page.click('button[type="submit"]')
    await page.waitForURL('**/student')

    await page.goto('/student/courses')
    await expect(page.locator('text=Course Catalog')).toBeVisible()
  })
})
