const { SuccessModel, ErrorModel } = require('../model/resModel')
const { login } = require('../controller/user')

const handleUserRouter = (req, res) => {
  const method = req.method

  /**
   * @description: 用户登录
   * @param {type} 
   * @return: 
   */
  if (method === 'POST' && req.path === '/api/user/login') {
    const result = login(req.body.username, req.body.password)
    return result.then(data => {
      if (data.username) {
        return new SuccessModel(data)
      } else {
        return new ErrorModel('登录失败')
      }
    })
  }
}

module.exports = handleUserRouter