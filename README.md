<p align="center">
  <a href="https://teddy.js.org/">
  <img align="center" style="text-align:center" src="https://raw.githubusercontent.com/teddytags/website/master/src/assets/big-dark-logo.svg?sanitize=true" alt="Teddytags logo">
  </a>
</p>
  <p align="center">The superfast way to custom elements.</p>

## Name the HTML tags your own.

- Out-of-box custom elements (`<myElement />`)

```js
new Tag({
  name: "myElement",
  to: "p",
});
```

↓

```html
<myElement>Hello</myElement>
```

↓

```html
<p>Hello</p>
```

- Virtual Components (Like those of React)
- custom elements + Virtual components directly in HTML

```jsx
/** @jsx teddy.h */
import teddy from "teddytags";
class MyComponent extends teddy.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

- Bind virtual components to the DOM

```js
import { Tag } from "teddytags";
//MyComponent is defined in above example
new Tag({
  name: "MyComponent",
  to: MyComponent,
});
```

and use it.

```html
<MyComponent name="myself" />
```

↓

```html
<div name="myself" data-component="MyComponent">
  <h1>Hello, myself</h1>
</div>
```

- Superb and extra-simple diff algorithm
- Stateful Class Components
- **3kB min-zipped in browser**
- TypeScript and TSX support built-in
- **Custom Elements Registry (`window.TagRegistry`)**
  ```js
  window.TagRegistry.getEntry("myComponent")
  // => { from: class MyComponent..., nodes: Array<HTMLElement> }
  ```

# Why does the project exist in the first place??

Because custom elements need to be much more powerful than they are now. So a little library like this can make a difference.

# Documentation

Head over to https://teddy.js.org/docs

# Try it out

## Browser

> You don't need ES6 to run TeddyTags... https://git.io/teddytags-es5

```html
<!-- UMD -->
<script src="https://unpkg.com/teddytags@latest/lib/teddytags.umd.js"></script>
<!-- ESM -->
<script type="module">
  import * as TeddyTags from "https://unpkg.com/teddytags@latest/lib/teddytags.js";
</script>
```

## NPM

```bash
> npm i teddytags
> yarn add teddytags
```

# Insights

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

[![gzip size](http://img.badgesize.io/https://unpkg.com/teddytags/lib/teddytags.umd.js?compression=gzip&label=gzip)](https://unpkg.com/teddytags)

[![brotli size](http://img.badgesize.io/https://unpkg.com/teddytags/lib/teddytags.umd.js?compression=brotli&label=brotli)](https://unpkg.com/teddytags)

</td>
<td>
<img src="https://badges.herokuapp.com/browsers?firefox=21&iexplore=11&googlechrome=26" alt="Browser Matrix"/>
</td>
</tr>
</tbody>
</table>
