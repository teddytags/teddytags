// Karma configuration
// Generated on Sat Feb 15 2020 18:49:44 GMT+0530 (India Standard Time)

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "",

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["jasmine"],

    // list of files / patterns to load in the browser
    files: [{ pattern: "test/test-context.js", watched: false }],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "lib/*.js": ["coverage"],
      "test/test-context.js": ["webpack"],
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
        ],
        rules: [
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

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["progress", "coverage", "remap-coverage", "coveralls"],
    coverageReporter: {
      type: "in-memory",
      html: "./coverage",
    },
    remapCoverageReporter: {
      "text-summary": null,
      lcovonly: "./coverage/lcov.info",
      html: "./coverage/html",
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ["ChromeHeadless"],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
