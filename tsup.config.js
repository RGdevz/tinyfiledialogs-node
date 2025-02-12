import { defineConfig } from 'tsup'


export default defineConfig({
 entry: [
 './js/index.ts'
 ],


 banner: ({ format, platform }) => {
  if (format === "esm") {
   return {
    js: `import { createRequire } from 'node:module';
      if (typeof require === 'undefined') {
        globalThis.require = createRequire(import.meta.url);
      }
      if (typeof __filename === 'undefined') {
        globalThis.__filename = require('node:url').fileURLToPath(import.meta.url);
      }
      if (typeof __dirname === 'undefined') {
        globalThis.__dirname = require('node:path').dirname(__filename);
      }`,
   };
  }
  return {};
 },

 format: ['cjs', 'esm'],
 target: 'node16',
 splitting: false,
 outDir:'dist',
 cjsInterop: true,
 minify:false,
 clean: true,
 dts: false,
 platform: 'node',
}
)
