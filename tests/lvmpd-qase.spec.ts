import { expect, test } from '@playwright/test'
import path from 'path'

test.describe('LVMPD Qase Items', async () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('https://lvmpd-stage.le2.imageware.io/web/login')
    await page.getByPlaceholder('Username or email').fill('PlaywrightSA')
    await page.getByPlaceholder('Username or email').press('Tab')
    await page.getByPlaceholder('Password').fill('Tech5USA!!')
    await page.getByRole('button', { name: 'LOGIN', exact: true }).click()

    await page.getByRole('heading', { name: 'Welcome to' }).click()
  })

  test('New Record', async ({ page }) => {
    await page.getByRole('button', { name: 'New Record' }).click()
    await page.getByRole('button', { name: 'New Booking Record' }).click()
    await page.getByRole('link', { name: 'Criminal' }).click()
    await page.locator('#TimeOfArrest').getByPlaceholder('hh').fill('12')
    await page.locator('#TimeOfArrest').getByPlaceholder('mm').fill('12')
    await page.getByLabel('CS#*').click()
    await page.getByRole('button', { name: 'Change CS#' }).click()
    await page.getByRole('textbox', { name: 'CS #' }).click()
    await page.getByRole('textbox', { name: 'CS #' }).fill('123321123321')
    await page.getByRole('button', { name: 'Update' }).click()
    await page.getByLabel('Last*').click()
    await page.getByLabel('Last*').fill('PWLast')
    await page.getByLabel('Last*').press('Tab')
    await page.getByLabel('First*').fill('PWFirst')
    await page.getByLabel('Age*').click()
    await page.getByLabel('Age*').fill('23')
    await page.locator('.Appearance\\[0\\]\\.Sex__control').click()
    await page.locator('.Appearance\\[0\\]\\.Sex__control').click()
    await page.locator('.css-8mmkcg').first().click()
    await page.getByText('MALE', { exact: true }).click()
    await page.locator('.Appearance\\[0\\]\\.Race__indicator > .css-8mmkcg').click()
    await page.getByText('ASIAN/PACIFIC ISLANDER', { exact: true }).click()
    await page.locator('.Appearance\\[0\\]\\.EyeColor__indicator > .css-8mmkcg').click()
    await page.getByText('BLACK', { exact: true }).click()
    await page.locator('.Appearance\\[0\\]\\.HairColor__indicator > .css-8mmkcg').click()
    await page.locator('[id="react-select-Appearance\\[0\\]\\.HairColor-option-0"]').click()
    await page.locator('.Appearance\\[0\\]\\.Glasses__control').click()
    await page.getByText('NO', { exact: true }).click()
    await page.getByLabel('Arresting Officer*').click()
    await page.getByLabel('Arresting Officer*').fill('officer')
    await page.getByLabel('Arresting Officer*').press('Tab')
    await page.getByLabel('Arresting Officer P#*').fill('123')
    await page.getByLabel('Arresting Officer P#*').press('Tab')
    await page.getByLabel('Booking Officer*').fill('officer2')
    await page.getByLabel('Booking Officer*').press('Tab')
    await page.getByLabel('Booking Officer P#*').fill('1231223')
    await page.getByLabel('Booking Officer P#*').press('Tab')
    await page.getByLabel('Transport Officer*').fill('Officer3')
    await page.getByLabel('Transport Officer*').press('Tab')
    await page.getByLabel('Transport Officer P#*').fill('123')
    await page.getByLabel('Total Bail*').click()
    await page.getByLabel('Total Bail*').fill('123')
    await page.getByLabel('Lodge Number').click()
    await page.getByLabel('Lodge Number').fill('123')
    await page.locator('.CriminalCharges\\[0\\]\\.ChargeNumber__control').click()
    await page
      .getByText('50001 - OPEN MURDER-WITH THE USE OF A DEADLY WEAPON OR TEAR GAS - Z - 200.010', { exact: true })
      .click()
    await page.getByRole('button', { name: 'Apply', exact: true }).nth(2).click()
    await page.getByRole('button', { name: 'Save', exact: true }).click()
    await page.getByText('WORK IN PROGRESS').click()
    await page.getByRole('button', { name: 'Records' }).click()
    await page.getByRole('link', { name: 'Saved Booking Records' }).click()
    await page.getByPlaceholder('e.g. Booking Number, CS ID#,').click()
    await page.getByPlaceholder('e.g. Booking Number, CS ID#,').fill('PWFIRST')
    await page.getByRole('gridcell', { name: 'View record Edit record' }).getByLabel('View record').first().click()
    await page.getByLabel('Delete', { exact: true }).click()
    await page.getByText('CancelDelete').getByText('Delete', { exact: true }).click()
    await page.getByPlaceholder('e.g. Booking Number, CS ID#,').click()
    await page.getByPlaceholder('e.g. Booking Number, CS ID#,').press('Enter')
    await page.getByPlaceholder('e.g. Booking Number, CS ID#,').fill('PWLAST')
    await page.getByTestId('bookingNum').first().click()
  })

  test('Viewing Records', async ({ page }) => {
    // Records
    await page.getByRole('button', { name: 'Records' }).click()
    await page.getByRole('link', { name: 'Saved Booking Records' }).click()
    // Basic Search
    await page.getByPlaceholder('e.g. Booking Number').click()
    await page.getByPlaceholder('e.g. Booking Number').fill('DINKLEY')
    await page.getByRole('gridcell', { name: 'VELMA' }).first().click()
    // Advanced Search
    await page.getByRole('button', { name: 'Advanced Search' }).click()
    await page.getByLabel('Demographic Details').locator('svg').first().click()
    await page.getByLabel('Demographic Details').getByText('Race', { exact: true }).click()
    await page.getByLabel('Demographic Details').getByText('Select...').click()
    await page.getByLabel('Demographic Details').getByText('WHITE', { exact: true }).click()
    await page.getByRole('button', { name: 'Add new Filter' }).click()
    await page.locator('.Filters\\[1\\]\\.FieldName__value-container').click()
    await page.getByLabel('Demographic Details').getByText('First', { exact: true }).click()
    await page.locator('input[name="Filters\\[1\\]\\.Value"]').click()
    await page.locator('input[name="Filters\\[1\\]\\.Value"]').fill('VELMA')
    await page.getByRole('button', { name: 'Search Results' }).click()
    await page.getByRole('gridcell', { name: 'VELMA' }).click()
    await page.getByRole('button', { name: 'Advanced Search' }).click()
    await page.getByRole('button', { name: 'Cancel' }).click()
    // Seal
    await page.getByRole('gridcell', { name: '[LVMPDSTG00672]' }).locator('div').click()
    await page.getByLabel('Seal').click()
    await page.getByText('CancelSeal').getByRole('button', { disabled: false, name: 'Seal' }).click()

    await page.getByText('Sealed').click()
    // Unseal
    await page.getByLabel('Unseal').click()
    await page.getByText('CancelUnseal').getByText('Unseal', { exact: true }).click()
    await page.getByRole('button', { name: 'Back to Records' }).click()
    // Order by DoB
    await page.getByText('Date of Birth').click()
    // Order by Gender
    await page.getByRole('cell', { name: 'Gender' }).getByText('Gender').click()
    // Order by Race
    await page.getByRole('table').getByText('Race').click()
    // Order by Print Type
    await page.getByText('Print Type').click()
    // Order by Created Date
    await page.getByText('Created').click()
  })

  /* TODO: Fix this, Scoobert record does not load in search bar
  test('New Lineup', async ({ page }) => {
    await page.getByRole('button', { name: 'Investigate' }).click()
    await page.getByRole('link', { name: 'Lineups' }).click()
    await page.getByRole('button', { name: 'Create Lineup' }).click()
    await page
      .locator('div')
      .filter({ hasText: /^Search$/ })
      .first()
      .click()
    await page.locator('#react-select-3-input').fill('scoo')
    await page.getByText('– Booking [LVMPDSTG00674]').click()
    await page.getByRole('button', { name: 'Next', exact: true }).click()
    await page.locator('.css-6kollw > .chakra-icon > path').first().click()
    await page.getByText('Gender: MALE').click()
    await page.getByRole('button', { name: 'Update parameters' }).click()
    await page.locator('.css-nbgg6s-indicatorContainer > .css-8mmkcg > path').first().click()
    await page.locator('.css-nbgg6s-indicatorContainer > .css-8mmkcg').first().click()
    await page
      .locator(
        'div:nth-child(4) > .chakra-form-control > .css-110z8gl > .css-2b097c-container > .css-h1uws6-control > .css-1wy0on6 > div > .css-8mmkcg > path'
      )
      .first()
      .click()
    await page.getByRole('button', { name: 'Update', exact: true }).click()
    await page.locator('div:nth-child(18) > .react-contextmenu-wrapper > .css-1ux8x1f > .css-1qvbjid').click()
    await page.locator('div:nth-child(19) > .react-contextmenu-wrapper > .css-1ux8x1f > .css-1qvbjid').click()
    await page.locator('div:nth-child(20) > .react-contextmenu-wrapper > .css-1ux8x1f > .css-1qvbjid').click()
    await page.locator('div:nth-child(21) > .react-contextmenu-wrapper > .css-1ux8x1f > .css-1qvbjid').click()
    await page.locator('div:nth-child(22) > .react-contextmenu-wrapper > .css-1ux8x1f > .css-1qvbjid').click()
    await page.getByRole('button', { name: 'View Lineup' }).click()
    await page.getByRole('button', { name: 'Swap images' }).click()
    await page.locator('label div').first().click()
    await page.locator('label svg').click()
    await page.getByRole('button', { name: 'Save Lineup' }).click()
    await page.getByLabel('Name*').click()
    await page.getByLabel('Name*').fill('Playwright Scooby')
    await page.getByLabel('Case number*').click()
    await page.getByLabel('Case number*').fill('123321123321')
    await page.getByLabel('Description*').click()
    await page.getByLabel('Description*').fill('Test description. ')
    await page.getByRole('button', { name: 'Save', exact: true }).click()
  })
    */

  test('View Lineups', async ({ page }) => {
    // Lineups
    await page.getByRole('button', { name: 'Investigate' }).click()
    await page.getByRole('link', { name: 'Lineups' }).click()
    // Basic Search
    await page.getByPlaceholder('e.g Case Number').click()
    await page.getByPlaceholder('e.g Case Number').fill('42069')
    await page.getByRole('gridcell', { name: '25' }).locator('div').getByTestId('lineupId').click()
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

  /*
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
    await page.getByLabel('upload Card').getByText('Registrant', { exact: true }).click()

    // Start waiting for file chooser before clicking. Note no await.
    const fileChooserPromise = page.waitForEvent('filechooser')
    await page.getByText('Select File').click()
    const fileChooser = await fileChooserPromise
    await fileChooser.setFiles(path.join(__dirname, 'SkiPassLVMPD.dgn'))

    await page.getByRole('button', { name: 'Add Card' }).click()
    await page.getByRole('button', { name: 'Upload Card' }).press('ControlOrMeta+r')

    await page.getByText('Playwright Test').click() // TODO: Fails for LVMPD if same file name used for different cards?
    await page.getByRole('gridcell', { name: 'SkiPass.dgn' }).first().click()
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
    */

  test('Verify OIDC', async ({ page }) => {
    // Verify OIDC info
    await page.getByRole('button', { name: 'Settings' }).click()
    await page.getByRole('link', { name: 'OIDC' }).click()
    await page.getByRole('button', { name: 'Get OIDC Metadata Information' }).click()
  })
})
