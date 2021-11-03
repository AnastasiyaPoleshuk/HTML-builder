let fs = require('fs');
let path = require('path');

let bundle = fs.WriteStream('./05-merge-styles/project-dist/bundle.css');

fs.readdir('./05-merge-styles/styles', (err, files) => {
    if(err){
        console.log(err);
    };

    files.forEach(file =>{
        let type = path.extname(file);
        type = type.replace(/[^a-zа-яё\s]/gi, ' ');
        fs.stat(`./05-merge-styles/styles/${file}`, (err, stats) => {
            if(err){
                console.log(err);
            };
            
            if(!stats.isDirectory() && type == ' css'){
                let dataFile = fs.ReadStream(`./05-merge-styles/styles/${file}`, 'utf-8');            
                dataFile.on('data', function(data){       
                    bundle.write(data);
                });
            };
        });
    });
});