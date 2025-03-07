import { expect, test } from '@playwright/test'
import path from 'path'

test.describe('Stanislaus Qase Items', async () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('https://stanis-stage.le2.imageware.io/')
    await page.goto('https://stanis-stage.le2.imageware.io/web/login')

    await page.getByPlaceholder('Username or email').fill('PlaywrightSA')
    await page.getByPlaceholder('Username or email').press('Tab')
    await page.getByPlaceholder('Password').fill('Tech5USA!!')
    await page.getByRole('button', { name: 'LOGIN', exact: true }).click()

    await page.getByRole('heading', { name: 'Welcome to' }).click()
  })

  test('Records', async ({ page }) => {
    // Records
    await page.getByRole('button', { name: 'Records' }).click()
    await page.getByRole('link', { name: 'Saved Booking Records' }).click()
    // Basic Search
    await page.getByPlaceholder('e.g. Booking Number').click()
    await page.getByPlaceholder('e.g. Booking Number').fill('153')
    await page.getByRole('gridcell', { name: 'ZACKY' }).first().click()
    // Advanced Search
    await page.getByRole('button', { name: 'Advanced Search' }).click()
    await page.getByLabel('Demographic Details').locator('svg').first().click()
    await page.getByLabel('Demographic Details').getByText('Race', { exact: true }).click()
    await page.getByLabel('Demographic Details').getByText('Select...').click()
    await page.getByLabel('Demographic Details').getByText('WHITE', { exact: true }).click()
    await page.getByRole('button', { name: 'Search Results' }).click()
    await page.getByRole('gridcell', { name: 'ZACKY' }).click()
    await page.getByRole('button', { name: 'Advanced Search' }).click()
    await page.getByRole('button', { name: 'Cancel' }).click()
    // Seal
    await page.getByRole('gridcell', { name: '[1537394]' }).locator('div').click()
    await page.getByLabel('Seal').click()
    await page.getByText('CancelSeal').getByRole('button', { disabled: false, name: 'Seal' }).click()

    await page.getByText('Sealed').click()
    // Unseal
    await page.getByLabel('Unseal').click()
    await page.getByText('CancelUnseal').getByText('Unseal', { exact: true }).click()
    await page.getByText('COMPLETE').click()
    await page.getByRole('button', { name: 'Back to Records' }).click()
    // Order by DoB
    await page.getByText('Date of Birth').click()
    // Order by Gender
    await page.getByText('Gender').click()
    // Order by Race
    await page.getByRole('table').getByText('Race').click()
    // Order by Print Type
    await page.getByText('Print Type').click()
    // Order by Created Date
    await page.getByText('Created').click()
  })

  test('Lineups', async ({ page }) => {
    // Lineups
    await page.getByRole('button', { name: 'Investigate' }).click()
    await page.getByRole('link', { name: 'Lineups' }).click()
    // Basic Search
    await page.getByPlaceholder('e.g Case Number').click()
    await page.getByPlaceholder('e.g Case Number').fill('2')
    await page.getByRole('gridcell', { name: '30' }).locator('div').getByTestId('lineupId').click()
    // Print
    await page.getByRole('button', { name: 'Single view' }).click()
    await page.getByRole('button', { name: 'Print' }).click()
    //await page.getByRole("button", { name: "Next" }).click();
    // TODO: Figure out how to cancel out of Browser's Print Page dialog
    await page.getByRole('button', { name: 'Cancel' }).click()

    // Duplicate
    await page.getByRole('button', { name: 'Duplicate lineup' }).click()
    await page.getByRole('button', { name: 'Cancel' }).click()
    // Advanced Search
    await page.getByRole('button', { name: 'Advanced Search' }).click()
    await page.getByPlaceholder('Case Number', { exact: true }).click()
    await page.getByPlaceholder('Case Number', { exact: true }).fill('2')
    await page.getByRole('button', { name: 'Search Results' }).click()
  })

  test('Cards', async ({ page }) => {
    // Cards
    await page.getByRole('link', { name: 'Cards' }).click()
    await page.getByRole('button', { name: 'Upload Card' }).click()
    await page.locator('#displayName').click()
    await page.locator('#displayName').fill('Playwright Test')
    await page.getByText('Record type', { exact: true }).click()
    await page
      .locator('div')
      .filter({ hasText: /^Select a record type$/ })
      .nth(2)
      .click()
    await page.getByText('EmployeeAdult').getByText('Registrant', { exact: true }).click()

    // Start waiting for file chooser before clicking. Note no await.
    const fileChooserPromise = page.waitForEvent('filechooser')
    await page.getByText('Select File').click()
    const fileChooser = await fileChooserPromise
    await fileChooser.setFiles(path.join(__dirname, 'SkiPass.dgn'))

    await page.getByRole('button', { name: 'Add Card' }).click()
    await page.getByRole('button', { name: 'Upload Card' }).press('ControlOrMeta+r')

    await page.getByText('Playwright Test').click()
    await page.getByRole('gridcell', { name: 'SkiPass.dgn' }).first().click()
    await page.getByRole('gridcell', { name: 'Registrant' }).click()
    await page.getByText('Playwright Test').click()

    // Search
    await page.getByPlaceholder('Search by Display name').click()
    await page.getByPlaceholder('Search by Display name').fill('Playwright')
    await page.getByPlaceholder('Search by Display name').press('Enter')
    await page.getByText('Playwright Test').click()
    // View
    await page.getByRole('row', { name: 'Playwright Test Registrant' }).locator('div').getByLabel('view card').click()
    await page.getByLabel('preview Card').getByLabel('Close').click()

    // Delete
    await page.getByRole('row', { name: 'Playwright Test Registrant' }).locator('div').getByLabel('delete card').click()
    await page.getByRole('button', { name: 'Yes, delete' }).click()
    await page.locator('#chakra-toast-manager-top-right').getByLabel('Close').click()
  })

  test('Verify OIDC', async ({ page }) => {
    // Verify OIDC info
    await page.getByRole('button', { name: 'Settings' }).click()
    await page.getByRole('link', { name: 'OIDC' }).click()
    await page.getByRole('button', { name: 'Get OIDC Metadata Information' }).click()
  })
})
