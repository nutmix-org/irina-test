const { expect } = require('@playwright/test');

exports.BasePage = class BasePage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }
      
  async goto(path) {
        await this.page.goto(`https://merkurslots-com-uat.eyasgaming.net/uk/en/${path}`);
  }

}

