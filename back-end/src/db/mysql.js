const mysql = require('mysql');
const { MYSQL_CONF } = require('../config/db')

/**
 * @description: 创建连接对象
 * @param {type} 
 * @return: 
 */
const con = mysql.createConnection(MYSQL_CONF)

/**
 * @description: 开始连接
 * @param {type} 
 * @return: 
 */
con.connect()

/**
 * @description: 统一执行sql的函数
 * @param {type} 
 * @return: 
 */
function exec(sql) {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
  return promise
}

module.exports = {
  exec
}