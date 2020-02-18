import { TeddyTags } from "../lib/teddytags";
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
    let construct = new TeddyTags("testTag");
    expect(construct.selector).toEqual(document.querySelectorAll("testTag"));
    expect(construct.elementName).toBe("testTag");
  });
  it("will not pass id attribute", () => {
    let testEl = document.createElement("h1");
    testEl.innerHTML = "h1";
    testEl.setAttribute("id", "lol");
    testEl.setAttribute("class", "lol");
    let attrs = testEl.attributes;
    let el = document.createElement("p");
    document.body.appendChild(el);
    new TeddyTags().passAttrs(el, attrs);
    el = document.querySelector("p.lol");
    //el.id = ''
    expect(el.id).toBe("");
    document.body.removeChild(el);
  });
});
