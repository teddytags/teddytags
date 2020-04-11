import { unmountComponent, Component, h, render } from "Lib/teddytags.js";
declare global {
  interface Window {
    log: any[];
  }
}
describe("TeddyVDOM Utils - unmountComponent", () => {
  beforeEach(() => {
    var fixture = `<div id="test"></div>`;
    document.body.insertAdjacentHTML("afterbegin", fixture);
  });
  afterEach(function() {
    document.body.removeChild(document.getElementById("test"));
  });
  it("should unmount a class component and return true", () => {
    class App extends Component<any, any> {
      constructor(props) {
        super(props);
      }
      componentDidUnmount() {
        window.log = ["unmount"];
      }
      render() {
        return <h1>Hello World</h1>;
      }
    }
    render(<App />, document.querySelector("#test"));
    let unmounted = unmountComponent(document.querySelector("#test"));
    expect(window.log).toEqual(["unmount"]);
    expect(document.querySelector("#test").innerHTML).toBe("");
    expect(unmounted).toBe(true);
  });
  it("will return false since no component is rendered", () => {
    let unmounted = unmountComponent(document.querySelector("#test"));
    expect(unmounted).toBe(false)
  });
});
