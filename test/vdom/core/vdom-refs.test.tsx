import { createRef, h, Component, render, Fragment } from "teddytags";
describe("TeddyVDOM Core - render", () => {
  beforeEach(() => {
    const fixture = `<div id="test"></div>`;
    document.body.insertAdjacentHTML("afterbegin", fixture);
  });
  afterEach(function() {
    document.body.removeChild(document.getElementById("test"));
  });
  it("should set ref of a simple element", () => {
    const ref = createRef();
    const el = <h1 ref={ref}></h1>;
    render(el, document.querySelector("#test"));
    expect(ref.element).toBeTruthy();
    expect(ref.element.outerHTML).toBe("<h1></h1>");
  });
  it("should set ref of a component", () => {
    const ref = createRef();
    class App extends Component {
      constructor(props) {
        super(props);
      }
      render() {
        return (
          <h1 ref={ref} id="foo">
            Hi
          </h1>
        );
      }
    }
    render(<App />, document.querySelector("#test"));
    expect(ref.element).toBeTruthy();
    expect(ref.element.outerHTML).toBe(`<h1 id="foo">Hi</h1>`);
  });
  it("should set ref of the respective elements in a DOM tree", () => {
    const refH1 = createRef();
    const refP = createRef();
    const refButton = createRef();
    const el = (
      <Fragment>
        <h1 ref={refH1}></h1>
        <button ref={refButton}></button>
        <p ref={refP}></p>
      </Fragment>
    );
    render(el, document.querySelector("#test"));
    expect(refH1.element).toBeTruthy();
    expect(refButton.element).toBeTruthy();
    expect(refP.element).toBeTruthy();
    expect(refH1.element.outerHTML).toBe("<h1></h1>");
    expect(refButton.element.outerHTML).toBe("<button></button>");
    expect(refP.element.outerHTML).toBe("<p></p>");
  });
});
