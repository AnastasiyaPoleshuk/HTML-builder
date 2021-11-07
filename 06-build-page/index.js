let fs = require('fs');
let path = require('path');

let template = fs.ReadStream(path.join(__dirname, 'template.html'), 'utf-8'); 
const re = ['{{articles}}', '{{footer}}', '{{header}}'];
let allStyles;

    template.on('data', function(chunk){
        fs.readdir('./06-build-page/components', (err, files) => {
            if(err){
                console.log(err);
            };
            for(let i=0; i<files.length; i++){
                let dataFile = fs.ReadStream(`./06-build-page/components/${files[i]}`, 'utf-8');
                dataFile.on('data', function(data){
                    chunk = chunk.replace(re[i], data);
                    fs.mkdir('./06-build-page/project-dist', function() {
                        fs.writeFile('./06-build-page/project-dist/index.html', chunk, function(){});
                        fs.readdir('./06-build-page/styles', (err, files) => {
                            if(err){
                                console.log(err);
                            };
                            allStyles = fs.WriteStream('./06-build-page/project-dist/style.css');
                            files.forEach(file =>{
                                let type = path.extname(file);
                                type = type.replace(/[^a-zа-яё\s]/gi, ' ');
                                fs.stat(`./06-build-page/styles/${file}`, (err, stats) => {
                                    if(err){
                                        console.log(err);
                                    };
                                    if(!stats.isDirectory() && type == ' css'){
                                        let dataFile = fs.ReadStream(`./06-build-page/styles/${file}`, 'utf-8');            
                                        dataFile.on('data', function(data){    
                                            allStyles.write(data);
                                        });
                                    };
                                });
                            });
                        });
            fs.mkdir('./06-build-page/project-dist/assets', function() {
                fs.readdir('./06-build-page/assets', (err, files) => {
                    if(err){
                        console.log(err);
                    };
                    files.forEach(file =>{    
                        let foldername = path.parse(file).name;
                        fs.mkdir(`./06-build-page/project-dist/assets/${foldername}`, function(){
                            fs.readdir(`./06-build-page/assets/${foldername}`, (err, files) => {
                                if(err){
                                    console.log(err);
                                };
                                files.forEach(file =>{  
                                    let readableStream = fs.createReadStream(`./06-build-page/assets/${foldername}/${file}`);
                                    let writeableStream = fs.createWriteStream(`./06-build-page/project-dist/assets/${foldername}/${file}`);
                                    readableStream.on("data", function(chunk){
                                        writeableStream.write(chunk);
                                    });
                                });
                            });
                        })   
                    });
                });
            });

                    });
                });
            };
        }); 
    });

