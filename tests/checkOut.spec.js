import { test, expect } from "@playwright/test";
import { LoginPage } from "../pageObject/login";
import { cartPage } from "../pageObject/cart";
import { checkoutPage } from "../pageObject/checkout";

test.beforeEach(async ({ page }) => {
  //for Login
  const login = new LoginPage(page);
  await login.visitPage();
  await login.login("standard_user", "secret_sauce");
});

test("Checkout the all products", async ({ page }) => {
  const cart = new cartPage(page);
  const checkContinue = new checkoutPage(page);

  //to add to the cart
  await cart.addToCart();

  //click Checkout Button
  await page.locator("#shopping_cart_container").click();

  //validate the items in the cart is 6
  await checkContinue.totalItems();

  //then click checkout button
  const checkOut = page.locator(".checkout_button");
  await expect(checkOut).toHaveText("CHECKOUT");
  await checkOut.click();

  //add shipping details
  await checkContinue.shippingDetails("Ranjan", "Dhakal", "44660");

  await expect(page).toHaveURL(
    "https://www.saucedemo.com/v1/checkout-step-two.html"
  );

  //assertion on the step two checkout process and click continue
  await checkContinue.stepTwoCheckout();

  //final page assertion
  await checkContinue.successValidation();
});
