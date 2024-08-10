const { expect } = require("@playwright/test");
exports.checkoutPage = class checkoutPage {
  constructor(page) {
    this.page = page;
    this.getProductList = ".inventory_item_name";
    this.firstName = "#first-name";
    this.lastName = "#last-name";
    this.postalCode = "#postal-code";
    this.continueButton = "input[value='CONTINUE']";
    this.stepTwoHeader = ".subheader";
    this.finishButton = "(//a[normalize-space()='FINISH'])[1]";
    this.successMessage = ".complete-header";
  }
  async totalItems() {
    await expect(this.page.locator(this.getProductList)).toHaveCount(6);
  }
  async shippingDetails(firstname, lastname, postalcode) {
    await this.page.locator(this.firstName).fill(firstname);
    await this.page.locator(this.lastName).fill(lastname);
    await this.page.locator(this.postalCode).fill(postalcode);
    await this.page.locator(this.continueButton).click();
  }
  async stepTwoCheckout() {
    await expect(this.page.locator(this.stepTwoHeader)).toHaveText(
      "Checkout: Overview"
    );
    await expect(this.page.locator(this.finishButton)).toBeVisible();
    await this.page.locator(this.finishButton).click();
  }
  async successValidation() {
    await expect(this.page).toHaveURL("https://www.saucedemo.com/v1/checkout-complete.html");
    await expect(this.page.locator(this.successMessage)).toHaveText(
      "THANK YOU FOR YOUR ORDER"
    );
  }
};
