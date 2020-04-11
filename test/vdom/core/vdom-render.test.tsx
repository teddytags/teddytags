import { h, render, Component } from "Lib/teddytags.js";
describe("TeddyVDOM Core - render", () => {
  beforeEach(() => {
    var fixture = `<div id="test"></div>`;
    document.body.insertAdjacentHTML("afterbegin", fixture);
  });
  afterEach(function() {
    document.body.removeChild(document.getElementById("test"));
  });
  it("should render element in the html", () => {
    let el = <h1 id="H1">Hello World!</h1>;
    render(el, document.querySelector("#test"));
    expect(document.querySelector("#test #H1").innerHTML).toBe("Hello World!");
  });
  it("should render element in the html with children as numbers, string and boolean", () => {
    let el = (
      <h1 id="H1">
        {"Hello World!"}
        {13}
        {true}
      </h1>
    );
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
        return <h1 id="H1">Hi, {this.props.name}</h1>;
      }
    }
    let el = h(App, { name: "VSCODE" });
    render(el, document.querySelector("#test"));
    expect(document.querySelector("#test #H1").innerHTML).toBe("Hi, VSCODE");
  });
  it("should render with event listener", () => {
    let log: any[] = [];
    class App extends Component {
      constructor(props) {
        super(props);
      }
      render() {
        return (
          <button
            onClick={() => {
              log.push("Bye");
            }}
          >
            HI
          </button>
        );
      }
    }
    render(h(App, null), document.querySelector("#test"));
    let el: Element | any = document.querySelector("#test button");
    el.click();
    expect(log[0]).toBe("Bye");
  });
});
