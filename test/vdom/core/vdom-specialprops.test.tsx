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
});
