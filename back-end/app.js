const serverHandle = (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  const resData = {
    name: 'hwluo',
    site: 'http://localhost:3000',
    env: process.env.NODE_ENV
  }

  res.end(JSON.stringify(resData))
}

module.exports = serverHandle