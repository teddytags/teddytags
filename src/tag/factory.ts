import { Component } from "../vdom/component";
import { h } from "../vdom/h";
import { render } from "../vdom/render";
import { TagRegistryElement } from "./registry";

interface TagConstructorOptions {
  /**
   * Tag name of the custom element
   */
  name: string;
  /**
   * Tag name of a vaild native HTML5 element or a TeddyTags class Component
   */
  to: string | typeof Component;
}
/**
 * Record an entry in the registry
 * @param name The name of the new entry
 * @param entry The entry to be recorded
 */
const setInRegistry = (name: string, entry: TagRegistryElement): void => {
  window.TagRegistry.elements[name] = entry;
};
/**
 * Update an existing entry in the registry
 * @param name Name of existing registry
 * @param newEntry The new entry to be updated
 */
const updateInRegistry = (name: string, newEntry: TagRegistryElement): void => {
  const originalNodes = window.TagRegistry.getNodes(name);
  const newNodes = newEntry.nodes.splice(originalNodes.length - 1);
  window.TagRegistry.elements[name].nodes = window.TagRegistry.getNodes(
    name
  ).concat(newNodes);
};
/**
 * Transform custom elements to the desired ones
 * @param tagName name of the custom element
 * @param newTagName a valid HTML5 tag or any tag name
 */
const transformElements = (tagName: string, newTagName: string) => {
  const registryEntry: TagRegistryElement = { from: newTagName, nodes: [] };
  const nodes = document.querySelectorAll(tagName);
  nodes.forEach(node => {
    const newNode = document.createElement(newTagName);
    newNode.tag = {
      originalName: tagName,
      from: newTagName,
    };
    Array.prototype.slice.call(node.attributes).forEach((attr: Attr) => {
      newNode.setAttribute(attr.name, attr.value);
    });
    newNode.innerHTML = node.innerHTML;
    node.parentElement.replaceChild(newNode, node);
    registryEntry.nodes.push(newNode);
  });
  return registryEntry;
};
/**
 * Transform an custom element with a class Component
 * @param tagName name of the custom element
 * @param component a TeddyTags class Component
 */
const transformElementsWithComponents = (
  tagName: string,
  component: typeof Component
) => {
  const registry = transformElements(tagName, "div");
  registry.from = component;
  registry.nodes.forEach(node => {
    node.tag.from = component;
    node.setAttribute("data-component", component.name);
    const props = {};
    Array.prototype.slice.call(node.attributes).forEach((a: Attr) => {
      props[a.name] = a.value;
    });
    render(h(component, props), node);
  });
  return registry;
};
/**
 * Update a custom element to the desired one(existing in the registry)
 * @param tagName name of the custom element
 * @param to either a tag name or a class Component
 */
const updateElement = (tagName: string, to: string | typeof Component) => {
  if (typeof to === "string") {
    const registry = transformElements(tagName, to);
    if (window.TagRegistry.elements[tagName])
      updateInRegistry(tagName, registry);
  } else {
    const registry = transformElementsWithComponents(tagName, to);
    if (window.TagRegistry.elements[tagName])
      updateInRegistry(tagName, registry);
  }
};
/**
 * Initialize the DOM watcher to update newly added custom elements
 */
const initWatcher = () => {
  const target = document.body;
  const options: MutationObserverInit = { childList: true, subtree: true };
  const callback: MutationCallback = (mutations: MutationRecord[]): void => {
    mutations.forEach(mutation => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach(node => {
          const registeredTags: string[] = Object.keys(
            window.TagRegistry.elements
          );
          if (node.nodeType === 1) {
            registeredTags.forEach(tag => {
              if ((tag.toUpperCase(), node.nodeName)) {
                updateElement(tag, window.TagRegistry.elements[tag].from);
              }
            });
          }
        });
      }
    });
  };
  const MutationObserver =
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver;
  const observer = new MutationObserver(callback);
  observer.observe(target, options);
  window.__TD_DOM_OBSERVER__ = true;
};

/**
 * Create amazing custom elements using this class
 */
export class Tag {
  /**
   * Original tag name
   */
  originalName: string;
  /**
   * Current tag name or a class Component
   */
  current: string | typeof Component;
  /**
   * Array of converted custom elements
   */
  DOMList: Array<HTMLElement>;
  /**
   * Initialize the transformer
   * @param { TagConstructorOptions } options  Options to pass to the transformer
   */
  constructor(options: TagConstructorOptions) {
    this.originalName = options.name;
    this.current = options.to;
    if (typeof options.to === "string") {
      const registry = transformElements(options.name, options.to);
      setInRegistry(options.name, registry);
    } else {
      const registry = transformElementsWithComponents(
        options.name,
        options.to
      );
      setInRegistry(options.name, registry);
    }
    this.DOMList = window.TagRegistry.getNodes(this.originalName);
    if (window.__TD_DOM_OBSERVER__ !== true) {
      initWatcher();
    }
  }
}
