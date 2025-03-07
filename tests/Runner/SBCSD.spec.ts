import { test, Page } from "@playwright/test";
import {
  ControlType,
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
  SearchRecordsAndValidateInGrid,
  selectAdvancedSearchFieldValue,
  selectAdvancedSearchOperator,
  ValidateAdvancedSearchResults,
} from "../utility/SavedBookingrecordsPageHelper";
import {
  AdvancedSearchfieldValuesDropdown_opt,
  AdvancedSearchOperatorsDropdown_opt,
  SavedBookingRecorsPage,
} from "../constants/Selectors/RecordsPageSelectors";
import { SearchAuditHistory } from "../utility/AuditPage";
import { AuditSearchEventTypes, AuthEventAction } from "../constants/Selectors/AuditPageSelectors";


test.describe.configure({ mode: "parallel" });
test.describe("SBCSD Admin User TestCase Runner", () => {
  test.describe.configure({ timeout: 120000 });

  test.beforeEach(async ({ context, page }) => {
    await page.goto(Orgisationdetails.OrgUrlSBCSD);
    await clearCache(context);
    await loginToAccount(
      page,
      Orgisationdetails.SBCSDSuperAdmin_UserName,
      Orgisationdetails.SBCSDSuperAdmin_UserPassword
    );
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("TC007:Login test with valid credantials", async () => {
    console.log("passed");
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

  test("TC010:search and validate the advanced search result,DateOfBirth", async ({
    page,
  }) => {
    await NavigateToSubArea(page, SubAreaNames.savedBookingRecords);
    await Click_AdvanceSearch_btn(page);
    await selectAdvancedSearchFieldValue(
      page,
      AdvancedSearchfieldValuesDropdown_opt.dateOfBirth
    );
    await selectAdvancedSearchOperator(
      page,
      AdvancedSearchfieldValuesDropdown_opt.dateOfBirth,
      AdvancedSearchOperatorsDropdown_opt.Equal
    );
    await AdvancedSearch_SearchData(page, ControlType.DatePicker, "2000/02/10");
    await ClickOnAdvancedSearchResult(page);
    await ValidateAdvancedSearchResults(
      page,
      AdvancedSearchfieldValuesDropdown_opt.dateOfBirth,
      AdvancedSearchOperatorsDropdown_opt.Equal,
      "2023/02/10"
    );
  });
  test("Search audit History",async({page})=>{
    await NavigateToSubArea(page,SubAreaNames.audit);
    await SearchAuditHistory(page,AuditSearchEventTypes.auth,AuthEventAction.login);
   
  })
  


  })