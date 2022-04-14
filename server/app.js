const express = require('express');
const fs = require('fs');
const app = express();
let csv = require('csvtojson');

/* Agent - the user-agent found in the request's header. You may find it helpful to reformat this (some user-agent strings may contain commas) (req.useragent)
Time - use the ISO date standard (let date = new Date();)
Method - one of the following methods: GET, POST, DELETE, etc. (use req.method)
Resource - the path and the file requested (req.url)
Version - the http version of the request, check the request object for this value and be prepared to format the string (request object is "req"- req.httpVersion)
Status - a number that is most likely 200, 404, or 500 (res.statusCode or res.sendStatus?)*/

//Must use fs.appendFile

/* Write the code so your server will return "ok" to the visitor (you don't need to actually serve up a webpage) and respond with 200 status code when users navigate to http://localhost:3000:. In this exercise you may assume that all responses will return a 200 status code.

Write the code so your server will return a JSON object with all the contents of the log file when users navigate to http://localhost:3000/logs */



// app.use((req, res, next) => {
// // write your logging code here
// // let date = new Date(); 
// let log = `\r${req.get('User-Agent').replace(/,/g,'')}, ${new Date()}, ${req.method}, ${req.url}, ${req.httpVersion}, ${res.statusCode}`;
// res.send(log);
// fs.appendFile('./server/log.csv', log, function(err) {
//     if (err) throw err;
// });

// });

app.get('/', (req, res) => {
// write your code to respond "ok" here
    let log = `\r${req.get('User-Agent').replace(/,/g,'')},${new Date().toISOString()},${req.method},${req.url},HTTP/${req.httpVersion},${res.statusCode}`;
    fs.appendFile('./server/log.csv', log, function(err) {
        if (err) throw err;
    });
    console.log(log);
    res.status(200).send('Ok');
});
app.set('json spaces', 2);

app.get('/logs', (req, res) => {
// write your code to return a json object containing the log data here
    csv()
    .fromFile('./server/log.csv')
    .then((jsonObj) => {
        res.json(jsonObj)
    })
});

module.exports = app;