import { Tag } from "Lib/teddytags.js";
describe("TeddyTags Event Listener with Custom Elements", () => {
  beforeEach(() => {
    var fixture = `
        <div id="test">
            <div id="listener">
                <sometext>Some Text.</sometext>
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
    let text = document.querySelector("#listener p#sometext");
    let button: Element | any = document.querySelector(
      "#listener button#clickme"
    );
    button.addEventListener("click", () => {
      text.innerHTML = "Listener Triggered.";
    });
    button.click();
    expect(text.innerHTML).toBe("Listener Triggered.");
  });
});
