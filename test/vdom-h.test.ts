import { h, Component } from "../lib/teddytags";
describe("TeddyVDOM - h", () => {
  beforeEach(() => {
    var fixture = `<div id="test"></div>`;

    document.body.insertAdjacentHTML("afterbegin", fixture);
  });
  afterEach(function() {
    document.body.removeChild(document.getElementById("test"));
  });
  it("should create a element(without props)", () => {
    let el = h("h1", null, "Hello", "VDOM");
    let shouldBeEl = {
      type: "h1",
      props: { children: ["Hello", "VDOM"] },
    };
    expect(el).toEqual(shouldBeEl);
  });
  it("should create a element(with props)", () => {
    let el = h("h1", { id: "BOO", class: "lol", Name: "hey" }, "Hello", "VDOM");
    let shouldBeEl = {
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
    let el = h("h1", null, "Hello", h("h1", null, "H1"));
    let shouldBeEl = {
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
    let el = h(Prefer, { prefer: "Node.js", over: "PHP" });
    let shouldBeEl = {
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
    let el = h(App, { name: "Master" });
    let shouldBeElRaw = [App, { name: 'Master' }];
    let shouldBeElRender = {type: 'h1', props : {children: ['Hi,', 'Master']}}
    expect(el).toEqual(shouldBeElRaw);
    expect(new App({ name: "Master" }).render()).toEqual(shouldBeElRender);
  });
});
