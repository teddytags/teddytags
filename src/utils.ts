import { Component, HElement } from "./component";

/**
 * Get the rendered DOM of the Component
 * Only use this when the component is rendered (componentDidMount is a good place to use this)
 * @param component The component to get the node
 */
export const getDOMNode = (component: Component | HElement): Element => {
  return component.dom;
};

/**
 * Unmount a class Component from the DOM
 * @param dom The parent element of the Component
 * @param component The component class to unmount
 */
export const unmountComponent = (dom: Element): boolean => {
  let HNode: Component = dom["__tdNode__"];
  if (!HNode) return false;
  //Taking strings as evaluation becomes easier and to avoid TS-2367 error
  HNode.base.removeChild(HNode.dom);
  HNode.dom = null;
  HNode.base = null;
  if (HNode.componentDidUnmount) HNode.componentDidUnmount();
  return true;
};
