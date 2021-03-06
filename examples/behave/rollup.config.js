import buble from 'rollup-plugin-buble'
import flow from 'rollup-plugin-flow'
import resolve from 'rollup-plugin-node-resolve'

export default {
  plugins: [
    flow(),
    resolve()
  ],
  output: {
    format: 'iife'
  }
}
