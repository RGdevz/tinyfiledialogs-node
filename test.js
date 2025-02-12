const {inputBox,pickFile,popup,pickFolder} = require('./index.js')

const res = pickFolder(process.cwd())
console.log(res)
