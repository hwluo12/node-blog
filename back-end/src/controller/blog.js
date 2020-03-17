const getList = (author, keyword) => {
  return [{
    id: 1,
    title: '博客1',
    content: '内容1',
    createTime: Date.now(),
    author: 'zhangsan'
  }, {
    id: 2,
    title: '博客2',
    content: '内容2',
    createTime: Date.now(),
    author: 'lisi'
  }]
}

const getDetail = (id) => {
  return {
    id: 1,
    title: '博客1',
    content: '内容1',
    createTime: Date.now(),
    author: 'zhangsan'
  }
}

module.exports = {
  getList,
  getDetail
}