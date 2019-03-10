var path = require('path')
const yargs = require('yargs')
let fs = require('fs')
var md5 = require('md5');

var argv=yargs.option('path', {
    alias: 'p',
    default: process.env.p,
    demand:true,
    describe:"path to folder"
  })
  .argv
  
function hash(pathDir,hashObject, indent='|'){
    var files =  fs.readdirSync(pathDir);
    files.forEach(i => {  
       if(fs.statSync(path.join(pathDir,i)).isDirectory()){
         console.log(`${indent} ${i}`);
         
        hashObject[i] = {}
        hashObject[i]=hash(path.join(pathDir,i),hashObject[i], indent+'|')  
       }else{
         console.log(`----${i}`);
         
        hashObject[i]=md5(i)
       }
     })
return hashObject
}
let x=hash(argv.path,{})
//console.log(` \n your hashed file for your directory "${argv.path}" is \n ${JSON.stringify(x,undefined,2)}`);
