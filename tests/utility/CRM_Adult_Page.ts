import { expect, Page } from "playwright/test";
import { CRM_AdultPage } from "../constants/Selectors/CRM_AdultPageSelectors";
import { clearAndFillTextBox, waitForDomContentLoad } from "./helper";
import {
  getFormType,
} from "./SavedBookingrecordsPageHelper";
import {
  Attributes,
  generateRandomString,
  stringFormat,
  Timeouts,
} from "../constants/Commons/commons";
import {
  ActionButtonTypes,
  Biographics_Dropdown_fields,
  Biographics_form_fields,
  New_BookingRecord_Selectors,
  Sex_Offender_Selectors,
  TypeOfDatePickers,
} from "../constants/Selectors/NewBookingRecordsSelector";
import {
  BiographicsFormDateSelect,
  selectOptionsFromBiographicsDD,
  setBiographicsfieldValueOnForm,
} from "./BookingRecordsHelpers";
import {
  DD_EyeColor_List,
  DD_GenderOfVictim_List,
  DD_HairColor_List,
} from "../constants/Commons/NewBookingRecordsCommons";

export async function Fill_OCA_BookingNumber(
  page: Page,
  OCA_BookingNumber: number
) {
  //wait foe load OCA Booking dialog
  await waitForCRMFormLoad(page);
  const OCA_BookingNumberStr = OCA_BookingNumber.toString();
  await clearAndFillTextBox(
    page,
    CRM_AdultPage.OCA_BookingNumber_TextBox,
    OCA_BookingNumberStr
  );
  await page.locator(CRM_AdultPage.OCA_BookingNumberDialog_OKButton).click();
}

export async function waitForCRMFormLoad(page: Page) {
  await waitForDomContentLoad(page);
  await page.waitForTimeout(Timeouts.AnimationTimeout);
  await Promise.all([
    await page.waitForSelector(
      New_BookingRecord_Selectors.BookingPage_FormHeader
    ),
  ]);
}

export async function CreateCRM_Record(page: Page): Promise<number> {
  await setBiographicsfieldValueOnForm(
    page,
    Biographics_form_fields.txt_box_FirstName,
    generateRandomString(5)
  );
  await setBiographicsfieldValueOnForm(
    page,
    Biographics_form_fields.txt_box_LastName,
    generateRandomString(5)
  );
  await BiographicsFormDateSelect(
    page,
    TypeOfDatePickers.crimJDOB,
    "2000/11/15"
  );
  await selectOptionsFromBiographicsDD(
    page,
    Biographics_Dropdown_fields.DD_Gender,
    DD_GenderOfVictim_List.male
  );
  await setBiographicsfieldValueOnForm(
    page,
    Biographics_form_fields.txt_box_Height,
    "506"
  );
  await setBiographicsfieldValueOnForm(
    page,
    Biographics_form_fields.txt_box_Weight,
    "206"
  );
  await selectOptionsFromBiographicsDD(
    page,
    Biographics_Dropdown_fields.DD_EyeColor,
    DD_EyeColor_List.blue
  );
  await selectOptionsFromBiographicsDD(
    page,
    Biographics_Dropdown_fields.DD_HairColor,
    DD_HairColor_List.black
  );
  await BiographicsFormDateSelect(
    page,
    TypeOfDatePickers.CRM_DateOfArrest,
    "2020/05/15"
  );
  const BookingNumberStr = await page
    .locator("//input[@name='OCA.BookingNumber']")
    .getAttribute(Attributes.Value);

  // Convert the value to a number
  const BookingNumber = parseFloat(BookingNumberStr?.trim() || "");
  return BookingNumber;
}

export async function validateFormType(page: Page, FormTypeShouldBe: string) {
  const formName = await getFormType(page);
  expect(formName, "Failed to Validate form type").toBe(FormTypeShouldBe);
}

export async function ClickAddNewRecordOnForm(page: Page) {
  // Click the save add new button on the form
  await page
    .locator(
      stringFormat(
        Sex_Offender_Selectors.buttonLocator,
        ActionButtonTypes.Add_New
      )
    )
    .click();
  await page.waitForTimeout(Timeouts.AnimationTimeout);
}

export async function editCRMRecordFormLevel(
  page: Page,
  OCA_BookingNumber: number
): Promise<number> {
  await ClickAddNewRecordOnForm(page);
  await Fill_OCA_BookingNumber(page, OCA_BookingNumber);
  await setBiographicsfieldValueOnForm(
    page,
    Biographics_form_fields.txt_box_LastName,
    generateRandomString(5)
  );
  const BookingNumberStr = await page
    .locator("//input[@name='OCA.BookingNumber']")
    .getAttribute(Attributes.Value);
  // Convert the value to a number
  const BookingNumber = parseFloat(BookingNumberStr?.trim() || "");
  return BookingNumber;
}
