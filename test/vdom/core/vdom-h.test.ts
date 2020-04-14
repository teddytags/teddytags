import { h, Component } from "Lib/teddytags.js";
describe("TeddyVDOM Core - h", () => {
  beforeEach(() => {
    const fixture = `<div id="test"></div>`;
    document.body.insertAdjacentHTML("afterbegin", fixture);
  });
  afterEach(function() {
    document.body.removeChild(document.getElementById("test"));
  });
  it("should create a element(without props)", () => {
    const el = h("h1", null, "Hello", "VDOM");
    const shouldBeEl = {
      type: "h1",
      props: { children: ["Hello", "VDOM"] },
    };
    expect(el).toEqual(shouldBeEl);
  });
  it("should create a element(with props)", () => {
    const el = h(
      "h1",
      { id: "BOO", class: "lol", Name: "hey" },
      "Hello",
      "VDOM"
    );
    const shouldBeEl = {
      type: "h1",
      props: {
        id: "BOO",
        class: "lol",
        Name: "hey",
        children: ["Hello", "VDOM"],
      },
    };
    expect(el).toEqual(shouldBeEl);
  });
  it("should create a element(Recursive h)", () => {
    const el = h("h1", null, "Hello", h("h1", null, "H1"));
    const shouldBeEl = {
      type: "h1",
      props: {
        children: ["Hello", { type: "h1", props: { children: ["H1"] } }],
      },
    };
    expect(el).toEqual(shouldBeEl);
  });
  it("should create element from function", () => {
    const Prefer = (props: any) => {
      return h("p", null, `I prefer ${props.prefer} over ${props.over}`);
    };
    const el = h(Prefer, { prefer: "Node.js", over: "PHP" });
    const shouldBeEl = {
      type: "p",
      props: { children: ["I prefer Node.js over PHP"] },
    };
    expect(el).toEqual(shouldBeEl);
  });
  it("should create a Component", () => {
    class App extends Component {
      constructor(props) {
        super(props);
      }
      render() {
        return h("h1", null, "Hi,", this.props.name);
      }
    }
    const el = h(App, { name: "Master" });
    const shouldBeElRaw = [App, { name: "Master", children: [] }];
    const shouldBeElRender = {
      type: "h1",
      props: { children: ["Hi,", "Master"] },
    };
    expect(el).toEqual(shouldBeElRaw);
    expect(new App({ name: "Master" }).render()).toEqual(shouldBeElRender);
  });
});
