import { Page, expect, test } from '@playwright/test'
import fs from 'fs'

import {
  lvmpdPlaywrightAI,
  lvmpdPlaywrightBIO,
  lvmpdPlaywrightDSDB,
  lvmpdPlaywrightEmpAdm,
  lvmpdPlaywrightEmpInv,
  lvmpdPlaywrightExp,
  lvmpdPlaywrightHQFP,
  lvmpdPlaywrightITBA,
  lvmpdPlaywrightInvest,
  lvmpdPlaywrightRecMan,
  lvmpdPlaywrightSealing
} from './constants'

const storageStates = [
  lvmpdPlaywrightRecMan,
  lvmpdPlaywrightSealing,
  lvmpdPlaywrightHQFP,
  lvmpdPlaywrightAI,
  lvmpdPlaywrightBIO,
  lvmpdPlaywrightDSDB,
  lvmpdPlaywrightEmpAdm,
  lvmpdPlaywrightEmpInv,
  lvmpdPlaywrightExp,
  lvmpdPlaywrightITBA,
  lvmpdPlaywrightInvest
]

for (const state of storageStates) {
  if (!fs.existsSync(state)) {
    fs.writeFileSync(state, '{}')
  }
}

test.describe('LVMPD Permissions', async () => {
  // Sealing
  test.describe('Sealing group', async () => {
    test.afterEach(async ({ page }) => {
      await page.context().storageState({
        path: lvmpdPlaywrightSealing
      })
    })
    test('Login as PlaywrightSealing', async ({ page }) => {
      await page.goto('https://lvmpd-stage.le2.imageware.io/')
      await page.goto('https://lvmpd-stage.le2.imageware.io/web/login')

      await page.getByPlaceholder('Username or email').fill('PlaywrightSealing')
      await page.getByPlaceholder('Username or email').press('Tab')
      await page.getByPlaceholder('Password').fill('Tech5USA!!')
      await page.getByRole('button', { name: 'LOGIN', exact: true }).click()

      // Alternatively, you can wait until the page reaches a state where all cookies are set.
      await expect(page.getByRole('heading', { name: 'Welcome to' })).toBeVisible()
    })
    test.use({
      storageState: lvmpdPlaywrightSealing
    })
    const permsToCheck = [
      // New Records
      accessToNewBookingRecord,
      accessToNewCivilRecord,
      accessToNewRegistrantRecord,
      accessToNewEmployeeRecord,

      // View Records
      accessToBookingRecords,
      accessToApplicationRecords,

      // Investigate
      accessToLineups,

      // Cards
      accessToCards,

      // Settings
      noAccessToSettings,
      noAccessToAudit,
      noAccessToUsers
    ]
    for (const check of permsToCheck) {
      test(check.name, async ({ page }) => {
        await check(page)
      })
    }
  })

  // Record Management
  test.describe('Record Management group', async () => {
    test.afterEach(async ({ page }) => {
      await page.context().storageState({
        path: lvmpdPlaywrightRecMan
      })
    })
    test('Login as PlaywrightRecMan', async ({ page }) => {
      await page.goto('https://lvmpd-stage.le2.imageware.io/web/login')

      await page.getByPlaceholder('Username or email').fill('PlaywrightRecMan')
      await page.getByPlaceholder('Username or email').press('Tab')
      await page.getByPlaceholder('Password').fill('Tech5USA!!')
      await page.getByRole('button', { name: 'LOGIN', exact: true }).click()

      // Alternatively, you can wait until the page reaches a state where all cookies are set.
      await expect(page.getByRole('heading', { name: 'Welcome to' })).toBeVisible()
    })
    test.use({
      storageState: lvmpdPlaywrightRecMan
    })
    const permsToCheck = [
      // New Records
      accessToNewBookingRecord,
      accessToNewCivilRecord,
      accessToNewRegistrantRecord,
      accessToNewEmployeeRecord,

      // View Records
      noAccessToBookingRecords,
      accessToApplicationRecords,

      // Investigate
      noAccessToLineups,

      // Cards
      noAccessToCards,

      // Settings
      noAccessToSettings,
      noAccessToAudit,
      noAccessToUsers
    ]
    for (const check of permsToCheck) {
      test(check.name, async ({ page }) => {
        await check(page)
      })
    }
  })

  // HQ Fingerprint
  test.describe('HQ Fingerprint group', async () => {
    test.afterEach(async ({ page }) => {
      await page.context().storageState({
        path: lvmpdPlaywrightHQFP
      })
    })
    test('Login as PlaywrightHQFP', async ({ page }) => {
      await page.goto('https://lvmpd-stage.le2.imageware.io/')
      await page.goto('https://lvmpd-stage.le2.imageware.io/web/login')

      await page.getByPlaceholder('Username or email').fill('PlaywrightHQFP')
      await page.getByPlaceholder('Username or email').press('Tab')
      await page.getByPlaceholder('Password').fill('Tech5USA!!')
      await page.getByRole('button', { name: 'LOGIN', exact: true }).click()

      // Alternatively, you can wait until the page reaches a state where all cookies are set.
      await expect(page.getByRole('heading', { name: 'Welcome to' })).toBeVisible()
    })
    test.use({
      storageState: lvmpdPlaywrightHQFP
    })
    const permsToCheck = [
      // New Records
      accessToNewBookingRecord,
      accessToNewCivilRecord,
      noAccessToNewRegistrantRecord,
      accessToNewEmployeeRecord,

      // View Records
      accessToBookingRecords,
      accessToApplicationRecords,

      // Investigate
      noAccessToLineups,

      // Cards
      accessToCards,

      // Settings
      noAccessToSettings,
      noAccessToAudit,
      noAccessToUsers
    ]

    for (const check of permsToCheck) {
      test(check.name, async ({ page }) => {
        await check(page)
      })
    }
  })

  // Exporters
  test.describe('Exporters group', async () => {
    test.afterEach(async ({ page }) => {
      await page.context().storageState({
        path: lvmpdPlaywrightExp
      })
    })
    test('Login as PlaywrightExp', async ({ page }) => {
      await page.goto('https://lvmpd-stage.le2.imageware.io/')
      await page.goto('https://lvmpd-stage.le2.imageware.io/web/login')

      await page.getByPlaceholder('Username or email').fill('PlaywrightExp')
      await page.getByPlaceholder('Username or email').press('Tab')
      await page.getByPlaceholder('Password').fill('Tech5USA!!')
      await page.getByRole('button', { name: 'LOGIN', exact: true }).click()

      // Alternatively, you can wait until the page reaches a state where all cookies are set.
      await expect(page.getByRole('heading', { name: 'Welcome to' })).toBeVisible()
    })
    test.use({
      storageState: lvmpdPlaywrightExp
    })
    const permsToCheck = [
      // New Records
      noAccessToNewBookingRecord,
      noAccessToNewCivilRecord,
      noAccessToNewRegistrantRecord,
      noAccessToNewEmployeeRecord,

      // View Records
      accessToBookingRecords,
      accessToApplicationRecords,

      // Investigate
      noAccessToLineups,

      // Cards
      noAccessToCards,

      // Settings
      noAccessToSettings,
      noAccessToAudit,
      noAccessToUsers
    ]

    for (const check of permsToCheck) {
      test(check.name, async ({ page }) => {
        await check(page)
      })
    }
  })

  // Employee Investigative
  test.describe('Employee Investigative group', async () => {
    test.afterEach(async ({ page }) => {
      await page.context().storageState({
        path: lvmpdPlaywrightEmpInv
      })
    })
    test('Login as PlaywrightInvest', async ({ page }) => {
      await page.goto('https://lvmpd-stage.le2.imageware.io/')
      await page.goto('https://lvmpd-stage.le2.imageware.io/web/login')

      await page.getByPlaceholder('Username or email').fill('PlaywrightInvest')
      await page.getByPlaceholder('Username or email').press('Tab')
      await page.getByPlaceholder('Password').fill('Tech5USA!!')
      await page.getByRole('button', { name: 'LOGIN', exact: true }).click()

      // Alternatively, you can wait until the page reaches a state where all cookies are set.
      await expect(page.getByRole('heading', { name: 'Welcome to' })).toBeVisible()
    })
    test.use({
      storageState: lvmpdPlaywrightEmpInv
    })
    const permsToCheck = [
      // New Records
      noAccessToNewBookingRecord,
      noAccessToNewCivilRecord,
      noAccessToNewRegistrantRecord,
      noAccessToNewEmployeeRecord,

      // View Records
      accessToBookingRecords,
      accessToApplicationRecords,

      // Investigate
      accessToLineups,

      // Cards
      accessToCards,

      // Settings
      noAccessToSettings,
      noAccessToAudit,
      noAccessToUsers
    ]

    for (const check of permsToCheck) {
      test(check.name, async ({ page }) => {
        await check(page)
      })
    }
  })

  // Employee Admin
  test.describe('Employee Admin group', async () => {
    test.afterEach(async ({ page }) => {
      await page.context().storageState({
        path: lvmpdPlaywrightEmpAdm
      })
    })
    test('Login as PlaywrightEmpAdm', async ({ page }) => {
      await page.goto('https://lvmpd-stage.le2.imageware.io/')
      await page.goto('https://lvmpd-stage.le2.imageware.io/web/login')

      await page.getByPlaceholder('Username or email').fill('PlaywrightEmpAdm')
      await page.getByPlaceholder('Username or email').press('Tab')
      await page.getByPlaceholder('Password').fill('Tech5USA!!')
      await page.getByRole('button', { name: 'LOGIN', exact: true }).click()

      // Alternatively, you can wait until the page reaches a state where all cookies are set.
      await expect(page.getByRole('heading', { name: 'Welcome to' })).toBeVisible()
    })
    test.use({
      storageState: lvmpdPlaywrightEmpAdm
    })
    const permsToCheck = [
      // New Records
      noAccessToNewBookingRecord,
      noAccessToNewCivilRecord,
      noAccessToNewRegistrantRecord,
      accessToNewEmployeeRecord,

      // View Records
      accessToBookingRecords, // TODO: Should this be viewable?
      accessToApplicationRecords,

      // Investigate
      noAccessToLineups,

      // Cards
      noAccessToCards,

      // Settings
      noAccessToSettings,
      noAccessToAudit,
      noAccessToUsers
    ]

    for (const check of permsToCheck) {
      test(check.name, async ({ page }) => {
        await check(page)
      })
    }
  })

  // DSD Booking
  test.describe('DSD Booking group', async () => {
    test.afterEach(async ({ page }) => {
      await page.context().storageState({
        path: lvmpdPlaywrightDSDB
      })
    })
    test('Login as PlaywrightDSDB', async ({ page }) => {
      await page.goto('https://lvmpd-stage.le2.imageware.io/')
      await page.goto('https://lvmpd-stage.le2.imageware.io/web/login')

      await page.getByPlaceholder('Username or email').fill('PlaywrightDSDB')
      await page.getByPlaceholder('Username or email').press('Tab')
      await page.getByPlaceholder('Password').fill('Tech5USA!!')
      await page.getByRole('button', { name: 'LOGIN', exact: true }).click()

      // Alternatively, you can wait until the page reaches a state where all cookies are set.
      await expect(page.getByRole('heading', { name: 'Welcome to' })).toBeVisible()
    })
    test.use({
      storageState: lvmpdPlaywrightDSDB
    })
    const permsToCheck = [
      // New Records
      accessToNewBookingRecord,
      noAccessToNewCivilRecord,
      noAccessToNewRegistrantRecord,
      accessToNewEmployeeRecord,

      // View Records
      accessToBookingRecords,
      accessToApplicationRecords,

      // Investigate
      noAccessToLineups,

      // Cards
      accessToCards,

      // Settings
      noAccessToSettings,
      noAccessToAudit,
      noAccessToUsers
    ]

    for (const check of permsToCheck) {
      test(check.name, async ({ page }) => {
        await check(page)
      })
    }
  })

  // Booking Investigative Officers
  test.describe('Booking Investigative group', async () => {
    test.afterEach(async ({ page }) => {
      await page.context().storageState({
        path: lvmpdPlaywrightBIO
      })
    })
    test('Login as PlaywrightBIO', async ({ page }) => {
      await page.goto('https://lvmpd-stage.le2.imageware.io/web/login')

      await page.getByPlaceholder('Username or email').fill('PlaywrightBIO')
      await page.getByPlaceholder('Username or email').press('Tab')
      await page.getByPlaceholder('Password').fill('Tech5USA!!')
      await page.getByRole('button', { name: 'LOGIN', exact: true }).click()

      // Alternatively, you can wait until the page reaches a state where all cookies are set.
      await expect(page.getByRole('heading', { name: 'Welcome to' })).toBeVisible()
    })
    test.use({
      storageState: lvmpdPlaywrightBIO
    })
    const permsToCheck = [
      // New Records
      accessToNewBookingRecord,
      accessToNewCivilRecord,
      accessToNewRegistrantRecord,
      accessToNewEmployeeRecord,

      // View Records
      accessToBookingRecords,
      accessToApplicationRecords,

      // Investigate
      accessToLineups,

      // Cards
      noAccessToCards,

      // Settings
      noAccessToSettings,
      noAccessToAudit,
      noAccessToUsers
    ]

    for (const check of permsToCheck) {
      test(check.name, async ({ page }) => {
        await check(page)
      })
    }
  })

  // Admin Investigative
  test.describe('Admin Investigative group', async () => {
    test.afterEach(async ({ page }) => {
      await page.context().storageState({
        path: lvmpdPlaywrightAI
      })
    })
    test('Login as PlaywrightAI', async ({ page }) => {
      await page.goto('https://lvmpd-stage.le2.imageware.io/')
      await page.goto('https://lvmpd-stage.le2.imageware.io/web/login')

      await page.getByPlaceholder('Username or email').fill('PlaywrightAI')
      await page.getByPlaceholder('Username or email').press('Tab')
      await page.getByPlaceholder('Password').fill('Tech5USA!!')
      await page.getByRole('button', { name: 'LOGIN', exact: true }).click()

      // Alternatively, you can wait until the page reaches a state where all cookies are set.
      await expect(page.getByRole('heading', { name: 'Welcome to' })).toBeVisible()
    })
    test.use({
      storageState: lvmpdPlaywrightAI
    })
    const permsToCheck = [
      // New Records
      accessToNewBookingRecord,
      noAccessToNewCivilRecord,
      accessToNewRegistrantRecord,
      noAccessToNewEmployeeRecord,

      // View Records
      accessToBookingRecords,
      accessToApplicationRecords,

      // Investigate
      accessToLineups,

      // Cards
      accessToCards,

      // Settings
      noAccessToSettings,
      noAccessToAudit,
      noAccessToUsers
    ]

    for (const check of permsToCheck) {
      test(check.name, async ({ page }) => {
        await check(page)
      })
    }
  })

  /* TODO: Fix these
  // ITB Admin
  test.describe('ITB Admin group', async () => {
    test.afterEach(async ({ page }) => {
      await page.context().storageState({
        path: lvmpdPlaywrightITBA
      })
    })
    test('Login as PlaywrightITBA', async ({ page }) => {
      await page.goto('https://lvmpd-stage.le2.imageware.io/')
      await page.goto('https://lvmpd-stage.le2.imageware.io/web/login')

      await page.getByPlaceholder('Username or email').fill('PlaywrightITBA')
      await page.getByPlaceholder('Username or email').press('Tab')
      await page.getByPlaceholder('Password').fill('Tech5USA!!')
      await page.getByRole('button', { name: 'LOGIN', exact: true }).click()

      // Alternatively, you can wait until the page reaches a state where all cookies are set.
      await expect(page.getByRole('heading', { name: 'Welcome to' })).toBeVisible()
    })
    test.use({
      storageState: lvmpdPlaywrightITBA
    })
    const permsToCheck = [
      // New Records
      accessToNewBookingRecord,
      accessToNewCivilRecord,
      accessToNewRegistrantRecord,
      accessToNewEmployeeRecord,

      // View Records
      accessToBookingRecords,
      accessToApplicationRecords,

      // Investigate
      accessToLineups,

      // Cards
      accessToCards,

      // Settings
      //await noAccessToSettings(page); // TODO: Bug where settings page doesn't 404 as expected.
      accessToAudit,
      accessToUsers
    ]

    for (const check of permsToCheck) {
      test(check.name, async ({ page }) => {
        await check(page)
      })
    }
  })
*/

  // Investigative
  test.describe('Investigative group', async () => {
    test.afterEach(async ({ page }) => {
      await page.context().storageState({
        path: lvmpdPlaywrightInvest
      })
    })
    test('Login as PlaywrightInvest', async ({ page }) => {
      await page.goto('https://lvmpd-stage.le2.imageware.io/')
      await page.goto('https://lvmpd-stage.le2.imageware.io/web/login')

      await page.getByPlaceholder('Username or email').fill('PlaywrightInvest')
      await page.getByPlaceholder('Username or email').press('Tab')
      await page.getByPlaceholder('Password').fill('Tech5USA!!')
      await page.getByRole('button', { name: 'LOGIN', exact: true }).click()

      // Alternatively, you can wait until the page reaches a state where all cookies are set.
      await expect(page.getByRole('heading', { name: 'Welcome to' })).toBeVisible()

      // End of authentication steps.

      await page.context().storageState({ path: lvmpdPlaywrightInvest })
    })
    test.use({
      storageState: lvmpdPlaywrightInvest
    })
    const permsToCheck = [
      // New Records
      noAccessToNewBookingRecord,
      noAccessToNewCivilRecord,
      noAccessToNewRegistrantRecord,
      noAccessToNewEmployeeRecord,

      // View Records
      accessToBookingRecords,
      accessToApplicationRecords,

      // Investigate
      accessToLineups,

      // Cards
      accessToCards,

      // Settings
      noAccessToSettings,
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

export async function accessToNewBookingRecord(page: Page) {
  await page.goto('https://lvmpd-stage.le2.imageware.io/web/records/new/info/?jfd-value=90')

  await page.getByRole('heading', { name: 'No [' }).click()
}

export async function noAccessToNewBookingRecord(page: Page) {
  await page.goto('https://lvmpd-stage.le2.imageware.io/web/records/new/info/?jfd-value=90')
  await page.getByRole('heading', { name: '404' }).click()
}

export async function accessToNewCivilRecord(page: Page) {
  await page.goto('https://lvmpd-stage.le2.imageware.io/web/records/new/info/?jfd-value=91')
  await page.getByRole('heading', { name: 'No [' }).click()
}

export async function noAccessToNewCivilRecord(page: Page) {
  await page.goto('https://lvmpd-stage.le2.imageware.io/web/records/new/info/?jfd-value=91')
  await page.getByRole('heading', { name: '404' }).click()
}

export async function accessToNewRegistrantRecord(page: Page) {
  await page.goto('https://lvmpd-stage.le2.imageware.io/web/records/new/info/?jfd-value=92')
  await page.getByRole('heading', { name: 'No [' }).click()
}

export async function noAccessToNewRegistrantRecord(page: Page) {
  await page.goto('https://lvmpd-stage.le2.imageware.io/web/records/new/info/?jfd-value=92')
  await page.getByRole('heading', { name: '404' }).click()
}

export async function accessToNewEmployeeRecord(page: Page) {
  await page.goto('https://lvmpd-stage.le2.imageware.io/web/records/new/info/?jfd-value=93')
  await page.getByRole('heading', { name: 'No [' }).click()
}

export async function noAccessToNewEmployeeRecord(page: Page) {
  await page.goto('https://lvmpd-stage.le2.imageware.io/web/records/new/info/?jfd-value=93')
  await page.getByRole('heading', { name: '404' }).click()
}

export async function accessToBookingRecords(page: Page) {
  await page.goto('https://lvmpd-stage.le2.imageware.io/web/search/?recordType=Booking')
  await page.getByText('RecordsRecords simple').click()
}

export async function noAccessToBookingRecords(page: Page) {
  await page.goto('https://lvmpd-stage.le2.imageware.io/web/search/?recordType=Booking')
  await page.getByRole('heading', { name: '404' }).click()
}

export async function accessToApplicationRecords(page: Page) {
  await page.goto('https://lvmpd-stage.le2.imageware.io/web/records/?recordType=Application')
  await page.getByText('RecordsRecord simple').click()
}

export async function noAccessToApplicationRecords(page: Page) {
  await page.goto('https://lvmpd-stage.le2.imageware.io/web/records/?recordType=Application')
  await page.getByRole('heading', { name: '404' }).click()
}

export async function accessToLineups(page: Page) {
  await page.goto('https://lvmpd-stage.le2.imageware.io/web/lineups')
  await page.getByText('LineupsLineups simple').click()
}

export async function noAccessToLineups(page: Page) {
  await page.goto('https://lvmpd-stage.le2.imageware.io/web/lineups')
  await page.getByRole('heading', { name: '404' }).click()
}

export async function accessToCards(page: Page) {
  await page.goto('https://lvmpd-stage.le2.imageware.io/web/cards')
  await page.getByRole('heading', { name: 'Cards' }).click()
}

export async function noAccessToCards(page: Page) {
  await page.goto('https://lvmpd-stage.le2.imageware.io/web/cards')
  await page.getByRole('heading', { name: '404' }).click()
}

export async function noAccessToSettings(page: Page) {
  await page.goto('https://lvmpd-stage.le2.imageware.io/web/settings')
  await page.getByRole('heading', { name: '404' }).click()
}

export async function noAccessToUsers(page: Page) {
  await page.goto('https://lvmpd-stage.le2.imageware.io/web/users')
  await page.getByRole('heading', { name: '404' }).click()
}

export async function accessToUsers(page: Page) {
  await page.goto('https://lvmpd-stage.le2.imageware.io/web/users')
  await page.getByRole('heading', { name: 'Users and Groups' }).click()
}

export async function accessToAudit(page: Page) {
  await page.goto('https://lvmpd-stage.le2.imageware.io/web/audit')
  await page.getByRole('heading', { name: 'Audit' }).click()
}

export async function noAccessToAudit(page: Page) {
  await page.goto('https://lvmpd-stage.le2.imageware.io/web/audit')
  await page.getByRole('heading', { name: '404' }).click()
}
