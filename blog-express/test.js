const redis = require('redis')
var express = require('express')
var session = require('express-session')
let RedisStore = require('connect-redis')(session)

let redisClient = redis.createClient({
  host: 'localhost',
  port: 6379
})
let store = new RedisStore({ client: redisClient })

redisClient.unref()
redisClient.on('error', console.log)

var app = express()

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, maxAge: 24 * 60 * 60 * 1000 },
  store
}))

app.get('/', function (req, res) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})

app.listen(8080)