const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getList, getDetail } = require('../controller/blog')

const handleBlogRouter = (req, res) => {
  const method = req.method

  /**
  * @description:  获取博客列表
  * @param {type} 
  * @return: 
  */
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''

    const listData = getList(author, keyword)

    return new SuccessModel(listData)
  }

  /**
  * @description:  获取博客详情
  * @param {type} 
  * @return: 
  */
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const id = req.query.id
    const data = getDetail(id)
    return new SuccessModel(data)
  }

  /**
   * @description:  新建博客
   * @param {type} 
   * @return: 
   */
  if (method === 'POST' && req.path === '/api/blog/new') {
    return {
      msg: "这是新建博客的接口"
    }
  }

  /**
   * @description:  更新博客
   * @param {type} 
   * @return: 
   */
  if (method === 'POST' && req.path === '/api/blog/update') {
    return {
      msg: "这是更新博客的接口"
    }
  }

  /**
   * @description:  删除博客
   * @param {type} 
   * @return: 
   */
  if (method === 'POST' && req.path === '/api/blog/del') {
    return {
      msg: "这是删除博客的接口"
    }
  }
}

module.exports = handleBlogRouter