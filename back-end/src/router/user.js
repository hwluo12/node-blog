const handleUserRouter = (req, res) => {
  const method = req.method

  /**
   * @description: 用户登录
   * @param {type} 
   * @return: 
   */
  if (method === 'POST' && req.path === '/api/user/login') {
    return {
      msg: '登录成功'
    }
  }
}

module.exports = handleUserRouter