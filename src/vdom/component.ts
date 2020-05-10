/* eslint @typescript-eslint/no-unused-vars : 0 */
/* eslint @typescript-eslint/no-empty-function: 0 */
import { renderComponent } from "./render";
/*istanbul ignore next */
/**
 * The class used for the instantaniation of TeddyTags virtual elements
 *
 * Declaration:
 * ```js
 * class MyComponent extends Component{
 *  constructor(props){
 *    super(props)
 *  }
 *  render(){
 *    //return your markup
 *  }
 * }
 * ```
 */
/*istanbul ignore next */
export class Component<P = any, S = any> implements ComponentFunctions {
  /**
   * The general properties of the Component. Cannot be changed once set.
   * Should contain some unique or permanent information.
   * Only accessible if passed through the constructor as `super(props)`.
   */
  readonly props: P;
  /**
   * The attributes of the Component which can be changed as per user's basis.
   * Should contain some temporary information.
   */
  state: S;
  /**
   * The constructor of the Component. It is a **must to pass `super(props)`** before other things.
   * @param {P} props The properties of the Component
   */
  constructor(props: P) {
    this.props = props;
  }
  /**
   * The function which will alter with the `state` property of the Component.
   * @param state
   */
  /* istanbul ignore next */
  setState(state: S): void {
    this.state = Object.assign({}, state);
    renderComponent(this);
  }
  readonly node?: VElement;
  base?: Element;
  dom?: Element;
  render(): any {}
  componentDidMount(dom?: Element) {}
  componentDidUnmount() {}
  componentDidUpdate(oldDOM?: Element, newDOM?: Element) {}
  componentWillMount(dom?: Element) {}
}
Component.prototype["isClassComponent"] = true;
/**
 * The standard interface of an non-component virtual element
 */
export interface VElement {
  type: string;
  dom?: Element;
  readonly props: PropsOrState;
  [children: string]: any;
}
export type PropsOrState<T = any> = { [propOrState: string]: T };
/**
 * The standard interface of a component virtual element
 */
export interface HConstructorElement<P = any, S = any>
  extends ComponentFunctions {
  readonly props: PropsOrState<P>;
  state: PropsOrState<S>;
  new (props: PropsOrState<P>): void;
  node?: VElement;
  base?: Element;
  dom?: Element;
}
interface ComponentFunctions {
  /**
   * The function which will return the general markup of the Component.
   * For Component to appear in the DOM, this function is necessary.
   */
  render(): VElement;
  /**
   * The function which will invoke when the component is about to mount.
   * @param dom The DOM element that will be mounted
   */
  componentWillMount(dom?: Element): void;
  /**
   * The function which will invoke immediately after mounting the component.
   * @param dom The DOM element that will is mounted
   */
  componentDidMount(dom?: Element): void;
  /**
   * The function which will invoke immediately if the DOM of component updates.
   * @param oldDOM The old DOM element
   * @param newDOM The updated DOM element
   */
  componentDidUpdate(oldDOM?: Element, newDOM?: Element): void;
  /**
   * The function which will invoke immediately after unmounting the component.
   */
  componentDidUnmount(): void;
}
