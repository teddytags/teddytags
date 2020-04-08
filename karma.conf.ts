let typescript = require("@rollup/plugin-typescript");
let commonjs = require("@rollup/plugin-commonjs");
let resolve = require("@rollup/plugin-node-resolve");
let babel = require("rollup-plugin-babel");
let istanbul = require("rollup-plugin-istanbul");
module.exports = config => {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [{ pattern: "./test/context.ts", watched: false }],
    browserStack: {
      username: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
    },
    exclude: ["/node_modules/**/*"],
    preprocessors: {
      "./src/*.ts": ["coverage"],
      "./test/context.ts": ["rollup"],
    },
    rollupPreprocessor: {
      input: "./test/context.ts",
      plugins: [
        commonjs(),
        resolve({ browser: true }),
        typescript({
          tsconfig: "./test/tsconfig.json",
          sourceMap: true,
          noEmit: true,
        }),
        babel({
          extensions: [".js", ".ts"],
        }),
        istanbul({
          exclude: ["./test/*.ts", "./node_modules/*.js"],
        }),
      ],
      output: {
        format: "iife",
        name: "teddy",
        sourcemap: "inline",
      },
    },
    reporters: [
      "BrowserStack",
      "coverage",
      "remap-coverage",
      "coveralls",
      "spec",
    ],
    coverageReporter: {
      type: "in-memory",
      html: "./coverage",
    },
    remapCoverageReporter: {
      "text-summary": null,
      lcovonly: "./coverage/lcov.info",
      html: "./coverage/html",
    },
    customLaunchers: {
      bs_firefox_mac: {
        base: "BrowserStack",
        browser: "firefox",
        browser_version: "73",
        os: "OS X",
        os_version: "Catalina",
      },
      bs_chrome_mac: {
        base: "BrowserStack",
        browser: "chrome",
        browser_version: "80",
        os: "OS X",
        os_version: "Catalina",
      },
      bs_safari_mac: {
        base: "BrowserStack",
        browser: "safari",
        browser_version: "13",
        os: "OS X",
        os_version: "Catalina",
      },
      bs_edge_win: {
        base: "BrowserStack",
        browser: "edge",
        browser_version: "80",
        os: "Windows",
        os_version: "10",
      },
      bs_ie_win: {
        base: "BrowserStack",
        browser: "ie",
        browser_version: "11",
        os: "Windows",
        os_version: "10",
      },
    },
    browsers: [
      "bs_firefox_mac",
      "bs_chrome_mac",
      "bs_safari_mac",
      "bs_edge_win",
      "bs_ie_win",
    ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: true,
    concurrency: Infinity,
  });
};
