const express = require('express')
const axios = require("axios")
const app = express()
const os = require('os');
const fs = require("fs");
const https = require("https");
const http = require('http');
const key = fs.readFileSync("ssl-key.pem", "utf-8");
const cert = fs.readFileSync("ssl.pem", "utf-8");
var msg;
var app_msg = process.env.APP_MSG;
var name = process.env.USER_NAME;
var user_password = process.env.USER_PASSWORD;
var color = process.env.COLOR
var http_port = process.env.HTTP_PORT || 8080
var https_port = process.env.HTTPS_PORT || 8443

app.get('/', (req, res) => {
    if (app_msg == undefined) {
        msg = 'Hello, ' + req.hostname + ' / ' + req.connection.remoteAddress  + '. Time is ' + Date() + '.\nYou have no message for me.\n';
    } else {
        msg = 'Hello, ' + req.hostname + ' / ' + req.connection.remoteAddress  + '. Time is ' + Date() + '.\nI will deliver your message: ' + app_msg + '\n';
    }
    if (name != undefined && user_password != undefined){
        msg = msg + '\nYour user name is :- ' + name + ' and password is :- ' + user_password + '\n';
    }
    console.log(JSON.stringify(req.headers));
    res.send(msg);
})

app.get('/ip', (req, res) => {
    msg = 'Hello, Your ip address: ' + req.connection.remoteAddress  + '. Time is ' + Date() + '. From: ' + os.hostname() + '.\n';
    console.log(msg);
    res.send(msg);
})

app.get('/deploy', (req, res) => {
    msg = '<html><body style="background-color:' + color + '"><div style="text-align: center;display: inline-block;position: fixed;top: 0;bottom: 0;left: 0;right: 0;width: 100%;height: 50px;color: white;margin: auto;"><h1>' + color + '</h1> </div></body></html>';
    console.log(msg);
    res.send(msg);
})

app.get('/perf', (req, res) => {
    var i=0;
    while (i < 9e5) i++;
    console.log("counted till " + i);
    res.status(200)
    .send({
        message: "counted till " + i
    });
})

app.get("/getexttodos", (req, res) => {
  axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5")
    .then(function(response) {
      res.json(response.data)
    }).catch(function(error) {
      res.json("Error occured!")
    })
})

https.createServer({ key, cert }, app).listen(https_port, function(){
        console.log('Secured Sample node app listening at port ' + https_port)
});

http.createServer(app).listen(http_port, function(){
        console.log('Sample node app listening at port ' + http_port)
});
