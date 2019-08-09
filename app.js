const http = require('http')
const url = require('url')
const user = require('./user')
const movie = require('./movie')


const server = http.createServer((req, res) => {

     if (req.url === '/') {
          res.writeHead(200, { "Content-type": "application/json" });
          res.end("Dalu, kedu ife e na cho")
          return
     }

     //============== Movie ===============//

     //Get all movies
     if (req.url === '/movies') {
          res.writeHead(200, { "Content-type": "application/json" });
          res.end(JSON.stringify(movie.getMovies()))
          return
     }

     // Find a movie
     if (/^\/movies\/\d+$/.test(req.url)) {
          res.writeHead(200, { "Content-type": "application/json" });
          parseParmas('/movies/:id', req.url, req);
          res.end(JSON.stringify(movie.findMovie(req.params.id)))
          return
     }

     //Movie Count
     if (req.url === '/movies/count') {
          res.writeHead(200, { "Content-type": "application/json" });
          res.end(JSON.stringify(movie.getCount()))
          return
     }

     //============== Users  ===============//

     // Get all users
     if (req.url === '/users' && req.method == 'GET') {
          res.writeHead(200, { "Content-type": "application/json" });
          res.end(JSON.stringify(user.getUsers()))
          return
     }

     // Find a user
     if (/^\/users\/\d+$/.test(req.url) && req.method == 'GET') {
          res.writeHead(200, { "Content-type": "application/json" });
          parseParmas('/users/:id', req.url, req);
          res.end(JSON.stringify(user.findUser(req.params.id).user))
          return
     }

     // Add a user
     if (req.url === '/users' && req.method == 'POST') {
          var body = '';
          req.on('data', function (data) {
               body += data;
          });
          req.on('end', function () {
               user.addUser(body)
               res.end( user.addUser(body))
          });
          res.end()
          return
     }

     // Update a user
     if (/^\/users\/\d+$/.test(req.url) && req.method == 'PUT') {
          parseParmas('/users/:id', req.url, req);
          var body = '';
          req.on('data', function (data) {
               body += data;
          });
          req.on('end', function () {
               res.end(user.updateUser(req.params.id, body))
          });
          return
     }

     // Delete user
     if (/^\/users\/\d+$/.test(req.url) && req.method == 'DELETE') {
          parseParmas('/users/:id', req.url, req);
          res.end(user.deleteUser(req.params.id))
          return 
     }

     //User Count
     if (req.url === '/users/count') {
          res.writeHead(200, { "Content-type": "application/json" });
          res.end(JSON.stringify(user.getCount()))
          return
     }

     res.writeHead(404, { "Content-type": "text/html" });
     res.end("<h1>Nah fam ! - 40421</h1>")
})

server.listen(3000, () => {
     console.log("listening to port 3000..")
})

function parseParmas(originalRoute, incomingUrl, req) {
     var splitedRoute = originalRoute.replace(/^\/+|\/$/g, '').split("/:");
     var splitedUrl = url.parse(incomingUrl).pathname.replace(/^\/+|\/$/g, '').split("/");
     splitedRoute.splice(0, 1)
     splitedUrl.splice(0, 1);
     var paramsObject = {};
     for (var i = 0; i < splitedRoute.length; i++) {
          paramsObject[splitedRoute[i]] = splitedUrl[i];
     }
     req.params = paramsObject;
}