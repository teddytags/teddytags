import { h } from "./h";
import { render } from "./render";
import { Component, HElement } from "./component";
import { TeddyTags } from "./teddytags";
export { h, render, Component, TeddyTags };
const _default = {
  /**
 * The hyperscript function which will create virtual elements.
 * @param type Can be the tagname of the element, a class component or a functional component
 * @param props Properties to be passed
 * @param children Child elements, if any
 * Usage:
 * ```js
 * let app = h("div", null, h("h1", null, "Hello"))
 * //becomes
 * //<div><h1>Hello</h1></div>
 * ```
 */
  h,
  Component: Component,
  /**
 * The function that links your Virtual Elements to the real DOM.
 * Appends the virtual element to the target
 * Usage:
 * ```js
 * //App is a Component
 * //If JSX
 * render(<App />, document.querySelector("#app"))
 * //If no JSX
 * render(h(App, null), document.querySelector("#app"))
 * ```
 * @param node Your virtual Element
 * @param target The target to append to
 */
  render,
  TeddyTags: TeddyTags,
};
export default _default;
