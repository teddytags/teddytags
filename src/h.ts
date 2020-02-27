import { Component, HElement } from "./component";
export function h(
  type: string | Function | Component | any,
  props: object,
  ...children: any[]
) {
  props = !props ? {} : props;
  if (type.prototype && type.prototype.isClassComponent) {
    return [type, props];
  }
  if (typeof type === "function") {
    return type(props);
  }
  let node: HElement;
  node = { type, props: { ...props, children } };
  return node;
}
