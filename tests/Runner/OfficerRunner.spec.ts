import { test, expect } from "@playwright/test";
import { Orgisationdetails } from "../testSettings.json";
import { Timeouts } from "../constants/Commons/commons";
import { loginToAccount, loginWithMSCredentials } from "../utility/helper";
import { CardsErrorMessage } from "../constants/Commons/constants";
import { OfficerUserLocators } from "../constants/Selectors/HomePageSelectors";

test.describe.configure({ mode: "parallel" });
test.describe(" User Officer test runner", () => {
  test.describe.configure({ timeout: 60000 });

  test.beforeEach(async ({ page }) => {
    await page.goto(Orgisationdetails.OrgUrl);
    await loginToAccount(
      page,
      Orgisationdetails.Officer_UserName,
      Orgisationdetails.Officer_UserPassword
    );
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("test1", async ({ page }) => {
    const orgURL = page.url();

    const updateURLForCards = `${orgURL} ${"/cards"}`;
    await page.goto(updateURLForCards);

    const [response1] = await Promise.all([
      page.waitForResponse(updateURLForCards, { timeout: 5000 }),
      page.goto(updateURLForCards),
    ]);

    expect(response1.status()).toBe(200);
    expect(
      await page.locator(OfficerUserLocators.errorMessage_txt).textContent()
    ).toBe(CardsErrorMessage);

    await page.goto(orgURL);
    const updateURLForAudit = `${orgURL} ${"/Audit"}`;
    await page.goto(updateURLForAudit);

    const [response2] = await Promise.all([
      page.waitForResponse(updateURLForCards, { timeout: 5000 }),
      page.goto(updateURLForCards),
    ]);

    expect(
      await page.locator(OfficerUserLocators.errorMessage_txt).textContent()
    ).toBe(CardsErrorMessage);

    await page.goto(orgURL);
    const updateURLForUsers = `${orgURL} ${"/users"}`;
    await page.goto(updateURLForUsers);
    const [response3] = await Promise.all([
      page.waitForResponse(updateURLForCards, { timeout: 5000 }),
      page.goto(updateURLForCards),
    ]);

    expect(
      await page.locator(OfficerUserLocators.errorMessage_txt).textContent()
    ).toBe(CardsErrorMessage);
  });
});
