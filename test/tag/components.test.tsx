import { Tag, h, Component } from "teddytags";
describe("TeddyTags Custom Elements from Components", () => {
  let timerCallback;
  beforeEach(() => {
    const fixture = `
        <div id="test">
            <Timer></Timer>
            <Greet user="React"></Greet>
            <Greet user="Martin"></Greet>
        </div>
        `;
    timerCallback = jasmine.createSpy("timer");
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
      return <h1>Hi, {this.props.user}</h1>;
    }
  }
  class Timer extends Component {
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
  it("should get Timer component working", () => {
    new Tag({ name: "Timer", to: Timer });
    const componentel: HTMLElement = document.querySelector(
      "div[data-component=Timer]"
    );
    const interval = setInterval(() => {
      timerCallback();
      let count = 0;
      expect(componentel.innerHTML).toBe(`<h1 id="count">Count: ${count}</h1>`);
      count += 1;
      jasmine.clock().tick(1000);
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
    }, 10000);
  });
  it("should get Greet component working", () => {
    new Tag({ name: "Greet", to: Greet });
    const greet1 = document.querySelectorAll("h1")[0];
    const greet2 = document.querySelectorAll("h1")[1];
    expect(greet1.innerHTML).toBe("Hi, React");
    expect(greet2.innerHTML).toBe("Hi, Martin");
  });
});
