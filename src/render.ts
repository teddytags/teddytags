import { diff } from "./diff";
import { HConstructorElement, HElement } from "./component";
/**
 * The runtime condition of a Constructor Element
 */
interface HElementRuntime {
  (component: HConstructorElement);
  (component: any);
}
/* istanbul ignore next */
//Ignoring this cause this does not need testing anyway
export const renderComponent: HElementRuntime = (
  component: HConstructorElement
): void => {
  let rerendered: HElement = component.render();
  let base: string[] = [];
  base.push(component.base.innerHTML);
  let oldDom = component.dom;
  component.base = diff(component.base, rerendered, "UPDATE", false);
  base.push(component.base.innerHTML);
  if (base[0] !== base[1]) {
    component.componentDidUpdate(oldDom, component.dom);
  }
};
export const renderEl = (node: any, target?: any, isDirty?: boolean) => {
  let textTypes = ["string", "number", "boolean"];
  /* istanbul ignore if*/ if (textTypes.includes(typeof node)) {
    return document.createTextNode(node);
  }
  if (Array.isArray(node)) {
    let app = node[0],
      props: object = node[1];
    let component: HConstructorElement = new app(props);
    component.node = component.render();
    component.base = target;
    let dom = renderEl(component.node, undefined, true);
    component.dom = dom;
    return [dom, component];
  } else {
    const dom: Element = document.createElement(node.type);
    const isProp = (key: string) => {
      return key !== "children" && !isEvent(key) && !isValidMethod(key);
    };
    const isValidMethod = (key: string) => {
      const validMethods = ["innerHTML", "className"];
      return validMethods.includes(key);
    };
    const isEvent = (key: string) => {
      return key.startsWith("on");
    };
    Object.keys(node.props)
      .filter(isEvent)
      .forEach(event => {
        let type = event.substring(2).toLowerCase();
        dom.addEventListener(type, node.props[event]);
      });
    Object.keys(node.props)
      .filter(isProp)
      .map(prop => {
        dom.setAttribute(prop, node.props[prop].toString());
      });
    Object.keys(node.props)
      .filter(isValidMethod)
      .map(prop => {
        dom[prop] = node.props[prop];
      });
    node.props.children.forEach(child => {
      if (textTypes.includes(typeof child))
        dom.appendChild(document.createTextNode(child));
      else {
        if (isDirty) render(child, dom);
        else cleanRender(child, dom);
      }
    });
    return dom;
  }
};
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
export const render = (node: HElement, target: Element) => {
  diff(target, node, "PLACEMENT", true);
};
/**
 * Another version of render, but will only be used in the process of updating.
 * @param node Your virtual Element
 * @param target The target to append to
 */
const cleanRender = (node: HElement, target: Element) => {
  diff(target, node, "PLACEMENT", false);
};
