const { set } = require('../db/redis')
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
    const { username, password } = req.body;
    // const { username, password } = req.query;
    const result = login(username, password)
    return result.then(data => {
      if (data.username) {
        // 设置session
        req.session.username = data.username
        req.session.realname = data.realname
        console.log(req.session);
        console.log(req.cookieId);

        set(req.sessionId, req.session)

        return new SuccessModel(data)
      } else {
        return new ErrorModel('登录失败')
      }
    })
  }

  /**
   * @description: 使用cookie登录验证
   * @param {type} 
   * @return: 
   */
  // if (method === 'GET' && req.path === '/api/user/login-test') {
  //   if (req.session.username) {
  //     return Promise.resolve(new SuccessModel({
  //       session: req.session
  //     }))
  //   } else {
  //     return Promise.resolve(new ErrorModel('尚未登录'))
  //   }
  // }
}

module.exports = handleUserRouter