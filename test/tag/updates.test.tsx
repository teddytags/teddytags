import { Tag, Component, h } from "Lib/teddytags.js";
describe("TeddyTags Custom Element Updates", () => {
  beforeEach(() => {
    const fixture = `<div id="test"></div>`;

    document.body.insertAdjacentHTML("afterbegin", fixture);
  });
  afterEach(function() {
    document.body.removeChild(document.getElementById("test"));
  });
  it("should update a custom element to its desired form(HTML5)", () => {
    new Tag({ name: "Foo", to: "p" });
    document.body.innerHTML += "<Foo id='foo'>Hi</Foo>";
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
    document.body.innerHTML += "<Foo />";
  });
});
