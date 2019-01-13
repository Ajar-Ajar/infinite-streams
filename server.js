const http = require('http')
const marker = require('@ajar/marker')
require('dotenv').config()

const port = process.env.PORT || 3000;

http.createServer(infinite)
    .listen(port,()=> marker.v(`live on http://localhost:${port}`))

function infinite (req, res) {
  res.setHeader('Content-Type', 'application/json')
  let seq = 0
  setInterval(function () {
    res.write(JSON.stringify({value: seq++}) + '\n')
  }, 100)
}