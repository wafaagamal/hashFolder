const yargs = require('yargs')
const { hashElement } = require('folder-hash');

var argv=yargs.option('path', {
    alias: 'p',
    default: process.env.p,
    demand:true,
    describe:"path to folder"
  })
  .argv
  
console.log('\n',"=====Folder Path=====",`"${argv.path}"`,'\n');

const options = { algo:'md5', folders: { include: ['.*'] }, matchBasename: true  };
hashElement(argv.path, options)
  .then(hash => {
    console.log('Result for folder "' + argv.path + '" (with options):','\n');
    console.log(hash.toString(), '\n');
  })
  .catch(error => {
    return console.error('hashing failed:', error);
  });