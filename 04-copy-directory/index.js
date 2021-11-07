let fs = require('fs');

fs.mkdir('./04-copy-directory/files-copy', function() {
    fs.readdir('./04-copy-directory/files', (err, files) => {
        if(err){
            console.log(err);
        };

        files.forEach(file =>{    
            fs.stat(`./04-copy-directory/files/${file}`, (err, stats) => {
                if(err){
                    console.log(err);
                };
                
                if(stats.size == 0){
                    let newFile = fs.WriteStream(`./04-copy-directory/files/${file}`);
                    newFile.write("");
                };
            });
            let dataFile = fs.ReadStream(`./04-copy-directory/files/${file}`, 'utf-8');
            dataFile.on('data', function(data){
                fs.writeFile(`./04-copy-directory/files-copy/${file}`, data, function(){
                    console.log('it works');
                });
            });
        });
    });
});