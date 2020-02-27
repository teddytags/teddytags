import { diff } from "./diff";
/* istanbul ignore next */
//Ignoring this cause this does not need testing anyway
export const renderComponent = component => {
  let rerendered = component.render();
  let base = [];
  base.push(component.base.innerHTML);
  component.base = diff(component.base, rerendered);
  base.push(component.base.innerHTML);
  if (base[0] !== base[1]) {
    component.componentDidUpdate();
  }
};
export const renderEl = (node: any, target?: any) => {
  let textTypes = ["string", "number", "boolean"];
  /* istanbul ignore if*/ if (textTypes.includes(typeof node)) {
    return document.createTextNode(node);
  }
  if (Array.isArray(node)) {
    let app = node[0],
      props: object = node[1];
    let component = new app(props);
    component["node"] = component.render();
    component["base"] = target;
    let dom = renderEl(component.node);
    return [dom, component];
  } else {
    const dom: Element = document.createElement(node.type);
    const isProp = (key: string) => {
      return key !== "children" && !isEvent(key);
    };
    const isEvent = (key: string) => {
      return key.startsWith("on");
    };
    Object.keys(node.props)
      .filter(isEvent)
      .forEach(event => {
        let type = event.substring(2).toLowerCase();
        dom.addEventListener(type, node.props[event]);
      });
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

export const render = (node, target) => {
  diff(undefined, node, target);
};
