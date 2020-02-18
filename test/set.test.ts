import { TeddyTags } from "../lib/teddytags";
describe("TeddyTags Custom Elements", () => {
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
  it("will check h1#customH1 to be compiled", () => {
    new TeddyTags("customH1").set("h1");
    let tag = document.querySelector("#tags h1#customH1");
    expect(tag.innerHTML).toBe("This is a H1 tag");
  });
  it("will check h2#customH2 to be compiled", () => {
    new TeddyTags("customH2").set("h2");
    let tag = document.querySelector("#tags h2#customH2");
    expect(tag.innerHTML).toBe("This is a H2 tag");
  });
  it("will check p#customP to be compiled", () => {
    new TeddyTags("customP").set("p");
    let tag = document.querySelector("#tags p#customP");
    expect(tag.innerHTML).toBe("This is a paragraph");
  });
  it("will check button#myButton to be compiled", () => {
    new TeddyTags("myButton").set("button");
    let tag = document.querySelector("#tags button#myButton");
    expect(tag.innerHTML).toBe("This is a button");
  });
});
