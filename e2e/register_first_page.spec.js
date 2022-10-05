// @ts-check
const { test, expect } = require('@playwright/test');
const { timeout } = require('../playwright.config');
const { RegistrationPage } = require('../pom/registration-page');

const regist1Data = require('../test-data/registration_1.json');


test.describe("first page: data validation ", () => {

regist1Data.forEach(data => {

  test(`${data.valid} email registration: ${data.email}`, async ({ page }) => {

      const regPage = new RegistrationPage(page);
      await cookieConsent(regPage);

      await regPage.fillFirstPage(`${data.email}`, `${data.password}`);

      if (`${data.valid}` == "bad") {
        await expect(regPage.emailAlert).toBeVisible();
        await expect(regPage.emailAlert).toHaveText(`${data.email_error}`);
      } else {
        await expect(page).toHaveTitle("Register | Merkur Slots | MERKUR Slots");
      }
        
    });

})

});


test.describe("navigation ", () => {


  test('go back to first registration page', async ({ page }) => {
  
    const regPage = new RegistrationPage(page);
    await cookieConsent(regPage);
    const email = "b@b.com";
    const password = "Pass123!"
    await regPage.fillFirstPage(email, password);
  
    await regPage.registrationBackButon.click();

    // expect email and password to have content preserved
    await expect(regPage.newEmail).toHaveValue(email);
    await expect(regPage.newPassword).toHaveValue(password);
  
  });
  
  });

 
test.describe("exit registration", () => {

    test('exit registration - continue', async ({ page }) => {

      const regPage = new RegistrationPage(page);
      await cookieConsent(regPage);

      const URL = page.url();
    
      // click left back button and then continue
      await regPage.leaveRegButton.click();
      await regPage.continueRegButton.click(); 

      // expect go to back to page    
      await expect(page).toHaveURL(URL);
      
    });

    test('exit registration - exit', async ({ page }) => {
    
      const regPage = new RegistrationPage(page);
      await cookieConsent(regPage);

      const URL = page.url();
    
      // click left back button and then confirm exit
      await regPage.leaveRegButton.click();
      await regPage.reallyLeaveRegButton.click(); 

      // expect not to go to back to page
      await expect(page).not.toHaveURL(URL);
    
    });
    
    });


test.describe("e2e registration", () =>{

  test('complete registration process', async ({ page }) => {
    const regPage = new RegistrationPage(page);
    await cookieConsent(regPage);
  
    // page 1/4
    await regPage.fillFirstPage('a@a.com', 'Pass123!');

    // page 2/4
    await regPage.newFirstName.fill('ana');
    await regPage.newLastName.fill('bana');
    await regPage.newDOB.fill('01-01-1990Y');
    await regPage.nextButton.click();

    // page 3/4    
    await regPage.newPostCode.fill('123456');
    await page.locator('text=12345, The Tri Centre, New Bridge Square, Swindon, SN1 1HN').click();
    await regPage.newPhone.type('7975777666', {delay: 10});  
    await regPage.nextButton.click();

    // page 4/4
    await regPage.termsCondCheckBox.check();
    await regPage.registerButton.click();

    //IF OOPSIE
    const oopsie =await regPage.oops.isVisible()
    if (oopsie) {
      await regPage.contactSupportButton.click();
      await expect(page).toHaveURL(regPage.supportURL);
    } else {
      await expect(page).toHaveURL(regPage.successURL)
    }
 
  })
});


async function cookieConsent(page) { 
  await page.goto();
  await page.cookieConsent.click();
  await expect(page.prefCookies).toBeVisible;
}
