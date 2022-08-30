import gulp from "gulp";

import * as rollup from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

/* Bundle Tasks */
gulp.task("build", async () => {
  return rollup
    .rollup({
      input: 'src/script.js',
      plugins: [nodeResolve(), commonjs()],
    })
    .then((bundle) => {
      return bundle.write({
        file: 'dist/',
        format: "iife",
      });
    });
});
