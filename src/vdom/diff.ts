import { renderEl } from "./render";
import { HConstructorElement, VElement } from "./component";
/*istanbul ignore next */
const checkAttrs = (a: NamedNodeMap, b: NamedNodeMap): boolean => {
  if (!a || !b) return;
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
const diffChildren = (
  child: Element,
  el: Element,
  sameKind?: boolean
): void => {
  if (
    //is a text node
    child.nodeType === 3
  ) {
    if (child.nodeValue !== el.nodeValue) {
      child.nodeValue = el.nodeValue;
    }
  }
  outer: if (
    //same tag or is a fragment
    child.nodeName === el.nodeName &&
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
        for (let i = child.childNodes.length; i < el.childNodes.length; i++) {
          //append the missing child
          child.appendChild(el.childNodes[i]);
        }
        //and break the loop for further check
        break outer;
      }
      if (child.childNodes.length > el.childNodes.length) {
        //if same kind of nodes and first one is ahead then break
        if (sameKind) {
          break outer;
        }
        //else replace the child
        child.parentElement.replaceChild(el, child);
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
    child.nodeName === el.nodeName &&
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
export const diff = (
  dom: any,
  node: VElement,
  diffType: string,
  isDirty: boolean
) => {
  //if reconciliation is for updating, start
  if (diffType === "UPDATE") {
    let sameKind: boolean;
    let el: Element = renderEl(node, undefined, false);
    //due to an unknown issue, a RawComponent may have crept here as the new DOM,
    // so further check
    if (Array.isArray(el)) {
      //if we're re-diffing same node when render is called twice
      sameKind = dom["__tdNode__"]
        ? dom["__tdNode__"].toString() === el[1].toString()
        : false;
      //extract the dom
      el = el[0];
    }
    //lookup further if dom has only one child
    if (dom.childElementCount === 1) {
      dom.childNodes.forEach((child: Element) => {
        if (child.nodeName === el.nodeName && child.innerHTML !== el.innerHTML)
          diffChildren(child, el, sameKind);
      });
    } else if (
      // is documentFragment
      dom.childElementCount > 1 &&
      el.nodeName === "#document-fragment"
    ) {
      dom.childNodes.forEach((child: Element, index: number) => {
        const elchild: any = el.childNodes[index];
        diffChildren(child, elchild, sameKind);
      });
      node.dom = dom;
    } else {
      {
        //lookup further in all children
        const domChildren: NodeListOf<ChildNode> = dom.childNodes;
        domChildren.forEach((child: Element, index: number) => {
          if (
            child.nodeName === el.nodeName &&
            child.innerHTML !== el.innerHTML
          ) {
            diffChildren(child, el, sameKind);
            node.dom = child;
          }
        });
      }
    }
    return dom;
  } else if (diffType === "PLACEMENT") {
    //if dom not present, render the element.
    const el = renderEl(node, dom, true);
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
    //add simple Component 'metadaata' to DOM parent
    dom["__tdNode__"] = node;
    //add class Component 'metadata' to the DOM parent
    if (el[1]) {
      dom["__tdNode__"] = el[1];
    }
    if (c && c.componentWillMount && isDirty) {
      c.componentWillMount(newDOM);
    }
    dom.appendChild(newDOM);
    if (c && c.componentDidMount && isDirty) {
      c.componentDidMount(newDOM);
    }
    return newDOM;
  }
};
