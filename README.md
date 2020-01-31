<p align="center">
  <img align="center" style="text-align:center" height="300" width="600" src="https://raw.githubusercontent.com/obnoxiousnerd/teddytags-website/gh-pages/assets/icons/teddytagslogo.big.png" alt="Teddytags logo">
</p>
<p align="center">The superfast way to custom elements.</p>
<p align="center">
  <!-- <a href="">
    <img src="" alt="">
  </a> -->
  <a href="https://www.jsdelivr.com/package/npm/teddytags">
    <img align="center" alt="jsDelivr hits (npm)" src="https://img.shields.io/jsdelivr/npm/hm/teddytags?logo=jsdelivr">
  </a>
  </p>
  <p align="center">
  <a href="https://travis-ci.com/obnoxiousnerd/teddytags">
    <img align="center" src="https://img.shields.io/travis/obnoxiousnerd/teddytags?label=Travis&logo=travis&logoColor=white" alt="Travis (.org)">
  </a>
  <a href="https://circleci.com/gh/obnoxiousnerd/teddytags">
    <img align="center" alt="CircleCI" src="https://img.shields.io/circleci/build/gh/obnoxiousnerd/teddytags?label=CircleCI&logo=circleci">
  </a>
  <a href="https://coveralls.io/github/obnoxiousnerd/teddytags">
    <img align="center" src="https://img.shields.io/coveralls/github/obnoxiousnerd/teddytags?label=coveralls&logo=coveralls&logoColor=lightskyblue" alt="Coveralls github">
  </a>
  </p>
  <p align="center">
  <a href="https://github.com/obnoxiousnerd/teddytags/blob/master/LICENSE">
    <img align="center" src="https://img.shields.io/github/license/obnoxiousnerd/teddytags?colorA=blue&color=cyan&logo=github" alt="GitHub License">
  </a>
  <a href="https://github.com/obnoxiousnerd/teddytags">
    <img align="center" src="https://img.shields.io/github/repo-size/obnoxiousnerd/teddytags?colorA=purple&logo=github&color=pink&label=code%20size" alt="GitHub repo size">
  </a>
  </p>
  <p align="center">
  <a href="https://www.npmjs.com/package/teddytags/v/latest">
    <img align="center" src="https://img.shields.io/npm/v/teddytags?colorA=darkred&logo=npm&color=red" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/teddytags/v/latest">
    <img align="center" src="https://img.shields.io/bundlephobia/min/teddytags?colorA=tomato&logo=npm&color=yellow&label=npm%20bundle" alt="npm bundle size">
  </a>
  <a href="https://npmjs.com/package/teddytags/v/latest">
    <img align="center" alt="npm downloads" src="https://img.shields.io/npm/dw/teddytags?label=downloads&logo=npm">
  </a>
  </p>
  <p align="center">
  <a href="https://nodei.co/npm/teddytags/">
    <img align="center" src="https://nodei.co/npm/teddytags.png?mini=true" alt="npm install teddytags">
  </a>
</p>

# CONTRIBUTING

We love contributions from the open-source community! If you are interested in contributing to this lovely preoject, submit a **Pull Request** right now. The Pull Request should:

- **Should pass all the tests made by the author**
- **Should not hamper with the functioning of the code ( i.e making the code unrunnable)**

We are happilty accepting contributions for our website for this project, **[teddy.js.org](https://teddy.js.org)**

For more information, check out the [CONTRIBUTING.md](https://github.com/obnoxiousnerd/teddytags/blob/master/CONTRIBUTING.md) file in this repository.

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

**A : If your DOM manipulation scripts are in a file _(say, event.js)_, then try adding the file below your tag definitions file with the defer attribute like this :**

```html
<!-- The tag defintions file -->
<script src="./tags.js" defer></script>
<!-- The DOM manipulation file -->
<script src="./event.js" defer></script>
```

**For a working example, go to this [gist](https://gist.github.com/obnoxiousnerd/d24b78593b6fb7b6dd94728162025087).**