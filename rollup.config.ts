var path = require("path");
import typescript from "@rollup/plugin-typescript";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";
export default [
  {
    input: path.join(__dirname, "./src/index.ts"),
    output: [
      {
        file: pkg.browser,
        format: "esm",
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
      },
      {
        file: "lib/teddytags.legacy.js",
        format: "iife",
        exports: "named",
        name: "TeddyTags",
        sourcemap: true,
      },
      {
        file: pkg.main,
        format: "umd",
        exports: "named",
        name: "TeddyTags",
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({ tsconfig: "./src/tsconfig.json" }),
      terser({ include: /\.min\.js$/, compress: true }),
    ],
  },
  {
    input: "./lib/teddytags.legacy.js",
    output: {
      file: "./lib/teddytags.legacy.js",
      format: "iife",
      exports: "named",
      name: "TeddyTags",
      sourcemap: true,
    },
    plugins: [
      babel({
        babelrc: false,
        presets: [["@babel/preset-env", { modules: false }]],
      }),
      terser({ include: /\.legacy\.js$/, compress: true }),
    ],
  },
];
