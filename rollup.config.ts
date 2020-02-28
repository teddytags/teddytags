var path = require("path");
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";
export default [
  {
    input: path.join(__dirname, "./src/index.ts"),
    output: [
      {
        file: pkg.browser,
        format: "esm",
      },
      {
        file: pkg.module,
        format: "esm",
      },
      {
        file: "lib/legacy.js",
        format: "iife",
        exports: "named",
        name: "TeddyTags",
      },
      {
        file: pkg.main,
        format: "cjs",
        exports: "named",
      },
    ],
    plugins: [
      typescript({ tsconfig: "./src/tsconfig.json" }),
      terser({ include: /\.min\.js$/, compress: true }),
    ],
  },
];
