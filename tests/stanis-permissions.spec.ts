import { Page, expect, test } from '@playwright/test'
import fs from 'fs'

import {
  stanisPlaywrightBackgrounds,
  stanisPlaywrightClerks,
  stanisPlaywrightCustodians,
  stanisPlaywrightExternal,
  stanisPlaywrightInfotech,
  stanisPlaywrightInternal,
  stanisPlaywrightProbation,
  stanisPlaywrightUsers
} from './constants'

const storageStates = [
  stanisPlaywrightBackgrounds,
  stanisPlaywrightClerks,
  stanisPlaywrightCustodians,
  stanisPlaywrightExternal,
  stanisPlaywrightInfotech,
  stanisPlaywrightInternal,
  stanisPlaywrightProbation,
  stanisPlaywrightUsers
]

for (const state of storageStates) {
  if (!fs.existsSync(state)) {
    fs.writeFileSync(state, '{}')
  }
}

test.describe('Stanislaus Permissions', async () => {
  //  Clerks
  test.describe('Clerks group', async () => {
    test.afterEach(async ({ page }) => {
      await page.context().storageState({ path: stanisPlaywrightClerks })
    })
    test('Login as PlaywrightClerks', async ({ page }) => {
      await page.goto('https://stanis-stage.le2.imageware.io/web/login')

      await page.getByPlaceholder('Username or email').fill('PlaywrightClerks')
      await page.getByPlaceholder('Username or email').press('Tab')
      await page.getByPlaceholder('Password').fill('Tech5USA!!')
      await page.getByRole('button', { name: 'LOGIN', exact: true }).click()

      await expect(page.getByRole('heading', { name: 'Welcome to' })).toBeVisible()
    })
    test.use({
      storageState: stanisPlaywrightClerks
    })

    const permsToCheck = [
      accessToNewEmployeeRecord,
      accessToBookingRecords,
      accessToApplicationRecords,
      accessToLineups,
      accessToCards,
      noAccessToAudit,
      noAccessToUsers
    ]
    for (const check of permsToCheck) {
      test(check.name, async ({ page }) => {
        await check(page)
      })
    }
  })

  // Playwright Backgrounds
  test.describe('Backgrounds group', async () => {
    test.afterEach(async ({ page }) => {
      await page.context().storageState({ path: stanisPlaywrightBackgrounds })
    })
    test('Login as PlaywrightBackgrounds', async ({ page }) => {
      await page.goto('https://stanis-stage.le2.imageware.io/web/login')

      await page.getByPlaceholder('Username or email').fill('PlaywrightBackgrounds')
      await page.getByPlaceholder('Username or email').press('Tab')
      await page.getByPlaceholder('Password').fill('Tech5USA!!')
      await page.getByRole('button', { name: 'LOGIN', exact: true }).click()

      await expect(page.getByRole('heading', { name: 'Welcome to' })).toBeVisible()
    })
    test.use({
      storageState: stanisPlaywrightBackgrounds
    })

    const permsToCheck = [
      noAccessToNewEmployeeRecord,
      accessToBookingRecords,
      accessToApplicationRecords,
      accessToLineups,
      noAccessToCards,
      noAccessToAudit,
      noAccessToUsers
    ]
    for (const check of permsToCheck) {
      test(check.name, async ({ page }) => {
        await check(page)
      })
    }
  })
  /* TODO: Fix CoR permissions
  // Playwright Custodians
  test.describe('Custodian of Records group', async () => {
    test.afterEach(async ({ page }) => {
      await page.context().storageState({ path: stanisPlaywrightCustodians })
    })
    test('Login as PlaywrightCustodian', async ({ page }) => {
      await page.goto('https://stanis-stage.le2.imageware.io/web/login')

      await page.getByPlaceholder('Username or email').fill('PlaywrightCustodian')
      await page.getByPlaceholder('Username or email').press('Tab')
      await page.getByPlaceholder('Password').fill('Tech5USA!!')
      await page.getByRole('button', { name: 'LOGIN', exact: true }).click()

      await expect(page.getByRole('heading', { name: 'Welcome to' })).toBeVisible()
    })
    test.use({
      storageState: stanisPlaywrightCustodians
    })

    const permsToCheck = [
      accessToNewEmployeeRecord,
      accessToBookingRecords,
      accessToApplicationRecords,
      accessToLineups,
      accessToCards,
      noAccessToAudit,
      noAccessToUsers
    ]
    for (const check of permsToCheck) {
      test(check.name, async ({ page }) => {
        await check(page)
      })
    }
  })
*/

  // Playwright External
  test.describe('External users group', async () => {
    test.afterEach(async ({ page }) => {
      await page.context().storageState({ path: stanisPlaywrightExternal })
    })
    test('Login as PlaywrightExternal', async ({ page }) => {
      await page.goto('https://stanis-stage.le2.imageware.io/web/login')

      await page.getByPlaceholder('Username or email').fill('PlaywrightExternal')
      await page.getByPlaceholder('Username or email').press('Tab')
      await page.getByPlaceholder('Password').fill('Tech5USA!!')
      await page.getByRole('button', { name: 'LOGIN', exact: true }).click()

      await expect(page.getByRole('heading', { name: 'Welcome to' })).toBeVisible()
    })
    test.use({
      storageState: stanisPlaywrightExternal
    })

    const permsToCheck = [
      noAccessToNewEmployeeRecord,
      accessToBookingRecords,
      accessToApplicationRecords,
      accessToLineups,
      noAccessToCards,
      noAccessToAudit,
      noAccessToUsers
    ]
    for (const check of permsToCheck) {
      test(check.name, async ({ page }) => {
        await check(page)
      })
    }
  })

  // Playwright Infotech
  test.describe('Infotech group', async () => {
    test.afterEach(async ({ page }) => {
      await page.context().storageState({ path: stanisPlaywrightInfotech })
    })
    test('Login as PlaywrightInfotech', async ({ page }) => {
      await page.goto('https://stanis-stage.le2.imageware.io/web/login')

      await page.getByPlaceholder('Username or email').fill('PlaywrightInfotech')
      await page.getByPlaceholder('Username or email').press('Tab')
      await page.getByPlaceholder('Password').fill('Tech5USA!!')
      await page.getByRole('button', { name: 'LOGIN', exact: true }).click()

      await expect(page.getByRole('heading', { name: 'Welcome to' })).toBeVisible()
    })
    test.use({
      storageState: stanisPlaywrightInfotech
    })

    const permsToCheck = [
      noAccessToNewEmployeeRecord,
      noAccessToBookingRecords,
      noAccessToApplicationRecords,
      noAccessToLineups,
      noAccessToCards,
      noAccessToAudit,
      accessToUsers
    ]
    for (const check of permsToCheck) {
      test(check.name, async ({ page }) => {
        await check(page)
      })
    }
  })

  // Playwright Internal Affairs
  test.describe('Internal Affairs group', async () => {
    test.afterEach(async ({ page }) => {
      await page.context().storageState({ path: stanisPlaywrightInternal })
    })
    test('Login as PlaywrightInternal', async ({ page }) => {
      await page.goto('https://stanis-stage.le2.imageware.io/web/login')

      await page.getByPlaceholder('Username or email').fill('PlaywrightInternal')
      await page.getByPlaceholder('Username or email').press('Tab')
      await page.getByPlaceholder('Password').fill('Tech5USA!!')
      await page.getByRole('button', { name: 'LOGIN', exact: true }).click()

      await expect(page.getByRole('heading', { name: 'Welcome to' })).toBeVisible()
    })
    test.use({
      storageState: stanisPlaywrightInternal
    })

    const permsToCheck = [
      noAccessToNewEmployeeRecord,
      accessToBookingRecords,
      accessToApplicationRecords,
      accessToLineups,
      noAccessToCards,
      accessToAudit,
      noAccessToUsers
    ]
    for (const check of permsToCheck) {
      test(check.name, async ({ page }) => {
        await check(page)
      })
    }
  })

  // Playwright Probation
  test.describe('Probation group', async () => {
    test.afterEach(async ({ page }) => {
      await page.context().storageState({ path: stanisPlaywrightProbation })
    })
    test('Login as PlaywrightProbation', async ({ page }) => {
      await page.goto('https://stanis-stage.le2.imageware.io/web/login')

      await page.getByPlaceholder('Username or email').fill('PlaywrightProbation')
      await page.getByPlaceholder('Username or email').press('Tab')
      await page.getByPlaceholder('Password').fill('Tech5USA!!')
      await page.getByRole('button', { name: 'LOGIN', exact: true }).click()

      await expect(page.getByRole('heading', { name: 'Welcome to' })).toBeVisible()
    })
    test.use({
      storageState: stanisPlaywrightProbation
    })
    const permsToCheck = [
      noAccessToNewEmployeeRecord,
      accessToBookingRecords,
      accessToApplicationRecords,
      accessToLineups,
      noAccessToCards,
      noAccessToAudit,
      noAccessToUsers
    ]
    for (const check of permsToCheck) {
      test(check.name, async ({ page }) => {
        await check(page)
      })
    }
  })

  // Playwright User
  test.describe('LE2 Users group', async () => {
    test.afterEach(async ({ page }) => {
      await page.context().storageState({ path: stanisPlaywrightUsers })
    })
    test('Login as PlaywrightUsers', async ({ page }) => {
      await page.goto('https://stanis-stage.le2.imageware.io/web/login')

      await page.getByPlaceholder('Username or email').fill('PlaywrightUsers')
      await page.getByPlaceholder('Username or email').press('Tab')
      await page.getByPlaceholder('Password').fill('Tech5USA!!')
      await page.getByRole('button', { name: 'LOGIN', exact: true }).click()

      await expect(page.getByRole('heading', { name: 'Welcome to' })).toBeVisible()
    })
    test.use({
      storageState: stanisPlaywrightUsers
    })

    const permsToCheck = [
      noAccessToNewEmployeeRecord,
      accessToBookingRecords,
      accessToApplicationRecords,
      accessToLineups,
      noAccessToCards,
      noAccessToAudit,
      noAccessToUsers
    ]
    for (const check of permsToCheck) {
      test(check.name, async ({ page }) => {
        await check(page)
      })
    }
  })
})

