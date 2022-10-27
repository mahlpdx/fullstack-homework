const http = require('http');
const port = process.env.PORT || 5000;

// http://localhost:5000/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5000/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5000/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5000/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// http://localhost:5000/check-cookies should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie

// For other routes, such as http://localhost:5000/other, this exercise should return a status code 404 with '404 - page not found' in html format

const server = http.createServer((req, res) => {
  const routes = [
    'welcome',
    'redirect',
    'redirected',
    'cache',
    'cookie',
    'check-cookies',
    'other',
  ];

  let getRoutes = () => {
    let result = '';

    routes.forEach(
      (elem) => (result += `<li><a href="/${elem}">${elem}</a></li>`)
    );

    return result;
  };

  if (req.url === '/') {
    let routeResults = getRoutes();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 01</h1>`);
    res.write(`<ul> ${routeResults} </ul>`);
    res.end();
  }

  // Add your code here
    if(req.url == '/welcome'){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1> Welcome to Middle Earth! <h1>');
        res.end();
    }

    if(req.url == '/redirect'){
        res.writeHead(302, { 'Location': 'http://localhost:5000/redirected' });
        res.end();
    }

    if(req.url == '/redirected'){
        res.writeHead(302, { 'Content-Type': 'text/html' });
        res.write('<h1> Redirected... <h1>');
        res.end();
    }

    if(req.url == '/cache'){
        res.writeHead(200, { 'Cache-Control': 'max-age = 86400' });
        res.write('<h1> This resource was cached! <h1>');
        res.end();
    }

    if(req.url == '/cookie'){
        res.writeHead(200, { 'Cookie': 'hello = world' });
        res.write('<h1> yummm cookies! RIP cookie Monsta <h1>');
        res.end();
    }

    if(req.url == '/check-cookies'){

        res.writeHead(200, { 'Content-Type': 'text/html' });
        if(res.cookie == 'hello'){
        res.write('<h1> Yes! <h1>');
        }
        else{
        res.write('<h1> No....! <h1>');
        }
        res.end();
    }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
