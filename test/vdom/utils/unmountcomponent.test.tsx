import { unmountComponent, Component, h, render } from "teddytags";
describe("TeddyVDOM Utils - unmountComponent", () => {
  beforeEach(() => {
    const fixture = `<div id="test"></div>`;
    document.body.insertAdjacentHTML("afterbegin", fixture);
  });
  afterEach(function() {
    document.body.removeChild(document.getElementById("test"));
  });
  it("should unmount a class component and return true", () => {
    let log: any[];
    class App extends Component<any, any> {
      constructor(props) {
        super(props);
      }
      componentDidUnmount() {
        log = ["unmount"];
      }
      render() {
        return <h1>Hello World</h1>;
      }
    }
    render(<App />, document.querySelector("#test"));
    const unmounted = unmountComponent(document.querySelector("#test"));
    expect(log).toEqual(["unmount"]);
    expect(document.querySelector("#test").innerHTML).toBe("");
    expect(unmounted).toBeTrue();
  });
  it("will return false since no component is rendered", () => {
    const unmounted = unmountComponent(document.querySelector("#test"));
    expect(unmounted).toBeFalse();
  });
  it("should unmount a simple component and return true", () => {
    const el = <h1>Hi</h1>;
    render(el, document.querySelector("#test"));
    const unmounted = unmountComponent(document.querySelector("#test"));
    expect(document.querySelector("#test").childElementCount).toBe(0);
    expect(unmounted).toBeTrue();
  });
});
