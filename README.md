<p align="center">
  <a href="https://teddy.js.org/">
  <img align="center" style="text-align:center" src="https://raw.githubusercontent.com/teddytags/website/master/src/assets/big-dark-logo.svg?sanitize=true" alt="Teddytags logo">
  </a>
</p>
  <p align="center">The superfast way to custom elements.</p>

## Name the HTML tags your own.

- Out-of-box custom elements (`<myElement />`)
- Virtual Components (Like those of React)

```jsx
/** @jsx teddy.h */
import teddy from "teddytags";
class MyComponent extends teddy.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h1>Hello, myself!</h1>;
  }
}
```

- Bind virtual components to the DOM

```js
import { Tag } from "teddytags";
//MyComponent is defined in above example
new Tag("MyComponent").fromComponent(MyComponent);
```

and use it.

```html
<MyComponent></MyComponent>
```

- Superb and extra-simple diff algorithm
- State implementation in Class Components
- **1.5kB min-gzipped in browser**
- TypeScript and TSX support built-in

<table>
<tbody>
<tr>
<td>
<a href="https://travis-ci.com/teddytags/teddytags">
<img src="https://travis-ci.com/teddytags/teddytags.svg?branch=master" alt="Build Status"/>
</a>

<a href='https://coveralls.io/github/teddytags/teddytags?branch=master'>
<img src='https://coveralls.io/repos/github/teddytags/teddytags/badge.svg?branch=master' alt='Coverage Status' />
</a>

[![npm](https://img.shields.io/npm/v/teddytags.svg)](http://npm.im/teddytags)

[![gzip size](http://img.badgesize.io/https://unpkg.com/teddytags/lib/umd.js?compression=gzip&label=gzip)](https://unpkg.com/teddytags)

[![brotli size](http://img.badgesize.io/https://unpkg.com/teddytags/lib/umd.js?compression=brotli&label=brotli)](https://unpkg.com/teddytags)

</td>
<td>
<img src="https://badges.herokuapp.com/browsers?firefox=21&iexplore=10&googlechrome=23&safari=6" alt="Browser Matrix"/>
</td>
</tr>
</tbody>
</table>

# Documentation

Head over to https://teddy.js.org/docs

# What should you not be worried of

## 1. Polyfills??

   TeddyTags just need five polyfills and which are also shipped with it:

   ✔️ Array.includes

   ✔️ String.startsWith

   ✔️ Object.assign

   ✔️ NodeList.forEach

   So you can just plug this script and rock the way in any ES5 compatible browser

   ```html
   <script src="https://unpkg.com/teddytags@latest/lib/umd.js"></script>
   ```
