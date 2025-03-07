import { test, expect, Page } from "@playwright/test";
import path from "path";
import {
  
  SubAreaNames,
  Timeouts,
} from "../constants/Commons/commons";
import {
  clearCache,
  loginToAccount,
  
  NavigateToSubArea,
} from "../utility/helper";
import { Orgisationdetails } from "../testSettings.json";
import {
  SearchRecordsAndValidateInGrid,
  ValidatesavedBookingRecordsGridPageWithoutSearch,
  waitForLoadGridData,
} from "../utility/SavedBookingrecordsPageHelper";
import {
  SavedBookingRecorsPage,
} from "../constants/Selectors/RecordsPageSelectors";

test.describe.configure({ mode: "parallel" });
test.describe("Lvmpd Admin User TestCase Runner", () => {
  test.describe.configure({ timeout: 120000 });

  test.beforeEach(async ({ context, page }) => {
    await page.goto(Orgisationdetails.OrgUrllVMPD);
    await clearCache(context);
    await loginToAccount(
      page,
      Orgisationdetails.LvmpdSuperAdmin_UserName,
      Orgisationdetails.LvmpdSuperAdmin_UserPassword
    );
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("TC007:Login test with valid credantials", async () => {
    console.log("passed");
  });

  test("TC008:validate saved booking records without search", async ({
    page,
  }) => {
    await NavigateToSubArea(page, SubAreaNames.savedBookingRecords);
    await ValidatesavedBookingRecordsGridPageWithoutSearch(page);
    
  });

  test("TC009:Search and validate the saved booking record", async ({
    page,
  }) => {
    await NavigateToSubArea(page, SubAreaNames.savedBookingRecords);
    await SearchRecordsAndValidateInGrid(
      page,
      SavedBookingRecorsPage.RecordSearchBar,
      "adc"
    );
  });

  })