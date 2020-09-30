import buble from '@rollup/plugin-buble'

export default {
  input: `test/test.js`,
  output: {
    file: `dist/test.js`,
    format: 'iife',
  },
  plugins: [
    buble({
      transforms: { dangerousTaggedTemplateString: true },
    }),
  ],
}
