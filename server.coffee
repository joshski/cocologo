http = require "http"
path = require "path"
paperboy = require "paperboy"

webroot = path.dirname(__filename) + '/public'

http.createServer( (req, res) ->
  paperboy.deliver(webroot, req, res).addHeader('Expires', 0)
).listen 8000

console.log 'Server running at http://127.0.0.1:8000/'