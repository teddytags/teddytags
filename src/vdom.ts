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
/**
 * The standard interface of an non-component virtual element
 */
interface HElement {
  type: string;
  props: object;
}
const checkAttrs = (a: NamedNodeMap, b: NamedNodeMap) => {
  let c = "";
  Array.prototype.slice.call(a).map(x => {
    c = c + x.toString();
  });
  let d = "";
  Array.prototype.slice.call(b).map(x => {
    d = d + x.toString();
  });
  return c === d;
};
/* istanbul ignore next */
//Ignoring temporarily cause tests not ready
const diff = (dom: Element, node: object, parent?: Element) => {
  //if main dom is present, start diff process
  if (dom) {
    let el: Element = renderEl(node);
    //lookup further if dom has only one child
    if (dom.firstChild === dom.lastChild) {
      dom.childNodes.forEach((child: Element) => {
        //proceed if child an el
        outer: if (
          //same tag
          child.tagName === el.tagName &&
          //same attributes
          checkAttrs(child.attributes, el.attributes)
        ) {
          for (let i = 0; i < child.childNodes.length; i++) {
            let elc: ChildNode = el.childNodes[i];
            let cc: ChildNode = child.childNodes[i];
            //if childnodes length differs
            if (child.childNodes.length !== el.childNodes.length) {
              //append the missing child
              child.appendChild(el.childNodes[el.childNodes.length - 1]);
              //and break the loop for further check
              break outer;
            }
            if (elc.firstChild && cc.firstChild) {
              //if innerHTML(nodeValue) not equal, replace it
              if (elc.firstChild.nodeValue !== cc.firstChild.nodeValue) {
                cc.firstChild.nodeValue = elc.firstChild.nodeValue;
              }
            } else {
              //if innerHTML(nodeValue) not equal, replace it
              if (elc.nodeValue !== cc.nodeValue) {
                cc.nodeValue = elc.nodeValue;
              }
            }
          }
        }
        //if child and el has
        if (
          //same tag
          child.tagName === el.tagName &&
          //but not same attributes
          !checkAttrs(child.attributes, el.attributes)
        ) {
          //remove old attributes
          while (child.attributes.length > 0)
            child.removeAttribute(child.attributes[0].name);
          //add new attributes
          Array.prototype.slice.call(el.attributes).forEach((e: Attr) => {
            child.setAttribute(e.name, e.value);
          });
        }
      });
    } else {
      //lookup further in all children
      let domChildren: NodeListOf<ChildNode> = dom.childNodes;
      domChildren.forEach((child: Element) => {
        //if the child and el have
        if (
          //same tag
          child.tagName === el.tagName &&
          //same attributes
          checkAttrs(child.attributes, el.attributes) &&
          //but not same number of children
          child.childNodes.length !== el.childNodes.length &&
          //is a element
          child.nodeType === 1
        ) {
          //append the remaining children
          child.appendChild(el.childNodes[el.childNodes.length - 1]);
        }
        //if the child and el have
        if (
          //same tags
          child.tagName === el.tagName &&
          //same attributes
          checkAttrs(child.attributes, el.attributes) &&
          //same length of nodes
          child.childNodes.length === el.childNodes.length &&
          //is a element
          child.nodeType === 1
        ) {
          child.childNodes.forEach((c, i) => {
            //if children not equal, replace them
            let cnv: string, elnv: string;
            console.log(c === undefined);
            //if has firstchild
            if (c.firstChild && el.childNodes[i].firstChild) {
              cnv = c.firstChild.nodeValue;
              elnv = el.childNodes[i].firstChild.nodeValue;
              //if innerHTML(nodeValue) not equal, replace it
              if (cnv !== elnv) {
                c.firstChild.nodeValue = elnv;
              }
            }
            //if no firstchild
            else {
              cnv = c.nodeValue;
              elnv = el.childNodes[i].nodeValue;
              //if innerHTML(nodeValue) not equal, replace it
              if (cnv !== elnv) {
                c.nodeValue = elnv;
              }
            }
          });
        }
        //if child and el has
        if (
          //same tag
          child.tagName === el.tagName &&
          //but not same attributes
          !checkAttrs(child.attributes, el.attributes)
        ) {
          //remove old attributes
          while (child.attributes.length > 0)
            child.removeAttribute(child.attributes[0].name);
          //add new attributes
          Array.prototype.slice.call(el.attributes).forEach((e: Attr) => {
            child.setAttribute(e.name, e.value);
          });
        }
      });
    }
    return dom;
  } else {
    //if dom not present, render the element and append it.
    //useful if component is rendering for the first time
    const newDOM = renderEl(node, parent);
    parent.appendChild(newDOM);
    return newDOM;
  }
};
/* istanbul ignore next */
//Ignoring this cause this does not need testing anyway
const renderComponent = component => {
  let rerendered = component.render();
  component.base = diff(component.base, rerendered);
};
const renderEl = (node: any, target?: any) => {
  let textTypes = ["string", "number", "boolean"];
  if (Array.isArray(node)) {
    let app = node[0],
      props: object = node[1];
    let component = new app(props);
    component["node"] = component.render();
    component["base"] = target;
    let dom = renderEl(component.node);
    return dom;
  } else if (textTypes.includes(typeof node)) {
    return document.createTextNode(node);
  } else {
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
      if (textTypes.includes(typeof child))
        dom.appendChild(document.createTextNode(child));
      else {
        render(child, dom);
      }
    });
    return dom;
  }
};
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
export const render = (node, target) => {
  diff(undefined, node, target);
};
/* istanbul ignore next */
//Ignoring this cause this does not need testing anyway
export class Component {
  props: object | any;
  state: object;
  constructor(props: object) {
    this.props = props;
  }
  /* istanbul ignore next */
  render() {}
  setState(state: object) {
    this.state = Object.assign({}, state);
    renderComponent(this);
  }
}
Component.prototype["isClassComponent"] = true;
