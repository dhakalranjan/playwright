import { test, expect } from "@playwright/test";
import { LoginPage } from "../pageObject/login";
import { cartPage } from "../pageObject/cart";

test.beforeEach(async ({ page }) => {
  //for Login
  const login = new LoginPage(page);
  await login.visitPage();
  await login.login("standard_user", "secret_sauce");
});

test("Add to the cart", async ({ page }) => {
  //to hove the each items
  const cart = new cartPage(page);
  await cart.cartHover();

  // //I have clicked all 6 items
  cart.addToCart();

  //validating the total number of carts
  const totalCart = page.locator(".shopping_cart_badge");
  await expect(totalCart).toHaveText("6");
  console.log(totalCart);
});
