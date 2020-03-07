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
        file: pkg.exports["./cjs"],
        format: "cjs",
        exports: "named",
        name: "TeddyTags",
        sourcemap: true,
      },
      {
        file: pkg.exports["./legacy"],
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
    input: pkg.exports["./legacy"],
    output: {
      file: pkg.exports["./legacy"],
      format: "umd",
      useStrict: false,
      exports: "named",
      name: "TeddyTags",
      sourcemap: true,
    },
    plugins: [
      babel({
        babelrc: false,
        presets: [["@babel/preset-env", { modules: false, loose: true }]],
      }),
      terser({ include: /\.legacy\.js$/, compress: true }),
    ],
  },
];
