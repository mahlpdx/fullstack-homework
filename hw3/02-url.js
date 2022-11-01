const http = require('http');
const port = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  const routes = [
    '/attributes?hello=world&lorem=ipsum',
    '/items?first=1&second=2&third=3&fourth=4',
    '/characters?spongebob=squarepants&patrick=star&sandy=cheeks',
  ];

  // use the URL interface to work with URLs
  // source: https://developer.mozilla.org/en-US/docs/Web/API/URL
  let url = new URL(req.url, `http://${req.headers.host}`);

  let getRoutes = () => {
    let result = '';
    routes.forEach(
      (elem) => (result += `<li><a href="${elem}">${elem}</a></li>`)
    );
    return result;
  };
  if (req.url === '/') {
    let routeResults = getRoutes();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 02</h1>`);
    res.write(`<ul> ${routeResults} </ul>`);
  }
  // Add your code here////////////////////////////////////////////////////////////////
  else {
  res.write(`<table border="2">`); //Calling for a html table with a fixed border size.
  res.write(`<tr style=vertical-align:top>`); //Tag to allign table via css.
  res.write('<th> Parameter 1 </th>'); //Header for first column of table.
  res.write('<th> Parameter 2 </th>'); //Header for second column of table.
  res.write('</tr>');}// End of table formatting for header. <tr> is a simple table.
  url.searchParams.forEach((value, key) => {
    res.write('<tr>'); //Begin table formatting for table data.
    res.write(`<td> ${key} </td>`); //Table data 1, aka data row #1.
    res.write(`<td> ${value} </td>`); //Table data 2, aka data row #2.
    res.write('</tr>'); //End table data for <tr> type table.
  });
  res.write('</table>'); // End table.
  res.end();
});
////////////////////////////////////////////////////////////////////////////////////////

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

