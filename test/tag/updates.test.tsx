import { Tag, Component, h } from "teddytags";
describe("TeddyTags Custom Element Updates", () => {
  beforeEach(() => {
    const fixture = `<div id="test"></div>`;
    jasmine.clock().install();
    document.body.insertAdjacentHTML("afterbegin", fixture);
  });
  afterEach(function() {
    document.body.removeChild(document.getElementById("test"));
    jasmine.clock().uninstall();
  });
  it("should update a custom element to its desired form(HTML5)", () => {
    new Tag({ name: "Foo", to: "p" });
    document.querySelector("#test").innerHTML += "<Foo id='foo'>Hi</Foo>";
  });
  it("should update a custom element to its desired form(Class Component)", () => {
    class App extends Component {
      constructor(props) {
        super(props);
      }
      render() {
        return <h1>Hi</h1>;
      }
    }
    new Tag({ name: "Foo", to: App });
    document.querySelector("#test").innerHTML += "<Foo />";
    jasmine.clock().tick(500);
    expect(document.querySelector("#test").innerHTML === "<h1>Hi</h1>");
  });
});
