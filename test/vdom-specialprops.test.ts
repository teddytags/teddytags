import { h, render } from "../lib/teddytags";
describe("TeddyVDOM - special properties", () => {
  beforeEach(() => {
    var fixture = `<div id="test"></div>`;

    document.body.insertAdjacentHTML("afterbegin", fixture);
  });
  afterEach(function() {
    document.body.removeChild(document.getElementById("test"));
  });
  it("should set 'innerHTML' of the component", () => {
    let app = h("h1", { innerHTML: "This is innerHTML" });
    render(app, document.querySelector("test"));
    expect(document.querySelector("#test h1").innerHTML).toBe(
      "This is innerHTML"
    );
  });
  it("should set 'class' of the component through 'className'", () => {
    let app = h("h1", { className: "class" });
    render(app, document.querySelector("test"));
    expect(document.querySelector("#test h1").className).toBe("class");
  });
});
