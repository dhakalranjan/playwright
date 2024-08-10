import { test, expect } from "@playwright/test";
import { LoginPage } from "../pageObject/login";

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.visitPage();
});

test("Login with an Invalid User", async ({ page }) => {
  //login with users
  const login = new LoginPage(page);
  await login.login("locked_out_user", "secret_sauce");

  const errorSHow = page.getByText(
    "Epic sadface: Sorry, this user has been locked out."
  );
  await expect(errorSHow).toBeVisible();

});
test("Login with a valid user", async ({ page }) => {
  const login = new LoginPage(page);
  await login.login("standard_user", "secret_sauce");

  const successLogin = page.locator(".product_label");
  await expect(successLogin).toHaveText("Products");

  await expect(page).toHaveURL("https://www.saucedemo.com/v1/inventory.html");
  
});
