const querystring = require('querystring')
const { set, get } = require('./src/db/redis')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// const SESSION_DATA = {}

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
  return d
}

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

  // 解析cookie
  req.cookie = {}
  const cookieStr = req.headers['cookie'] || ''
  cookieStr.split(';').forEach(item => {
    if (!item) {
      return
    }
    const arr = item.split('=')
    const key = arr[0].trim()
    const val = arr[1]
    req.cookie[key] = val
  })
  console.log('req.cookie is: ', req.cookie)

  // 解析session
  // let needSetCookie = false
  // let userId = req.cookie.userId
  // if (userId) {
  //   if (!SESSION_DATA[userId]) {
  //     SESSION_DATA[userId] = {}
  //   }
  // } else {
  //   needSetCookie = true
  //   userId = `${Date.now()}_${Math.random()}`
  //   SESSION_DATA[userId] = {}
  // }
  // req.session = SESSION_DATA[userId]
  // console.log('SESSION_DATA is ', SESSION_DATA);
  let userId = req.cookie.userId
  let needSetCookie = false
  if (!userId) {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    set(userId, {})
  }
  req.sessionId = userId;
  get(req.sessionId).then(sessionData => {
    if (sessionData == null) {
      set(req.sessionId, {})
      req.session = {}
    } else {
      req.session = sessionData
    }
    return getPostData(req)
  })
    .then(postData => {
      req.body = postData;

      /**
       * @description: 处理blog路由
       * @param {type} 
       * @return: 
       */
      const blogData = handleBlogRouter(req, res)
      if (blogData) {
        blogData.then(result => {
          if (needSetCookie) {
            res.setHeader('Set-Cookie', `userId=${userId};path=/;httpOnly;expires=${getCookieExpires()};`)
          }
          res.end(JSON.stringify(result))
        }).catch((err) => {
          res.end(JSON.stringify('发生错误'))
        })
        return
      }

      /**
       * @description: 处理user路由
       * @param {type} 
       * @return: 
       */
      const userData = handleUserRouter(req, res)
      if (userData) {
        userData.then(result => {
          if (needSetCookie) {
            res.setHeader('Set-Cookie', `userId=${userId};path=/;httpOnly;expires=${getCookieExpires()};`)
          }
          res.end(JSON.stringify(result))
        }).catch((err) => {
          console.log(err);

          res.end(JSON.stringify('发生错误'))
        })
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