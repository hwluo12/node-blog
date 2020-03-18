const { SuccessModel, ErrorModel } = require('../model/resModel')
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')

const handleBlogRouter = (req, res) => {
  const method = req.method
  const id = req.query.id

  /**
  * @description:  获取博客列表
  * @param {type} 
  * @return: 
  */
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''

    const result = getList(author, keyword)
    return result.then(listData => {
      return new SuccessModel(listData)
    })
  }

  /**
  * @description:  获取博客详情
  * @param {type} 
  * @return: 
  */
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const result = getDetail(id)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  /**
   * @description:  新建博客
   * @param {type} 
   * @return: 
   */
  if (method === 'POST' && req.path === '/api/blog/new') {
    const author = 'zhangsan';
    const result = newBlog(req.body, author)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  /**
   * @description:  更新博客
   * @param {type} 
   * @return: 
   */
  if (method === 'POST' && req.path === '/api/blog/update') {
    const result = updateBlog(id, req.body)
    return result.then(data => {
      if (data) {
        return new SuccessModel('更新成功')
      } else {
        return new ErrorModel('更新失败')
      }
    })

  }

  /**
   * @description:  删除博客
   * @param {type} 
   * @return: 
   */
  if (method === 'POST' && req.path === '/api/blog/del') {
    const author = 'zhangsan'; // 假数据
    const result = delBlog(id, author);
    return result.then(data => {
      if (data) {
        return new SuccessModel('删除成功')
      } else {
        return new ErrorModel('删除失败')
      }
    })

  }
}

module.exports = handleBlogRouter