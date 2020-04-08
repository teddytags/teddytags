var path = require("path");
import typescript from "@rollup/plugin-typescript";
import babel from "rollup-plugin-babel";
import ts from 'typescript'
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
        file: pkg.exports["./umd"],
        format: "umd",
        exports: "named",
        name: "TeddyTags",
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({ typescript: ts, tsconfig: "./src/tsconfig.json" }),
      process.env.BUILD === "dev" ? [] : terser({ compress: true }),
      babel({ extensions: [".js", ".ts"] }),
    ],
  },
  {
    input: path.join(__dirname, "./src/polyfills.ts"),
    output: {
      file: './lib/polyfills.js',
      format: 'iife'
    },
    plugins: [
      typescript({ tsconfig: "./src/tsconfig.json" }),
      process.env.BUILD === "dev" ? [] : terser({ compress: true }),
      babel({ extensions: [".js", ".ts"] }),
    ]
  },
];
