import { renderComponent } from "./render";
export class Component {
  props: object | any;
  state: object | any;
  constructor(props: object) {
    this.props = props;
  }
  /* istanbul ignore next */
  render() {}
  /* istanbul ignore next */
  setState(state: object) {
    this.state = Object.assign({}, state);
    renderComponent(this);
  }
  componentWillMount() {}
  componentDidMount() {}
  componentDidUpdate() {}
}
Component.prototype["isClassComponent"] = true;
/**
 * The standard interface of an non-component virtual element
 */
export interface HElement {
  type: string;
  props: object;
}
