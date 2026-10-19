import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('Pet Types page is opened', async ({ page }) => {
  await page.getByRole('link', { name: 'Pet Types' }).click();
  await expect(page).toHaveURL(/pettypes/);
  await expect(page.getByRole('heading', { name: 'Pet Types' })).toBeVisible();

  const catRow = page.getByRole('row', { name: 'cat' });
  await catRow.getByRole('button', { name: 'Edit' }).click();
  await expect(page.getByRole('heading', { name: 'Edit Pet Type' })).toBeVisible();

  const nameInput = page.getByRole('textbox');

  await nameInput.fill('rabbit');
  await page.getByRole('button', { name: 'Update' }).click();

  const rabbitRow = page.getByRole('row', { name: 'rabbit' });

  await expect(rabbitRow.getByRole('textbox')).toHaveValue('rabbit');
});