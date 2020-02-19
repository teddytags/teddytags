/**! *****************************************************************************
@license
Copyright © 2020 Pranav Karawale. All rights reserved. 
Licensed under the MIT License (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at https://mit-license.org/  
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the MIT License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
interface HElement {
  type: string;
  props: object;
}
export const h = (
  type: string | Function | Component | any,
  props = {},
  ...children: any[]
) => {
  if (type.prototype && type.prototype.isClassComponent) {
    const componentInstance = new type(props);
    componentInstance.node = componentInstance.render();
    return componentInstance.node;
  }
  if (typeof type === "function") {
    return type(props);
  }
  let node: HElement;
  node = { type, props: { ...props, children } };
  return node;
};
export const render = (node: any, target: any) => {
  const dom = document.createElement(node.type);
  const isProp = key => {
    return key !== "children";
  };
  Object.keys(node.props)
    .filter(isProp)
    .map(prop => {
      dom[prop] = node.props[prop];
    });
  node.props.children.forEach(child => {
    let textTypes = ["string", "number", "boolean"];
    if (textTypes.includes(typeof child))
      dom.appendChild(document.createTextNode(child));
    else render(child, dom);
  });
  target.appendChild(dom);
};
export class Component {
  props: object | any;
  state: object;
  constructor(props: object) {
    this.props = props;
  }
  /* istanbul ignore next */
  render() {}
}
Component.prototype["isClassComponent"] = true;
