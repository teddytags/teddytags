<div style="text-align:justify">
  <img style="text-align:center" height="320" width="640" src="https://raw.githubusercontent.com/obnoxiousnerd/teddytags-website/gh-pages/assets/icons/teddytagslogo.big.png" alt="Teddytags logo">
</div>

<div style="text-align: center">
  <!-- <a href="">
    <img src="" alt="">
  </a> -->
  <a href="https://www.jsdelivr.com/package/npm/teddytags">
    <img src="https://img.shields.io/jsdelivr/npm/hm/teddytags?colorA=red&color=orange&label=jsdelivr" alt="jsDelivr hits (npm)">
  </a>
  <br />
  <a href="https://travis-ci.com/obnoxiousnerd/teddytags">
    <img src="https://img.shields.io/travis/obnoxiousnerd/teddytags?label=travis&logo=travis&logoColor=white" alt="Travis (.org)">
  </a>
  <a href="https://coveralls.io/github/obnoxiousnerd/teddytags">
    <img src="https://img.shields.io/coveralls/github/obnoxiousnerd/teddytags?label=coveralls&logo=coveralls&logoColor=lightskyblue" alt="Coveralls github">
  </a>
  <br />
  <a href="https://github.com/obnoxiousnerd/teddytags/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/obnoxiousnerd/teddytags?colorA=blue&color=cyan" alt="GitHub License">
  </a>
  <a href="https://github.com/obnoxiousnerd/teddytags">
    <img src="https://img.shields.io/github/repo-size/obnoxiousnerd/teddytags?colorA=purple&color=pink&label=code%20size" alt="GitHub repo size">
  </a>
  <br />
  <a href="https://www.npmjs.com/package/teddytags/v/latest">
    <img src="https://img.shields.io/npm/v/teddytags?colorA=darkred&color=red" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/teddytags/v/latest">
    <img src="https://img.shields.io/bundlephobia/min/teddytags?colorA=tomato&color=yellow&label=npm%20bundle" alt="npm bundle size">
  </a>
  <a href="https://nodei.co/npm/teddytags/">
    <img src="https://nodei.co/npm/teddytags.png?mini=true" alt="npm install teddytags">
  </a>
</div>

# CONTRIBUTING

We love contributions from the open-source community! If you are interested in contributing to this lovely preoject, submit a **Pull Request** right now. The Pull Request should:

- **Should pass all the tests made by the author**
- **Should not hamper with the functioning of the code ( i.e making the code unrunnable)**

# Installation

- ## via NPM
  ```console
  npm i -g teddytags
  ```
- ## Quick run (Browser)
  Add this in your HTML file:
  ```html
  <script src="https://cdn.jsdelivr.net/npm/teddytags"></script>
  ```

# Use

- Just write your imaginary HTML:
  ```html
  <loader>
    <icon src="assets/loader.png"></icon>
    <text>Loading your awesome app...</text>
  </loader>
  ```
- Make a defintions file _(say, tags.js)_ like this:
  ```javascript
  new TeddyTags("loader").set("div");
  new TeddyTags("icon").set("img");
  new TeddyTags("text").set("h1");
  ```
- Add the file in your HTML like this _(just make sure it loads after the [document is ready](https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event))_:
  ```html
  <script src="./tags.js" defer></script>
  ```
- The output in your browser:
  ```html
  <div id="loader">
    <img id="icon" src="assets/loader.png" />
    <p id="text">Loading your awesome app...</p>
  </div>
  ```

# Common issues

**_Q : DOM manipulation not working_**

**A : If your event listeners or `appendChild()` scripts are in a file _(say, event.js)_, then try adding the file below your tag definitions file with the defer attribute like this :**

```html
<!-- The tag defintions file -->
<script src="./tags.js" defer></script>
<!-- The DOM manipulation file -->
<script src="./event.js" defer></script>
```
