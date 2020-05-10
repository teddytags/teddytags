var path = require("path");
import typescript from "@wessberg/rollup-plugin-ts";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";
const config = {
  input: path.join(__dirname, "./src/index.ts"),
  output: [
    {
      file: pkg.module,
      format: "esm",
      sourcemap: false,
    },
    {
      file: pkg.main,
      format: "umd",
      exports: "named",
      name: "TeddyTags",
      sourcemap: false,
    },
  ],
  plugins: [
    typescript({
      tsconfig: "./src/tsconfig.json",
      babelConfig: "./.babelrc",
      transpiler: "babel",
    }),
    process.env.BUILD === "dev" ? [] : terser({ compress: true }),
  ],
};
if (process.env.BUILD === "dev") {
  config.output[0].sourcemap = true;
  config.output[1].sourcemap = true;
}
export default config;
