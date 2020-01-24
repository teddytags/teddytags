/**
 * The class used for instantaniation of TeddyTags.
 */
declare export class TeddyTags {
  /**
   * The `querySelectorAll` which will be mutated from the `constructor` of this class.
   */
  selector: NodeList;
  /**
   * The name of the custom element, acquired from the `constructor`.
   */
  elementName: string;
  /**
   * A function used in this library to pass attribues like `name`, `id`, etc. to an element.
   * @param element The object referring to the element, like a `querySelector`
   * @param attrs The atrributes to be passed. Must be of type NamedNodeMap
   */
  passAttrs: (element: any, attrs: NamedNodeMap) => void;
  /**
   * A function used in this library to parse the custom tag with a valid HTML5 tag.
   * @param element The object referring to the element, like a `querySelector`
   * @param tagName The valid HTML5 tag that will replace the element's custom tag name
   * @param newId The custom tag name. Must because to preserve the custom element's identity in an `ID` attribute
   */
  parseHTML: (element: HTMLElement, tagName: string, newId: string) => void;
  /**
   * Initialize TeddyTags
   * @param selector The custom element's tag name
   *
   * Example:
   * ```javascript
   *    new TeddyTags('customTag')
   * ```
   * Will refer to
   * ```html
   * <customTag></customTag>
   * ```
   */
  constructor(selector: string);
  /**
   * Magically change your custom element to the desired valid HTML5 one.
   * @param tagName The tag name of the custom element
   *
   * Example:
   *  * Your custom element
   * ```html
   * <customTag>Hello, World!</customTag>
   * ```
   *  * Using the function
   * ```javascript
   *    new TeddyTags('customTag').set('h1');
   * ```
   *  * The result
   * ```html
   *    <h1 id="customTag">Hello, World!</h1>
   * ```
   */
  set: (tagName: string) => void;
}
