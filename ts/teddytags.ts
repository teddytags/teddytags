/// <reference path="./@types/teddytags.d.ts"/>
class TeddyTags {
  selector: NodeList;
  elementName: string;
  passAttrs = (element, attrs: NamedNodeMap): void => {
    Array.prototype.slice.call(attrs).forEach((attr: Attr) => {
      if (attr.name === "id") {
        /* Not passing ID ahead */
      } else {
        element.setAttribute(attr.name, attr.value);
      }
    });
  };
  parseHTML = (element: HTMLElement, tagName: string, newId: string): void => {
    let elementHTML: string = element.innerHTML;
    element.outerHTML = `<${tagName} id="${newId}">${elementHTML}</${tagName}>`;
  };
  constructor(selector: string) {
    this.selector = document.querySelectorAll(selector);
    this.elementName = selector;
  }
  set = (tagName: string): void => {
    /**
     * The `index` variable is used to select the elements from the newly mutated elements.
     * It will stop brodcasting properties from one element to another.
     */
    let index: number = 0;
    this.selector.forEach((element: HTMLElement) => {
      let attributes: NamedNodeMap = element.attributes;
      this.parseHTML(element, tagName, this.elementName);
      this.selector = document.querySelectorAll(`#${this.elementName}`);
      let newElement: Node | HTMLElement = this.selector[index];
      this.passAttrs(newElement, attributes);
      index += 1;
    });
  };
}
