import { test, Page } from "@playwright/test";
import {
  formStatuses,
  formTypes,
  getRandomNumberByLength,
  GridType,
  SubAreaNames,
} from "../constants/Commons/commons";
import {
  clearCache,
  loginToAccount,
  NavigateToSubArea,
} from "../utility/helper";
import { Orgisationdetails } from "../testSettings.json";
import {
  printSavedBookingForm,
  validateFormStatus,
} from "../utility/SavedBookingrecordsPageHelper";
import {
  CreateCRM_Record,
  Fill_OCA_BookingNumber,
  validateFormType,
} from "../utility/CRM_Adult_Page";
import { saveBiographicsForm } from "../utility/BookingRecordsHelpers";
import { openGridRecordsWithoutSearch } from "../utility/TransactionViewerPageHelper";

test.describe.configure({ mode: "parallel" });
test.describe("SBCSD Class user TestCase Runner", () => {
  test.describe.configure({ timeout: 120000 });

  test.beforeEach(async ({ context, page }) => {
    await page.goto(Orgisationdetails.OrgUrlSBCSD);
    await clearCache(context);
    await loginToAccount(
      page,
      Orgisationdetails.SBCSDClass_UserName,
      Orgisationdetails.SBCSDClass_UserPassword
    );
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("TC:Login test with valid credantials", async () => {
    console.log("passed");
  });

  test("TC: Create End to end CRM(Adult Crminal Record)", async ({ page }) => {
    await NavigateToSubArea(page, SubAreaNames.CRM_AdultCriminal);
    await Fill_OCA_BookingNumber(page, getRandomNumberByLength(10));
    await CreateCRM_Record(page);
    await saveBiographicsForm(page);
    await validateFormStatus(page, formStatuses.workInProgress);
  });

  test("TC: View the existing record", async ({ page }) => {
    await NavigateToSubArea(page, SubAreaNames.savedBookingRecords);
    await openGridRecordsWithoutSearch(
      page,
      GridType.SavedBookingRecords,
      2,
      1
    );
    await validateFormType(page, formTypes.CRM_Adult_Criminal);
  });

  test.only("TC:Open existing record and perform print action", async ({
    page,
  }) => {
    await NavigateToSubArea(page, SubAreaNames.savedBookingRecords);
    await openGridRecordsWithoutSearch(
      page,
      GridType.SavedBookingRecords,
      2,
      1
    );
    await printSavedBookingForm(page);
  });
});
