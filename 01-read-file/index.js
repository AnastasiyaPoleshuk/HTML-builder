let fs = require('fs');
let path = require('path');

let readTxT = fs.ReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

readTxT.on('data', function(chunk){
    console.log(chunk);
});