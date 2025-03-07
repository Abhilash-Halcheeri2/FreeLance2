import { Page } from "@playwright/test";
import { Card_searchBar, CardsLocators } from "../constants/Selectors/CardsPageSelectors";
import { clearAndFillTextBox } from "./helper";
import { clickFormActionButton, waitforLoadDialog, waitForLoadGridData } from "./SavedBookingrecordsPageHelper";
import { ActionButtonTypes } from "../constants/Selectors/NewBookingRecordsSelector";
import { SavedBookingRecorsPage } from "../constants/Selectors/RecordsPageSelectors";
import { selectOptionsFromBiographicsDD } from "./BookingRecordsHelpers";
import { HomePageLocators } from "../constants/Selectors/HomePageSelectors";



export async function searchCards(page:Page){
    await page.waitForSelector(SavedBookingRecorsPage.RecordsGrid);
    const search_bar:any = page.getByPlaceholder(Card_searchBar);
    await page.waitForSelector(search_bar);
    await clearAndFillTextBox(page,search_bar,"Hello");
}

export async function delteCardsfromGrid(page:Page){
await page.waitForSelector(SavedBookingRecorsPage.RecordsGrid);
await clickFormActionButton(page,ActionButtonTypes.Delete_card);
await page.waitForSelector("[role='dialog']");
await page.locator("//button[text()='Yes, delete']").click();

}

export async function uploadCard(
    page: Page,
    CardDisplayName: string,
    recordType: string,
    cardLocation: string,
    
  ) {
    
    await waitForLoadGridData(page);
    await page.waitForSelector(CardsLocators.uploadCards);
   await page.locator(CardsLocators.uploadCards).click();
    await waitforLoadDialog(page);
    const [filechooser] = await Promise.all([
       page.waitForEvent("filechooser"),
       page.locator("//label[text()='Select File']").click()
     
    ]);
  
    filechooser.setFiles(cardLocation);
    //await page.locator(CardsLocators.uploadCards).click();
  
    await selectOptionsFromBiographicsDD(page, "select", recordType);
    await clearAndFillTextBox(page, CardsLocators.displayName, CardDisplayName);
  
    await page.locator(HomePageLocators.login_btn).click();
  }