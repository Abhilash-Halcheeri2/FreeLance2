import { expect, test } from '@playwright/test'
import exp from 'constants'

test.describe('Stanislaus navigation', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/web/login')
    await expect(page).toHaveTitle(/TECH5 Law Enforcement/)

    await expect(page.getByRole('button', { name: 'LOGIN', exact: true })).toBeVisible()

    await page.getByPlaceholder('Username or email').click()
    await page.getByPlaceholder('Username or email').fill(process.env.TEST_USERNAME)
    await page.getByPlaceholder('Username or email').press('Tab')
    await page.getByPlaceholder('Password').click()
    await page.getByPlaceholder('Password').fill(process.env.TEST_PASSWORD)
    await page.getByRole('button', { name: 'LOGIN', exact: true }).click()
  })

  test('all admin accessible pages', async ({ page }) => {
    await expect(page).toHaveURL(process.env.PLAYWRIGHT_BASE_URL + '/web/')

    await page.getByRole('button', { name: 'New Record' }).click()
    await page.getByRole('button', { name: 'New Applicant Record' }).click()
    await page.getByRole('link', { name: 'Employee' }).click()
    await expect(page).toHaveURL(process.env.PLAYWRIGHT_BASE_URL + '/web/records/new/info/?jfd-value=03')

    await page.getByRole('button', { name: 'Records' }).click()
    await page.getByRole('link', { name: 'Saved Booking Records' }).click()
    await expect(page).toHaveURL(process.env.PLAYWRIGHT_BASE_URL + '/web/search/?recordType=Booking')

    await page.getByRole('link', { name: 'Saved Applicant Records' }).click()
    await expect(page).toHaveURL(process.env.PLAYWRIGHT_BASE_URL + '/web/records/?recordType=Applicant')

    await page.getByRole('button', { name: 'Investigate' }).click()
    await page.getByRole('link', { name: 'Lineups' }).click()
    await expect(page).toHaveURL(process.env.PLAYWRIGHT_BASE_URL + '/web/lineups')

    await page.getByRole('link', { name: 'Audit' }).click()
    await expect(page).toHaveURL(process.env.PLAYWRIGHT_BASE_URL + '/web/audit')

    await page.getByRole('link', { name: 'Cards' }).click()
    await expect(page).toHaveURL(process.env.PLAYWRIGHT_BASE_URL + '/web/cards')

    await page.getByRole('button', { name: 'Settings' }).click()
    await page.getByRole('link', { name: 'Users and Groups' }).click()
    await expect(page).toHaveURL(process.env.PLAYWRIGHT_BASE_URL + '/web/users')

    await page.getByRole('link', { name: 'OIDC' }).click()
    await expect(page).toHaveURL(process.env.PLAYWRIGHT_BASE_URL + '/web/oidc')

    await page.getByRole('button', { name: 'Super Admin Super Admin' }).click()
    await page.getByRole('menuitem', { name: 'Edit Profile' }).click()
    await expect(page).toHaveURL(process.env.PLAYWRIGHT_BASE_URL + '/web/profile')

    await page.getByRole('button', { name: 'Super Admin Super Admin' }).click()
    await page.getByRole('menuitem', { name: 'Logout' }).click()
    await expect(page).toHaveURL(process.env.PLAYWRIGHT_BASE_URL + '/web/login')
  })

  test('test new applicant record', async ({ page }) => {
    await page.getByRole('button', { name: 'New Record' }).click()
    await page.getByRole('button', { name: 'New Applicant Record' }).click()
    await page.getByRole('link', { name: 'Employee' }).click()
    await page.getByLabel('Last Name*').click()
    await page.getByLabel('Last Name*').fill('Edgar')
    await page.getByLabel('Last Name*').press('Enter')
    await page.getByLabel('First Name*').fill('Playwright')
    await page.getByLabel('Middle Name').fill('Thomas')
    await page.getByLabel('Suffix', { exact: true }).fill('III')

    await page.getByLabel('Clerk Name').fill('chuck')
    await page.getByLabel('S/O Job Title/CII').fill('test title')
    await page.getByLabel('HireDate-label').click()
    await page.getByRole('button', { name: 'August 9,' }).click()
    await page.getByLabel('Hire Time').fill('12:30')

    await page.getByLabel('DateIssued-label').click()
    await page.getByRole('button', { name: 'August 23,' }).click()

    await page.getByLabel('DateIssued-label').click()
    await page.getByRole('button', { name: 'August 23,' }).click()

    await page.getByLabel('Date Retired/ORI').fill('2/2/2054')
    await page.getByLabel('Department or Agency').fill('Playwright dept')
    await page.getByLabel('County Job Title').fill('sr tester')
    await page.locator('#City').fill('stanislaus')

    await page.locator('.Race__placeholder').click()
    await page.getByText('AMERICAN INDIAN', { exact: true }).click()
    await page.getByText('Select...').first().click()
    await page.getByText('FEMALE', { exact: true }).click()
    await page.getByLabel('Height').click()
    await page.getByLabel('Height').fill('603')
    await page.getByLabel('Weight').click()
    await page.getByLabel('Weight').fill('220')
    await page.getByText('Select...').first().click()
    await page.getByText('BLACK', { exact: true }).click()
    await page.locator('.HairColor__value-container').click()
    await page.getByText('BALD', { exact: true }).click()

    await page.locator('.PlaceOfBirth\\.PBState__value-container').click()
    await page.getByText('AFGHANISTAN', { exact: true }).click()
    await page.getByLabel('City of Birth').fill('kabul')

    await page
      .locator('form div')
      .filter({ hasText: 'Date of BirthDate of Birth' })
      .locator('input[name="month"]')
      .click()
    await page
      .locator('form div')
      .filter({ hasText: 'Date of BirthDate of Birth' })
      .locator('input[name="month"]')
      .fill('12')
    await page
      .locator('form div')
      .filter({ hasText: 'Date of BirthDate of Birth' })
      .locator('input[name="day"]')
      .fill('12')
    await page
      .locator('form div')
      .filter({ hasText: 'Date of BirthDate of Birth' })
      .getByPlaceholder('----')
      .fill('1992')
    await page
      .locator('form div')
      .filter({ hasText: 'Date of BirthDate of Birth' })
      .getByPlaceholder('----')
      .press('Enter')

    await page.getByLabel('Social Security Number').fill('123-555-12')
    await page.locator('[id="SocialSecurityNumber\\[0\\]\\.SocialSecurityNumber-label"]').click()

    await page.getByLabel('Social Security Number').fill('121551211')

    await page.getByLabel("California Driver's License").fill('A1234567')

    await page.getByLabel('House Number').fill('123')
    await page.getByLabel('Street Direction').fill('se')
    await page.getByLabel('Street Name').fill('fourth')
    await page.getByLabel('Apartment Number').fill('2')
    await page.locator('[id="AddressSet\\.AddressCity"]').fill('stanislaus')
    await page.getByLabel('State', { exact: true }).fill('ca')
    await page.getByLabel('Zip Code').fill('91234')
    await page.getByLabel('X-Zip').fill('1234')
    await page.getByLabel('Years at Residence').fill('2')
    await page.getByLabel('Months at Address').fill('1')
    await page.getByLabel('Phone Number').fill('541-555-1234')
    await page.getByRole('button', { name: 'Save' }).click()

    // Make sure it saves the record
    await expect(page.getByText('Create Date:')).toBeVisible()
    await expect(page.getByText('Last Saved:')).toBeVisible()
    await expect(page.getByText('Saved Changes')).toBeVisible()
  })

  test('test edit applicant record', async ({ page }) => {
    await page.getByRole('button', { name: 'Records' }).click()
    await page.getByRole('link', { name: 'Saved Applicant Records' }).click()

    await page.getByRole('link', { name: 'Saved Applicant Records' }).click()
    await page.getByPlaceholder('e.g. Record Number').click()
    await page.getByPlaceholder('e.g. Record Number').fill('LE2STAGE319')

    await page.getByText('[LE2STAGE319]').click()
    await page.getByLabel('Edit', { exact: true }).click()
    await page.getByLabel('Last Name*').click()
    await page.getByLabel('Last Name*').fill('edgar')

    await page.getByLabel("California Driver's License").fill('A1234567')
    await page.getByRole('button', { name: 'Save' }).click()

    // Make sure it saves the record
    await expect(page.getByText('Create Date:')).toBeVisible()
    await expect(page.getByText('Last Saved:')).toBeVisible()
    await expect(page.getByText('Saved Changes')).toBeVisible()
  })
})
