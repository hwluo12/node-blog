const fs = require('fs')
const path = require('path')

/**
 * @description: 写日志
 * @param {type} 
 * @return: 
 */

function writeLog(writeStream, log) {
  writeStream.write(log + '\n')
}

/**
 * @description: 生成write stream
 * @param {type} 
 * @return: 
 */
function createWriteStream(fileName) {
  const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a'
  })
  return writeStream
}

// 写访问日志
const accessWriteStream = createWriteStream('access.log')
function access(log) {
  writeLog(accessWriteStream, log)
}


module.exports = {
  access
}