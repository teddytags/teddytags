module.exports = config => {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [{ pattern: "./test/test-context.js", watched: false }],
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
            test: /\.js/,
            exclude: /node_modules/,
            use: { loader: "babel-loader", options: {} },
          },
          {
            test: /\.js/,
            exclude: /(node_modules|test)/,
            use: {
              loader: "istanbul-instrumenter-loader",
              options: { esModules: true },
            },
          },
        ],
      },
      watch: true,
    },
    webpackServer: {
      noInfo: true,
    },
    reporters: ["spec", "coverage", "remap-coverage", "coveralls"],
    coverageReporter: {
      type: "in-memory",
      html: "./coverage",
    },
    remapCoverageReporter: {
      "text-summary": null,
      lcovonly: "./coverage/lcov.info",
      html: "./coverage/html",
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["ChromeHeadless", "FirefoxHeadless"],
    customLaunchers: {
      'FirefoxHeadless': {
        base: 'Firefox',
        flags: [
          '-headless',
        ],
      }
    },
    singleRun: true,
    concurrency: Infinity,
  });
};
