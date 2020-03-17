const http = require('http')
const serverHandle = require('../app.js')

const port = '3000'

const server = http.createServer(serverHandle)

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})