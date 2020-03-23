const redis = require('redis')
const { REDIS_CONF } = require('../config/db')

/**
 * @description: 创建客户端
 * @param {type} 
 * @return: 
 */
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

module.exports = {
  redisClient
}
