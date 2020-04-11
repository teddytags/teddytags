type HNode = HElement | string | number | boolean | undefined | null;
/*Courtesy of d.ts (https://github.com/geowarin/ts-react/blob/master/typings/react/d.ts)*/
interface DOMAttributes {
  onCopy?: ClipboardEventHandler;
  onCut?: ClipboardEventHandler;
  onPaste?: ClipboardEventHandler;
  onKeyDown?: KeyboardEventHandler;
  onKeyPress?: KeyboardEventHandler;
  onKeyUp?: KeyboardEventHandler;
  onFocus?: FocusEventHandler;
  onBlur?: FocusEventHandler;
  onChange?: FormEventHandler;
  onInput?: FormEventHandler;
  onSubmit?: FormEventHandler;
  onClick?: MouseEventHandler;
  onDoubleClick?: MouseEventHandler;
  onDrag?: DragEventHandler;
  onDragEnd?: DragEventHandler;
  onDragEnter?: DragEventHandler;
  onDragExit?: DragEventHandler;
  onDragLeave?: DragEventHandler;
  onDragOver?: DragEventHandler;
  onDragStart?: DragEventHandler;
  onDrop?: DragEventHandler;
  onMouseDown?: MouseEventHandler;
  onMouseEnter?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
  onMouseMove?: MouseEventHandler;
  onMouseOut?: MouseEventHandler;
  onMouseOver?: MouseEventHandler;
  onMouseUp?: MouseEventHandler;
  onTouchCancel?: TouchEventHandler;
  onTouchEnd?: TouchEventHandler;
  onTouchMove?: TouchEventHandler;
  onTouchStart?: TouchEventHandler;
  onScroll?: UIEventHandler;
  onWheel?: WheelEventHandler;
  /**
   * Set HTML of the element.
   * *WARNING: The children will be replaced by anything that is in this property.*
   */
  innerHTML?: any;
}
interface ChildProps<T> {
  children?: HNode[];
}
interface HTMLPropAttributes extends DOMAttributes {
  // Standard HTML Attributes
  accept?: string;
  acceptCharset?: string;
  accessKey?: string;
  action?: string;
  allowFullScreen?: boolean;
  allowTransparency?: boolean;
  alt?: string;
  async?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
  autoPlay?: boolean;
  capture?: boolean;
  cellPadding?: number | string;
  cellSpacing?: number | string;
  charSet?: string;
  challenge?: string;
  checked?: boolean;
  classID?: string;
  className?: string;
  cols?: number;
  colSpan?: number;
  content?: string;
  contentEditable?: boolean;
  contextMenu?: string;
  controls?: boolean;
  coords?: string;
  crossOrigin?: string;
  data?: string;
  dateTime?: string;
  default?: boolean;
  defer?: boolean;
  dir?: string;
  disabled?: boolean;
  download?: any;
  draggable?: boolean;
  encType?: string;
  form?: string;
  formAction?: string;
  formEncType?: string;
  formMethod?: string;
  formNoValidate?: boolean;
  formTarget?: string;
  frameBorder?: number | string;
  headers?: string;
  height?: number | string;
  hidden?: boolean;
  high?: number;
  href?: string;
  hrefLang?: string;
  htmlFor?: string;
  httpEquiv?: string;
  icon?: string;
  id?: string;
  inputMode?: string;
  integrity?: string;
  is?: string;
  keyParams?: string;
  keyType?: string;
  kind?: string;
  label?: string;
  lang?: string;
  list?: string;
  loop?: boolean;
  low?: number;
  manifest?: string;
  marginHeight?: number;
  marginWidth?: number;
  max?: number | string;
  maxLength?: number;
  media?: string;
  mediaGroup?: string;
  method?: string;
  min?: number | string;
  minLength?: number;
  multiple?: boolean;
  muted?: boolean;
  name?: string;
  noValidate?: boolean;
  open?: boolean;
  optimum?: number;
  pattern?: string;
  placeholder?: string;
  poster?: string;
  preload?: string;
  radioGroup?: string;
  readOnly?: boolean;
  rel?: string;
  required?: boolean;
  role?: string;
  rows?: number;
  rowSpan?: number;
  sandbox?: string;
  scope?: string;
  scoped?: boolean;
  scrolling?: string;
  seamless?: boolean;
  selected?: boolean;
  shape?: string;
  size?: number;
  sizes?: string;
  span?: number;
  spellCheck?: boolean;
  src?: string;
  srcDoc?: string;
  srcLang?: string;
  srcSet?: string;
  start?: number;
  step?: number | string;
  style?: CSSStyleDeclaration;
  summary?: string;
  tabIndex?: number;
  target?: string;
  title?: string;
  type?: string;
  useMap?: string;
  value?: string | string[];
  width?: number | string;
  wmode?: string;
  wrap?: string;

