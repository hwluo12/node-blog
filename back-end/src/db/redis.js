const redis = require('redis')
const { REDIS_CONF } = require('../config/db')

/**
 * @description: 创建客户端
 * @param {type} 
 * @return: 
 */
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

/**
 * @description: 监听error
 * @param {type} 
 * @return: 
 */
redisClient.on('error', err => {
  console.error(err);
})

/**
 * @description: 设置数据
 * @param {type} 
 * @return: 
 */

function set(key, value) {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  redisClient.set(key, value, redis.print)
}

/**
 * @description: 取数据
 * @param {type} 
 * @return: 
 */

function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, value) => {
      if (err) {
        reject(err)
        return
      }
      if (value == null) {
        resolve(null)
        return
      }
      try {
        resolve(JSON.parse(value))
      } catch (e) {
        resolve(value)
      }
    })
  })
  return promise
}

module.exports = {
  set,
  get
}
