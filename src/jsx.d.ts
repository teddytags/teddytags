import { HElement, Component } from "./component";
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
  innerHTML?: InnerHTML;
}
interface HTMLAttributes extends DOMAttributes {
  accept?: string;
  acceptCharset?: string;
  accessKey?: string;
  action?: string;
  allowFullScreen?: boolean;
  allowTransparency?: boolean;
  alt?: string;
  async?: boolean;
  autoComplete?: boolean;
  autoFocus?: boolean;
  autoPlay?: boolean;
  cellPadding?: number | string;
  cellSpacing?: number | string;
  charSet?: string;
  checked?: boolean;
  classID?: string;
  className?: string;
  cols?: number;
  colSpan?: number;
  content?: string;
  contentEditable?: boolean;
  contextMenu?: string;
  controls?: any;
  coords?: string;
  crossOrigin?: string;
  data?: string;
  dateTime?: string;
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
  srcSet?: string;
  start?: number;
  step?: number | string;
  style?: CSSStyleDeclaration;
  tabIndex?: number;
  target?: string;
  title?: string;
  type?: string;
  useMap?: string;
  value?: string;
  width?: number | string;
  wmode?: string;

  // Non-standard Attributes
  autoCapitalize?: boolean;
  autoCorrect?: boolean;
  property?: string;
  itemProp?: string;
  itemScope?: boolean;
  itemType?: string;
  unselectable?: boolean;
}
interface SVGElementAttributes extends HTMLAttributes {
  viewBox?: string;
  preserveAspectRatio?: string;
}
interface SVGAttributes extends DOMAttributes {
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
interface DOMElement<P> extends Component<P, any> {
  tagName: string;
}
interface DOMFactory<P> {
  (props?: P, ...children: HElement[]): DOMElement<P>;
}

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

export declare namespace JSX {
  interface Element extends HElement {}
  interface ElementClass extends Component<any, any> {}
  interface IntrinsicElements {
    // HTML
    a: HTMLAttributes;
    abbr: HTMLAttributes;
    address: HTMLAttributes;
    area: HTMLAttributes;
    article: HTMLAttributes;
    aside: HTMLAttributes;
    audio: HTMLAttributes;
    b: HTMLAttributes;
    base: HTMLAttributes;
    bdi: HTMLAttributes;
    bdo: HTMLAttributes;
    big: HTMLAttributes;
    blockquote: HTMLAttributes;
    body: HTMLAttributes;
    br: HTMLAttributes;
    button: HTMLAttributes;
    canvas: HTMLAttributes;
    caption: HTMLAttributes;
    cite: HTMLAttributes;
    code: HTMLAttributes;
    col: HTMLAttributes;
    colgroup: HTMLAttributes;
    data: HTMLAttributes;
    datalist: HTMLAttributes;
    dd: HTMLAttributes;
    del: HTMLAttributes;
    details: HTMLAttributes;
    dfn: HTMLAttributes;
    dialog: HTMLAttributes;
    div: HTMLAttributes;
    dl: HTMLAttributes;
    dt: HTMLAttributes;
    em: HTMLAttributes;
    embed: HTMLAttributes;
    fieldset: HTMLAttributes;
    figcaption: HTMLAttributes;
    figure: HTMLAttributes;
    footer: HTMLAttributes;
    form: HTMLAttributes;
    h1: HTMLAttributes;
    h2: HTMLAttributes;
    h3: HTMLAttributes;
    h4: HTMLAttributes;
    h5: HTMLAttributes;
    h6: HTMLAttributes;
    head: HTMLAttributes;
    header: HTMLAttributes;
    hr: HTMLAttributes;
    html: HTMLAttributes;
    i: HTMLAttributes;
    iframe: HTMLAttributes;
    img: HTMLAttributes;
    input: HTMLAttributes;
    ins: HTMLAttributes;
    kbd: HTMLAttributes;
    keygen: HTMLAttributes;
    label: HTMLAttributes;
    legend: HTMLAttributes;
    li: HTMLAttributes;
    link: HTMLAttributes;
    main: HTMLAttributes;
    map: HTMLAttributes;
    mark: HTMLAttributes;
    menu: HTMLAttributes;
    menuitem: HTMLAttributes;
    meta: HTMLAttributes;
    meter: HTMLAttributes;
    nav: HTMLAttributes;
    noscript: HTMLAttributes;
    object: HTMLAttributes;
    ol: HTMLAttributes;
    optgroup: HTMLAttributes;
    option: HTMLAttributes;
    output: HTMLAttributes;
    p: HTMLAttributes;
    param: HTMLAttributes;
    picture: HTMLAttributes;
    pre: HTMLAttributes;
    progress: HTMLAttributes;
    q: HTMLAttributes;
    rp: HTMLAttributes;
    rt: HTMLAttributes;
    ruby: HTMLAttributes;
    s: HTMLAttributes;
    samp: HTMLAttributes;
    script: HTMLAttributes;
    section: HTMLAttributes;
    select: HTMLAttributes;
    small: HTMLAttributes;
    source: HTMLAttributes;
    span: HTMLAttributes;
    strong: HTMLAttributes;
    style: HTMLAttributes;
    sub: HTMLAttributes;
    summary: HTMLAttributes;
    sup: HTMLAttributes;
    table: HTMLAttributes;
    tbody: HTMLAttributes;
    td: HTMLAttributes;
    textarea: HTMLAttributes;
    tfoot: HTMLAttributes;
    th: HTMLAttributes;
    thead: HTMLAttributes;
    time: HTMLAttributes;
    title: HTMLAttributes;
    tr: HTMLAttributes;
    track: HTMLAttributes;
    u: HTMLAttributes;
    ul: HTMLAttributes;
    var: HTMLAttributes;
    video: HTMLAttributes;
    wbr: HTMLAttributes;

    // SVG
    svg: SVGElementAttributes;

    circle: SVGAttributes;
    defs: SVGAttributes;
    ellipse: SVGAttributes;
    g: SVGAttributes;
    line: SVGAttributes;
    linearGradient: SVGAttributes;
    mask: SVGAttributes;
    path: SVGAttributes;
    pattern: SVGAttributes;
    polygon: SVGAttributes;
    polyline: SVGAttributes;
    radialGradient: SVGAttributes;
    rect: SVGAttributes;
    stop: SVGAttributes;
    text: SVGAttributes;
    tspan: SVGAttributes;
  }
}
