import { Tag } from "Lib/teddytags.js";
describe("TeddyTags Constructor and other functions", () => {
  beforeEach(() => {
    const fixture = `
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
    const construct = new Tag({ name: "testTag", to: "p" });
    expect(construct.current).toBe("p");
    expect(construct.originalName).toBe("testTag");
  });
});
