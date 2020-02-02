/*! *****************************************************************************
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
 * The class used for instantaniation of TeddyTags.
 */
class TeddyTags {
  /**
   * The `querySelectorAll` which will be mutated from the `constructor` of this class.
   */
  selector: NodeList
  /**
   * The name of the custom element, acquired from the `constructor`.
   */
  elementName: string
  /**
   * A function used in this library to pass attribues like `name`, `id`, etc. to an element.
   * @param element The object referring to the element, like a `querySelector`
   * @param attrs The atrributes to be passed. Must be of type NamedNodeMap
   */
  passAttrs = (element, attrs: NamedNodeMap): void => {
    Array.prototype.slice.call(attrs).forEach((attr: Attr) => {
      if (attr.name === 'id') {
        /* Not passing ID ahead */
      } else {
        element.setAttribute(attr.name, attr.value)
      }
    })
  }
  /**
   * A function used in this library to parse the custom tag with a valid HTML5 tag.
   * @param element The object referring to the element, like a `querySelector`
   * @param tagName The valid HTML5 tag that will replace the element's custom tag name
   * @param newId The custom tag name. Must because to preserve the custom element's identity in an `ID` attribute
   */
  parseHTML = (element: HTMLElement, tagName: string, newId: string): void => {
    let elementHTML: string = element.innerHTML
    element.outerHTML = `<${tagName} id="${newId}">${elementHTML}</${tagName}>`
  }
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
  constructor(selector: string) {
    this.selector = document.querySelectorAll(selector)
    this.elementName = selector
  }
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
  set = (tagName: string): Promise<any> => {
    /**
     * The `index` variable is used to select the elements from the newly mutated elements.
     * It will stop brodcasting properties from one element to another.
     */
    let index: number = 0
    this.selector.forEach((element: HTMLElement) => {
      let attributes: NamedNodeMap = element.attributes
      this.parseHTML(element, tagName, this.elementName)
      this.selector = document.querySelectorAll(`#${this.elementName}`)
      let newElement: Node | HTMLElement = this.selector[index]
      this.passAttrs(newElement, attributes)
      index += 1
    })
    return new Promise((resolve, reject): void => {
      resolve()
    }).catch(err => {
      throw err
    })
  }
}
