import { h, render, Component } from "../lib/vdom";
describe("TeddyVDOM - render", () => {
  beforeEach(() => {
    var fixture = `<div id="test"></div>`;

    document.body.insertAdjacentHTML("afterbegin", fixture);
  });
  afterEach(function() {
    document.body.removeChild(document.getElementById("test"));
  });
  it("should render element in the html", () => {
    let el = h("h1", { id: "H1" }, "Hello World!");
    render(el, document.querySelector("#test"));
    expect(document.querySelector("#test #H1").innerHTML).toBe("Hello World!");
  });
  it("should render element in the html with children as numbers, string and boolean", () => {
    let el = h("h1", { id: "H1" }, "Hello World!", 13, true);
    render(el, document.querySelector("#test"));
    expect(document.querySelector("#test #H1").innerHTML).toBe(
      "Hello World!13true"
    );
  });
  it("should render element in the html(Recursive h)", () => {
    let el = h("h1", { id: "H1" }, h("span", null, "Hello World!"));
    render(el, document.querySelector("#test"));
    expect(document.querySelector("#test #H1 span").innerHTML).toBe(
      "Hello World!"
    );
  });
  it("should render component in the html", () => {
    class App extends Component {
      constructor(props) {
        super(props);
      }
      render() {
        return h("h1", { id: "H1" }, "Hi, ", this.props.name);
      }
    }
    let el = h(App, { name: "VSCODE" });
    render(el, document.querySelector("#test"));
    expect(document.querySelector("#test #H1").innerHTML).toBe("Hi, VSCODE");
  });
});
