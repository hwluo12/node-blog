const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')


// 获取postdata
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(
        JSON.parse(postData)
      )
    })
  })
  return promise
}

const serverHandle = (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  // 获取path
  const url = req.url
  req.path = url.split('?')[0]

  // 获取query
  req.query = querystring.parse(url.split('?')[1])

  // 处理post data
  getPostData(req)
    .then(postData => {
      req.body = postData;

      /**
       * @description: 处理blog路由
       * @param {type} 
       * @return: 
       */
      const blogData = handleBlogRouter(req, res);
      if (blogData) {
        res.end(JSON.stringify(blogData))
        return
      }

      /**
       * @description: 处理user路由
       * @param {type} 
       * @return: 
       */
      const userData = handleUserRouter(req, res)
      if (userData) {
        res.end(JSON.stringify(userData))
        return
      }

      /**
       * @description: 未命中
       * @param {type} 
       * @return: 404
       */
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      })
      res.end('404 Not Found.\n')
    })
}

module.exports = serverHandle