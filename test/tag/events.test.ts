import { Tag } from "teddytags";
describe("TeddyTags Event Listener with Custom Elements", () => {
  beforeEach(() => {
    const fixture = `
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
    new Tag({ name: "sometext", to: "p" });
    new Tag({ name: "clickme", to: "button" });
    const text = document.querySelector("#listener p");
    const button: Element | any = document.querySelector("#listener button");
    button.addEventListener("click", () => {
      text.innerHTML = "Listener Triggered.";
    });
    button.click();
    expect(text.innerHTML).toBe("Listener Triggered.");
  });
});
