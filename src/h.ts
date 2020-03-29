import { Component, HElement, PropsOrState } from "./component";
type h = {
  (type: string, props: object, ...children: any[]);
  (type: Function, props: object, ...children: any[]);
  (type: Component<any, any>, props: object, ...children: any[]);
};
type RawComponent = {
  [index: number]: {
    type: Component<any, any>;
    props: PropsOrState;
  };
};
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
export const h: h = (type: any, props: object, ...children: any[]) => {
  props = !props ? {} : props;
  if (type.prototype && type.prototype.isClassComponent) {
    const rawComponent: RawComponent = [type, props];
    return rawComponent;
  }
  if (typeof type === "function") {
    let func = type(props);
    return func;
  }
  const node: HElement = { type, props: { ...props, children } };
  return node;
};
