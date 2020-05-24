import { h, Component, render } from "teddytags";
describe("TeddyVDOM Core - diff", () => {
  let timerCallback;
  beforeEach(() => {
    const fixture = `<div id="test"></div>`;
    timerCallback = jasmine.createSpy("timerCallback");
    jasmine.clock().install();
    document.body.insertAdjacentHTML("afterbegin", fixture);
  });
  afterEach(function() {
    jasmine.clock().uninstall();
    document.body.removeChild(document.getElementById("test"));
  });
  class Greet extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      return <h1>Hi, {this.props.name}</h1>;
    }
  }
  class Counter extends Component {
    constructor(props) {
      super(props);
      this.state = { count: 0 };
      setInterval(() => {
        this.setState({ count: this.state.count += 1 });
      }, 1000);
    }
    render() {
      return <h1 id="count">Count: {this.state.count}</h1>;
    }
  }
  it("should render and diff Counter component", () => {
    render(<Counter />, document.querySelector("#test"));
    const el = document.querySelector("#test #count");
    const interval = setInterval(() => {
      timerCallback();
      let count = 0;
      expect(el.innerHTML).toBe(`Count: ${count}`);
      count += 1;
      jasmine.clock().tick(1000);
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
    }, 10000);
  });
  it("should render and diff Greet component", () => {
    render(<Greet name="Yoda" />, document.querySelector("#test"));
    const el = document.querySelector("#test h1");
    expect(el.innerHTML).toBe("Hi, Yoda");
  });
});
