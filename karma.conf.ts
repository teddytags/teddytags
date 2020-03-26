module.exports = config => {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [{ pattern: "./test/test-context.js", watched: false }],
    browserStack: {
      username: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
    },
    exclude: [],
    preprocessors: {
      "./lib/*.js": ["coverage"],
      "./test/test-context.js": ["webpack"],
    },
    webpack: {
      mode: "production",
      module: {
        rules: [
          {
            test: /\.(js|jsx)/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
                plugins: ["@babel/plugin-transform-runtime"],
              },
            },
          },
          {
            test: /\.(js|jsx)/,
            exclude: /(node_modules|test)/,
            use: {
              loader: "istanbul-instrumenter-loader",
              options: { esModules: true },
            },
            enforce: "post",
          },
        ],
      },
      watch: true,
    },
    webpackServer: {
      noInfo: true,
    },
    reporters: ["BrowserStack", "coverage", "remap-coverage", "coveralls"],
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
      bs_opera_win: {
        base: "BrowserStack",
        browser: "opera",
        browser_version: "63",
        os: "Windows",
        os_version: "10",
      },
    },
    browsers: [
      "bs_firefox_mac",
      "bs_chrome_mac",
      "bs_safari_mac",
      "bs_edge_win",
      "bs_opera_win",
    ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: true,
    concurrency: Infinity,
  });
};
