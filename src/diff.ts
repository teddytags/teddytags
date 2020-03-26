import { renderEl } from "./render";
import { HElement, HConstructorElement } from "./component";
/*istanbul ignore next */
const checkAttrs = (a: NamedNodeMap, b: NamedNodeMap): boolean => {
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
//Ignoring temporarily cause tests not ready
/* istanbul ignore next */
const diffChildren = (child: Element, el: Element): void => {
  //proceed if child an el
  outer: if (
    //same tag
    child.tagName === el.tagName &&
    //same attributes
    checkAttrs(child.attributes, el.attributes) &&
    //is a element
    child.nodeType === 1
  ) {
    for (let i = 0; i < child.childNodes.length; i++) {
      const elc: ChildNode = el.childNodes[i];
      const cc: ChildNode = child.childNodes[i];
      //if childnodes length differs
      if (child.childNodes.length < el.childNodes.length) {
        //get the difference
        let d = el.childNodes.length - child.childNodes.length;
        for (
          let i = child.childNodes.length - 1;
          i < el.childNodes.length;
          i++
        ) {
          //append the missing child
          child.appendChild(el.childNodes[i]);
        }

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
    !checkAttrs(child.attributes, el.attributes) &&
    //is a element
    child.nodeType === 1
  ) {
    //remove old attributes
    while (child.attributes.length > 0)
      child.removeAttribute(child.attributes[0].name);
    //add new attributes
    Array.prototype.slice.call(el.attributes).forEach((e: Attr) => {
      child.setAttribute(e.name, e.value);
    });
  }
};
//Ignoring temporarily cause tests not ready
/* istanbul ignore next */
export const diff = (mountedDom: Element, node: HElement, parent?: Element) => {
  //if main dom is present, start diff process
  if (mountedDom) {
    let el: Element = renderEl(node);
    let c: HConstructorElement;
    //due to an unknown issue, a RawComponent may have crept here as the new DOM, so further check
    if (Array.isArray(el)) {
      //extract the dom
      el = el[0];
      c = el[1];
    }
    //lookup further if dom has only one child
    if (mountedDom.firstChild === mountedDom.lastChild) {
      mountedDom.childNodes.forEach((child: Element) => {
        if (child.nodeName === el.nodeName && child.innerHTML !== el.innerHTML)
          diffChildren(child, el);
      });
    } else {
      //lookup further in all children
      const domChildren: NodeListOf<ChildNode> = mountedDom.childNodes;
      domChildren.forEach((child: Element) => {
        if (
          child.nodeName === el.nodeName &&
          child.innerHTML !== el.innerHTML
        ) {
          diffChildren(child, el);
          node.dom = child;
        }
      });
    }
    return mountedDom;
  } else if (parent) {
    //if dom not present, render the element and append it.
    //useful if component is rendering for the first time
    let el = renderEl(node, parent);
    //if its component, get the first el which contains the dom
    let newDOM = Array.isArray(el) ? el[0] : el;
    //get the component, if present
    let c: HConstructorElement = el[1];
    //due to an unknown issue, a RawComponent may have crept here as the new DOM, so further check
    if (Array.isArray(newDOM)) {
      //extract the dom
      newDOM = newDOM[0];
      c = newDOM[1];
    }
    if (c && c.componentWillMount && !c["__dirty"]) {
      c.componentWillMount(newDOM);
    }
    parent.appendChild(newDOM);
    if (c && c.componentDidMount && !c["__dirty"]) {
      c.componentDidMount(newDOM);
      c["__dirty"] = false;
    }
    return newDOM;
  }
};
