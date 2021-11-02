let fs = require('fs');
let path = require('path');

let newtxtFile = fs.WriteStream(path.join(__dirname, 'text.txt'));

process.stdin.setEncoding('utf8');

process.stdout.write('введите данные\n');  

process.stdin.on('readable', function() {
  let input = process.stdin.read();
  while(input != null) {
    let command = input.trim();
    if(command != 'exit'){
        newtxtFile.write(input);
    }

    if (command == 'exit'){
        console.log('выполнен выход');
        process.exit(0);
    }

    process.on('SIGINT', function() {
        console.log('выполнен выход');
        process.exit(0);
    })

   input = process.stdin.read();
  }
});