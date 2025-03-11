import { test, Page } from "@playwright/test";
import {
  ControlType,
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
  AdvancedSearch_SearchData,
  Click_AdvanceSearch_btn,
  ClickOnAdvancedSearchResult,
  printSavedBookingForm,
  SearchAndGetRecordsCount,
  searchSavedBookingRecord,
  selectAdvancedSearchFieldValue,
  selectAdvancedSearchOperator,
  testGridSorting,
  ValidateAdvancedSearchResults,
  validateFormStatus,
  waitForLoadGridData,
} from "../utility/SavedBookingrecordsPageHelper";
import {
  CreateCRM_Record,
  Fill_OCA_BookingNumber,
  validateFormType,
} from "../utility/CRM_Adult_Page";
import { saveBiographicsForm } from "../utility/BookingRecordsHelpers";
import { openGridRecordsWithoutSearch } from "../utility/TransactionViewerPageHelper";
import { CRM_AdultGrid_Headers, printOptions } from "../constants/Selectors/NewBookingRecordsSelector";
import { AdvancedSearchfieldValuesDropdown_opt, AdvancedSearchOperatorsDropdown_opt } from "../constants/Selectors/RecordsPageSelectors";

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

  test("TC:Open existing record and perform print action", async ({ page }) => {
    await NavigateToSubArea(page, SubAreaNames.savedBookingRecords);
    await openGridRecordsWithoutSearch(
      page,
      GridType.SavedBookingRecords,
      2,
      1
    );
    await printSavedBookingForm(page);
  });

  test("Search record in CRM grid and validate them", async ({ page }) => {
    await NavigateToSubArea(page, SubAreaNames.savedBookingRecords);
    await SearchAndGetRecordsCount(page, GridType.CRM_Adult, "12345");
  });

  test("Sorting CRM Grid by first name", async ({ page }) => {
    await NavigateToSubArea(page, SubAreaNames.savedBookingRecords);
    await searchSavedBookingRecord(page, GridType.CRM_Adult, "12345");
    await waitForLoadGridData(page);
    await testGridSorting(page, CRM_AdultGrid_Headers.FirstName, true);
  });
  test("TC:Sorting CRM Grid header by lastname by des", async ({ page }) => {
    await NavigateToSubArea(page, SubAreaNames.savedBookingRecords);
    await searchSavedBookingRecord(page, GridType.CRM_Adult, "12345");
    await waitForLoadGridData(page);
    await testGridSorting(page, CRM_AdultGrid_Headers.LastName, false);
  });

    test("TC:search and validate the advanced search result:FirstName", async ({
      page,
    }) => {
      await NavigateToSubArea(page, SubAreaNames.savedBookingRecords);
      await Click_AdvanceSearch_btn(page);
      await selectAdvancedSearchFieldValue(
        page,
        AdvancedSearchfieldValuesDropdown_opt.first
      );
      await selectAdvancedSearchOperator(
        page,
        AdvancedSearchfieldValuesDropdown_opt.first,
        AdvancedSearchOperatorsDropdown_opt.Equal
      );
      await AdvancedSearch_SearchData(page, ControlType.TextBox, "GONZO");
      await ClickOnAdvancedSearchResult(page);
      await ValidateAdvancedSearchResults(
        page,
        AdvancedSearchfieldValuesDropdown_opt.first,
        AdvancedSearchOperatorsDropdown_opt.Equal,
        "GONZO"
      );
    });

     test("TC:[FullBookingReport] Print the saved form: ", async ({ page }) => {
        await NavigateToSubArea(page, SubAreaNames.savedBookingRecords);
        await openGridRecordsWithoutSearch(
          page,
          GridType.SavedBookingRecords,
          2,
          3
        );
        await printSavedBookingForm(page,printOptions.FullBookingReport);
      });
});
