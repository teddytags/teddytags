import { h, render, Component, Fragment, VElement } from "teddytags";
describe("TeddyVDOM Core - Fragments", () => {
  beforeEach(() => {
    const fixture = `<div id="test"></div>`;
    document.body.insertAdjacentHTML("afterbegin", fixture);
  });
  afterEach(function() {
    document.body.removeChild(document.getElementById("test"));
  });
  it("should render a fragment in the element like a simple `h` component does", () => {
    const frag = <Fragment>Hello, World</Fragment>;
    render(frag, document.querySelector("#test"));
    expect(document.querySelector("#test").innerHTML).toBe("Hello, World");
  });
  it("should render a fragment in the element from a class Component", () => {
    class App extends Component {
      constructor(props) {
        super(props);
      }
      render(): VElement {
        return (
          <Fragment>
            <h1>Hello, World</h1>
          </Fragment>
        );
      }
    }
    render(<App />, document.querySelector("#test"));
    expect(document.querySelector("#test").innerHTML).toBe(
      "<h1>Hello, World</h1>"
    );
  });
  it("will render its child elements without any wrapper", () => {
    const frag = (
      <Fragment>
        <h1>1</h1>
        <h1>2</h1>
        <h1>3</h1>
        <h1>4</h1>
      </Fragment>
    );
    render(frag, document.querySelector("#test"));
    expect(document.querySelector("#test").childElementCount).toBe(4);
  });
  it("should play well with `setState()`", () => {
    interface State {
      count: number;
    }
    class App extends Component<any, State> {
      constructor(props) {
        super(props);
        this.state = { count: 0 };
        this.setState({ count: 1 });
      }
      render(): VElement {
        return <Fragment>{this.state.count}</Fragment>;
      }
    }
    render(<App />, document.querySelector("#test"));
    expect(document.querySelector("#test").innerHTML).toBe("1");
  });
});
