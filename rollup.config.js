import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import alias from '@rollup/plugin-alias';
import fs from 'fs';
import path from 'path'


function getConfig(sourcePath) {
   const __dirname = path.dirname(new URL(import.meta.url).pathname)
   const directoryPath = path.join(__dirname, 'es');
  return {
    //treeshake: false,
    experimentalCodeSplitting: true,
    input: fs.readdirSync(path.join(directoryPath,sourcePath))
    .filter(x => x.indexOf('.mjs') > -1)
    .map(x => path.join('es',sourcePath,x)),
    external: ['stealify/stream/adapter.mjs'],
    plugins: [
      //nodeResolve({ extensions }),
    ],
    output: {
        //paths: { 'stealify/stream': './stream' },
        dir: path.join('dist',sourcePath),
        chunkFileNames: "[name].mjs",
        entryFileNames: '[name].mjs',
        format: 'esm',
        sourcemap: false
    }
  }   
}

//export default [""].map(getConfig)
export default {
  experimentalCodeSplitting: true,
  input: ['src/core.mjs'],
  plugins: [
    //nodeResolve({ extensions }),
  ],
  output: {
      //paths: { 'stealify/stream': './stream' },
      dir: path.join('dist'),
      chunkFileNames: "[name].mjs",
      entryFileNames: '[name].mjs',
      format: 'esm',
      sourcemap: false
  }
}   

