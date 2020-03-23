var express = require('express');
var router = express.Router();
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
// 博客列表
router.get('/list', function (req, res, next) {
  const author = req.query.author || ''
  const keyword = req.query.keyword || ''

  const result = getList(author, keyword)
  result.then(listData => {
    res.json(new SuccessModel(listData))
  })
});
// 博客详情
router.get('/detail', function (req, res, next) {
  const result = getDetail(req.query.id)
  result.then(data => {
    res.json(new SuccessModel(data))
  })
})
// 新建博客
router.post('/new', loginCheck, function (req, res, next) {
  const author = req.session.username;
  const result = newBlog(req.body, author)
  result.then(data => {
    res.json(new SuccessModel(data))
  })
})
// 更新博客
router.post('/update', loginCheck, function (req, res, next) {
  const result = updateBlog(req.query.id, req.body)
  result.then(data => {
    if (data) {
      res.json(new SuccessModel('更新成功'))
      return
    } else {
      res.json(new ErrorModel('更新失败'))
    }
  })
})
// 删除博客
router.post('/del', loginCheck, function (req, res, next) {
  console.log('删除接口');

  const author = req.session.username;
  const result = delBlog(req.query.id, author);
  result.then(data => {
    if (data) {
      res.json(new SuccessModel('删除成功'))
      return
    } else {
      res.json(new ErrorModel('删除失败'))
    }
  })
})
module.exports = router;
