import { TeddyTags, h, Component } from "../lib/teddytags";
describe("TeddyTags fromComponent()", () => {
  let timerCallback;
  beforeEach(() => {
    var fixture = `
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
      return h("h1", null, "Hi, ", this.props.user);
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
      return h("h1", { id: "count" }, "Count: ", this.state.count);
    }
  }
  it("should get Timer component working with .fromComponent()", () => {
    new TeddyTags("Timer").fromComponent(Timer);
    let componentel = document.querySelector("#Timer h1");
    expect(componentel.getAttribute("id")).toBe("count");
    let interval = setInterval(() => {
      timerCallback();
      let count = 0;
      expect(componentel.innerHTML).toBe(`Count: ${count}`);
      count += 1;
      jasmine.clock().tick(1000);
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
    }, 10000);
  });
  it("should get Greet component working with .fromComponent()", () => {
    new TeddyTags("Greet").fromComponent(Greet);
    let greet1 = document.querySelectorAll("#Greet h1")[0];
    let greet2 = document.querySelectorAll("#Greet h1")[1];
    expect(greet1.innerHTML).toBe("Hi, React");
    expect(greet2.innerHTML).toBe("Hi, Martin");
  });
});