export async function accessToNewEmployeeRecord(page: Page) {
  await page.goto('/web/records/new/info/?jfd-value=03')
  await page.getByRole('heading', { name: 'No [' }).click()
}

export async function noAccessToNewEmployeeRecord(page: Page) {
  await page.goto('/web/records/new/info/?jfd-value=03')
  await page.getByRole('heading', { name: '404' }).click()
}

export async function accessToBookingRecords(page: Page) {
  await page.goto('/web/search/?recordType=Booking')
  await page.getByText('RecordsRecords simple').click()
}

export async function noAccessToBookingRecords(page: Page) {
  await page.goto('/web/search/?recordType=Booking')
  await page.getByRole('heading', { name: '404' }).click()
}

export async function accessToApplicationRecords(page: Page) {
  await page.goto('/web/records/?recordType=Application')
  await page.getByText('RecordsRecord simple').click()
}

export async function noAccessToApplicationRecords(page: Page) {
  await page.goto('/web/records/?recordType=Application')
  await page.getByRole('heading', { name: '404' }).click()
}

export async function accessToLineups(page: Page) {
  await page.goto('/web/lineups')
  await page.getByText('LineupsLineups simple').click()
}

export async function noAccessToLineups(page: Page) {
  await page.goto('/web/lineups')
  await page.getByRole('heading', { name: '404' }).click()
}

export async function accessToCards(page: Page) {
  await page.goto('/web/cards')
  await page.getByRole('heading', { name: 'Cards' }).click()
}

export async function noAccessToCards(page: Page) {
  await page.goto('/web/cards')
  await page.getByRole('heading', { name: '404' }).click()
}

export async function noAccessToUsers(page: Page) {
  await page.goto('/web/users')
  await page.getByRole('heading', { name: '404' }).click()
}

export async function accessToUsers(page: Page) {
  await page.goto('/web/users')
  await page.getByRole('heading', { name: 'Users and Groups' }).click()
}

export async function accessToAudit(page: Page) {
  await page.goto('/web/audit')
  await page.getByRole('heading', { name: 'Audit' }).click()
}

export async function noAccessToAudit(page: Page) {
  await page.goto('/web/audit')
  await page.getByRole('heading', { name: '404' }).click()
}
