import { Tag } from "Lib/teddytags.js";
describe("TeddyTags Constructor and other functions", () => {
  beforeEach(() => {
    var fixture = `
        <div id="test">
            <div id="tags">
                <testTag>Test Tag</testTag>
                <customH1>This is a H1 tag</customH1>
                <customH2>This is a H2 tag</customH2>
                <customP>This is a paragraph</customP>
                <myButton>This is a button</myButton>
            </div>
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
  it("will check constructor properties to be equal", () => {
    let construct = new Tag("testTag");
    expect(construct.selector).toEqual(document.querySelectorAll("testTag"));
    expect(construct.elementName).toBe("testTag");
  });
  it("will override id attribute", () => {
    let testEl = document.createElement("lol");
    testEl.id = "id";
    testEl.className = "lol-element"
    document.querySelector("#test").appendChild(testEl);
    new Tag("lol").set("h1");
    testEl = document.querySelector("#test h1.lol-element")
    expect(testEl.id).toBe("lol");
  });
});
