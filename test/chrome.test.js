require("chromedriver");
const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
var sw = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { By } = require("selenium-webdriver");
var driver = new sw.Builder()
  .withCapabilities(sw.Capabilities.chrome())
  .setChromeOptions(new chrome.Options().headless())
  .build();
var chaiWebdriver = require("chai-webdriver");
chai.use(chaiWebdriver(driver));
driver.get("http://localhost:8080/").then(() => {
  driver.sleep(1000);
});
describe("TeddyTags in Chrome", () => {
  it(`will look for 'myHeader' to be compiled and have id 'myHeader`, () => {
    driver
      .findElement(By.name("header"))
      .getAttribute("id")
      .then(id => {
        expect(id)
          .equal("myHeader")
          .catch(e => {
            console.log(e);
          });
      });
  });
  it(`will look for 'myHeader' to be compiled and have tag name 'h1'`, () => {
    driver
      .findElement(By.name("header"))
      .getAttribute("tagName")
      .then(tag => {
        expect(tag)
          .equal("H1")
          .catch(e => {
            console.log(e);
          });
      });
  });
  it(`will look for 'lol' to be compiled as 'button' with id 'lol'`, () => {
    driver
      .findElement(By.id("lol"))
      .getAttribute("tagName")
      .then(tag => {
        expect(tag)
          .equal("BUTTON")
          .catch(e => {
            console.log(e);
          });
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
          })
          .catch(e => {
            console.log(e);
          });
      })
      .then(() => {
        driver.quit();
      });
  });
});
