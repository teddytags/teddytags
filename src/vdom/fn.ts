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
  // #6
  dom["__tdNode__"] = undefined;
  if (HNode.componentDidUnmount) HNode.componentDidUnmount();
  return true;
};

/**
 * Create a ref (reference to a DOM element)
 */
export const createRef = () => {
  const ref: Ref = {
    element: null,
  };
  return ref;
};
/**
 * Standard interface of a ref
 */
export interface Ref {
  /**
   * The element stored in ref
   */
  element: Element | null;
}
