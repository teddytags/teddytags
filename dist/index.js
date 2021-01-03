(() => {
  let __defineProperty = Object.defineProperty;
  let __commonJS = (callback) => {
    let module;
    return () => {
      if (!module) {
        module = {
          exports: {}
        };
        callback(module.exports, module);
      }
      return module.exports;
    };
  };
  let __export = (target, all) => {
    __defineProperty(target, "__esModule", {
      value: true
    });
    for (let name in all)
      __defineProperty(target, name, {
        get: all[name],
        enumerable: true
      });
  };

  // src/index.ts
  var require_index = __commonJS((exports) => {
    __export(exports, {
      Component: () => Component3,
      Fragment: () => Fragment,
      Tag: () => Tag,
      createRef: () => createRef,
      getDOMNode: () => getDOMNode,
      h: () => h2,
      render: () => render2,
      unmountComponent: () => unmountComponent
    });
  });

  // src/polyfills.ts
  (() => {
    if ("NodeList" in window && !NodeList.prototype.forEach) {
      console.info("Loaded NodeList.prototype.forEach Polyfill");
      NodeList.prototype.forEach = function(callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
          callback.call(thisArg, this[i], i, this);
        }
      };
    }
  })();

  // src/vdom/h.ts
  const h2 = (type, props, ...children) => {
    props = !props ? {} : props;
    if (type.prototype && type.prototype.isClassComponent) {
      const rawComponent = [type, {
        ...props,
        children
      }];
      return rawComponent;
    }
    if (typeof type === "function") {
      const func = type({
        ...props,
        children
      });
      return func;
    }
    const node = {
      type,
      props: {
        ...props,
        children
      }
    };
    return node;
  };
  const Fragment = (props) => {
    props.children.unshift("__FRAGMENT__");
    return props.children;
  };

  // src/vdom/diff.ts
  const checkAttrs = (a, b) => {
    if (!a || !b)
      return;
    let c = "";
    Array.prototype.slice.call(a).map((x) => {
      c = c + x.toString();
    });
    let d = "";
    Array.prototype.slice.call(b).map((x) => {
      d = d + x.toString();
    });
    return c === d;
  };
  const diffChildren = (child, el, sameKind) => {
    if (child.nodeType === 3) {
      if (child.nodeValue !== el.nodeValue) {
        child.nodeValue = el.nodeValue;
      }
    }
    outer:
      if (child.nodeName === el.nodeName && checkAttrs(child.attributes, el.attributes) && child.nodeType === 1) {
        for (let i = 0; i < child.childNodes.length; i++) {
          const elc = el.childNodes[i];
          const cc = child.childNodes[i];
          if (child.childNodes.length < el.childNodes.length) {
            for (let i2 = child.childNodes.length; i2 < el.childNodes.length; i2++) {
              child.appendChild(el.childNodes[i2]);
            }
            break outer;
          }
          if (child.childNodes.length > el.childNodes.length) {
            if (sameKind) {
              break outer;
            }
            child.parentElement.replaceChild(el, child);
            break outer;
          }
          if (elc.firstChild && cc.firstChild) {
            if (elc.firstChild.nodeValue !== cc.firstChild.nodeValue) {
              cc.firstChild.nodeValue = elc.firstChild.nodeValue;
            }
          } else {
            if (elc.nodeValue !== cc.nodeValue) {
              cc.nodeValue = elc.nodeValue;
            }
          }
        }
      }
    if (child.nodeName === el.nodeName && !checkAttrs(child.attributes, el.attributes) && child.nodeType === 1) {
      while (child.attributes.length > 0)
        child.removeAttribute(child.attributes[0].name);
      Array.prototype.slice.call(el.attributes).forEach((e) => {
        child.setAttribute(e.name, e.value);
      });
    }
  };
  const diff = (dom, node, diffType, isDirty) => {
    if (diffType === "UPDATE") {
      let sameKind;
      let el = renderEl(node, void 0, false);
      if (Array.isArray(el)) {
        sameKind = dom["__tdNode__"] ? dom["__tdNode__"].toString() === el[1].toString() : false;
        el = el[0];
      }
      if (dom.childElementCount === 1) {
        dom.childNodes.forEach((child) => {
          if (child.nodeName === el.nodeName && child.innerHTML !== el.innerHTML)
            diffChildren(child, el, sameKind);
        });
      } else if (dom.childElementCount > 1 && el.nodeName === "#document-fragment") {
        dom.childNodes.forEach((child, index) => {
          const elchild = el.childNodes[index];
          diffChildren(child, elchild, sameKind);
        });
        node.dom = dom;
      } else {
        {
          const domChildren = dom.childNodes;
          domChildren.forEach((child, index) => {
            if (child.nodeName === el.nodeName && child.innerHTML !== el.innerHTML) {
              diffChildren(child, el, sameKind);
              node.dom = child;
            }
          });
        }
      }
      return dom;
    } else if (diffType === "PLACEMENT") {
      const el = renderEl(node, dom, true);
      let newDOM = Array.isArray(el) ? el[0] : el;
      let c = el[1];
      if (Array.isArray(newDOM)) {
        newDOM = newDOM[0];
        c = newDOM[1];
      }
      dom["__tdNode__"] = node;
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

  // src/vdom/utils.ts
  const assignStyles2 = (el, styles) => {
    for (const rule in styles) {
      el.style[rule] = styles[rule];
    }
  };
  const parseProps = (props, dom) => {
    const keys = Object.keys(props);
    const isRef = (key) => {
      return key === "ref";
    };
    const isSpecialProp = (key) => {
      const specialProps = ["innerHTML", "className", "style"];
      return specialProps.indexOf(key) > -1;
    };
    const isEvent = (key) => {
      return key.indexOf("on") === 0;
    };
    const isProp = (key) => {
      return key !== "children" && !isEvent(key) && !isSpecialProp(key) && !isRef(key);
    };
    keys.filter(isRef).forEach((ref) => {
      props[ref].element = dom;
    });
    keys.filter(isEvent).forEach((event) => {
      const type = event.substring(2).toLowerCase();
      dom.addEventListener(type, props[event]);
    });
    keys.filter(isProp).map((prop) => {
      dom.setAttribute(prop, props[prop].toString());
    });
    keys.filter(isSpecialProp).map((prop) => {
      if (prop === "style") {
        if (typeof props[prop] === "string") {
          dom.style.cssText = props[prop];
        } else
          assignStyles2(dom, props[prop]);
      } else
        dom[prop] = props[prop];
    });
  };

  // src/vdom/render.ts
  const renderComponent = (component7) => {
    if (component7.base && component7.dom) {
      const rerendered = component7.render();
      const base = [];
      base.push(component7.base.innerHTML);
      const oldDom = component7.dom;
      component7.base = diff(component7.base, rerendered, "UPDATE", false);
      base.push(component7.base.innerHTML);
      if (base[0] !== base[1]) {
        component7.componentDidUpdate(oldDom, component7.dom);
      }
    } else
      return;
  };
  const cleanRender = (node, target) => {
    diff(target, node, "PLACEMENT", true);
  };
  const updateRender = (node, target) => {
    diff(target, node, "PLACEMENT", false);
  };
  const renderEl = (node, target, isDirty) => {
    const textTypes = ["string", "number", "boolean"];
    if (textTypes.indexOf(typeof node) > -1) {
      return document.createTextNode(node);
    }
    if (Array.isArray(node)) {
      if (node[0] === "__FRAGMENT__") {
        const fragDom = document.createDocumentFragment();
        node.shift();
        node.forEach((child) => {
          if (isDirty) {
            cleanRender(child, fragDom);
          } else {
            updateRender(child, fragDom);
          }
        });
        return fragDom;
      } else {
        const app = node[0], props = node[1];
        const component7 = new app(props);
        component7.node = component7.render();
        component7.base = target;
        const dom = renderEl(component7.node, void 0, true);
        component7.dom = dom;
        return [dom, component7];
      }
    } else {
      const dom = document.createElement(node.type);
      parseProps(node.props, dom);
      node.props.children.forEach((child) => {
        if (textTypes.indexOf(typeof child) > -1)
          dom.appendChild(document.createTextNode(child));
        else {
          if (isDirty)
            cleanRender(child, dom);
          else
            updateRender(child, dom);
        }
      });
      node.dom = dom;
      node.base = target;
      return dom;
    }
  };
  const render2 = (node, target) => {
    if (target["__tdNode__"]) {
      diff(target, node, "UPDATE", true);
    } else
      diff(target, node, "PLACEMENT", true);
  };

  // src/vdom/fn.ts
  const getDOMNode = (component7) => {
    return component7.dom;
  };
  const unmountComponent = (dom) => {
    const HNode = dom["__tdNode__"];
    if (!HNode)
      return false;
    HNode.base.removeChild(HNode.dom);
    dom["__tdNode__"] = void 0;
    if (HNode.componentDidUnmount)
      HNode.componentDidUnmount();
    return true;
  };
  const createRef = () => {
    const ref = {
      element: null
    };
    return ref;
  };

  // src/vdom/component.ts
  class Component3 {
    constructor(props) {
      this.props = props;
    }
    setState(state) {
      this.state = Object.create(state);
      renderComponent(this);
    }
    render() {
    }
    componentDidMount(dom) {
    }
    componentDidUnmount() {
    }
    componentDidUpdate(oldDOM, newDOM) {
    }
    componentWillMount(dom) {
    }
  }
  Component3.prototype["isClassComponent"] = true;

  // src/tag/registry.ts
  const getEntry = (name) => {
    const requiredTag = window.TagRegistry.elements[name];
    return requiredTag;
  };
  const getNodes = (name) => {
    const nodes = getEntry(name).nodes;
    return nodes;
  };
  window.TagRegistry = {
    elements: {},
    getEntry,
    getNodes
  };

  // src/tag/factory.ts
  const setInRegistry = (name, entry) => {
    window.TagRegistry.elements[name] = entry;
  };
  const updateInRegistry = (name, newEntry) => {
    const originalNodes = window.TagRegistry.getNodes(name);
    const newNodes = newEntry.nodes.splice(originalNodes.length - 1);
    window.TagRegistry.elements[name].nodes = window.TagRegistry.getNodes(name).concat(newNodes);
  };
  const transformElements = (tagName, newTagName) => {
    const registryEntry = {
      from: newTagName,
      nodes: []
    };
    const nodes = document.querySelectorAll(tagName);
    nodes.forEach((node) => {
      const newNode = document.createElement(newTagName);
      newNode.tag = {
        originalName: tagName,
        from: newTagName
      };
      Array.prototype.slice.call(node.attributes).forEach((attr) => {
        newNode.setAttribute(attr.name, attr.value);
      });
      newNode.nodeValue = node.nodeValue;
      node.parentElement.replaceChild(newNode, node);
      registryEntry.nodes.push(newNode);
    });
    return registryEntry;
  };
  const transformElementsWithComponents = (tagName, component7) => {
    const registry2 = transformElements(tagName, "div");
    registry2.from = component7;
    registry2.nodes.forEach((node) => {
      node.tag.from = component7;
      const getComponentName = () => component7.name || tagName;
      node.setAttribute("data-component", getComponentName());
      const props = {};
      Array.prototype.slice.call(node.attributes).forEach((a) => {
        props[a.name] = a.value;
      });
      render2(h2(component7, props), node);
    });
    return registry2;
  };
  const updateElement = (tagName, to) => {
    if (typeof to === "string") {
      const registry2 = transformElements(tagName, to);
      if (window.TagRegistry.elements[tagName])
        updateInRegistry(tagName, registry2);
    } else {
      const registry2 = transformElementsWithComponents(tagName, to);
      if (window.TagRegistry.elements[tagName])
        updateInRegistry(tagName, registry2);
    }
  };
  const initWatcher = () => {
    const target = document.body;
    const options = {
      childList: true,
      subtree: true
    };
    const callback = (mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            const registeredTags = Object.keys(window.TagRegistry.elements);
            if (node.nodeType === 1) {
              registeredTags.forEach((tag) => {
                if (tag.toUpperCase(), node.nodeName) {
                  updateElement(tag, window.TagRegistry.elements[tag].from);
                }
              });
            }
          });
        }
      });
    };
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    const observer = new MutationObserver(callback);
    observer.observe(target, options);
    window.__TD_DOM_OBSERVER__ = true;
  };
  class Tag {
    constructor(options) {
      this.originalName = options.name;
      this.current = options.to;
      if (typeof options.to === "string") {
        const registry2 = transformElements(options.name, options.to);
        setInRegistry(options.name, registry2);
      } else {
        const registry2 = transformElementsWithComponents(options.name, options.to);
        setInRegistry(options.name, registry2);
      }
      this.DOMList = window.TagRegistry.getNodes(this.originalName);
      if (window.__TD_DOM_OBSERVER__ !== true) {
        initWatcher();
      }
    }
  }
  require_index();
})();
//# sourceMappingURL=index.js.map
