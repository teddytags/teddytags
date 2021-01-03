let typescript = require("rollup-plugin-typescript2");
let alias = require("@rollup/plugin-alias");
let commonjs = require("@rollup/plugin-commonjs");
let resolve = require("@rollup/plugin-node-resolve");
let istanbul = require("rollup-plugin-istanbul");
let path = require("path");
require("dotenv").config({ path: "./.env" });
module.exports = config => {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [
      { pattern: "./test/context.ts", watched: false },
      {
        pattern: "**/*.js.map",
        included: false,
      },
    ],
    browserStack: {
      project: "TeddyTags",
      username: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
    },
    preprocessors: {
      "./src/**/*.ts": ["coverage"],
      "./test/context.ts": ["rollup"],
    },
    rollupPreprocessor: {
      input: "./test/context.ts",
      output: {
        format: "iife",
        name: "teddy",
        sourcemap: "inline",
      },
      plugins: [
        alias({
          entries: {
            teddytags: path.join(__dirname, "./lib/teddytags"),
          },
        }),
        commonjs(),
        resolve({ extensions: [".ts", ".tsx"] }),
        typescript({
          tsconfig: "./test/tsconfig.json",
        }),
        istanbul({
          instrumenterConfig: {
            embedSource: true,
          },
          exclude: ["./test/**/*.ts", "./test/**/*.tsx"],
        }),
      ],
    },
    reporters: [
      "BrowserStack",
      "coverage",
      "karma-remap-istanbul",
      "coveralls",
      "spec",
    ],
    coverageReporter: {
      type: "in-memory",
      html: "./coverage",
      lcovonly: "./coverage/lcov.info",
    },
    remapIstanbulReporter: {
      remapOptions: {
        exclude: "node_modules",
      },
      reports: {
        text: null,
        lcovonly: "./coverage/lcov.info",
        html: "./coverage/html",
      },
    },
    customLaunchers: {
      bs_firefox_mac: {
        base: "BrowserStack",
        browser: "firefox",
        browser_version: "21",
        os: "OS X",
        os_version: "Catalina",
      },
      bs_chrome_mac: {
        base: "BrowserStack",
        browser: "chrome",
        browser_version: "26",
        os: "OS X",
        os_version: "Lion",
      },
      bs_ie_win: {
        base: "BrowserStack",
        browser: "ie",
        browser_version: "11",
        os: "Windows",
        os_version: "7",
      },
    },
    browsers: ["bs_ie_win", "bs_firefox_mac", "bs_chrome_mac"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: true,
    concurrency: Infinity,
  });
};
