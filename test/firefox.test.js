require("geckodriver");
const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
var sw = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
const { By } = require("selenium-webdriver");
var driver = new sw.Builder()
  .withCapabilities(sw.Capabilities.firefox())
  .setFirefoxOptions(new firefox.Options().headless())
  .build();
var chaiWebdriver = require("chai-webdriver");
chai.use(chaiWebdriver(driver));
driver.get("http://localhost:8080/");
describe("TeddyTags in FireFox", () => {
  it(`will look for 'myHeader' to be compiled and have id 'myHeader`, () => {
    driver
      .findElement(By.name("header"))
      .getAttribute("id")
      .then(id => {
        expect(id).equal("myHeader");
      });
  });
  it(`will look for 'myHeader' to be compiled and have tag name 'h1'`, () => {
    driver
      .findElement(By.name("header"))
      .getAttribute("tagName")
      .then(tag => {
        expect(tag).equal("H1");
      });
  });
  it(`will look for 'lol' to be compiled as 'button' with id 'lol'`, () => {
    driver
      .findElement(By.id("lol"))
      .getAttribute("tagName")
      .then(tag => {
        expect(tag).equal("BUTTON");
      });
  });
  it(`will click on 'button#lol' and check an event listener`, () => {
    driver
      .findElement(By.id("lol"))
      .click()
      .then(() => {
        driver
          .findElement(By.name("header"))
          .getAttribute("innerHTML")
          .then(e => {
            expect(e).equal("Clicked.");
          });
      })
      .then(() => {
        driver.quit();
      });
  });
});
