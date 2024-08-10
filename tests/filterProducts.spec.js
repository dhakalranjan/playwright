import { test, expect } from "@playwright/test";
import { LoginPage } from "../pageObject/login";
import { filterMethod } from "../pageObject/filterProduct";

test.beforeEach(async ({ page }) => {
  //for Login
  const login = new LoginPage(page);
  await login.visitPage();
  await login.login("standard_user", "secret_sauce");
});

test.describe("Swag Lab Login Validation Test Cases", () => {


  test("Filter Products by Name (Descending)", async ({ page }) => {
    //filter the product here in POM
    const filter = new filterMethod(page);
    await filter.filterProductBy("Name (Z to A)");

    //add in to the new array by map and then the text is trim
    const productTitles = await page.$$eval(
      ".inventory_item_name",
      (elements) => elements.map((element) => element.textContent.trim())
    );

    //here i and i+1 is compare to see if there is descending order or not
    for (let i = 0; i < productTitles.length - 1; i++) {
      if (productTitles[i] > productTitles[i + 1]) {
        console.log("Products are sorted in descending order.");
      } else console.log("Product are in ascending order");
    }
  });



  test("Filter Products by Price (Low to High)", async ({ page }) => {
    //filter the product here in POM
    const filter = new filterMethod(page);
    await filter.filterProductBy("Price (low to high)");

    //this is to get the all the product prices and we also have to remove the $ sign also
    // and convert the string into float also,
    const productPrices = await page.$$eval(".inventory_item_price", (prices) =>
      prices.map((price) =>
        parseFloat(price.textContent.replace("$", "").trim())
      )
    );

    for (let i = 0; i < productPrices.length - 1; i++) {
      if (productPrices[i] <= productPrices[i + 1]) {
        console.log("Products Price are sorted in Price (low to high)");
      } else
        console.log("Products Price are not sorted in Price (low to high)");
    }
  });

  
});
