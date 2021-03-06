import { getDOMNode, Component, h, render } from "teddytags";
describe("TeddyVDOM Utils - getDOMNode", () => {
  beforeEach(() => {
    const fixture = `<div id="test"></div>`;
    document.body.insertAdjacentHTML("afterbegin", fixture);
  });
  afterEach(function() {
    document.body.removeChild(document.getElementById("test"));
  });
  it("should get node of a `h` component", () => {
    const tester = <h1>Hello World</h1>;
    render(tester, document.querySelector("#test"));
    const isTester = document.querySelector("#test h1").outerHTML;
    const shouldBeTester = "<h1>Hello World</h1>";
    expect(shouldBeTester).toBe(isTester);
  });
  it("should get node of a Class component", () => {
    let shouldBeTester: string;
    class Me extends Component<any, any> {
      constructor(props) {
        super(props);
      }
      componentDidMount() {
        shouldBeTester = getDOMNode(this).outerHTML;
      }
      render() {
        return <h1>Hello, World</h1>;
      }
    }
    const tester = <Me />;
    render(tester, document.querySelector("#test"));
    const isTester = document.querySelector("#test h1").outerHTML;
    expect(shouldBeTester).toBe(isTester);
  });
});
