const path = require('path');

console.log(require(path.join(__dirname, '../package.json')).version);
