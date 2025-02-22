import { defineConfig } from 'tsup'


export default defineConfig({
 entry: [
 './js/index.cjs'
 ],


 banner: ({ format, platform }) => {
  if (format === "esm") {
 return {
 js: `import { createRequire } from 'node:module';
 if (typeof require === 'undefined') {
 globalThis.require = createRequire(import.meta.url);
 }
 `,
   };
  }
  return {};
 },

 format: ['cjs', 'esm'],
 target: 'node16',
 splitting: false,
 shims:true,
 outDir:'dist',
 cjsInterop: true,
 minify:false,
 clean: true,
 dts: false,
 platform: 'node',
}
)
