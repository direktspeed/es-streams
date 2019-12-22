import fs from 'fs';
import path from 'path'

function getConfig(sourcePath) {
   const __dirname = path.dirname(new URL(import.meta.url).pathname)
   const directoryPath = path.join(__dirname);
  return {
    experimentalCodeSplitting: true,
    input: fs.readdirSync(path.join(directoryPath,sourcePath))
    .filter(x => x.indexOf('rollup.config') === -1)
    .filter(x => x.indexOf('.mjs') > -1),
    external: ['stealify/stream/adapter.mjs'],
    output: {
        paths: { 'stealify/stream/adapter.mjs': './stream/core.mjs' },
        dir: path.join('../../dist/stream',sourcePath),
        chunkFileNames: "[name].mjs",
        entryFileNames: '[name].mjs',
        format: 'esm',
        sourcemap: false
    }
  }   
}

export default [""].map(getConfig)