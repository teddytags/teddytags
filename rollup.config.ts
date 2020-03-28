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
        file: pkg.exports["./umd"],
        format: "umd",
        exports: "named",
        name: "TeddyTags",
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({ tsconfig: "./src/tsconfig.json" }),
      process.env.BUILD === "production"
        ? []
        : terser({ compress: true }),
      babel({ extensions: [".js", ".ts"] }),
    ],
  },
];
