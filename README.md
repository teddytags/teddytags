<p align="center">
  <a href="https://teddy.js.org/">
  <img align="center" style="text-align:center" src="https://raw.githubusercontent.com/teddytags/website/master/src/assets/big-dark-logo.svg?sanitize=true" alt="Teddytags logo">
  </a>
</p>
  <p align="center">The superfast way to custom elements.</p>

## Name the HTML tags your own.
* Out-of-box custom elements (`<myElement />`)
* Virtual Components (Like those of React)
```jsx
/** @jsx teddy.h */
import teddy from "teddytags"
class MyComponent extends teddy.Component{
  constructor(props){
    super(props)
  }
  render(){
    return <h1>Hello, myself!</h1>
  }
}
```

* Bind virtual components to the DOM
```js
import { Tag } from "teddytags"
//MyComponent is defined in above example
new Tag('MyComponent').fromComponent(MyComponent)
```
and use it.
```html
<MyComponent></MyComponent>
```
* Superb and extra-simple diff algorithm
* State implementation in Class Components
* **1.5kB min-gzipped in browser**
* TypeScript and TSX support built-in

# Documentation
Head over to https://teddy.js.org/docs