import { Page } from "@playwright/test";
import {
  auditEventAction,
  AuditgridSelectors,
  AuditSearchEventTypes,
  AuditSearchSelectors,
  AuthEventAction,
  CardEventAction,
  GroupEventAction,
  IdentifyEventAction,
  SettingEventAction,
  UserEventAction,
} from "../constants/Selectors/AuditPageSelectors";
import {
  waitforAdvancedsearchDialog,
  waitforLoadDialog,
} from "./SavedBookingrecordsPageHelper";

// Helper function to select an option from a dropdown
/**
 * Selects an option from a dropdown menu by clicking on the dropdown and searching through the list of options.
 *
 *
 * @param page - The Playwright Page object
 * @param dropdownSelector - A string representing the CSS selector for the dropdown element.
 * @param optionListSelector - A string representing the CSS selector for the list of options within the dropdown.
 * @param value - The value to search for within the dropdown options.
 * @param fieldName - A descriptive name (used for error messages) to identify the field (e.g., "Event Type", "Event Action").
 */
async function selectDropdownOption(
  page: Page,
  dropdownSelector: string,
  optionListSelector: string,
  value: string,
  fieldName: string
) {
  await page.locator(dropdownSelector).click();
  const options = await page.$$(optionListSelector);
  let optionFound = false;

  for (let opt of options) {
    const txt = await opt.textContent();
    console.log(`${fieldName} option: ${txt}`);
    if (txt?.includes(value)) {
      await page.waitForTimeout(2000);
      await opt.click();
      optionFound = true;
      break;
    }
  }

  if (!optionFound) {
    throw new Error(`${fieldName} value "${value}" not found in the dropdown.`);
  }
}

/**
 *
 * @param eventType
 * @returns
 */
// Helper function to get valid event actions based on the selected event type
function getValidEventActions(eventType: string): string[] | null {
  switch (eventType) {
    case AuditSearchEventTypes.auth:
      return [
        AuthEventAction.login,
        AuthEventAction.loginFail,
        AuthEventAction.logout,
      ];

    case AuditSearchEventTypes.audit:
      return [
        auditEventAction.export,
        auditEventAction.print,
        auditEventAction.search,
        auditEventAction.view,
      ];

    case AuditSearchEventTypes.cards:
      return [
        CardEventAction.create,
        CardEventAction.delete,
        CardEventAction.group,
        CardEventAction.update,
      ];

    case AuditSearchEventTypes.group:
      return [
        GroupEventAction.archive,
        GroupEventAction.create,
        GroupEventAction.duplicate,
        GroupEventAction.unarchive,
        GroupEventAction.update,
      ];

    case AuditSearchEventTypes.identify:
      return [IdentifyEventAction.enroll, IdentifyEventAction.search];

    case AuditSearchEventTypes.setting:
      return [SettingEventAction.edit];

    case AuditSearchEventTypes.user:
      return [
        UserEventAction.create,
        UserEventAction.edit,
        UserEventAction.groupAssignment,
        UserEventAction.locked,
        UserEventAction.passwordChange,
        UserEventAction.search,
        UserEventAction.unarchive,
        UserEventAction.unlocked,
      ];

    default:
      return null; // No valid options for this eventType
  }
}

/**
 *
 * @param page
 * @param eventType
 * @param eventAction
 */
export async function SearchAuditHistory(
  page: Page,
  eventType: string,
  eventAction: string
) {
  await page.locator(AuditgridSelectors.auditSearchButton).click();
  await waitforAdvancedsearchDialog(page);
  const userName = page.getByPlaceholder("Username");
  await userName.fill("IWSAdmin");

  // Step 3: Select eventType from dropdown
  await selectDropdownOption(
    page,
    AuditSearchSelectors.eventType_DD,
    AuditSearchSelectors.eventType_List,
    eventType,
    "Event Type"
  );

  // Step 4: Get valid options for the eventAction based on eventType
  const validOptions = getValidEventActions(eventType);

  // Step 5: If eventType requires an eventAction, check if the action exists and select it
  if (validOptions && validOptions.includes(eventAction)) {
    await selectDropdownOption(
      page,
      AuditSearchSelectors.eventAction,
      AuditSearchSelectors.eventAction_List,
      eventAction,
      "Event Action"
    );
  } else {
    throw new Error(
      `Invalid or missing eventAction: "${eventAction}" for eventType: "${eventType}"`
    );
  }

  console.log(
    `Successfully selected Event Type: ${eventType}, Event Action: ${eventAction}`
  );

  await page.locator("[type='submit']").click();
}

export async function validateAuditrecordIngrid(
  page: Page,
  gridHeader: string,
  valueToBevalidate: string
) {
  //table header
  const headerList = await page.$$("//thead//tr//th//div");

  let count = 0;
  for (let i = 0; i <= headerList.length; i++) {
    const tableheader = await headerList[i].textContent();
    if (tableheader?.includes(gridHeader)) {
      break;
    }
  }
}