  // RDFa Attributes
  about?: string;
  datatype?: string;
  inlist?: any;
  prefix?: string;
  property?: string;
  resource?: string;
  typeof?: string;
  vocab?: string;

  // Non-standard Attributes
  autoCapitalize?: boolean;
  autoCorrect?: string;
  autoSave?: string;
  color?: string;
  itemProp?: string;
  itemScope?: boolean;
  itemType?: string;
  itemID?: string;
  itemRef?: string;
  results?: number;
  security?: string;
  unselectable?: boolean;
}
interface SVGElementAttributes extends HTMLPropAttributes {
  viewBox?: string;
  preserveAspectRatio?: string;
}
interface SVGPropAttributes extends DOMAttributes {
  cx?: number | string;
  cy?: number | string;
  d?: string;
  dx?: number | string;
  dy?: number | string;
  fill?: string;
  fillOpacity?: number | string;
  fontFamily?: string;
  fontSize?: number | string;
  fx?: number | string;
  fy?: number | string;
  gradientTransform?: string;
  gradientUnits?: string;
  markerEnd?: string;
  markerMid?: string;
  markerStart?: string;
  offset?: number | string;
  opacity?: number | string;
  patternContentUnits?: string;
  patternUnits?: string;
  points?: string;
  preserveAspectRatio?: string;
  r?: number | string;
  rx?: number | string;
  ry?: number | string;
  spreadMethod?: string;
  stopColor?: string;
  stopOpacity?: number | string;
  stroke?: string;
  strokeDasharray?: string;
  strokeLinecap?: string;
  strokeOpacity?: number | string;
  strokeWidth?: number | string;
  textAnchor?: string;
  transform?: string;
  version?: string;
  viewBox?: string;
  x1?: number | string;
  x2?: number | string;
  x?: number | string;
  y1?: number | string;
  y2?: number | string;
  y?: number | string;
}
interface HTMLProps<T = HTMLElement>
  extends HTMLPropAttributes,
    ChildProps<T> {}
interface SVGProps extends SVGPropAttributes, ChildProps<SVGAElement> {}

// Events

interface SyntheticEvent {
  bubbles: boolean;
  cancelable: boolean;
  currentTarget: EventTarget;
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  nativeEvent: Event;
  preventDefault(): void;
  stopPropagation(): void;
  target: EventTarget;
  timeStamp: Date;
  type: string;
}

interface DragEvent extends SyntheticEvent {
  dataTransfer: DataTransfer;
}

interface ClipboardEvent extends SyntheticEvent {
  clipboardData: DataTransfer;
}

interface KeyboardEvent extends SyntheticEvent {
  altKey: boolean;
  charCode: number;
  ctrlKey: boolean;
  getModifierState(key: string): boolean;
  key: string;
  keyCode: number;
  locale: string;
  location: number;
  metaKey: boolean;
  repeat: boolean;
  shiftKey: boolean;
  which: number;
}

interface FocusEvent extends SyntheticEvent {
  relatedTarget: EventTarget;
}

interface FormEvent extends SyntheticEvent {}

