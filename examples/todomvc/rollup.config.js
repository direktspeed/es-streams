import babel from 'rollup-plugin-babel'
import pkg from './package.json'

export default {
  input: 'src/index.mjs',
  treeshake: false,
  plugins: [babel({
    babelrc: false,
    presets: ['@babel/flow','@babel/react']
  })],
  external: [
    '@most/core',
    '@most/disposable',
    '@most/scheduler'
  ],
  output: [{
    file: pkg.module,
    format: 'es',
    sourcemap: true
  }]
}
