var express = require('express');
var router = express.Router();
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { login } = require('../controller/user')

router.post('/login', function (req, res, next) {
  const { username, password } = req.body;
  const result = login(username, password)
  result.then(data => {
    console.log(data);

    if (data.username) {
      // 设置session
      req.session.username = data.username
      req.session.realname = data.realname

      res.json(new SuccessModel(data))
      return
    } else {
      res.json(new ErrorModel('登录失败'))
    }
  })
});

// router.get('/login-test', (req, res, next) => {
//   if (req.session.username) {
//     res.json(new SuccessModel('已经登录'))
//   } else {
//     res.json(new SuccessModel('未登录'))
//   }
// })

// router.get('/session-test', (req, res, next) => {
//   const session = req.session
//   console.log(session);

//   if (session.viewNum == null) {
//     session.viewNum = 0
//   }
//   session.viewNum++
//   res.json({
//     viewNum: session.viewNum
//   })
// })

module.exports = router;