import { diff } from "./diff";
import { HConstructorElement, VElement } from "./component";
import { Do } from "./utils";
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
  //only proceed if the component has mounted, else return
  if (component.base && component.dom) {
    const rerendered: VElement = component.render();
    const base: string[] = [];
    base.push(component.base.innerHTML);
    const oldDom = component.dom;
    component.base = diff(component.base, rerendered, "UPDATE", false);
    base.push(component.base.innerHTML);
    if (base[0] !== base[1]) {
      component.componentDidUpdate(oldDom, component.dom);
    }
  } else return;
};
export const cleanRender = (
  node: VElement,
  target: Element | DocumentFragment
) => {
  diff(target, node, "PLACEMENT", true);
};
/**
 * Another version of render, but will only be used in the process of updating.
 * @param node Your virtual Element
 * @param target The target to append to
 */
const updateRender = (node: VElement, target: Element | DocumentFragment) => {
  diff(target, node, "PLACEMENT", false);
};
/**
 * Assign styles to a element
 * @param el any HTMLElement
 * @param styles CSSStyleDeclaration object
 */
/*istanbul ignore next : no need to test this, just a util function */
const assignStyles = (el: HTMLElement, styles: CSSStyleDeclaration) => {
  for (const rule in styles) {
    el.style[rule] = styles[rule];
  }
};
/**
 * Return DOM based on JSX Elements
 * @param node The JSX element
 * @param target Target to mount to
 * @param isDirty if dirty(rendering for the first time)
 */
export const renderEl = (node: any, target?: any, isDirty?: boolean) => {
  const isValidMethod = (key: string) => {
    const validMethods = ["innerHTML", "className", "style"];
    return validMethods.indexOf(key) > -1;
  };
  const isEvent = (key: string) => {
    return key.indexOf("on") === 0;
  };
  const textTypes = ["string", "number", "boolean"];
  /* istanbul ignore if*/ if (textTypes.indexOf(typeof node) > -1) {
    return document.createTextNode(node);
  }
  if (Array.isArray(node)) {
    /*istanbul ignore next: probably not picked up by istanbul */
    if (node[0] === "__FRAGMENT__") {
      const fragDom: DocumentFragment = document.createDocumentFragment();
      node.shift();
      node.forEach(child => {
        if (isDirty) {
          cleanRender(child, fragDom);
        } else {
          updateRender(child, fragDom);
        }
      });
      return fragDom;
    } else {
      const app = node[0],
        props: object = node[1];
      const component: HConstructorElement = new app(props);
      component.node = component.render();
      component.base = target;
      const dom = renderEl(component.node, undefined, true);
      component.dom = dom;
      return [dom, component];
    }
  } else {
    const dom: HTMLElement = document.createElement(node.type);
    const isProp = (key: string) => {
      return key !== "children" && !isEvent(key) && !isValidMethod(key);
    };
    const props = Object.keys(node.props);
    props.filter(isEvent).forEach(event => {
      const type = event.substring(2).toLowerCase();
      dom.addEventListener(type, node.props[event]);
    });
    props.filter(isProp).map(prop => {
      dom.setAttribute(prop, node.props[prop].toString());
    });
    props.filter(isValidMethod).map(prop => {
      if (prop === "style") {
        if (typeof node.props[prop] === "string") {
          dom.style.cssText = node.props[prop];
        } else assignStyles(dom, node.props[prop]);
      } else dom[prop] = node.props[prop];
    });
    node.props.children.forEach(child => {
      if (textTypes.indexOf(typeof child) > -1)
        dom.appendChild(document.createTextNode(child));
      else {
        /*istanbul ignore next: probably not picked up by istanbul */ if (
          isDirty
        )
          cleanRender(child, dom);
        /*istanbul ignore next: probably not picked up by istanbul */ else
          updateRender(child, dom);
      }
    });
    //set dom for future reference
    node.dom = dom;
    node.base = target;
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
export const render = (node: VElement, target: Element) => {
  /*istanbul ignore next */
  if (target["__tdNode__"]) {
    Do(diff, [target, node, "UPDATE", true]);
  } else Do(diff, [target, node, "PLACEMENT", true]);
};
