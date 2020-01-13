const http = require('http'), vm = require('vm');

/*
var m = require('module')
var src = 'module.exports = 42'
var res = require('vm').runInThisContext(m.wrap(src))(exports, require, module, __filename, __dirname)
console.log(module.exports)
*/

['http://example.com/nodejsmodules/myModule.js'].forEach(url => {
    http.get(url, res => {
        if (res.statusCode === 200 && /^text\/javascript/.test(res.headers['content-type'])) {
            let rawData = [];
            res.setEncoding('utf8');
            res.on('data', rawData.push);
            res.on('end', () => { vm.runInThisContext(rawData, url); });
            res.on('error',e=>throw e)
        }
    });
});
