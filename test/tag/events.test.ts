import { Tag } from "Lib/teddytags.js";
describe("TeddyTags Event Listener with Custom Elements", () => {
  beforeEach(() => {
    const fixture = `
        <div id="test">
            <div id="listener">
const          <sometext>Some Text.</sometext>
                <clickme>Click me</clickme>
            </div>
        </div>
        `;

    document.body.insertAdjacentHTML("afterbegin", fixture);
  });
  afterEach(function() {
    document.body.removeChild(document.getElementById("test"));
  });
  it("will check event listener to be working", () => {
    new Tag("sometext").set("p");
    new Tag("clickme").set("button");
    const text = document.querySelector("#listener p#sometext");
    const button: Element | any = document.querySelector(
      "#listener button#clickme"
    );
    button.addEventListener("click", () => {
      text.innerHTML = "Listener Triggered.";
    });
    button.click();
    expect(text.innerHTML).toBe("Listener Triggered.");
  });
});