interface MouseEvent extends SyntheticEvent {
  altKey: boolean;
  button: number;
  buttons: number;
  clientX: number;
  clientY: number;
  ctrlKey: boolean;
  getModifierState(key: string): boolean;
  metaKey: boolean;
  pageX: number;
  pageY: number;
  relatedTarget: EventTarget;
  screenX: number;
  screenY: number;
  shiftKey: boolean;
}

interface TouchEvent extends SyntheticEvent {
  altKey: boolean;
  changedTouches: TouchList;
  ctrlKey: boolean;
  getModifierState(key: string): boolean;
  metaKey: boolean;
  shiftKey: boolean;
  targetTouches: TouchList;
  touches: TouchList;
}

interface UIEvent extends SyntheticEvent {
  detail: number;
  view: AbstractView;
}

interface WheelEvent extends SyntheticEvent {
  deltaMode: number;
  deltaX: number;
  deltaY: number;
  deltaZ: number;
}

interface AbstractView {
  styleMedia: StyleMedia;
  document: Document;
}

interface Touch {
  identifier: number;
  target: EventTarget;
  screenX: number;
  screenY: number;
  clientX: number;
  clientY: number;
  pageX: number;
  pageY: number;
}

interface TouchList {
  [index: number]: Touch;
  length: number;
  item(index: number): Touch;
  identifiedTouch(identifier: number): Touch;
}

//
// Event Handler Types
// ----------------------------------------------------------------------

interface EventHandler<E extends SyntheticEvent> {
  (event: E): void;
}

interface DragEventHandler extends EventHandler<DragEvent> {}
interface ClipboardEventHandler extends EventHandler<ClipboardEvent> {}
interface KeyboardEventHandler extends EventHandler<KeyboardEvent> {}
interface FocusEventHandler extends EventHandler<FocusEvent> {}
interface FormEventHandler extends EventHandler<FormEvent> {}
interface MouseEventHandler extends EventHandler<MouseEvent> {}
interface TouchEventHandler extends EventHandler<TouchEvent> {}
interface UIEventHandler extends EventHandler<UIEvent> {}
interface WheelEventHandler extends EventHandler<WheelEvent> {}

