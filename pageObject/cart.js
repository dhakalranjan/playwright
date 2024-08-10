exports.cartPage = class cartPage {
  constructor(page) {
    this.page = page;
    this.getProduct = ".inventory_item";
    this.loginButton = "#login-button";
    this.getAllCarts = ".btn_primary.btn_inventory";
  }
  async cartHover() {
    await this.page.locator(this.getProduct).nth(0).hover();
    await this.page.locator(this.getProduct).nth(1).hover();
  }
  async addToCart() {
    const addCarts = await this.page.$$(this.getAllCarts);
    for (const addCart of addCarts) {
      await addCart.click();
    }
  }
};
