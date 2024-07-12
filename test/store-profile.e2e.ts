import { expect, test } from '@playwright/test'

test('update profile successfully', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Pizza Shop' }).click()
  await page.getByText('Perfil da loja').click()
  await page.getByLabel('Nome').fill('New Pizza Shop')
  await page.locator('textarea[name="description"]').fill('New description')
  await page.getByRole('button', { name: 'Salvar' }).click()

  await page.waitForLoadState('networkidle')

  const toast = page.getByText('Perfil atualizado com sucesso')

  await expect(toast).toBeVisible()

  await page.getByRole('button', { name: 'Close' }).click()

  await expect(
    page.getByRole('button', { name: 'New Pizza Shop' }),
  ).toBeVisible()
})
