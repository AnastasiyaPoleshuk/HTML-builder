let fs = require('fs');
let path = require('path');

fs.readdir('./03-files-in-folder/secret-folder', (err, files) => {
    if(err){
        console.log(err);
    };
    files.forEach(file =>{
        let type = path.extname(file);
        let filename = path.parse(file);
        type = type.replace(/[^a-zа-яё\s]/gi, ' ');
        fs.stat(`./03-files-in-folder/secret-folder/${file}`, (err, stats) => {
            if(!stats.isDirectory()){
                let size = `${stats.size} b`;
                let result = `${filename.name} - ${type} - ${size}`;
                console.log(result);
            };
        });
    });
});
