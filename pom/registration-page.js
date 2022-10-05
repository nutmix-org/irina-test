const { expect } = require('@playwright/test');
const { BasePage } = require('./base-page')

exports.RegistrationPage = class RegistrationPage extends BasePage  {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    
    //cookies 
    this.cookieConsent = page.locator('button:has-text("ACCEPT ALL")');
    this.prefCookies = page.locator('text=Your preferences have been saved');
    
    //upper left hand side Back button
    this.leaveRegButton = page.locator('data-testid=button-icon-left');
    this.continueRegButton = page.locator('button:has-text("CONTINUE REGISTERING")');
    this.reallyLeaveRegButton = page.locator('button:has-text("YES I WANT TO LEAVE")');
    this.closeLeaveRegButton = page.locator('[data-testid="touch-drawer-header"] div[role="button"] [aria-label="Prompt close button"]');

    this.registrationBackButon = page.locator('[data-testid="step-content-personal-details"] button:has-text("Back")'); //not on first page
    this.nextButton = page.locator('button:has-text("NEXT")');
    
    //1/4
    this.newEmail = page.locator('input[name="email"]');
    this.newPassword = page.locator('input[name="password"]');

    //1/4 error msg
    this.emailAlert = page.locator("xpath=(//div[contains(@class, 'input__box-container')]//following-sibling::ul/li/p)[1]");
    this.emptyEmailMsg = "Please complete this step to continue registration"
    this.invalidEmailMsg =  "Email address is invalid."

    //2/4
    this.newFirstName = page.locator('input[name="firstname"]');
    this.newLastName = page.locator('input[name="lastname"]');
    this.newDOB = page.locator('input[name="dateOfBirth"]');

    //3/4
    this.newPostCode = page.locator('input[name="autoComplete"]');
    this.newPhone = page.locator('input[name="countryCode"]');

    //4/4
    this.termsCondCheckBox = page.locator('input[name="acceptTerms"]');
    this.registerButton = page.locator('button:has-text("REGISTER")');

    //oops
    this.oops = page.locator('.registration-error-step-message');
    this.contactSupportButton = page.locator('button:has-text("Contact Support")');
    this.supportURL = 'https://help.merkurslots.com/hc/en-gb'

    //successfull registration TODO - REPLACE WITH ACTUAL URL LATER
    this.successURL = 'https://merkurslots-com-uat.eyasgaming.net/uk/en/success.html'
  }

    
  async goto(){
    await super.goto('register.html');
  }

  async fillFirstPage(email, password){
    await this.newEmail.fill(email);
    await this.newPassword.fill(password); 
    await this.nextButton.click();
  }


}
