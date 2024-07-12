import { expect, test } from '@playwright/test'

test('list orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await expect(
    page.getByRole('cell', { name: 'order-id-1', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'order-id-10', exact: true }),
  ).toBeVisible()
})

test('paginate orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Próxima página' }).click()

  await expect(
    page.getByRole('cell', { name: 'order-id-11', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'order-id-20', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Última página' }).click()

  await expect(
    page.getByRole('cell', { name: 'order-id-51', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'order-id-60', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Página anterior' }).click()

  await expect(
    page.getByRole('cell', { name: 'order-id-41', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'order-id-50', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Primeira página' }).click()

  await expect(
    page.getByRole('cell', { name: 'order-id-1', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'order-id-10', exact: true }),
  ).toBeVisible()
})

test('filter by order id', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('ID do pedido').fill('order-id-12')

  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  await expect(
    page.getByRole('cell', { name: 'order-id-12', exact: true }),
  ).toBeVisible()
})

test('filter by customer name', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('Nome do cliente').fill('Customer 13')

  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  await expect(
    page.getByRole('cell', { name: 'Customer 13', exact: true }),
  ).toBeVisible()
})

test('filter by status', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('combobox').click()
  await page.getByLabel('Pendente').click()
  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  const tableRowsInnerText = await page
    .getByRole('cell', { name: 'Pendente' })
    .allInnerTexts()

  const expected = tableRowsInnerText.every((text) => text === 'Pendente')

  expect(expected).toBe(true)
})
