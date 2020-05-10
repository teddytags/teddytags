import { Component } from "../vdom/component";
declare global {
  interface Window {
    /**
     * The TeddyTags Custom Tag registry instance
     */
    TagRegistry: TagRegistry;
    /**
     * Global flag to check if observing the DOM
     */
    __TD_DOM_OBSERVER__: boolean;
    WebKitMutationObserver: typeof MutationObserver;
    MozMutationObserver: typeof MutationObserver;
  }
  interface HTMLElement {
    /**
     * Information of the custom element
     */
    tag: {
      /**
       * Original custom tag name
       */
      originalName: string;
      /**
       * Tag convertee
       */
      from: string | typeof Component;
    };
  }
}
/**
 * The TeddyTags Custom Tag registry instance
 */
export interface TagRegistry {
  /**
   * Registry of all custom elements
   */
  elements: {
    [element: string]: TagRegistryElement;
  };
  /**
   * Get entry from the TagRegistry
   * @param name The entry name
   */
  getEntry(name: string): TagRegistryElement;
  /**
   * Get the mutated nodes
   * @param name The original custom tag name
   */
  getNodes(name: string): HTMLElement[];
}
/**
 * An entry of a custom element in the TagRegistry
 */
export interface TagRegistryElement {
  /**
   * Form to which are converted to
   */
  from: string | typeof Component;
  /**
   * An array of converted custom elements
   */
  nodes: Array<HTMLElement>;
}

const getEntry = (name: string): TagRegistryElement => {
  const requiredTag = window.TagRegistry.elements[name];
  return requiredTag;
};
const getNodes = (name: string): HTMLElement[] => {
  const nodes = getEntry(name).nodes;
  return nodes;
};
window.TagRegistry = { elements: {}, getEntry, getNodes };
