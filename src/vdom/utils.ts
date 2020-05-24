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
 * Parse JSX props and return it
 * @param props `Object.keys(yourProps)`
 * @param dom the element
 */
export const parseProps = (props: object, dom: HTMLElement) => {
  const keys = Object.keys(props);
  const isRef = (key: string) => {
    return key === "ref";
  };
  const isSpecialProp = (key: string) => {
    const specialProps = ["innerHTML", "className", "style"];
    return specialProps.indexOf(key) > -1;
  };
  const isEvent = (key: string) => {
    return key.indexOf("on") === 0;
  };
  const isProp = (key: string) => {
    return (
      key !== "children" && !isEvent(key) && !isSpecialProp(key) && !isRef(key)
    );
  };
  keys.filter(isRef).forEach((ref: string) => {
    props[ref].element = dom;
  });
  keys.filter(isEvent).forEach(event => {
    const type = event.substring(2).toLowerCase();
    dom.addEventListener(type, props[event]);
  });
  keys.filter(isProp).map(prop => {
    dom.setAttribute(prop, props[prop].toString());
  });
  keys.filter(isSpecialProp).map(prop => {
    if (prop === "style") {
      if (typeof props[prop] === "string") {
        dom.style.cssText = props[prop];
      } else assignStyles(dom, props[prop]);
    } else dom[prop] = props[prop];
  });
};
