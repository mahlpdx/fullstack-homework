const http = require('http');
const express = require('express');
const app = express();
const { runInNewContext } = require('vm');
const port = process.env.PORT || 5001;
let lastPost = "";
const server = http.createServer((req, res) => {
//Instead of using express, the data is alternativley saved as parameters within the URL.
  /*const routes = [
    'form',
    'submission',
  ]; 
    let url = new URL(req.url, `http://${req.headers.host}`);
    req.on("data", (chunk) => {
    lastPost += chunk;
    console.log("on data: " + lastPost);
    });*/

    var username = new String();
    var email = new String();
    var comments = new String();
    var newsletter = new Boolean();

// http://localhost:5001/form should return a form with input elements for username, email, and submit button
    if (req.url === '/') {
        res.writeHead(302, { 'Location': 'http://localhost:5001/form' });
        res.end();
    }
    
    const formHTML = `<form action="/submit" method="post" id="submission">
        Username: <input name="username id="username"><br>
        Email: <input name="email" id="email"><br>
        Comments: <input name="comments" id=comments><br>
        Newsletter: <input name="newsletter" type="checkbox" id="accept">
        <input type="submit">
        </form>`; 

    if(req.url === '/form'){
        //lastPost = "";
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(formHTML);
        res.end();
    }

// http://localhost:5001/submit should return all the data the user entered

    else if(req.url === '/submit'){
        res.writeHead(200, { "Content-Type": "text/html" });
        //I should be able to parse the data as in exercise #2, but I am missing a step somewhere...

        /*res.write(`<table border="2">`); //Calling for a html table with a fixed border size.
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
        res.end();*/

        //Default form submission until I can find an efficient way to parse without losing the data!
        username = formHTML.match("username");
        email = formHTML.match("email");
        comments = formHTML.match("comments");
        newsletter = formHTML.match("newsletter");
        res.write('<h1> Submission Results: <h1>');
        res.write(`<h2> Username: ${username} <h2>`);
        res.write(`<h2> Email: ${email} <h2>`);
        res.write(`<h2> Comments: ${comments} <h2>`);
        if(newsletter != false){res.write(`<h2> Newsletter: Yes, sign me up! <h2>`);}
        else{res.write('<h2> Newsletter: No, I will not signup today... <h2>');}
        res.end();
        }
        //});
    //}
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
