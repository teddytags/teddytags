import { h, render } from "Lib/teddytags.js";
describe("TeddyVDOM Core - special properties", () => {
  beforeEach(() => {
    const fixture = `<div id="test"></div>`;

    document.body.insertAdjacentHTML("afterbegin", fixture);
  });
  afterEach(function() {
    document.body.removeChild(document.getElementById("test"));
  });
  it("should set 'innerHTML' of the component", () => {
    const app = <h1 innerHTML="This is innerHTML"></h1>;
    render(app, document.querySelector("#test"));
    expect(document.querySelector("#test h1").innerHTML).toBe(
      "This is innerHTML"
    );
  });
  it("should set 'class' of the component through 'className'", () => {
    const app = <h1 className="class"></h1>;
    render(app, document.querySelector("#test"));
    expect(document.querySelector("#test h1").className).toBe("class");
  });
  it("should set 'style' of the component(string)", () => {
    const app = <h1 style="font-size: 12px;"></h1>;
    render(app, document.querySelector("#test"));
    const testEl: HTMLElement = document.querySelector("#test h1");
    expect(testEl.style.cssText.trim()).toBe("font-size: 12px;");
  });
  it("should set 'style' of the component(object)", () => {
    const app = <h1 style={{ fontSize: "12px" }}></h1>;
    render(app, document.querySelector("#test"));
    const testEl: HTMLElement = document.querySelector("#test h1");
    expect(testEl.style.fontSize).toBe("12px");
  });
});
