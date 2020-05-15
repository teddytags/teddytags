import { Component, VElement } from "./component";

/**
 * Get the rendered DOM of the Component
 * Only use this when the component is rendered (componentDidMount is a good place to use this)
 * @param component The component to get the node
 */
export const getDOMNode = (component: Component | VElement): Element => {
  return component.dom;
};

/**
 * Unmount a class Component from the DOM
 * @param dom The parent element of the Component
 * @param component The component class to unmount
 */
export const unmountComponent = (dom: Element): boolean => {
  const HNode: Component = dom["__tdNode__"];
  if (!HNode) return false;
  //Taking strings as evaluation becomes easier and to avoid TS-2367 error
  HNode.base.removeChild(HNode.dom);
  HNode.dom = null;
  HNode.base = null;
  // #6
  dom["__tdNode__"] = undefined;
  if (HNode.componentDidUnmount) HNode.componentDidUnmount();
  return true;
};
/**
 * Do a function async with sync fallback
 * @param fn The function
 * @param args Arguments for fn
 * @param callback Callback after done
 */
/* istanbul ignore next: Not needed */
export const Do = (fn: any, args?: any[], callback?: any) => {
  if ("Promise" in window) {
    const promise = Promise.resolve();
    promise
      .then(() => {
        fn(...args);
      })
      .then(() => {
        if (typeof callback === "function") callback();
      })
      .catch(err => {
        throw err;
      });
  } else {
    try {
      fn(...args);
    } catch (e) {
      if (e) throw e;
      else if (typeof callback === "function") callback();
    }
  }
};