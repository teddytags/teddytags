import { h, Component, render } from "../lib/vdom";
describe("TeddyVDOM - diff", () => {
  let timerCallback
  beforeEach(() => {
    var fixture = `<div id="test"></div>`;
    timerCallback = jasmine.createSpy('timerCallback')
    jasmine.clock().install()
    document.body.insertAdjacentHTML("afterbegin", fixture);
  });
  afterEach(function() {
    jasmine.clock().uninstall()
    document.body.removeChild(document.getElementById("test"));
  });
  class Greet extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      return h("h1", null, "Hi, ",this.props.name);
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
      return h("h1", { id: "count" }, "Count: ", this.state.count);
    }
  }
  it("should render and diff Counter component", () => {
    render(h(Counter, null), document.querySelector("#test"));
    let el = document.querySelector("#test #count");
    let interval = setInterval(() => {
      timerCallback()
      let count = 0;
      expect(el.innerHTML).toBe(`Count: ${count}`);
      count += 1;
      jasmine.clock().tick(1000)
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
    }, 10000);
  });
  it("should render and diff Greet component", () => {
    render(h(Greet, {name: "Yoda"}), document.querySelector("#test"));
      let el = document.querySelector("#test h1");
      expect(el.innerHTML).toBe("Hi, Yoda")
  });
});
