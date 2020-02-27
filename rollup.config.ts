var path = require("path");
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
export default [
  {
    input: path.join(__dirname, "./src/index.ts"),
    output: [
      {
        file: "lib/teddytags.min.js",
        format: "esm",
        sourcemap: false,
      },
      {
        file: "lib/teddytags.js",
        format: "esm",
        sourcemap: true,
      },
      {
        file: "lib/teddytags.cjs.js",
        format: "cjs",
        exports: "named",
        sourcemap: false,
        plugins: [typescript({ module: "commonjs" })],
      },
    ],
    plugins: [
      typescript({ tsconfig: "./src/tsconfig.json" }),
      terser({ include: /\.min\.js$/, compress: true }),
    ],
  },
];
