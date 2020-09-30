import { terser } from 'rollup-plugin-terser'
import buble from '@rollup/plugin-buble'

function config(module) {
  return {
    input: `./index.js`,
    output: {
      name: 'elte',
      file: `dist/elte.min.${module ? 'mjs' : 'js'}`,
      format: module ? 'esm' : 'iife',
    },
    plugins: [].concat(
      !module ? buble() : [],
      terser({
        compress: {
          ecma: module ? 6 : 5,
          unsafe_arrows: module,
          passes: module ? 2 : 1,
          warnings: true,
        },
      })
    ),
  }
}

export default [true, false].map(config)