declare global {
  namespace JSX {
    interface Element extends HElement {}
    interface ElementClass extends Component {}
    interface IntrinsicElements {
      // HTML
      a: HTMLProps<HTMLAnchorElement>;
      abbr: HTMLProps;
      address: HTMLProps;
      area: HTMLProps<HTMLAreaElement>;
      article: HTMLProps;
      aside: HTMLProps;
      audio: HTMLProps<HTMLAudioElement>;
      b: HTMLProps;
      base: HTMLProps<HTMLBaseElement>;
      bdi: HTMLProps;
      bdo: HTMLProps;
      big: HTMLProps;
      blockquote: HTMLProps<HTMLQuoteElement>;
      body: HTMLProps<HTMLBodyElement>;
      br: HTMLProps<HTMLBRElement>;
      button: HTMLProps<HTMLButtonElement>;
      canvas: HTMLProps<HTMLCanvasElement>;
      caption: HTMLProps;
      cite: HTMLProps;
      code: HTMLProps;
      col: HTMLProps;
      colgroup: HTMLProps;
      data: HTMLProps<HTMLDataElement>;
      datalist: HTMLProps<HTMLDataListElement>;
      dd: HTMLProps;
      del: HTMLProps;
      details: HTMLProps<HTMLDetailsElement>;
      dfn: HTMLProps;
      dialog: HTMLProps<HTMLDialogElement>;
      div: HTMLProps<HTMLDivElement>;
      dl: HTMLProps<HTMLDListElement>;
      dt: HTMLProps;
      em: HTMLProps;
      embed: HTMLProps<HTMLEmbedElement>;
      fieldset: HTMLProps<HTMLFieldSetElement>;
      figcaption: HTMLProps;
      figure: HTMLProps;
      footer: HTMLProps;
      form: HTMLProps<HTMLFormElement>;
      h1: HTMLProps<HTMLHeadingElement>;
      h2: HTMLProps<HTMLHeadingElement>;
      h3: HTMLProps<HTMLHeadingElement>;
      h4: HTMLProps<HTMLHeadingElement>;
      h5: HTMLProps<HTMLHeadingElement>;
      h6: HTMLProps<HTMLHeadingElement>;
      head: HTMLProps<HTMLHeadingElement>;
      header: HTMLProps;
      hr: HTMLProps<HTMLHRElement>;
      html: HTMLProps<HTMLHtmlElement>;
      i: HTMLProps;
      iframe: HTMLProps<HTMLIFrameElement>;
      img: HTMLProps<HTMLImageElement>;
      input: HTMLProps<HTMLInputElement>;
      ins: HTMLProps;
      kbd: HTMLProps;
      keygen: HTMLProps;
      label: HTMLProps<HTMLLabelElement>;
      legend: HTMLProps<HTMLLegendElement>;
      li: HTMLProps<HTMLLIElement>;
      link: HTMLProps<HTMLLinkElement>;
      main: HTMLProps;
      map: HTMLProps<HTMLMapElement>;
      mark: HTMLProps;
      marquee: HTMLProps<HTMLMarqueeElement>;
      media: HTMLProps<HTMLMediaElement>;
      menu: HTMLProps<HTMLMenuElement>;
      menuitem: HTMLProps;
      meta: HTMLProps<HTMLMetaElement>;
      meter: HTMLProps<HTMLMeterElement>;
      nav: HTMLProps;
      noscript: HTMLProps;
      object: HTMLProps<HTMLObjectElement>;
      ol: HTMLProps<HTMLOListElement>;
      optgroup: HTMLProps<HTMLOptGroupElement>;
      option: HTMLProps<HTMLOptionElement>;
      output: HTMLProps<HTMLOutputElement>;
      p: HTMLProps<HTMLParagraphElement>;
      param: HTMLProps<HTMLParamElement>;
      picture: HTMLProps<HTMLPictureElement>;
      pre: HTMLProps<HTMLPreElement>;
      progress: HTMLProps<HTMLProgressElement>;
      q: HTMLProps<HTMLQuoteElement>;
      rp: HTMLProps;
      rt: HTMLProps;
      ruby: HTMLProps;
      s: HTMLProps;
      samp: HTMLProps;
      script: HTMLProps<HTMLScriptElement>;
      section: HTMLProps;
      select: HTMLProps<HTMLSelectElement>;
      slot: HTMLProps<HTMLSlotElement>;
      small: HTMLProps;
      source: HTMLProps<HTMLSourceElement>;
      span: HTMLProps<HTMLSpanElement>;
      strong: HTMLProps;
      style: HTMLProps<HTMLStyleElement>;
      sub: HTMLProps;
      summary: HTMLProps;
      sup: HTMLProps;
      table: HTMLProps<HTMLTableElement>;
      tbody: HTMLProps;
      td: HTMLProps;
      textarea: HTMLProps;
      tfoot: HTMLProps;
      th: HTMLProps;
      thead: HTMLProps;
      time: HTMLProps;
      title: HTMLProps;
      tr: HTMLProps;
      track: HTMLProps;
      u: HTMLProps;
      ul: HTMLProps;
      var: HTMLProps;
      video: HTMLProps;
      wbr: HTMLProps;

      // SVG
      svg: SVGElementAttributes;

      circle: SVGProps;
      defs: SVGProps;
      ellipse: SVGProps;
      g: SVGProps;
      line: SVGProps;
      linearGradient: SVGProps;
      mask: SVGProps;
      path: SVGProps;
      pattern: SVGProps;
      polygon: SVGProps;
      polyline: SVGProps;
      radialGradient: SVGProps;
      rect: SVGProps;
      stop: SVGProps;
      text: SVGProps;
      tspan: SVGProps;
    }
  }
}
