import { minify } from "rollup-plugin-esbuild-minify";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import path from "path";
import fs from "fs";

// Custom plugin to wrap output in <script> tags and output .liquid files in the "snippets" directory
function bundleToLiquid() {
  return {
    name: "wrap-with-script-tag",
    generateBundle(options, bundle) {
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type === "chunk") {
          const wrappedContent = `\n<script>\n${chunk.code}</script>\n`;

          // Generate liquid filename by replacing .js with .liquid
          const liquidFileName = fileName.replace(".js", ".liquid");

          // Output liquid files to the "snippets" directory
          const outputPath = path.resolve(
            "../../extensions/theme-extension/snippets",
            liquidFileName
          );

          // Write the .liquid file
          fs.writeFileSync(outputPath, wrappedContent);

          // Optionally remove the original .js file from the bundle if not needed
          delete bundle[fileName];
        }
      }
    },
  };
}

const plugins = [
  nodeResolve(),
  commonjs(),
  typescript({
    exclude: [
      "**/dist/*.ts",
      "**/dist/*.js",
      "**/dist/*.d.ts",
      "**/dist/*.json",
    ],
  }),
  postcss({
    // extract: true,
    inject: true,
    minimize: true,
  }),
  minify(),
];

export default [
  {
    input: "src/global.ts",
    output: {
      file: path.resolve("../../extensions/theme-extension/assets/global.js"),
      format: "iife",
      name: "GemXInstance",
      minify: true,
    },
    plugins: plugins, // Add the bundleToLiquid plugin. Example: [...plugins, bundleToLiquid()]
  },
];
